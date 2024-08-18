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
export declare const LanguageProvider: React.FC<LanguageProviderProps>;
export declare const useLanguage: () => LanguageContextType;
export {};
