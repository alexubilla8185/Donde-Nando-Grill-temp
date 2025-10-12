
import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    if (userLang === 'es') {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  }, []);

  return (
    <LocalizationContext.Provider value={{ language, setLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};
