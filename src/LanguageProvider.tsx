import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { createForgeClient } from '../forge/client';

interface LanguageContextType {
    language: string;
    translate: (key: string) => string;
    isLoading: (key: string) => boolean;
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

    const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
    const [pendingTranslations, setPendingTranslations] = useState<Set<string>>(new Set());

    const translate = useCallback((key: string): string => {
        if (translations[language]?.[key]) {
            return translations[language][key];
        }

        if (!pendingTranslations.has(key)) {
            setPendingTranslations(prev => new Set(prev).add(key));
            translateText(key, language)
                .then(result => {
                    setTranslations(prev => ({
                        ...prev,
                        [language]: {
                            ...prev[language],
                            [key]: result.translation
                        }
                    }));
                    setPendingTranslations(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(key);
                        return newSet;
                    });
                })
                .catch(error => {
                    console.error('Translation error:', error);
                    setPendingTranslations(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(key);
                        return newSet;
                    });
                });
        }

        return key; // Return the original key while translation is in progress
    }, [language, translateText, translations]);

    const isLoading = useCallback((key: string): boolean => {
        return pendingTranslations.has(key);
    }, [pendingTranslations]);

    return (
        <LanguageContext.Provider value={{ language, translate, isLoading }}>
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