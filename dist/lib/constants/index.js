"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NS_RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
exports.NS_DC = 'http://purl.org/dc/elements/1.1/';
exports.NS_UI = 'http://www.w3.org/ns/ui#';
exports.NS_LAYOUT = 'http://janeirodigital.com/layout#';
exports.IRI_Xsd = 'http://www.w3.org/2001/XMLSchema#';
exports.IRI_XsdString = exports.IRI_Xsd + "string";
exports.SHEX_SCHEMA = 'http://www.w3.org/ns/shex#Schema';
exports.TRIPLE_CONSTRAINT = 'TripleConstraint';
exports.NODE_CONSTRAINT = 'NodeConstraint';
exports.EACH_OF = 'EachOf';
exports.CONTEXT = {
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
};
exports.RDF = {
    TYPE: 'rdf:type'
};
exports.UI = {
    GROUP: 'ui:group',
    PARTS: 'ui:parts',
    PART: 'ui:part',
    CLONE_PARTS: 'ui:partsClone',
    LABEL: 'ui:label',
    PROPERTY: 'ui:property',
    PARENT_PROPERTY: 'ui:parentProperty',
    BASE: 'ui:base',
    OLDVALUE: 'ui:oldValue',
    VALUE: 'ui:value',
    VALUES: 'ui:values',
    REFERENCE: 'ui:reference',
    NAME: 'ui:name',
    VALID: 'ui:valid',
    REQUIRED_ERROR: 'ui:requiredError',
    VALIDATION_ERROR: 'ui:validationError',
    REQUIRED: 'ui:required',
    PATTERN: 'ui:pattern',
    MIN_LENGTH: 'ui:minLength',
    MAX_LENGTH: 'ui:maxLength',
    MIN_VALUE: 'ui:minValue',
    MAX_VALUE: 'ui:maxValue',
    MIN_DATE_OFFSET: 'ui:mindateOffset',
    MAX_DATE_OFFSET: 'ui:maxdateOffset',
    MAX_DATE_TIME_OFFSET: 'ui:maxdatetimeOffset',
    MIN_DATE_TIME_OFFSET: 'ui:mindatetimeOffset',
    DEFAULT_ERROR: 'ui:defaultError'
};
exports.CONSTRAINTS = {
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
};
var nsBase = 'http://www.w3.org/ns/ui#';
exports.NS = {
    UI: {
        TimeField: nsBase + "TimeField",
        MultipleField: nsBase + "Multiple",
        GroupField: nsBase + "Group",
        Label: nsBase + "label",
        Contents: nsBase + "contents"
    }
};
//# sourceMappingURL=index.js.map