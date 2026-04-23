import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-2 mb-1">
        <Languages size={14} className="text-primary" />
        <span className="text-[10px] fw-black text-muted uppercase tracking-widest">Language</span>
      </div>
      
      <div className="relative flex p-1 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-inner">
        {/* Animated Background Slider */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]"
          initial={false}
          animate={{
            left: language === 'en' ? '4px' : '50%',
            right: language === 'en' ? '50%' : '4px',
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        <button
          onClick={() => setLanguage('en')}
          className={`relative z-10 flex-1 px-3 py-2 rounded-lg text-xs fw-black transition-colors duration-300 ${
            language === 'en' ? 'text-white' : 'text-muted hover:text-white/60'
          }`}
        >
          ENGLISH
        </button>

        <button
          onClick={() => setLanguage('it')}
          className={`relative z-10 flex-1 px-3 py-2 rounded-lg text-xs fw-black transition-colors duration-300 ${
            language === 'it' ? 'text-white' : 'text-muted hover:text-white/60'
          }`}
        >
          ITALIANO
        </button>
      </div>
    </div>
  );
}
