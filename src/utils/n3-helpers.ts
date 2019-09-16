import { fetchSchema } from './solid-fetch'
import * as N3 from 'n3'

export async function getClassifierOptions(from: string, type: string) {
  const document = from ? await fetchSchema(from) : null
  let options: any = []

  if (document) {
    const optionsPromise = new Promise((resolve, reject) => {
      let options: string[] = []
      new N3.Parser().parse(document, (error, triple) => {
        if (triple) {
          const currentType = triple.object.id.includes('#') ? triple.object.id.split('#')[1] : null
          if (currentType === type) {
            const value = triple.subject.id.split('#')[1]
            options = [...options, value]
          }
        } else {
          resolve(options)
        }
      })
    })
    options = await optionsPromise
    return options.length === 0 ? ['No Options'] : options
  }

  return (options = ['No Options'])
}
