import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { GIT_CHEATSHEET } from '../data/git/cheatsheet';
import { Copy, Check, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function CheatsheetPage() {
  const { resolveString } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const filteredCheatsheet = GIT_CHEATSHEET.map(category => ({
    ...category,
    commands: category.commands.filter(cmd => 
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resolveString(cmd.description).toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.commands.length > 0);

  return (
    <div className="animate-fade-up flex flex-col items-start gap-8 pt-4 md:pt-8 pb-12">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 w-full">
        <div className="flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-2"
          >
            Git Quick <span className="text-git">Reference</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-2xl"
          >
            {resolveString({
              en: 'A curated collection of the most essential Git commands, from basic setup to advanced history manipulation.',
              it: 'Una collezione curata dei comandi Git più essenziali, dal setup di base alla manipolazione avanzata della cronologia.'
            })}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 bg-surface2/50 border border-white/10 rounded-2xl px-4 py-3 w-full md:w-80 focus-within:border-git/50 focus-within:bg-surface2 transition-all shadow-xl group"
        >
          <Search className="text-muted group-focus-within:text-git transition-colors shrink-0" size={18} />
          <input 
            type="text"
            placeholder={resolveString({ en: 'Search commands...', it: 'Cerca comandi...' })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder:text-muted w-full font-medium"
          />
        </motion.div>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {filteredCheatsheet.map((category, catIndex) => (
          <motion.section 
            key={catIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * catIndex }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
                category.level === 'beginner' ? 'bg-[#06d6a0] shadow-[#06d6a0]/40' : 
                category.level === 'intermediate' ? 'bg-[#ffd166] shadow-[#ffd166]/40' : 
                'bg-[#ff4b4b] shadow-[#ff4b4b]/40'
              }`} />
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">{resolveString(category.title)}</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.commands.map((cmd, cmdIndex) => (
                <motion.div 
                  key={cmdIndex}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group bg-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:bg-surface/60 hover:border-white/20 transition-all cursor-default"
                >
                  <div className="flex justify-between items-start gap-2">
                    <code className="text-git font-black text-sm bg-git/5 px-4 py-2 rounded-xl border border-git/10 group-hover:bg-git/10 transition-all shadow-sm">
                      {cmd.command}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(cmd.command)}
                      className="text-muted hover:text-white transition-colors p-1"
                      title="Copy to clipboard"
                    >
                      {copiedCommand === cmd.command ? <Check size={14} className="text-[#06d6a0]" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">
                    {resolveString(cmd.description)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {filteredCheatsheet.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted">
          <Filter size={48} className="opacity-20" />
          <p className="text-lg">No commands found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
