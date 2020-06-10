import { convertFormModel } from '../src/utils/form-ui'

import ldflex from '@solid/query-ldflex'

const url = 'https://jmartin.inrupt.net/public/formmodel/float.ttl#formRoot'

describe('Converting form model', () => {
  it('should convert form to object', async () => {
    // ldflex.resolve = () => ({
    //   fdfgfdg: "ssfsdf"
    // });

    ;(ldflex.resolve as jest.Mock).mockImplementation(() => {
      console.log(`test...`)
      return { test: 'asdfasdf' }
    })

    const obj = await convertFormModel(url, 'https://pmcb55.inrupt.net/profile/card#me', 'en')
    expect(obj).toEqual('shex')
  })
})
