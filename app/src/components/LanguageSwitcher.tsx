import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Check } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-primary"
          >
            <Globe size={14} />
          </motion.div>
          <span className="text-[10px] fw-black text-muted uppercase tracking-[0.2em]">Locale</span>
        </div>
        <span className="text-[10px] fw-bold text-primary/80 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
          {language === 'en' ? 'ENGLISH' : 'ITALIANO'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 relative p-1 bg-black/40 rounded-xl border border-white/10">
        {/* EN Button */}
        <button
          onClick={() => setLanguage('en')}
          className={`group relative flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all duration-500 overflow-hidden ${
            language === 'en' ? 'text-white' : 'text-muted hover:text-white/60'
          }`}
        >
          {language === 'en' && (
            <motion.div
              layoutId="active-bg"
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 border border-primary/30 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 text-[11px] fw-black tracking-widest">EN</span>
          {language === 'en' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10">
              <Check size={10} className="text-primary" />
            </motion.div>
          )}
        </button>

        {/* IT Button */}
        <button
          onClick={() => setLanguage('it')}
          className={`group relative flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all duration-500 overflow-hidden ${
            language === 'it' ? 'text-white' : 'text-muted hover:text-white/60'
          }`}
        >
          {language === 'it' && (
            <motion.div
              layoutId="active-bg"
              className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-orange-500/20 border border-secondary/30 shadow-[0_0_20px_rgba(var(--color-secondary-rgb),0.2)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 text-[11px] fw-black tracking-widest">IT</span>
          {language === 'it' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10">
              <Check size={10} className="text-secondary" />
            </motion.div>
          )}
        </button>
      </div>

      {/* Subtle Hint */}
      <p className="text-[9px] text-muted text-center italic opacity-50">
        Changes interface & module content
      </p>
    </div>
  );
}
