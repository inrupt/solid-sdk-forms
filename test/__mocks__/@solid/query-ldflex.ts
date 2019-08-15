const { context } = jest.requireActual('@solid/query-ldflex').default

const ldflex: any = {
  context,
  resolve: jest.fn(),
  clearCache: jest.fn(),
  delete: jest.fn(() => true),
  add: jest.fn(() => true),
  properties: [],
  subjects: []
}
ldflex['vcard:fn'] = ldflex
ldflex['https://example.org/#me'] = ldflex['vcard:fn']
// ldflex['https://example.org/#me'] = { ...ldflex, ...ldflex['vcard:hasPhoto'] };

export default ldflex
