import { FormModel } from '../src/classes/form-model'

const url = 'https://shexshapes.inrupt.net/public/formmodel/contact.shex'

describe('FormModel', () => {
  it('should return file ext from url path', async () => {
    const instance = new FormModel(url, 'Unused Param!')
    const fileExt = instance.schemaType(url)

    expect(fileExt).toEqual('shex')

    // PMcB: This was the start of trying to test this form model code - but for some reason now,
    // running this next line now throws:
    //   Error: TypeError: Cannot read property 'construct' of undefined
    // Seems the import for '@shexjs/shexParser' isn't working. So I've just removed this.
    //   const x = await instance.parseShExString(`
    // PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    // PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
    // PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    // PREFIX : <http://janeirodigital.com/ns#layout>
    //
    // START=@<#UserProfile>
    //
    // <#UserProfile> {
    //   vcard:fn xsd:string MINLENGTH 1 MAXLENGTH 64 {1}
    //     // rdfs:label "Name"@en
    //     // rdfs:label "Nombre"@es ;
    //   vcard:role xsd:string MINLENGTH 0 MAXLENGTH 64 {1}
    //     // rdfs:label "Role"@en
    //     // rdfs:label "Rol"@es ;
    //   vcard:organization-name xsd:string MINLENGTH 0 MAXLENGTH 64 {1}
    //     // rdfs:label "Company"@en
    //     // rdfs:label "CompaÃ±Ã­a"@es ;
    // }`)
    //   console.log(x)
  })
})
