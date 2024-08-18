import Forge from "./forge.lock/index";

export async function translateText(
  text: string,
  language: string,
  forgeKey: string
) {
  const forge = Forge({ forgeKey });
  const translation = await forge.translations.query(
    "please translate this text: " + text + " to this language: " + language
  );
  return translation;
}

export function createForgeClient(forgeKey: string) {
  const forge = Forge({ forgeKey });
  return {
    forge,
    translateText: (text: string, language: string) =>
      translateText(text, language, forgeKey),
  };
}
