import { z } from 'zod';
declare const TranslatedTextSchema: z.ZodObject<{
    translation: z.ZodString;
    language: z.ZodString;
}, "strip", z.ZodTypeAny, {
    translation: string;
    language: string;
}, {
    translation: string;
    language: string;
}>;
export default TranslatedTextSchema;
export declare const config: {
    path: string;
    public: boolean;
    cache: string;
    contentType: string;
    model: string;
    provider: string;
};
