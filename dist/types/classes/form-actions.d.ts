/**
 * FormAction class to managament Form Model forms on solid
 */
export declare class FormActions {
    private formModel;
    private formObject;
    constructor(formModel: any, formObject: any);
    /**
     * Create random subject link for a node
     */
    static getSubjectLinkId: (currentLink: string) => string | undefined;
    /**
     * Clean field node into Form Model object
     */
    static cleanFieldNode: (field: any) => any;
    /**
     * Retrieve new Form Object
     */
    retrieveNewFormObject: (item: string, value: string) => void;
    validator: (field: any) => any;
    /**
     * Save data into the pod
     */
    saveData: (customFormObject?: any) => Promise<any>;
    /**
     * Delete field from pod
     */
    static deleteFieldPod: (field: any) => Promise<void>;
    /**
     * Reset FormObject
     */
    resetFormObject: () => void;
    /**
     * Delete field from the form model object
     * This function recursively traverses the entire form model object to find the field to delete
     */
    deleteField: (field: string) => Promise<any>;
    /**
     * Add new field into Form Model
     */
    addNewField: (nodeName: string) => any;
}
