import { createContext, useContext } from 'react';
import type { LocalizedString } from '../data/types';

export type Language = 'en' | 'it';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string;
  resolveString: (str: LocalizedString | undefined) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
