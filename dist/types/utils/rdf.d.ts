/**
 * convert JSON-LD term to an RDFJS term
 *
 */
export declare function jsonLdtoRdf(ld: any, namedNode: (value: string) => any, literal: (value: string, value2: string) => any, blankNode: (value: string) => any): any;
