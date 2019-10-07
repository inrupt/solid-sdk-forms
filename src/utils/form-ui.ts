import data from '@solid/query-ldflex'
import auth from 'solid-auth-client'
import uuid from 'uuid'
import { CONTEXT } from '@constants'

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
 * Get Label from property string
 * @param property
 */
function findLabel(property: string) {
  if (property.includes('#')) {
    const label = property.split('#')[1]
    return capitalize(label.replace(/[^a-zA-Z ]/g, ' '))
  }

  return 'noLabel'
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
      !fields[subjectPrefix]['ui:label'] &&
      !fields[subjectPrefix]['ui:parts'] &&
      fields[subjectPrefix]['ui:property']
    ) {
      const label = findLabel(fields[subjectPrefix]['ui:property'])
      fields = { ...fields, [subjectPrefix]: { ...fields[subjectPrefix], 'ui:label': label } }
    }
  }
  return fields
}

/**
 * Get the subject prefix
 * @param document
 */
function subjectPrefix(document: any) {
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
    'ui:parts': {
      ...childs['ui:parts'],
      [uniqueName]: {
        'ui:name': uniqueName,
        'ui:value': value,
        ...(await formModel(fieldObject, value, property, podUri))
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
    'ui:partsClone': childs['ui:parts']
  }
}

/**
 *  Form Model with user data pod
 * @param modelUi
 * @param podUri
 */
async function formModel(
  modelUi: any,
  podUri: string,
  parentProperty?: string,
  parentUri?: string
) {
  /**
   * Get fields parts from Form Model
   */
  const parts = modelUi['ui:parts']
  /**
   * Get fields key into Form Model to loop over each field
   */
  const fields: any = Object.keys(modelUi['ui:parts'])
  let newModelUi = modelUi

  /**
   * Loop into each fields and find the property into Form Model to
   * match with pod property data
   */
  for await (const fieldValue of fields) {
    let fieldObject = parts[fieldValue]
    let property = fieldObject['ui:property']
    const isMultiple = fieldObject['rdf:type'].includes('Multiple')
    const isGroup = fieldObject['rdf:type'].includes('Group')
    const hasParts = fieldObject['ui:parts']
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

        if (fieldObject['ui:values']) {
          result = podUri && (await data[podUri][property])

          if (result) {
            parentValue = result.value || ''
          }
        } else {
          // property = 'https://www.w99/02/22-rdf-syntax-ns#type'
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
            ? { 'ui:parentProperty': parentProperty, 'ui:base': parentUri }
            : {}

        newModelUi = {
          ...parentPro,
          'ui:reference': fieldValue,
          ...(await formModel(fieldObject, podUri))
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
            'ui:value': parentValue,
            'ui:oldValue': parentValue,
            'ui:name': uuid(),
            'ui:base': podUri
          }
        : { 'ui:name': uuid(), 'ui:base': podUri }

    if (fieldObject['ui:values']) {
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
      'ui:parts': {
        ...newModelUi['ui:parts'],
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
    'ui:parts': { ...model }
  }

  const modelWidthData = formModel(modelUi, documentPod)

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
  const suffix = predicate.split(':')
  return `${context[suffix[0]]}${suffix[1]}`
}
