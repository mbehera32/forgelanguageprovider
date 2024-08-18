import React, { ReactNode } from 'react';

interface LanguageContextType {
    language: string;
    translate: (key: string) => string;
    isLoading: (key: string) => boolean;
}
interface LanguageProviderProps {
    language: string;
    forgeKey?: string;
    children: ReactNode;
}
declare const LanguageProvider: React.FC<LanguageProviderProps>;
declare const useLanguage: () => LanguageContextType;

export { LanguageProvider, useLanguage };
