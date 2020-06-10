// jest.mock('../src/classes/shex-form-model')
import { ShexFormModel } from '../src/classes/shex-form-model'

const schema = {
  type: 'Schema',
  start: 'ExampleShape',
  _prefixes: { acl: 'http://www.w3.org/ns/auth/acl#' },
  shapes: [{ id: 'https://example.org/example.shex#ExampleShape', type: 'Shape' }]
}

const shapeId = 'https://example.org/example.shex#ExampleShape'
const iri = 'https://shexshapes.inrupt.net/public/userprofile.shex#UserProfile'

describe('ShexFormModel', () => {
  it('should return node name', () => {
    const instance = new ShexFormModel(schema, 'Unused Param!')

    expect(instance.localName(iri)).toEqual(`<${iri}>`)
  })

  it('should return shape object', () => {
    const instance = new ShexFormModel(schema, 'Unused Param!')
    const shape = instance.findShapeExpression(shapeId)

    expect(shape).toEqual({ id: 'https://example.org/example.shex#ExampleShape', type: 'Shape' })
  })
})
