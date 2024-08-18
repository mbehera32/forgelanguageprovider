/** THIS IS A GENERATED FILE, EDITS WILL BE OVERWRITTEN */
type ClientOptions = {
    forgeKey: string;
};
type RequestOptions = {
    token?: string;
    cache?: "Bust" | "Evade";
    model?: string;
};
type GeneratedOptions = {
    username: string;
    path: string;
    contentType?: "text";
} | {
    username: string;
    path: string;
    contentType: "image";
};
type ImageQuery = {
    imageUrl: string;
    prompt: string;
};
type QueryType = string | ImageQuery;
export declare const createRequest: <T>(params: GeneratedOptions) => (query: QueryType, opts: RequestOptions) => Promise<T>;
declare const Forge: (options: ClientOptions) => {
    translations: {
        query: (prompt: string, opts?: RequestOptions) => Promise<{
            translation: string;
            language: string;
        }>;
    };
};
export default Forge;
