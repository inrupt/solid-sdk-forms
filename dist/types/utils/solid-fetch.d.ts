interface FetchRequest {
    status: number;
    ok: boolean;
    body: ReadableStream<Uint8Array> | null;
}
export declare const fetchSchema: (file: RequestInfo) => Promise<any>;
export declare const existDocument: (documentUri: RequestInfo) => Promise<FetchRequest>;
export declare const createDocument: (documentUri: RequestInfo, body?: string) => Promise<FetchRequest>;
export declare const fetchLdflexDocument: (documentUri: RequestInfo) => Promise<any>;
export declare const getBasicPod: (webId: string) => Promise<{
    name: any;
    image: any;
    webId: string;
} | {
    name?: undefined;
    image?: undefined;
    webId?: undefined;
}>;
export {};
