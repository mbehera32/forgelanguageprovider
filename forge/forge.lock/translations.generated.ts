import { z } from 'zod'; 

const TranslatedTextSchema = z.object({
  translation: z.string()
    .describe("The translated text in the target language."),
    
  language: z.string()
    .describe("The language that the text is being translated to.")
});

 export default TranslatedTextSchema;

export const config = {"path":"translations","public":true,"cache":"Common","contentType":"text","model":"gpt-4o-mini","provider":"openai"};