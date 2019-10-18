import data from '@solid/query-ldflex'
import auth from 'solid-auth-client'
import uuid from 'uuid'
import { CONTEXT } from '@constants'
import { UI } from '@constants'

/**
 * Find prefix context to add into object property
 * @param node
 */
function findContext(node: string) {
  const contexts = Object.keys(CONTEXT['@context'])
  let prefix = ''

  for (const context of contexts) {
    if (node.includes(CONTEXT['@context'][context])) {
      prefix = `${context}:`
      return prefix
    }
  }

  return prefix
}

/**
 * Capitalize words into string
 * @param word
 */
function capitalize(word: string) {
  return word.replace(/(?:^|\s)\S/g, letter => {
    return letter.toUpperCase()
  })
}

/**
 * Get Label from external sources
 * @param property
 */
async function findLabel(property: string) {
  if (property && property.includes('#')) {
    // Try to fetch rdfs:label from the vocabulary
    const vocabDoc = getFetchUrl(property.split('#')[0])
    const vocabLabel = await data.from(vocabDoc)[property].label
    if (vocabLabel && vocabLabel.value) {
      return vocabLabel.value
    } else {
      // If no label, use the predicate name
      const label = property.split('#')[1]
      return capitalize(label.replace(/[^a-zA-Z ]/g, ' '))
    }
  }
  return 'noLabel'
}

/**
 * Return a version of the property that includes https, to work around https/http mismatched domains
 * This is applicable for a few select vocabularies, including
 * @param property
 */
function getFetchUrl(property: string) {
  if (property && property.includes('http://www.w3.org/2006/vcard')) {
    const newUrl = new URL(property)
    return 'https://' + newUrl.hostname + newUrl.pathname
  } else {
    return property
  }
}

/**
 * Get Predicate name from string
 * @param predicate
 */
function getPredicateName(predicate: string): any {
  const prefix = findContext(predicate)

  if (predicate.includes('title')) {
    return `${prefix}title`
  }

  if (predicate.includes('#')) {
    return `${prefix}${predicate.split('#')[1]}`
  }

  if (predicate.lastIndexOf('ui:')) {
    return `${prefix}${predicate.split('ui:')[1]}`
  }

  return null
}

async function getPropertyValue(field: string, property: string) {
  let propertyProxy: any

  if (property.includes('ui#values')) {
    return loopList(data[field][property])
  }
  propertyProxy = await data[field][property]

  return propertyProxy && propertyProxy.value
}

/**
 * Convert turtle to Json-ld object
 * @param document
 * @param partsPath
 */
async function turtleToFormUi(document: any) {
  let fields: any = {}
  const doc = await document
  const partsPath = 'http://www.w3.org/ns/ui#parts'
  const parts: any = await loopList(doc[partsPath])

  for await (const field of parts) {
    const subjectKey: string = getPredicateName(field)
    const subjectPrefix = `subject:${subjectKey}`

    for await (const property of data[field].properties) {
      let partsFields: any = {}
      let propertyValue: string = await getPropertyValue(field, property)

      /**
       * If property exist into the subject we added it into the json-ld object
       */
      if (property.includes('parts') && propertyValue) {
        partsFields = await turtleToFormUi(data[field])
      }

      const propertyKey: string = getPredicateName(property)
      let newField = {
        [subjectPrefix]: {
          ...fields[subjectPrefix],
          [propertyKey]: Object.keys(partsFields).length === 0 ? propertyValue : partsFields
        }
      }

      if (!propertyValue) {
        newField = {}
      }

      fields = {
        ...fields,
        ...newField
      }
    }

    if (
      !fields[subjectPrefix][UI.LABEL] &&
      !fields[subjectPrefix][UI.PARTS] &&
      fields[subjectPrefix][UI.PROPERTY]
    ) {
      const label = await findLabel(fields[subjectPrefix][UI.PROPERTY])
      fields = { ...fields, [subjectPrefix]: { ...fields[subjectPrefix], [UI.LABEL]: label } }
    }
  }
  return fields
}

/**
 * Get the subject prefix
 * @param document
 */
function subjectPrefix(document: string) {
  if (document.includes('#')) {
    return `${document.split('#')[0]}#`
  }
  return `${document}#`
}

async function existDocument(document: string) {
  const result = await auth.fetch(document, { method: 'GET' })

  return result.status !== 404
}

async function partsFields(childs: any, options: any) {
  const uniqueName = uuid()
  const { fieldObject, value, property, podUri } = options
  return {
    [UI.PARTS]: {
      ...childs[UI.PARTS],
      [uniqueName]: {
        [UI.NAME]: uniqueName,
        [UI.VALUE]: value,
        ...(await mapFormModelWithData(fieldObject, value, property, podUri))
      }
    }
  }
}

function getSubjectLinkId(currentLink: string) {
  const id = Date.now()

  if (currentLink && currentLink.includes('#')) {
    return `${currentLink.split('#')[0]}#${id}`
  }

  return `${currentLink}#${id}`
}

function getClonePart(childs: any) {
  return {
    ...childs,
    [UI.CLONE_PARTS]: childs[UI.PARTS]
  }
}

/**
 * Updates the formObject with the new values if something has been updated in the podUri's turtle file
 * @param formObject
 * @param podUri
 */
