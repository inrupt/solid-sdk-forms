import data from '@solid/query-ldflex'
import { CONTEXT } from '../constants'

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

/**
 * Convert turtle to Json-ld object
 * @param document
 * @param partsPath
 */
async function turtleToFormUi(document: any, partsPath: any) {
  let fields: any = {}
  const doc = await document
  const parts: any = await loopList(doc[partsPath])

  for await (const field of parts) {
    const subjectKey: string = getPredicateName(field)
    const subjectPrefix = `subject:${subjectKey}`

    for await (const property of data[field].properties) {
      let propertyProxy: any = await data[field][property]
      let partsFields: any = {}
      let propertyValue: string = propertyProxy && propertyProxy.value

      if (property.includes('parts')) {
        partsFields = await turtleToFormUi(data[field], property)
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

/**
 * Convert turtle to formModel(JSON-LD)
 * @param documentUri
 * @param partsPath
 */
export async function convertFormModel(
  documentUri: any,
  partsPath: any = 'http://www.w3.org/ns/ui#parts'
) {
  const model = await turtleToFormUi(data[documentUri], partsPath)

  return {
    '@context': {
      ...CONTEXT['@context'],
      subject: subjectPrefix(documentUri)
    },
    'ui:parts': { ...model }
  }
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
