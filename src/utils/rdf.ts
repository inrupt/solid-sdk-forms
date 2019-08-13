import { IRI_XsdString } from '../constants'
/**
 * convert JSON-LD term to an RDFJS term
 *
 */
export function jsonLdtoRdf(
  ld: any,
  namedNode: (value: string) => any,
  literal: (value: string, value2: string) => any,
  blankNode: (value: string) => any
) {
  if (typeof ld === 'object' && 'value' in ld) {
    let dtOrLang =
      ld.language || (ld.datatype && ld.datatype !== IRI_XsdString)
        ? ld.language
        : namedNode(ld.datatype)

    return literal(ld.value, dtOrLang)
  } else if (ld.startsWith('_:')) {
    return blankNode(ld.substr(2))
  } else {
    return namedNode(ld)
  }
}
