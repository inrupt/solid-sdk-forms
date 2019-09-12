export const NS_RDF: string = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#"'
export const NS_DC: string = 'http://purl.org/dc/elements/1.1/'
export const NS_UI: string = 'http://www.w3.org/ns/ui#'
export const NS_LAYOUT: string = 'http://janeirodigital.com/layout#'
export const IRI_Xsd: string = 'http://www.w3.org/2001/XMLSchema#'
export const IRI_XsdString: string = `${IRI_Xsd}string`
export const SHEX_SCHEMA: string = 'http://www.w3.org/ns/shex#Schema'
export const TRIPLE_CONSTRAINT: string = 'TripleConstraint'
export const NODE_CONSTRAINT: string = 'NodeConstraint'
export const EACH_OF: string = 'EachOf'
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
export const UI = {
  PARTS: 'ui:parts',
  PROPERTY: 'ui:property',
  PARENT_PROPERTY: 'ui:parentProperty',
  BASE: 'ui:base',
  OLDVALUE: 'ui:oldValue',
  VALUE: 'ui:value',
  NAME: 'ui:name'
}
