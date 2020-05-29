/**
 * Updates the formObject with the new values if something has been updated in the podUri's turtle file
 * @param formObject
 * @param podUri
 */
export declare function mapFormObjectWithData(formObject: any, podUri: string): Promise<any>;
/**
 * add the 'property' value to the model properties
 * @param model form model without the data values
 * @param dataSource IRI where to look for the data values
 */
export declare function mapData(model: any, dataSource: string): Promise<any>;
/**
 *  Form Model with user data pod
 * @param modelUi
 * @param subject
 * @param nodeSubject
 * @param parentUri
 */
export declare function mapFormModelWithData(modelUi: any, podUri: string, parentProperty?: string, parentUri?: string): Promise<any>;
/**
 * Convert turtle to formModel(JSON-LD)
 * @param documentUri
 * @param partsPath
 */
export declare function convertFormModel(documentUri: any, documentPod: any, language: string): Promise<any>;
export declare function suffixFromJsonLd(predicate: string, context: any): string;
