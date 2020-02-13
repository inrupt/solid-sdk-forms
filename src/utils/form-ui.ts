import data from '@solid/query-ldflex'
import uuid from 'uuid'
import { CONTEXT, RDF, UI } from '@constants'
import { cloneDeep } from 'lodash'

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
  if (property && property.includes('http')) {
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
  const updatedProperty = changeHostProtocol(field)

  if (property.includes('ui#values')) {
    return loopList(data.from(updatedProperty)[field][property])
  }

  propertyProxy = await data.from(updatedProperty)[field][property]

  return propertyProxy && propertyProxy.value
}

function changeHostProtocol(property: string) {
  if (property.includes('http')) {
    const protocol = window.location.href.split(':')[0]
    if (protocol === 'https') {
      return property.replace(/(^\w+:|^)\/\//, `${protocol}://`)
    }
  }

  return property
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
  const partPath = 'http://www.w3.org/ns/ui#part'
  let parts
  const part = await doc[partPath]

  if (!part) {
    parts = await loopList(doc[partsPath])
  } else {
    parts = await [part.value]
  }

  for await (const field of parts) {
    const subjectKey: string = getPredicateName(field)
    const subjectPrefix = `subject:${subjectKey}`
    for await (const property of data[field].properties) {
      let partsFields: any = {}
      let propertyValue: string = await getPropertyValue(field, property)
      /**
       * If property exist into the subject we added it into the json-ld object
       */
      if (property === partsPath && propertyValue) {
        partsFields = await turtleToFormUi(data[field])
      } else if (property === partPath) {
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

async function partsFields(childs: any, options: any) {
  const uniqueName = uuid()
  const { fieldObject, value, property, podUri } = options
  const partsKey = fieldObject[UI.PART] ? UI.PART : UI.PARTS
  return {
    [partsKey]: {
      ...childs[partsKey],
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
        [UI.OLDVALUE]: result.value
      }
    }
  }

  return updatedFormObject
}

function existPodUri(podUri: string) {
  return podUri.includes('http') && podUri && podUri !== ''
}

/**
 * add the 'property' value to the model properties
 * @param model form model without the data values
 * @param dataSource IRI where to look for the data values
 */
export async function mapData(model: any, dataSource: string): Promise<any> {
  /* the model will always has parts, as any for does */
  Object.keys(model[UI.PARTS]).map(async subject => {
    let value = model[UI.PARTS][subject]
    /* if there is a inner group then we call recursively */
    if (value[RDF.TYPE] === 'http://www.w3.org/ns/ui#Group') {
      await mapData(value, dataSource)
    } else {
      /* if this is a non-group field then we look for the value in the source and assign it to 'ui:value' */
      const property = value[UI.PROPERTY]
      /* there are some edge cases in the original that I'm skipping for now: CLASSIFIER */
      value[UI.VALUE] = (await data[dataSource][property]).value
      model[subject] = value
    }
  })
}

/**
 * This function is designed to clean the cloned fields of any values. In some code paths, the clone parts are coming
 * from existing parts lists, and the values and subjects need to be cleaned and regenerated
 * @param podUri
 * @param childs
 */
function cleanClonePartData(podUri: string, childs: any) {
  try {
    // Create a new subject for the new cloned parts
    // const nodeSubject = getSubjectLinkId(podUri)

    Object.keys(childs[UI.CLONE_PARTS]).forEach((key, index) => {
      if (index !== 0) {
        delete childs[UI.CLONE_PARTS][key]
      }
    })

    const cloneKey = Object.keys(childs[UI.CLONE_PARTS])[0]
    const clonePartsKey = Object.keys(childs[UI.CLONE_PARTS][cloneKey][UI.PARTS])

    // Loop over all of the subjects in the cloneParts array. There should only be one, but there may be a bug
    // causing there to be more than one. It shouldn't matter, though.
    clonePartsKey.forEach(part => {
      // Get the part itself. This should be the group, or the item inside of the multiple
      const clonePart = childs[UI.CLONE_PARTS][cloneKey][UI.PARTS][part]
      const clonePartParts = Object.keys(clonePart[UI.PARTS])

      // For each part in the group (or individual multiple)
      clonePartParts.forEach(subPart => {
        // Set the value to null for the part and update the base and parent value so it is a new set of parts instead of
        // tied to the original
        clonePart[UI.PARTS][subPart] = {
          ...clonePart[UI.PARTS][subPart],
          [UI.VALUE]: '',
          [UI.OLDVALUE]: '',
          // [UI.BASE]: nodeSubject,
          parent: {
            ...clonePart[UI.PARTS][subPart].parent
            // [UI.VALUE]: nodeSubject
          }
        }
      })
    })
  } catch (error) {
    throw Error(error)
  }
}

/**
 *  Form Model with user data pod
 * @param modelUi
 * @param subject
 * @param nodeSubject
 * @param parentUri
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
  const parts = modelUi[UI.PART] ? modelUi[UI.PART] : modelUi[UI.PARTS]
  /**
   * Get fields key into Form Model to loop over each field
   */
  let fieldsKey: string = modelUi[UI.PART] ? UI.PART : UI.PARTS

  const fields: any = Object.keys(modelUi[fieldsKey])

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
    const hasParts = fieldObject[UI.PARTS] || fieldObject[UI.PART]

    let parentValue = ''
    let childs: any = {}
    let updatedField: any = []
    let parentObject: any = null

    /**
     * Get parent default values for parent fields or single fields without
     * parts
     */
    if (property) {
      const newProperty = property.replace(/(^\w+:|^)\/\//, `http://`)
      if (fieldObject['rdf:type'].includes('Classifier')) {
        let result: any

        if (fieldObject[UI.VALUES]) {
          result = existPodUri(podUri) && (await data[podUri][newProperty])
          parentValue = (result && result.value) || ''
        } else {
          result = existPodUri(podUri) && (await data[podUri].type)
          parentValue = (result && result.value) || ''
        }
      } else {
        const field = existPodUri(podUri) && (await data[podUri][newProperty])
        parentValue = (field && field.value) || ''

        if (parentUri && parentProperty) {
          parentObject = {
            [UI.VALUE]: podUri,
            [UI.PARENT_PROPERTY]: parentProperty,
            [UI.BASE]: parentUri
          }
        }
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
        let groupHasExistingParts = false
        if (existPodUri(podUri)) {
          for await (let fieldData of data[podUri][property]) {
            const { value } = fieldData
            groupHasExistingParts = true
            childs = await partsFields(childs, { fieldObject, property, podUri, value })

            // TODO: Remove the dependency on lodash by adding a custom deep clone function
            // @ts-ignore
            childs[UI.CLONE_PARTS] = cloneDeep(childs[UI.PART])
            cleanClonePartData(podUri, childs)
          }
        }

        if (!groupHasExistingParts) {
          const idLink = getSubjectLinkId(podUri)
          childs = await partsFields(childs, { fieldObject, property, podUri, value: idLink })
          // @ts-ignore
          childs[UI.CLONE_PARTS] = cloneDeep(childs[UI.PART])
        }
      }

      if (isGroup) {
        // For groups, we need to maintain the base URI for subject, so we know where to save data for items
        const parentPro =
          parentProperty && parentUri
            ? { [UI.PARENT_PROPERTY]: parentProperty, [UI.BASE]: parentUri, [UI.VALUE]: podUri }
            : { [UI.PARENT_PROPERTY]: property, [UI.BASE]: podUri }

        const formModelTemp = await mapFormModelWithData(
          fieldObject,
          podUri,
          parentProperty,
          parentUri
        )

        newModelUi = {
          ...newModelUi,
          [UI.PARTS]: {
            ...newModelUi[UI.PARTS],
            [fieldValue]: {
              ...formModelTemp,
              ...parentPro,
              [UI.REFERENCE]: fieldValue
            }
          }
        }
      }
    }

    // objectValue stores the properties associated with form fields, and not multiples or groups
    // for example, value and valid are things needed when there is data
    const objectValue =
      parentValue && !isMultiple
        ? {
            [UI.VALUE]: parentValue,
            [UI.OLDVALUE]: parentValue,
            [UI.NAME]: uuid(),
            [UI.BASE]: podUri,
            [UI.VALID]: true
          }
        : { [UI.NAME]: uuid(), [UI.BASE]: podUri, [UI.VALID]: true, [UI.VALUE]: parentValue }

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

    if (parentObject) {
      updatedField = {
        ...updatedField,
        [fieldValue]: {
          ...updatedField[fieldValue],
          parent: parentObject
        }
      }
    }

    const partsKey = modelUi[UI.PART] ? UI.PART : UI.PARTS

    newModelUi = {
      ...newModelUi,
      [partsKey]: {
        ...newModelUi[partsKey],
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
  return mapFormModelWithData(modelUi, documentPod)
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
