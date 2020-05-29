interface FetchRequest {
    status: number;
    ok: boolean;
    body: ReadableStream<Uint8Array> | null;
}
/**
 * Fetch Schema document from pod
 * @param file
 */
export declare const fetchSchema: (file: RequestInfo) => Promise<any>;
/**
 * Check if resource exist into pod
 * @param documentUri
 */
export declare const existDocument: (documentUri: RequestInfo) => Promise<FetchRequest>;
/**
 * Create document on pod
 * @param documentUri
 * @param body
 */
export declare const createDocument: (documentUri: RequestInfo, body?: string) => Promise<FetchRequest>;
/**
 * Fetch document from pod if exist using ldflex
 * @param documentUri
 */
export declare const fetchLdflexDocument: (documentUri: RequestInfo) => Promise<any>;
/**
 * Get basic user pod info like name and photo
 * @param webId
 */
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
