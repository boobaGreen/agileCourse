import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const FlagIT = () => (
    <svg viewBox="0 0 3 2" className="w-4 h-4 rounded-full shadow-sm">
      <rect width="1" height="2" fill="#008C45"/>
      <rect width="1" height="2" x="1" fill="#F4F5F0"/>
      <rect width="1" height="2" x="2" fill="#CD212A"/>
    </svg>
  );

  const FlagEN = () => (
    <svg viewBox="0 0 60 30" className="w-4 h-4 rounded-full shadow-sm">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  );

  return (
    <div className="flex items-center p-1 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-lg transition-all hover:border-white/20">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('en')}
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
          language === 'en' ? 'text-white' : 'text-muted hover:text-white/70'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        <div className="relative z-10 flex items-center gap-2">
          <FlagEN />
          <span className="text-[10px] fw-black tracking-wider">EN</span>
        </div>
      </button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage('it')}
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
          language === 'it' ? 'text-white' : 'text-muted hover:text-white/70'
        }`}
      >
        {language === 'it' && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          />
        )}
        <div className="relative z-10 flex items-center gap-2">
          <FlagIT />
          <span className="text-[10px] fw-black tracking-wider">IT</span>
        </div>
      </button>
    </div>
  );
}
