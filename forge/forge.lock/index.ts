const serverUrl = "https://api.forge-ml.com";

/** THIS IS A GENERATED FILE, EDITS WILL BE OVERWRITTEN */

type ClientOptions = {
  forgeKey: string;
  //   defaultModel: string;
};

type RequestOptions = {
  token?: string;
  cache?: "Bust" | "Evade"; // (@TODO: only if cache setting)
  model?: string;
};

// Options that will be set at generation time
type GeneratedOptions =
  | {
      username: string;
      path: string;
      contentType?: "text";
    }
  | {
      username: string;
      path: string;
      contentType: "image";
    };

type ImageQuery = { imageUrl: string; prompt: string };

type QueryType = string | ImageQuery;

export const createRequest = <T>(params: GeneratedOptions) => {
  return async (query: QueryType, opts: RequestOptions) => {
    const baseController = (() => {
      switch (params.contentType) {
        case "image":
          return "image";
        default:
          return "q";
      }
    })();
    try {
      const response = await fetch(
        `${serverUrl}/${baseController}/${params.username}/${params.path}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${opts.token}`,
            ...(opts.cache && {
              "Cache-Behavior": opts.cache,
              ...(opts.model && {
                Model: opts.model,
              }),
            }),
            ...(opts.model && {
              "X-Custom-Model": opts.model,
            }),
          },
          body: JSON.stringify({
            q: query,
          }),
        }
      );

      return response.json() as Promise<T>;
    } catch (error) {
      return { error: error } as T;
    }
  };
};

const Forge = (options: ClientOptions) => {
  const forgeKey = options.forgeKey;
  //   const defaultModel = options.defaultModel;

  const client = generatedClient(forgeKey);

  return client;
};

export default Forge;

import translations_schema from "./translations.generated";

const generatedClient = (forgeKey: string) => {
  return {
    translations: {
      query: (prompt: string, opts?: RequestOptions) => {
        return createRequest<Zod.infer<typeof translations_schema>>({
          username: "mehul945",
          path: "translations",
        })(prompt, {
          token: opts?.token || forgeKey,
          cache: opts?.cache,
          model: opts?.model,
        });
      },
    },
  };
};
