import { fetchSchema } from './solid-fetch'
import * as N3 from 'n3'

function changeHostProtocol(from: string) {
  if (from.includes('http')) {
    const protocol = window.location.href.split(':')[0]
    return from.replace(/(^\w+:|^)\/\//, `${protocol}://`)
  }

  return from
}

export async function getClassifierOptions(from: string) {
  const updatedFrom = changeHostProtocol(from)
  const document = updatedFrom ? await fetchSchema(updatedFrom) : null
  let options: any = []

  if (document) {
    const optionsPromise = new Promise((resolve, reject) => {
      let options: string[] = []
      new N3.Parser().parse(document, (error, triple) => {
        if (triple) {
          const currentType = triple.object.id.includes('#') ? triple.object.id.split('#')[1] : null
          if (currentType === 'Type') {
            const value = triple.subject.id
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
