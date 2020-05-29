import { Meta } from '@interfaces';
/**
 * Convert ShEx to Form Model
 * We are using n3 library for more info please go to: https://github.com/rdfjs/N3.js/blob/master/README.md
 */
export declare class ShexFormModel {
    private schema;
    private documentUri;
    termFactory: any;
    meta: Meta;
    graph: any;
    iriRdftype: string;
    iriDctitle: string;
    iriUitype: string;
    constructor(schema: any, documentUri: string);
    getSubjectNode(term: string): import("rdf-js").NamedNode;
    /**
     * Add the right constraint depending on the expression DataType or Explicit constraint.
     * We are using the CONSTANTS to get the right constraint.
     * @param fieldTerm to pass the right ID to the node.
     * @param exp Expression to get the Explicit Constraint.
     * @returns This Function does not have any returns it adds the UI Constraint or not.
     */
    getNumberConstraint(exp: any, fieldTerm: any): void;
    getFieldType(exp?: any): "Classifier" | "SingleLineTextField" | "DateField" | "DateTimeField" | "TimeField" | "BooleanField" | "IntegerField" | "DecimalField" | "FloatField" | "MultiLineTextField";
    /**
     * Convert SheEx to Form Model
     */
    convert(): undefined;
    /**
     * Find label expression into ShEx
     * @param shexpr
     */
    findTitle(shexpr: any): any;
    /**
     * Define shape type into Form Model
     * @param iri
     */
    localName(iri: string): string;
    /**
     *
     * @param shapeExpr
     */
    derefShapeExpression(shapeExpr: any): any;
    /**
     * Find shape expression with given name in schema.
     * returns: corresponding shape expression or undefined
     * @param {string} goal expression to find
     */
    findShapeExpression(goal: string): any;
    /**
     * Checks if the expression is a Classifier (a dropdown)
     * @param expression
     */
    findShapeExpressionOptions(expression: any): {
        type: string;
        values: any;
    } | null;
    /**
     * Traverse the shape and create the object with turtle format
     * @param shape
     * @param formTerm
     * @param path
     * @param isGroup
     */
    walkShape(shape: any, formTerm: any, path: string, isGroup?: boolean): void;
    /**
     * Convert jsonLd object to RDF object
     * @param ld
     */
    jsonLdtoRdf(ld: any): any;
}
