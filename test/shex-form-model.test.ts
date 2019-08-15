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

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  // (ShexFormModel as jest.Mock<ShexFormModel>).mockClear();
})

describe('ShexFormModel', () => {
  /* it("should call convert function", () => {
    const instance = new ShexFormModel(schema)
    instance.convert()

    expect(instance.convert).toHaveBeenCalled();
  }); */

  it('should return node name', () => {
    const instance = new ShexFormModel(schema)

    expect(instance.localName(iri)).toEqual(`<${iri}>`)
  })

  it('should return shape object', () => {
    const instance = new ShexFormModel(schema)
    const shape = instance.findShapeExpression(shapeId)

    expect(shape).toEqual({ id: 'https://example.org/example.shex#ExampleShape', type: 'Shape' })
  })
})
