const { default: data } = require('@solid/query-ldflex')
import { UI } from '@solid/lit-vocab-common'
import { convertFormModel } from '../src/utils/form-ui'

const url = 'https://jmartin.inrupt.net/public/formmodel/float.ttl#formRoot'
/**
 @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
 @prefix ui: <http://www.w3.org/ns/ui#>.
 @prefix : <#>.

 <http://www.w3.org/2006/vcard/ns#Individual> ui:creationForm <#form1> .

 <#formRoot> <http://purl.org/dc/elements/1.1/title> "Float Field Example" ;
  a ui:Form ;
  ui:parts ( <#formHeading> <#formComment> <#raceDistance> ) .

 <#formHeading> a ui:Heading ;
  ui:contents "DateTime Field"@en .

 <#formComment> a ui:Comment;
  ui:contents "Race distance (0km - 100km)"@en .

 <#raceDistance> a ui:FloatField ;
   ui:label "Distance: " ;
   ui:maxValue 100;
   ui:pattern "[+-]?([0-9]*[.])?[0-9]+";
   ui:property <http://open.vocab.org/terms#kilometers>.
 */

describe('Using LDflex', () => {
  // This test needs the real LDflex - so skip this test until we can turn off mocks. Also, ideally
  // we wouldn't need to make a real HTTP call - better would be if LDflex could read from a local
  // Turtle file (maybe it can already!?).
  // it.skip('should display title', async () => {
  it('should display title', async () => {
    const formTest1 = data['https://jmartin.inrupt.net/public/formmodel/float.ttl#formRoot']
    const title1 = await formTest1['http://purl.org/dc/elements/1.1/title']
    console.log(`Title1: [${title1}]`)
    expect(title1.toString()).toEqual('Float Field Example')

    const formTest2 =
      data['https://ldp.demo-ess.inrupt.com/p1/public/test-setting-boolean.ttl#testRoot']
    const title2 = await formTest2['http://purl.org/dc/elements/1.1/title']
    console.log(`Title2: [${title2}]`)
    expect(title2.toString()).toEqual('Hello world!')

    // const boolTest = data[url];
    const readFlag = await formTest2['https://www.w3.org/ns/solid/terms#read']
    console.log(`Flag: [${readFlag}]`)

    expect(readFlag).toEqual(true)
  })
})

describe('Setting a boolean in a public Pod resource', () => {
  // This test needs the real LDflex - so skip this test until we can turn off mocks. Also, ideally
  // we wouldn't need to make a real HTTP call - better would be if LDflex could read from a local
  // Turtle file (maybe it can already!?).
  it('should display title', async () => {
    // it.skip('should display title', async () => {
    const f =
      data['https://ldp.demo-ess.inrupt.com/p1/public/test-setting-boolean.ttl#testRoot'][
        'https://www.w3.org/ns/solid/terms#read'
      ]
    const resource = await data[
      'https://ldp.demo-ess.inrupt.com/p1/public/test-setting-boolean.ttl#testRoot'
    ]
    const readFlag = await resource['https://www.w3.org/ns/solid/terms#read']
    const title = await resource['https://www.w3.org/ns/solid/terms#read'].set(false)
    console.log(`\nTitle: ${title}`)
  })
})

describe('Converting form model', () => {
  // This test needs the real LDflex - so skip this test until we can turn off mocks. Also, ideally
  // we wouldn't need to make a real HTTP call - better would be if LDflex could read from a local
  // Turtle file (maybe it can already!?).
  // it('should convert form to object', async () => {
  it.skip('should convert form to object', async () => {
    const obj = await convertFormModel(url, 'https://pmcb55.inrupt.net/profile/card#me', 'en')

    // This 'subject:XXXX' approach to naming object keys is interesting (and due I think to the
    // need to allow us determine predicates relative to a Base Subject value that can change, so
    // that Base Subject is stored in a separate field within the @context part!).
    const subject = obj['@context']['subject']
    expect(subject).toEqual(`${url.split('#')[0]}#`)
    expect(obj[UI.parts]['subject:raceDistance'][UI.label]).toEqual('Distance: ')
  })
})
