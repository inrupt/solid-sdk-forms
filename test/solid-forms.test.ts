import SolidForms from "../src/solid-forms";

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect(new SolidForms()).toBeInstanceOf(SolidForms)
  })
})
