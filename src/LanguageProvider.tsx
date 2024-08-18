import React, { createContext, useContext, ReactNode } from 'react';
import { createForgeClient } from '../forge/client';

interface LanguageContextType {
    language: string;
    translate: (key: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    language: string;
    forgeKey?: string;
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ language, forgeKey, children }) => {
    const viteForgeKey = (import.meta as any).env?.VITE_FORGE_KEY;
    const actualForgeKey = forgeKey || viteForgeKey;

    if (!actualForgeKey) {
        throw new Error("FORGE_KEY not provided. Please set VITE_FORGE_KEY in your environment variables or pass it as a prop.");
    }

    const { translateText } = createForgeClient(actualForgeKey);

    const translate = async (key: string): Promise<string> => {
        try {
            const result = await translateText(key, language);
            return result.translation;
        } catch (error) {
            console.error('Translation error:', error);
            return key;
        }
    };

    return (
        <LanguageContext.Provider value={{ language, translate }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};