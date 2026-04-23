import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalizedString } from '../data/types';

type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string;
  resolveString: (str: LocalizedString | undefined) => string;
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
    'dashboard.mission': 'Mission',
    'dashboard.control': 'Control',
    'dashboard.welcome': 'Welcome back',
    'dashboard.journey': 'Your DevOps journey continues.',
    'dashboard.globalXp': 'Global XP',
    'dashboard.badges': 'Badges',
    'profile.stats': 'Statistics',
    'profile.roadmap': 'Career Roadmap',
    'profile.expertise': 'My Expertise',
    'profile.title': 'User',
    'profile.subtitle': 'Profile',
    'profile.console': 'Agile Lab Identity Console',
    'profile.danger': 'Data Management',
    'profile.dangerDesc': 'Resetting your progress will permanently remove all XP, badges, and completed modules.',
    'profile.wipe': 'Wipe Progress Data',
    'quiz.check': 'Check Answer',
    'quiz.explanation': 'Explanation',
    'landing.subtitle': 'Professional Training Platform',
    'landing.welcome': 'Welcome Learner',
    'landing.placeholder': 'Enter your name...',
    'landing.enter': 'Enter Harbor',
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
    'dashboard.mission': 'Mission',
    'dashboard.control': 'Control',
    'dashboard.welcome': 'Bentornato/a',
    'dashboard.journey': 'Il tuo viaggio DevOps continua.',
    'dashboard.globalXp': 'XP Globali',
    'dashboard.badges': 'Badge',
    'profile.stats': 'Statistiche',
    'profile.roadmap': 'Percorso di Carriera',
    'profile.expertise': 'La Mia Esperienza',
    'profile.title': 'Profilo',
    'profile.subtitle': 'Utente',
    'profile.console': 'Agile Lab Console Identità',
    'profile.danger': 'Gestione Dati',
    'profile.dangerDesc': 'Il ripristino dei progressi rimuoverà permanentemente tutti gli XP, i badge e i moduli completati.',
    'profile.wipe': 'Cancella Dati Progressi',
    'quiz.check': 'Verifica Risposta',
    'quiz.explanation': 'Spiegazione',
    'landing.subtitle': 'Piattaforma di Formazione Professionale',
    'landing.welcome': 'Benvenuto/a',
    'landing.placeholder': 'Inserisci il tuo nome...',
    'landing.enter': 'Entra',
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
