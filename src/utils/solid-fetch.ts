import auth from 'solid-auth-client'
import data from '@solid/query-ldflex'

interface FetchRequest {
  status: number
  ok: boolean
  body: ReadableStream<Uint8Array> | null
}

export const fetchSchema = async (file: RequestInfo) => {
  try {
    const schemaDocument = await auth.fetch(file, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })

    if (schemaDocument.status !== 200) {
      throw schemaDocument
    }

    const documentText = await schemaDocument.text()

    return documentText.toString()
  } catch (error) {
    return error
  }
}

export const existDocument = async (documentUri: RequestInfo): Promise<FetchRequest> => {
  return auth.fetch(documentUri, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const createDocument = async (
  documentUri: RequestInfo,
  body: string = ''
): Promise<FetchRequest> => {
  const result = await existDocument(documentUri)

  if (result.status === 404) {
    return auth.fetch(documentUri, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/sparql-update'
      },
      body
    })
  }

  return result
}

export const fetchLdflexDocument = async (documentUri: RequestInfo) => {
  try {
    if (documentUri && documentUri !== '') {
      const result = await createDocument(documentUri)

      if (result.status !== 200) {
        throw result
      }

      const document = await data[documentUri.toString()]

      return document
    }
  } catch (error) {
    return error
  }
}

export const getBasicPod = async (webId: string) => {
  try {
    if (webId) {
      const nameData = await data[webId]['vcard:fn']
      const imageData = await data[webId]['vcard:hasPhoto']
      const name = nameData ? nameData.value : webId
      const image = imageData ? imageData.value : null
      return { name, image, webId }
    }
    return {}
  } catch (e) {
    throw e
  }
}
