export const NS_RDF: string = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
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

export const RDF = {
  TYPE: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
}

export const UI = {
  GROUP: 'http://www.w3.org/ns/ui#group',
  PARTS: 'http://www.w3.org/ns/ui#parts',
  PART: 'http://www.w3.org/ns/ui#part',
  CLONE_PARTS: 'http://www.w3.org/ns/ui#partsClone',
  LABEL: 'http://www.w3.org/ns/ui#label',
  PROPERTY: 'http://www.w3.org/ns/ui#property',
  PARENT_PROPERTY: 'http://www.w3.org/ns/ui#parentProperty',
  BASE: 'http://www.w3.org/ns/ui#base',
  OLDVALUE: 'http://www.w3.org/ns/ui#oldValue',
  VALUE: 'http://www.w3.org/ns/ui#value',
  VALUES: 'http://www.w3.org/ns/ui#values',
  REFERENCE: 'http://www.w3.org/ns/ui#reference',
  NAME: 'http://www.w3.org/ns/ui#name',
  VALID: 'http://www.w3.org/ns/ui#valid',
  REQUIRED_ERROR: 'http://www.w3.org/ns/ui#requiredError',
  VALIDATION_ERROR: 'http://www.w3.org/ns/ui#validationError',
  REQUIRED: 'http://www.w3.org/ns/ui#required',
  PATTERN: 'http://www.w3.org/ns/ui#pattern',
  MIN_LENGTH: 'http://www.w3.org/ns/ui#minLength',
  MAX_LENGTH: 'http://www.w3.org/ns/ui#maxLength',
  MIN_VALUE: 'http://www.w3.org/ns/ui#minValue',
  MAX_VALUE: 'http://www.w3.org/ns/ui#maxValue',
  MIN_DATE_OFFSET: 'http://www.w3.org/ns/ui#mindateOffset',
  MAX_DATE_OFFSET: 'http://www.w3.org/ns/ui#maxdateOffset',
  MAX_DATE_TIME_OFFSET: 'http://www.w3.org/ns/ui#maxdatetimeOffset',
  MIN_DATE_TIME_OFFSET: 'http://www.w3.org/ns/ui#mindatetimeOffset',
  DEFAULT_ERROR: 'http://www.w3.org/ns/ui#defaultError',

  TIME_FIELD: 'http://www.w3.org/ns/ui#TimeField',
  CONTENTS: 'http://www.w3.org/ns/ui#Contents'
}

export const CONSTRAINTS: any = {
  nonPositiveInteger: {
    maxValue: 0
  },
  negativeInteger: {
    maxValue: -1
  },
  short: {
    maxValue: 32767,
    minValue: -32768
  },
  byte: {
    maxValue: 127,
    minValue: -128
  },
  nonNegativeInteger: {
    minValue: 0
  },
  unsignedLong: {
    minValue: 0
  },
  unsignedInt: {
    minValue: 0
  },
  unsignedShort: {
    minValue: 0
  },
  unsignedByte: {
    maxValue: 255,
    minValue: 0
  },
  positiveInteger: {
    minValue: 1
  }
}

// const nsBase = 'http://www.w3.org/ns/ui#'
// export const NS = {
//   UI: {
// TimeField: `${nsBase}TimeField`,
// MultipleField: `${nsBase}Multiple`,
// GroupField: `${nsBase}Group`,
// Label: `${nsBase}label`,
// Contents: `${nsBase}contents`
// }
// }
