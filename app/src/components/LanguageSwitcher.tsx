import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 p-1 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
      <button
        onClick={() => setLanguage('en')}
        className={`relative px-3 py-1.5 rounded-lg text-[10px] fw-black transition-all ${
          language === 'en' ? 'text-white' : 'text-muted hover:text-white/60'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId="lang-active"
            className="absolute inset-0 bg-primary/20 rounded-lg border border-primary/30"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>

      <div className="w-[1px] h-3 bg-white/10" />

      <button
        onClick={() => setLanguage('it')}
        className={`relative px-3 py-1.5 rounded-lg text-[10px] fw-black transition-all ${
          language === 'it' ? 'text-white' : 'text-muted hover:text-white/60'
        }`}
      >
        {language === 'it' && (
          <motion.div
            layoutId="lang-active"
            className="absolute inset-0 bg-secondary/20 rounded-lg border border-secondary/30"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">IT</span>
      </button>
    </div>
  );
}
