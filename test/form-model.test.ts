import { FormModel } from '../src/classes/form-model'

const url = 'https://shexshapes.inrupt.net/public/contact.shex'

describe('FormModel', () => {
  it('should return file ext from url path', () => {
    const instance = new FormModel(url, 'Unused Param!')
    const fileExt = instance.schemaType(url)

    expect(fileExt).toEqual('shex')
  })
})
