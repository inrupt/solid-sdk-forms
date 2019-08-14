import { FormModel } from '../src/classes/form-model'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new FormModel('url path')).toBeInstanceOf(FormModel)
  })
})
