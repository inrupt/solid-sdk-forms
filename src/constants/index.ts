export const NS_RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#"'
export const NS_DC = 'http://purl.org/dc/elements/1.1/'
export const NS_UI = 'http://www.w3.org/ns/ui#'
export const NS_LAYOUT = 'http://janeirodigital.com/layout#'
export const IRI_Xsd = 'http://www.w3.org/2001/XMLSchema#'
export const IRI_XsdString = `${IRI_Xsd}string`
export const SHEX_SCHEMA = 'http://www.w3.org/ns/shex#Schema'
export const CONTEXT: any = {
  '@context': {
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    ui: 'http://www.w3.org/ns/ui#',
    dc: 'http://purl.org/dc/elements/1.1/',
    'ui:singleTextField': {
      '@type': 'ui:SingleLineTextField'
    },
    'ui:Multiple': {
      '@type': 'ui:Multiple'
    },
    'ui:Group': {
      '@type': 'ui:Group'
    },
    'ui:Classifier': {
      '@type': 'ui:Classifier'
    },
    'ui:EmailField': {
      '@type': 'ui:EmailField'
    },
    'ui:Comment': {
      '@type': 'ui:Comment'
    }
  }
}
