import z from "zod";
declare const PersonSchema: z.ZodObject<{
    name: z.ZodObject<{
        full: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        full: string;
        firstName: string;
        lastName: string;
    }, {
        full: string;
        firstName: string;
        lastName: string;
    }>;
    birthDate: z.ZodDate;
    deathDate: z.ZodOptional<z.ZodDate>;
    nationality: z.ZodOptional<z.ZodString>;
    occupation: z.ZodArray<z.ZodString, "many">;
    category: z.ZodEnum<["historical", "celebrity", "politician", "scientist", "artist", "other"]>;
    knownFor: z.ZodArray<z.ZodString, "many">;
    briefBio: z.ZodString;
    imageUrl: z.ZodString;
    sources: z.ZodArray<z.ZodString, "many">;
    lastUpdated: z.ZodDefault<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    name: {
        full: string;
        firstName: string;
        lastName: string;
    };
    birthDate: Date;
    occupation: string[];
    category: "historical" | "celebrity" | "politician" | "scientist" | "artist" | "other";
    knownFor: string[];
    briefBio: string;
    imageUrl: string;
    sources: string[];
    lastUpdated: Date;
    deathDate?: Date | undefined;
    nationality?: string | undefined;
}, {
    name: {
        full: string;
        firstName: string;
        lastName: string;
    };
    birthDate: Date;
    occupation: string[];
    category: "historical" | "celebrity" | "politician" | "scientist" | "artist" | "other";
    knownFor: string[];
    briefBio: string;
    imageUrl: string;
    sources: string[];
    deathDate?: Date | undefined;
    nationality?: string | undefined;
    lastUpdated?: Date | undefined;
}>;
export default PersonSchema;
type EndpointConfig = {
    /** path to the endpoint. one word, no special characters */
    path: string;
    /**
     * determines if the endpoint is available for public access
     * users must use their own OpenAI API key
     */
    public: boolean;
    /** name of the endpoint */
    name?: string;
    /** description of the endpoint */
    description?: string;
    /**
     * the cache config - "None", "Common", "Individual"
     */
    cache?: "None" | "Common" | "Individual";
    /**
     * the content type of the endpoint (defaults to text)
     *
     * "text" | "image"
     */
    contentType?: "text" | "image";
    model: string;
    provider: "openai" | "anthropic";
};
export declare const config: EndpointConfig;
