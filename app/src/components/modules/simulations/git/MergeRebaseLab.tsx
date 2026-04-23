import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, RotateCcw, Terminal as TermIcon } from 'lucide-react'

export function MergeRebaseLab() {
  const [mode, setMode] = useState<'merge' | 'rebase'>('merge')
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "1. The Split",
      desc: "Problem: Your team made a change (C2) while you were working on features (A, B). Now you are out of sync. How do you join them back?",
      cmd: "# Preparing to integrate...",
      commits: { main: ['C1', 'C2'], feature: ['A', 'B'] }
    },
    {
       title: "2. The Integration",
       desc: mode === 'merge' 
         ? "MERGE: This is the 'Honest' way. It creates a new 'Merge Commit' (M) that shows exactly when branches rejoined. Safe and historical." 
         : "REBASE: This is the 'Clean' way. It moves your work (A, B) to the very end of the line, as if you just started. No messy merge nodes!",
       cmd: mode === 'merge' ? "git merge feature" : "git rebase main",
       commits: mode === 'merge' 
         ? { main: ['C1', 'C2', 'M'], feature: ['A', 'B'] } 
         : { main: ['C1', 'C2', "A'", "B'"], feature: [] }
    }
  ]

  const currentStep = steps[step] || steps[0]

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div className="flex flex-col">
             <span className="text-[10px] text-primary fw-black uppercase tracking-widest leading-none mb-2">Integration Lab • Step {step + 1}</span>
             <h3 className="text-lg sm:text-xl fw-black text-white">{currentStep.title}</h3>
          </div>
          <div className="flex w-full sm:w-auto gap-2 bg-black/40 p-1 rounded-2xl border border-white/10">
             <button 
               onClick={() => { setMode('merge'); setStep(0); }} 
               className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs fw-black transition-all ${
                 mode === 'merge' 
                   ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-900/40' 
                   : 'text-muted hover:text-white hover:bg-white/5'
               }`}
             >
               Merge Path
             </button>
             <button 
               onClick={() => { setMode('rebase'); setStep(0); }} 
               className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs fw-black transition-all ${
                 mode === 'rebase' 
                   ? 'bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-lg shadow-indigo-900/40' 
                   : 'text-muted hover:text-white hover:bg-white/5'
               }`}
             >
               Rebase Path
             </button>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-4">
             <div className="w-full">
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed fw-medium sm:max-w-[85%]">{currentStep.desc}</p>
             </div>
             <div className="flex gap-2 w-full sm:w-auto justify-end shrink-0">
                <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all shadow-lg"><ArrowLeft size={16} /></button>
                <button 
                  onClick={() => step === steps.length - 1 ? setStep(0) : setStep(s => s + 1)} 
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-white shadow-lg transition-all text-xs fw-black flex gap-2 items-center justify-center ${
                    mode === 'merge' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-orange-900/40' 
                      : 'bg-gradient-to-r from-indigo-400 to-purple-500 shadow-indigo-900/40'
                  }`}
                >
                  {step === steps.length - 1 ? (
                    <>Reset <RotateCcw size={16} /></>
                  ) : (
                    <>Next Step <ArrowRight size={16} /></>
                  )}
                </button>
             </div>
          </div>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
             <TermIcon size={18} className="text-muted shrink-0" />
             <code className={`text-[11px] sm:text-sm font-mono fw-bold whitespace-nowrap pr-6 ${mode === 'merge' ? 'text-git' : 'text-primary'}`}>
                <span className="text-muted opacity-50 mr-2">$</span>
                {currentStep.cmd}
             </code>
          </div>
       </div>

       {/* Timeline Visualization */}
       <div className="bg-surface2/40 rounded-2xl border border-white/5 px-4 sm:px-10 py-10 sm:py-16 h-[320px] sm:h-[280px] relative overflow-x-auto overflow-y-hidden scrollbar-hide flex flex-col justify-center min-w-0">
          <div className="min-w-[400px] flex flex-col justify-center gap-12 sm:gap-14 pr-10">
            {/* Main Timeline */}
            <div className="relative flex items-center gap-4">
               <div className="absolute -top-6 left-0 sm:relative sm:top-0 sm:w-24 text-[9px] sm:text-[10px] fw-black text-git uppercase tracking-widest text-left sm:text-right sm:mr-4 bg-git/10 px-2 py-0.5 rounded-md sm:bg-transparent sm:px-0">Main Line</div>
               <div className="flex items-center gap-4 relative ml-0 sm:ml-0">
                  <AnimatePresence mode="popLayout">
                     {currentStep.commits.main.map((c) => (
                       <motion.div 
                         key={c}
                         layoutId={`commit-${c}`}
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         exit={{ scale: 0, opacity: 0 }}
                         className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-mono text-[9px] sm:text-[10px] fw-bold shadow-xl transition-all ${
                           c === 'M' ? 'bg-git/20 border-git text-git' : 
                           c.includes("'") ? 'bg-primary/20 border-primary text-primary' :
                           'bg-surface border-white/10 text-white'
                         }`}
                       >
                          {c}
                       </motion.div>
                     ))}
                  </AnimatePresence>
                  <div className="absolute left-[-200px] right-[-200px] h-[1px] bg-white/10 -z-10 top-1/2" />
               </div>
            </div>

            {/* Feature Timeline */}
            <div className="relative flex items-center gap-4">
               <div className="absolute -top-6 left-0 sm:relative sm:top-0 sm:w-24 text-[9px] sm:text-[10px] fw-black text-primary uppercase tracking-widest text-left sm:text-right sm:mr-4 bg-primary/10 px-2 py-0.5 rounded-md sm:bg-transparent sm:px-0">Your Feature</div>
               <div className="flex items-center gap-4 relative">
                  <AnimatePresence mode="popLayout">
                     {currentStep.commits.feature.map((c) => (
                       <motion.div 
                         key={c}
                         layoutId={`commit-${c}`}
                         initial={{ y: 0, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         exit={{ y: -60, opacity: 0, scale: 0.5 }}
                         className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface border-2 border-primary/40 text-primary flex items-center justify-center font-mono text-[9px] sm:text-[10px] fw-bold"
                       >
                          {c}
                       </motion.div>
                     ))}
                  </AnimatePresence>
                  <div className="absolute left-[-200px] right-[-200px] h-[1px] bg-white/10 -z-10 top-1/2" />
                  
                  {mode === 'merge' && step === 1 && (
                    <motion.div 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      className="absolute -top-[52px] sm:-top-[48px] left-[110px]"
                    >
                       <svg width="40" height="48">
                          <path d="M 0 48 Q 20 24 40 0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 2" />
                       </svg>
                    </motion.div>
                  )}
               </div>
            </div>
          </div>
       </div>
    </div>
  )
}