export async function mapFormObjectWithData(formObject: any, podUri: string) {
  let updatedFormObject = { ...formObject }
  const fields = Object.keys(formObject)
  // Clearing cache to force the podUri to be requested again
  await data.clearCache(podUri.split('#')[0])

  /**
   * Looping into each of the form's updated fields to compare with what the actual data has
   */
  for await (const field of fields) {
    const currentField = formObject[field]
    let result
    if (currentField.parent) {
      result = await data[currentField.parent[UI.VALUE]][currentField[UI.PROPERTY]]
    } else {
      result = await data[currentField[UI.BASE]][currentField[UI.PROPERTY]]
    }
    updatedFormObject = {
      ...updatedFormObject,
      [field]: {
        ...currentField,
        'ui:oldValue': result.value
      }
    }
  }

  return updatedFormObject
}

/**
 *  Form Model with user data pod
 * @param modelUi
 * @param podUri
 */
export async function mapFormModelWithData(
  modelUi: any,
  podUri: string,
  parentProperty?: string,
  parentUri?: string
) {
  if (podUri.includes('#') && !parentUri && !parentProperty) {
    await data.clearCache(podUri.split('#')[0])
  }
  /**
   * Get fields parts from Form Model
   */
  const parts = modelUi[UI.PARTS]
  /**
   * Get fields key into Form Model to loop over each field
   */
  const fields: any = Object.keys(modelUi[UI.PARTS])
  let newModelUi = modelUi

  /**
   * Loop into each fields and find the property into Form Model to
   * match with pod property data
   */
  for await (const fieldValue of fields) {
    let fieldObject = parts[fieldValue]
    let property = fieldObject[UI.PROPERTY]
    const isMultiple = fieldObject['rdf:type'].includes('Multiple')
    const isGroup = fieldObject['rdf:type'].includes('Group')
    const hasParts = fieldObject[UI.PARTS]
    let parentValue = ''
    let childs: any = {}
    let updatedField: any = []

    /**
     * Get parent default values for parent fields or single fields without
     * parts
     */
    if (property) {
      if (fieldObject['rdf:type'].includes('Classifier')) {
        let result: any

        if (fieldObject[UI.VALUES]) {
          result = podUri && (await data[podUri][property])

          if (result) {
            parentValue = result.value || ''
          }
        } else {
          result = podUri && (await data[podUri].type)
          if (result) {
            parentValue = result.value || ''
          }
        }
      } else {
        const field = podUri && (await data[podUri][property])
        parentValue = (field && field.value) || ''
      }
    }
    /**
     * If field has parts call recursive function to deep into each children fields
     */
    if (hasParts) {
      /**
       * If field is multiple will remove children subject and add custom node id
       */
      if (isMultiple) {
        /**
         * Add unique id for parts fields when podUri is empty or not exist.
         */
        let existField = false

        for await (let fieldData of data[podUri][property]) {
          const { value } = fieldData
          existField = true
          childs = await partsFields(childs, { fieldObject, property, podUri, value })
          childs = getClonePart(childs)
        }

        if (!existField) {
          const idLink = getSubjectLinkId(podUri)
          childs = await partsFields(childs, { fieldObject, property, podUri, value: idLink })
          childs = getClonePart(childs)
        }
      }

      if (isGroup) {
        const parentPro =
          parentProperty && parentUri
            ? { [UI.PARENT_PROPERTY]: parentProperty, [UI.BASE]: parentUri }
            : {}

        newModelUi = {
          ...parentPro,
          [UI.REFERENCE]: fieldValue,
          ...(await mapFormModelWithData(fieldObject, podUri))
        }
      }
    }

    /**
     * Create object value with field values
     * Inlcude link only when is a link and type is not Multiple
     */
    const objectValue =
      parentValue && !isMultiple
        ? {
            [UI.VALUE]: parentValue,
            [UI.OLDVALUE]: parentValue,
            [UI.NAME]: uuid(),
            [UI.BASE]: podUri
          }
        : { [UI.NAME]: uuid(), [UI.BASE]: podUri }

    if (fieldObject[UI.VALUES]) {
      fieldObject = {
        ...fieldObject
      }
    }
    /**
     * Updated field if value is not a group
     */
    updatedField = isGroup
      ? updatedField
      : {
          [fieldValue]: {
            ...fieldObject,
            ...objectValue,
            ...childs
          }
        }

    newModelUi = {
      ...newModelUi,
      [UI.PARTS]: {
        ...newModelUi[UI.PARTS],
        ...updatedField
      }
    }
  }
  return newModelUi
}

/**
 * Convert turtle to formModel(JSON-LD)
 * @param documentUri
 * @param partsPath
 */
export async function convertFormModel(documentUri: any, documentPod: any) {
  const model = await turtleToFormUi(data[documentUri])
  let modelUi = {
    '@context': {
      ...CONTEXT['@context'],
      subject: subjectPrefix(documentUri),
      document: documentPod
    },
    [UI.PARTS]: { ...model }
  }

  const modelWidthData = mapFormModelWithData(modelUi, documentPod)

  return modelWidthData
}

/**
 * Loop into ordered list
 * @param doc
 */
async function loopList(doc: any) {
  let parts: any = []

  const field = await doc.rdf$first
  if (field) {
    const nextField = await loopList(doc.rdf$rest)
    parts = [...parts, field.value, ...nextField]
  }

  return parts
}

export function suffixFromJsonLd(predicate: string, context: any): string {
  const suffix = predicate && predicate.split(':')
  return `${context[suffix[0]]}${suffix[1]}`
}
