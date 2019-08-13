interface Meta {
    [key: string]: any;
    prefixes: any;
    base: string;
}
export declare class ShexToUiForm {
    termFactory: any;
    meta: Meta;
    schema: any;
    graph: any;
    iriRdftype: string;
    iriDctitle: string;
    iriUitype: string;
    constructor(schema: any);
    /**
     * Convert SheEx to Form Model
     */
    convert(): undefined;
    findTitle(shexpr: any): any;
    localName(iri: string): string;
    derefShapeExpression(shapeExpr: any): any;
    /**
     * Find shape expression with given name in schema.
     * returns: corresponding shape expression or undefined
     */
    findShapeExpression(goal: string): any;
    walkShape(shape: any, formTerm: any, path: string, namedNode: any, literal: any, blankNode: any): void;
    jsonLdtoRdf(ld: any): any;
}
export {};
