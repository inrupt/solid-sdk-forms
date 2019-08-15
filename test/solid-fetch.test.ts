import { fetchSchema, existDocument, getBasicPod } from '../src/utils/solid-fetch'

const file = 'https://example.org'
const webId = 'https://example.org/#me'

describe('SolidFetch', () => {
  it('should return string value', async () => {
    const instance = await fetchSchema(file)

    expect(instance).toEqual('string')
  })

  it('should contain status', async () => {
    const instance = await existDocument(file)

    expect(instance).toEqual(expect.objectContaining({ status: 200 }))
  })

  it('should contain webId and image', async () => {
    const instance = await getBasicPod(webId)
    const image = null

    expect(instance).toEqual(expect.objectContaining({ webId, image }))
  })
})
