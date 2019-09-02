import data from '@solid/query-ldflex'
import auth from 'solid-auth-client'
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

async function getPropertyValue(field: string, property: string) {
  let propertyProxy: any = await data[field][property]

  return propertyProxy && propertyProxy.value
}

/**
 * Convert turtle to Json-ld object
 * @param document
 * @param partsPath
 */
async function turtleToFormUi(document: any, userData: string, parentValue?: any) {
  let fields: any = {}
  const doc = await document
  const partsPath = 'http://www.w3.org/ns/ui#parts'
  const parts: any = await loopList(doc[partsPath])

  for await (const field of parts) {
    const subjectKey: string = getPredicateName(field)
    const subjectPrefix = `subject:${subjectKey}`
    let fieldValue = {}

    for await (const property of data[field].properties) {
      let partsFields: any = {}
      let propertyValue: string = await getPropertyValue(field, property)

      /**
       * If property exist into the subject we added it into the json-ld object
       */
      if (property.includes('parts') && propertyValue) {
        let layoutKey = await getPropertyValue(field, 'http://www.w3.org/ns/ui#property')
        let userFieldValue = null

        if (layoutKey && userData) {
          userFieldValue = await data[userData][layoutKey]
        }

        partsFields = await turtleToFormUi(
          data[field],
          (userFieldValue && userFieldValue.value) || userData
        )
      }

      if (property.includes('property') && propertyValue) {
        if (userData || parentValue) {
          const value = await data[userData || parentValue][propertyValue]
          if (value && value.value) {
            const { value: currenValue } = value
            fieldValue = { value: currenValue, oldValue: currenValue }
          } else {
            fieldValue = { value: '', oldValue: '' }
          }
        }
      }

      const propertyKey: string = getPredicateName(property)

      let newField = {
        [subjectPrefix]: {
          ...fields[subjectPrefix],
          [propertyKey]: Object.keys(partsFields).length === 0 ? propertyValue : partsFields,
          ...fieldValue
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

/**
 * Convert turtle to formModel(JSON-LD)
 * @param documentUri
 * @param partsPath
 */
export async function convertFormModel(documentUri: any, documentPod: any) {
  const existDocumentPod = await existDocument(documentPod)
  let userData = null

  /* if (existDocumentPod) {
    userData = await data[documentPod]
  } */

  const model = await turtleToFormUi(data[documentUri], documentPod)

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
