import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, RotateCcw, Terminal as TermIcon } from 'lucide-react'

export function UndoSandbox() {
  const [mode, setMode] = useState<'revert' | 'reset'>('revert')
  const [step, setStep] = useState(0)
  
  const scenarios = {
    revert: [
      {
        title: "1. Healthy State",
        desc: "You are working normally. History is clean and stable.",
        cmd: "# on branch main",
        commits: ['C1', 'C2']
      },
      {
        title: "2. The Mistake",
        desc: "You accidentally committed code that breaks the build (C3).",
        cmd: "git commit -m 'Oops, bug!'",
        commits: ['C1', 'C2', 'C3 (Error)']
      },
      {
        title: "3. Safe Revert",
        desc: "You run revert. Git creates a NEW commit (C4) that undoes C3's changes. History is preserved.",
        cmd: "git revert HEAD",
        commits: ['C1', 'C2', 'C3 (Error)', 'C4 (Fix)']
      }
    ],
    reset: [
      {
        title: "1. Healthy State",
        desc: "You are working normally. History is clean and stable.",
        cmd: "# on branch main",
        commits: ['C1', 'C2']
      },
      {
        title: "2. The Mistake",
        desc: "You accidentally committed code that breaks the build (C3).",
        cmd: "git commit -m 'Oops, bug!'",
        commits: ['C1', 'C2', 'C3 (Error)']
      },
      {
        title: "3. Hard Reset",
        desc: "You run reset --hard. The timeline moves back to C2, and C3 is physically deleted from history.",
        cmd: "git reset --hard HEAD~1",
        commits: ['C1', 'C2']
      }
    ]
  }

  const currentScenario = scenarios[mode]
  const currentStep = currentScenario[step] || currentScenario[0]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">Time Travel Simulation</span>
             <h3 className="text-xl fw-black text-white">{currentStep.title}</h3>
          </div>
          <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
             <button 
               onClick={() => { setMode('revert'); setStep(0); }} 
               className={`px-5 py-2.5 rounded-xl text-xs fw-bold transition-all ${mode === 'revert' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-white'}`}
             >
               Revert Path
             </button>
             <button 
               onClick={() => { setMode('reset'); setStep(0); }} 
               className={`px-5 py-2.5 rounded-xl text-xs fw-bold transition-all ${mode === 'reset' ? 'bg-danger text-white shadow-lg shadow-danger/20' : 'text-muted hover:text-white'}`}
             >
               Reset Path
             </button>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
             <div className="w-full">
                <p className="text-sm text-white/90 leading-relaxed fw-medium max-w-[85%]">{currentStep.desc}</p>
             </div>
             <div className="flex gap-2">
                <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all shadow-inner"><ArrowLeft size={18} /></button>
                <button 
                  onClick={() => step === currentScenario.length - 1 ? setStep(0) : setStep(s => s + 1)} 
                  className={`px-6 py-3 rounded-xl text-white shadow-lg transition-all text-sm fw-black flex gap-2 items-center ${mode === 'revert' ? 'bg-primary shadow-primary/20' : 'bg-danger shadow-danger/20'}`}
                >
                  {step === currentScenario.length - 1 ? (
                    <>Restart <RotateCcw size={18} /></>
                  ) : (
                    <>Next Step <ArrowRight size={18} /></>
                  )}
                </button>
             </div>
          </div>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
             <TermIcon size={18} className="text-muted shrink-0" />
             <code className={`text-[11px] sm:text-sm font-mono fw-bold whitespace-nowrap pr-6 ${mode === 'revert' ? 'text-primary' : 'text-danger'}`}>
                <span className="text-muted opacity-50 mr-2">$</span>
                {currentStep.cmd}
             </code>
          </div>
       </div>

       <div className="w-full bg-surface2/40 rounded-2xl border border-white/5 p-12 relative min-h-[160px] flex flex-col items-center justify-center gap-12 mt-2">
          <div className="flex items-center gap-4 relative">
             <AnimatePresence mode="popLayout">
                {currentStep.commits.map((c) => (
                  <motion.div 
                    key={c}
                    layoutId={`undo-${mode}-${c}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0, y: 50 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center font-mono text-[9px] sm:text-[11px] fw-bold shadow-xl transition-all ${
                      c.includes('Error') ? 'bg-danger/20 border-danger text-danger' : 
                      c.includes('Fix') ? 'bg-primary/20 border-primary text-primary' :
                      'bg-surface border-white/10 text-white'
                    }`}
                  >
                     {c.split(' ')[0]}
                  </motion.div>
                ))}
             </AnimatePresence>
             <div className="absolute left-[-200px] right-[-200px] h-[1px] bg-white/10 -z-10 top-1/2" />
          </div>
       </div>
    </div>
  )
}
