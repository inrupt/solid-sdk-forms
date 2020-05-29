export declare class FormModel {
    private url;
    private documentUri;
    constructor(url: string, documentUri: string);
    /**
     * @param {String} url The URL of the shape or schema
     * @return {String} document extension
     */
    schemaType: (url: String) => string;
    /**
     *
     * @param {String} schemaText The Shape Schema
     * @param {String} document The Document Url
     */
    parseShexC: (schemaText: String, url: String) => any;
    /**
     * Convert ShEx to Turtle object
     * We are using n3 library fro more information please go to: https://github.com/rdfjs/N3.js
     */
    parseTurtle: (schemaText: string, url: string) => any;
    /**
     * Parse schema from shEx, turtle or json files
     */
    parseSchema: (url: string) => Promise<any>;
    parseShexJ: (schemaText: string, url: string) => any;
    /**
     * Parse Schema to Schema object
     */
    normalize: (object: any, base: any) => any;
    /**
     * Parse schema to Form Model
     */
    parseShEx: () => Promise<any>;
}
