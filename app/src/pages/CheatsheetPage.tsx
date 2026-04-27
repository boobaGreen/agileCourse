import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { GIT_CHEATSHEET, type CheatsheetCommand } from '../data/git/cheatsheet';
import { CommandVisual } from '../components/cheatsheet/CommandVisual';
import { Copy, Check, Search, Filter, Eye, X, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CheatsheetPage() {
  const { resolveString } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [selectedCommand, setSelectedCommand] = useState<CheatsheetCommand | null>(null);

  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCommand(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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
              en: 'Click any command to see an interactive visual diagram of how it works.',
              it: 'Clicca un comando per vedere un diagramma visivo interattivo di come funziona.'
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

      <div className="grid grid-cols-1 gap-12 w-full">
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
              {category.commands.map((cmd, cmdIndex) => {
                const hasVisual = !!cmd.visualType;

                return (
                  <motion.div 
                    key={cmdIndex}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => hasVisual && setSelectedCommand(cmd)}
                    className={`group bg-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:bg-surface/60 hover:border-white/20 transition-all ${hasVisual ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <code className="text-git font-black text-sm bg-git/5 px-4 py-2 rounded-xl border border-git/10 group-hover:bg-git/10 transition-all shadow-sm">
                        {cmd.command}
                      </code>
                      <div className="flex items-center gap-1">
                        {hasVisual && (
                          <div className="p-1 text-muted/30 group-hover:text-git transition-colors">
                            <Eye size={13} />
                          </div>
                        )}
                        <button 
                          onClick={(e) => copyToClipboard(cmd.command, e)}
                          className="text-muted hover:text-white transition-colors p-1"
                          title="Copy to clipboard"
                        >
                          {copiedCommand === cmd.command ? <Check size={14} className="text-[#06d6a0]" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">
                      {resolveString(cmd.description)}
                    </p>
                    {hasVisual && (
                      <div className="flex items-center gap-1.5 text-[10px] text-muted/30 group-hover:text-muted/60 transition-colors mt-auto pt-1">
                        <Eye size={9} />
                        <span className="font-medium uppercase tracking-wider">
                          {resolveString({ en: 'click to visualize', it: 'clicca per visualizzare' })}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
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

      {/* ── Full-screen Modal for Visual Diagram (Portal) ── */}
      {createPortal(
        <AnimatePresence>
          {selectedCommand && selectedCommand.visualType && selectedCommand.visualHighlight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
              onClick={() => setSelectedCommand(null)}
            >
              {/* Backdrop */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }} />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                style={{ position: 'relative', width: '100%', maxWidth: '768px', background: 'rgba(17,24,39,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', boxShadow: '0 0 60px rgba(249,115,22,0.12)', overflow: 'hidden' }}
              >
                {/* Glow top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-git/60 to-transparent" />

                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
                  <div className="flex flex-col gap-2">
                    <code className="text-git font-black text-lg md:text-xl bg-git/8 px-5 py-2.5 rounded-xl border border-git/15 inline-block">
                      {selectedCommand.command}
                    </code>
                    <p className="text-muted text-sm md:text-base">
                      {resolveString(selectedCommand.description)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCommand(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors shrink-0 ml-4"
                  >
                    <X size={18} />
                  </button>
                </div>

                  {/* Diagram - large and prominent */}
                <div className="p-6 md:p-10 border-b border-white/5">
                  <CommandVisual
                    type={selectedCommand.visualType}
                    highlight={selectedCommand.visualHighlight}
                  />
                </div>

                {/* Example and Output section */}
                {(selectedCommand.example || selectedCommand.output) && (
                  <div className="p-6 bg-black/30 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-git/80">
                      <Terminal size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">{resolveString({ en: 'Usage Example', it: 'Esempio di Utilizzo' })}</span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      {selectedCommand.example && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] text-muted/50 uppercase font-medium ml-1">{resolveString({ en: 'Command', it: 'Comando' })}</span>
                          <div className="bg-surface2/50 rounded-lg p-3 border border-white/5 font-mono text-sm text-white flex justify-between items-center group/code">
                            <code>$ {selectedCommand.example}</code>
                            <button 
                              onClick={(e) => copyToClipboard(selectedCommand.example!, e)}
                              className="text-muted/30 hover:text-white transition-colors p-1"
                            >
                              {copiedCommand === selectedCommand.example ? <Check size={14} className="text-[#06d6a0]" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {selectedCommand.output && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] text-muted/50 uppercase font-medium ml-1">{resolveString({ en: 'Expected Output', it: 'Output Atteso' })}</span>
                          <div className="bg-[#0c0c0c] rounded-lg p-3 border border-white/5 font-mono text-xs text-[#a0a0a0] leading-relaxed whitespace-pre-wrap">
                            {selectedCommand.output}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer hint */}
                <div className="px-6 py-4 flex justify-center bg-black/20">
                  <span className="text-[10px] text-muted/40 uppercase tracking-widest font-medium">
                    {resolveString({ en: 'Press ESC or click outside to close', it: 'Premi ESC o clicca fuori per chiudere' })}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
