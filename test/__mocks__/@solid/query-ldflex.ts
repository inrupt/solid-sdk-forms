const { context } = jest.requireActual('@solid/query-ldflex').default
const { VCARD } = require('@solid/lit-vocab-common')

const ldflex: any = {
  context,
  resolve: jest.fn(),
  clearCache: jest.fn(),
  delete: jest.fn(() => true),
  add: jest.fn(() => true),
  properties: [],
  subjects: []
}
ldflex[VCARD.fn] = ldflex
ldflex['https://example.org/#me'] = ldflex[VCARD.fn]

export default ldflex
