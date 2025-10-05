/**
 * ============================================================================
 * LANGUAGE CONTEXT - Global i18n State Management
 * ============================================================================
 * 
 * AI DEVELOPMENT DISCLOSURE:
 * This context provider manages the application's internationalization state.
 * 
 * AI Tools Used:
 * - Lovable (GPT Engineer): Context structure and localStorage integration (~75%)
 * - Cursor AI Editor: Type-safe translation access (~20%)
 * - GitHub Copilot: useEffect hook for HTML lang attribute (~5%)
 * 
 * Human Intervention:
 * - localStorage key naming ('eden-tree-language')
 * - Default language selection (English)
 * - Type safety decisions for translations
 * - HTML lang attribute integration
 * 
 * Technologies:
 * - React 18.3.1 Context API
 * - TypeScript (strict type checking)
 * - localStorage (persistence)
 * 
 * Features:
 * - 4 language support (EN, ES, FR, DE)
 * - Persistent language selection
 * - Type-safe translation access
 * - HTML lang attribute auto-update
 * - Simple API (useLanguage hook)
 * 
 * Complexity: LOW-MEDIUM
 * Lines of code: 48
 * 
 * Estimated Development Time:
 * - With AI assistance: 1 hour
 * - Without AI: 1-2 business days
 * ============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/translations';

type TranslationType = typeof translations['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('eden-tree-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('eden-tree-language', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language] as TranslationType,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to access language context - must be used within LanguageProvider
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
