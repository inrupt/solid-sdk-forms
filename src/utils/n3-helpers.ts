import { fetchSchema } from './solid-fetch'
import data from '@solid/query-ldflex'
import * as N3 from 'n3'

function changeHostProtocol(from: string) {
  if (from.includes('http')) {
    const protocol = window.location.href.split(':')[0]
    return from.replace(/(^\w+:|^)\/\//, `${protocol}://`)
  }

  return from
}

function getLabel(label: any) {
  const cleanLabel = label.includes('@') ? label.split('@')[0] : label
  return cleanLabel.replace(/[^\w\s]/gi, '')
}

export async function getClassifierOptions(from: string) {
  const updatedFrom = changeHostProtocol(from)
  const type = from.includes('#') ? from.split('#')[1] : 'Type'
  const document = updatedFrom ? await fetchSchema(updatedFrom) : null
  let options: any = []

  if (document) {
    const optionsPromise = new Promise(async (resolve, reject) => {
      let quads: any = {}
      new N3.Parser().parse(document, (error, triple) => {
        if (triple) {
          quads = {
            ...quads,
            [triple.subject.id]: {
              ...quads[triple.subject.id],
              [triple.predicate.id]: triple.object.id
            }
          }
        } else {
          resolve(quads)
        }
      })
    })
    const quads: any = await optionsPromise

    for (let quad in quads) {
      const deprecated = quads[quad]['http://www.w3.org/2002/07/owl#deprecated']
      const label = quads[quad]['http://www.w3.org/2000/01/rdf-schema#label']
      const currentPredicateType = quads[quad]['http://www.w3.org/2000/01/rdf-schema#subClassOf']
      const currentType =
        currentPredicateType && currentPredicateType.includes('#')
          ? currentPredicateType.split('#')[1]
          : currentPredicateType

      if (
        (!deprecated || deprecated.includes('false')) &&
        quad &&
        (currentType && currentType === type)
      ) {
        options = [...options, quad]
      }
    }
    return options.length === 0 ? ['No Options'] : options
  }

  return (options = ['No Options'])
}
