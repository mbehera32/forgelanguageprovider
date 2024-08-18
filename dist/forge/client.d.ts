export declare function translateText(text: string, language: string, forgeKey: string): Promise<{
    translation: string;
    language: string;
}>;
export declare function createForgeClient(forgeKey: string): {
    forge: {
        translations: {
            query: (prompt: string, opts?: {
                token?: string | undefined;
                cache?: "Bust" | "Evade" | undefined;
                model?: string | undefined;
            } | undefined) => Promise<{
                translation: string;
                language: string;
            }>;
        };
    };
    translateText: (text: string, language: string) => Promise<{
        translation: string;
        language: string;
    }>;
};
