import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simplified translation map for UI elements
const uiTranslations: Record<string, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'common.next': 'Next',
    'common.back': 'Back',
    'common.finish': 'Finish',
    'common.restart': 'Restart',
    'dashboard.resume': 'Continue Learning',
    'dashboard.explore': 'Explore Next Track',
    'profile.stats': 'Statistics',
    'profile.roadmap': 'Roadmap',
    'quiz.check': 'Check Answer',
    'quiz.explanation': 'Explanation',
  },
  it: {
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profilo',
    'nav.settings': 'Impostazioni',
    'nav.logout': 'Esci',
    'common.next': 'Avanti',
    'common.back': 'Indietro',
    'common.finish': 'Completa',
    'common.restart': 'Ricomincia',
    'dashboard.resume': 'Continua a Imparare',
    'dashboard.explore': 'Esplora Prossima Track',
    'profile.stats': 'Statistiche',
    'profile.roadmap': 'Percorso',
    'quiz.check': 'Verifica Risposta',
    'quiz.explanation': 'Spiegazione',
  }
};

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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
