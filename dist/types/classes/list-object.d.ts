export declare class ListObject {
    s: string;
    p: string;
    graph: any;
    termFactory: any;
    NS_Rdf: string;
    constructor(s: string, p: string, graph: any, termFactory: any);
    add(elt: any, label?: string | undefined): any;
    end(): void;
}
