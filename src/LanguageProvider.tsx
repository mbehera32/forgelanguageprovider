import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode, useMemo } from 'react';
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
    allOutputs?: boolean;
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ language, forgeKey, allOutputs = false, children }) => {
    const viteForgeKey = (import.meta as any).env?.VITE_FORGE_KEY;
    const actualForgeKey = forgeKey || viteForgeKey;

    if (!actualForgeKey) {
        throw new Error("FORGE_KEY not provided. Please set FORGE_KEY in your environment variables or pass it as a prop.");
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
                    setTranslations(prev => {
                        const newTranslations = {
                            ...prev,
                            [language]: {
                                ...prev[language],
                                [key]: result.translation
                            }
                        };
                        // Force a re-render
                        setPendingTranslations(new Set());
                        return newTranslations;
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

    const TranslateWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const { translate } = useLanguage();
        const [translatedChildren, setTranslatedChildren] = useState<React.ReactNode>(children);

        useEffect(() => {
            const translateNode = (node: React.ReactNode): React.ReactNode => {
                if (typeof node === 'string') {
                    return translate(node);
                }

                if (React.isValidElement(node)) {
                    const props = { ...node.props };
                    if (typeof props.children === 'string') {
                        props.children = translate(props.children);
                    } else if (Array.isArray(props.children)) {
                        props.children = React.Children.map(props.children, translateNode);
                    }
                    return React.cloneElement(node, props);
                }

                return node;
            };

            const newTranslatedChildren = React.Children.map(children, translateNode);
            setTranslatedChildren(newTranslatedChildren);
        }, [children, translate]);

        return <>{translatedChildren}</>;
    };

    const contextValue = useMemo(() => ({
        language,
        translate,
        isLoading
    }), [language, translate, isLoading]);

    if (allOutputs) {
        return (
            <LanguageContext.Provider value={contextValue}>
                <TranslateWrapper>{children}</TranslateWrapper>
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider value={contextValue}>
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