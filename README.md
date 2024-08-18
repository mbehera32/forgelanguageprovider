# forge-languages

A React language provider component for easy integration of multi-language support using the Forge API.

## Installation

```bash
npm install forge-languages
```

## Usage

1. Import the `LanguageProvider` component and wrap your application with it, passing the `language` and `forgeKey` props.

```jsx
import { LanguageProvider } from "forge-languages";

const App = () => {
  return (
    <LanguageProvider language="es" forgeKey="YOUR_FORGE_KEY">
      {/* Your app components here */}
    </LanguageProvider>
  );
};
```

2. Use the `useLanguage` hook to access the language context and translation function within your components.

```jsx
import { useLanguage } from "forge-languages";

const MyComponent = () => {
  const { language, translate } = useLanguage();

  const translatedText = translate("Hello, world!");

  return <div>{translatedText}</div>;
};
```

## Functionality

1. Language Provider:

   - The `LanguageProvider` component wraps your application and provides language context.
   - It takes `language` and `forgeKey` as props.

2. useLanguage Hook:

   - A custom hook to access the language context within components.
   - Provides `language` and `translate` function.

3. Translation Function:

   - Asynchronous `translate` function that translates text to the specified language.
   - Uses the Forge API for translations.

4. Forge Client Creation:

   - `createForgeClient` function to initialize the Forge client with the provided API key.

5. API Integration:

   - Uses the Forge API for translations.
   - Handles API requests and responses.

6. Error Handling:

   - Catches and logs translation errors.
   - Returns the original text if translation fails.

7. Environment Variable Support:

   - Retrieves the Forge API key from environment variables or the window object.

8. TypeScript Support:

   - Includes TypeScript definitions for better type checking and IDE support.

9. Module Bundling:

   - Uses Rollup for bundling the package into CommonJS and ES modules.

10. Zod Schema Validation:
    - Uses Zod for schema validation of API responses.

## Configuration

You can configure the package by passing the following props to the `LanguageProvider` component:

- `language`: The target language for translations.
- `forgeKey`: The Forge API key for authentication.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute to the project.

## License

This project is licensed under the MIT License.

Build with Forge-ml By Mehul Behera
