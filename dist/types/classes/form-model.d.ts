export declare class FormModel {
    url: string;
    constructor(url: string);
    /**
     * @param {String} url the schema document url
     * @return {String} document extension
    */
    schemaType: (url: String) => string;
    /**
     *
     * @param {String} schemaText the document content
     * @param {String} document url
     */
    parseShexC: (schemaText: String, url: String) => any;
    parseTurtle: (schemaText: string, url: string) => any;
    parseSchema: (url: string) => Promise<any>;
    parseShexJ: (schemaText: string, url: string) => any;
    parseSchemaToUi: () => Promise<any>;
    relativeize: (object: any, base: any) => any;
}
