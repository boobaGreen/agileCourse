import React, { useState } from 'react';
import type { LocalizedString } from '../data/types';
import { uiTranslations } from '../data/translations';
import { LanguageContext, type Language } from './LanguageContext';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('app-language') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string) => {
    return uiTranslations[language][key] || key;
  };

  const resolveString = (str: LocalizedString | undefined): string => {
    if (!str) return '';
    if (typeof str === 'string') return str;
    return str[language] || str['en'] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, resolveString }}>
      {children}
    </LanguageContext.Provider>
  );
};
