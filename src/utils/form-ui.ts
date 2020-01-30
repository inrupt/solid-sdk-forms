import data from '@solid/query-ldflex'
import auth from 'solid-auth-client'
import uuid from 'uuid'
import { CONTEXT, RDF, UI } from '@constants'

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
    [UI.CLONE_PARTS]: childs[UI.PART]
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
 *  Form Model with user data pod
 * @param modelUi
 * @param document
 * @param parentProperty
 * @param parentUri
 */
export async function mapFormModelWithData(
  modelUi: any,
  document: string,
  parentProperty?: string,
  parentUri?: string
) {
  // If the document is a nanedNode, clear it from the ldflex cache
  if (document.includes('#') && !parentUri && !parentProperty) {
    await data.clearCache(document.split('#')[0])
  }

  // Get a list of parts for this form model and get the object keys so we can loop over them
  const parts = modelUi[UI.PART] ? modelUi[UI.PART] : modelUi[UI.PARTS]
  let partsKey: string = modelUi[UI.PART] ? UI.PART : UI.PARTS
  const partList: any = Object.keys(modelUi[partsKey])

  /**
   * Loop into each fields and find the property into Form Model to
   * match with pod property data
   */
  for await (const part of partList) {
    let partObject = parts[part]
    let property = partObject[UI.PROPERTY]
    const isMultiple = partObject['rdf:type'].includes('Multiple')
    const isGroup = partObject['rdf:type'].includes('Group')
    const hasParts = partObject[UI.PARTS] || partObject[UI.PART]

    let children: any = {}

    // Get the value of a part when that part has a property
    if (property) {
      const newProperty = property.replace(/(^\w+:|^)\/\//, `http://`)
      const fetchedValue = existPodUri(document) && (await data[document][newProperty])

      // TODO: Replace empty strings with default values if they exist
      partObject = {
        ...partObject,
        [UI.VALUE]: fetchedValue ? fetchedValue.value : '',
        [UI.OLDVALUE]: fetchedValue ? fetchedValue.value : '',
        [UI.NAME]: uuid(),
        [UI.BASE]: document,
        [UI.VALID]: true
      }
      modelUi[partsKey][part] = partObject
    }

    if (hasParts) {
      if (isMultiple) {
        // Add unique id for parts fields when podUri is empty or not exist.
        let existField = false
        if (existPodUri(document)) {
          for await (let fieldData of data[document][property]) {
            const { value } = fieldData
            console.log('multiple value', value)
            existField = true
            //  children = await partsFields(children, { fieldObject: partObject, property, podUri: document, value })
            const uniqueName = uuid()
            children = {
              ...children[partsKey],
              [uniqueName]: {
                [UI.CLONE_PARTS]: children[UI.PART],
                [UI.NAME]: uniqueName,
                [UI.VALUE]: value,
                [UI.BASE]: parentUri
              }
            }
            partObject = {
              ...partObject,
              ...children
            }
            await mapFormModelWithData(partObject, document, value, property)
          }
        }

        if (!existField) {
          const idLink = getSubjectLinkId(document)
          // children = await partsFields(children, { fieldObject: partObject, property, podUri: document, value: idLink })
          const uniqueName = uuid()
          children = {
            ...children[partsKey],
            [uniqueName]: {
              [UI.NAME]: uniqueName,
              [UI.VALUE]: idLink
            },
            [UI.CLONE_PARTS]: children[UI.PART]
          }
          partObject = {
            ...partObject,
            ...children
          }
          await mapFormModelWithData(partObject, document, idLink, property)
        }
      }

      if (isGroup) {
        modelUi[UI.REFERENCE] = part
        await mapFormModelWithData(partObject, document)
      }
    }
  }
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
  await mapFormModelWithData(modelUi, documentPod)
  // await mapData(modelUi, documentPod)

  console.log('returning model with data: ', modelUi)
  return modelUi
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
