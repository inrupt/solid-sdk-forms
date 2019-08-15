import { FormModel } from '../src/classes/form-model'

const url = 'https://shexshapes.inrupt.net/public/contact.shex'

describe('FormModel', () => {
  it('should return file ext from url path', () => {
    const instance = new FormModel(url)
    const fileExt = instance.schemaType(url)

    expect(fileExt).toEqual('shex')
  })

  /* it('should return file ext from url path', () => {
        const instance = new FormModel(url)
        const fileExt = instance.parseShexC(url)
    
        expect(fileExt).toEqual('shex');
      }); */
})
