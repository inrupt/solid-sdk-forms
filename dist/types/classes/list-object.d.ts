export declare class ListObject {
    private s;
    private p;
    private graph;
    private termFactory;
    NS_Rdf: string;
    constructor(s: string, p: string, graph: any, termFactory: any);
    /**
     * Add object into Quad using n3
     * For more information please go to: https://github.com/rdfjs/N3.js/blob/master/README.md
     * @param elt
     * @param label
     */
    add(elt: any, label?: string | undefined): any;
    end(): void;
}
