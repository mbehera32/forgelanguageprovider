import React, { ReactNode } from 'react';

interface LanguageContextType {
    language: string;
    translate: (key: string) => Promise<string>;
}
interface LanguageProviderProps {
    language: string;
    forgeKey?: string;
    children: ReactNode;
}
declare const LanguageProvider: React.FC<LanguageProviderProps>;
declare const useLanguage: () => LanguageContextType;

export { LanguageProvider, useLanguage };
