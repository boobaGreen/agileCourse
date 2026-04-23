import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RotateCcw, LayoutGrid } from 'lucide-react'

export function CoreConceptsLab() {
  const [step, setStep] = useState(0)
  const steps = [
    { 
      title: "1. Working Directory (Workspace)", 
      desc: "Your workbench. You have multiple files (App.js, Readme), but today only App.js is ready for prime time.",
      cmd: "# Workspace: Files are dirty/modified",
      op: 'modify' 
    },
    { 
      title: "2. Staging Area (The Filter)", 
      desc: "Why Staging? It's a loading dock. You 'add' only App.js. This allows you to split your work into clean, logical snapshots.",
      cmd: "git add App.js",
      op: 'add' 
    },
    { 
      title: "3. Local Repository (The Vault)", 
      desc: "When you 'commit', Git takes only what was on the loading dock. Your Readme remains safe and unstaged in your workspace.",
      cmd: "git commit -m 'Fix login logic'",
      op: 'commit' 
    },
    { 
      title: "4. Logical History", 
      desc: "Success! You've created a clean commit with only relevant changes. This is why Git is more powerful than simple 'Save'!",
      cmd: "git log --oneline",
      op: 'done' 
    }
  ]

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4">
      {/* Storyboard Navigation */}
      <div className="w-full max-w-lg bg-white/5 p-4 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex flex-col">
               <span className="text-[10px] text-primary fw-black uppercase tracking-widest leading-none mb-1">Concept Mastery • Step {step + 1}</span>
               <h3 className="text-sm fw-black text-white">{steps[step].title}</h3>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
               {step === steps.length - 1 ? (
                 <button 
                   onClick={() => setStep(0)}
                   className="flex-1 sm:flex-none px-6 py-2 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 fw-bold text-xs shadow-lg"
                 >
                    Reset <RotateCcw size={16} />
                 </button>
               ) : (
                 <button 
                   onClick={() => setStep(s => s + 1)}
                   className="flex-1 sm:flex-none px-6 py-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 fw-bold text-xs"
                 >
                    <span className="hidden xs:inline">Next Step</span>
                    <span className="xs:hidden">Next</span>
                    <ArrowRight size={16} />
                 </button>
               )}
            </div>
         </div>
         
         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
         </div>
      </div>

      {/* Narrative Panel (Moved above diagram) */}
      <div className="w-full flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl"
        >
           <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-2xl bg-primary/20 text-primary shrink-0">
                 <LayoutGrid size={18} />
              </div>
              <div className="flex flex-col gap-3 w-full min-w-0">
                 <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-primary fw-black uppercase tracking-widest whitespace-nowrap">Conceptual Logic</span>
                       <div className="h-[1px] w-full bg-white/10" />
                    </div>
                    <p className="text-xs text-white/90 leading-relaxed fw-medium">
                       {steps[step].desc}
                    </p>
                 </div>

                 {/* Terminal */}
                 <div className="bg-black/60 rounded-xl p-2.5 border border-white/5 shadow-inner flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
                    <div className="flex gap-1 shrink-0">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                       <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    </div>
                    <code className="text-[10px] sm:text-[11px] font-mono text-git fw-bold whitespace-nowrap pr-6">
                       <span className="text-muted opacity-50 mr-2">$</span>
                       {steps[step].cmd}
                    </code>
                 </div>
              </div>
           </div>
        </motion.div>
      </AnimatePresence>
    </div>

      <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] bg-black/40 rounded-3xl border border-white/5 p-3 sm:p-6 flex flex-col overflow-hidden shadow-2xl">
         <svg viewBox="0 0 400 200" className="w-full h-full">
           {/* Area Labels */}
           <text x="65" y="30" textAnchor="middle" className="text-[7px] fw-black uppercase tracking-widest" fill="rgba(255,255,255,0.4)">Working Dir</text>
           <text x="200" y="30" textAnchor="middle" className="text-[7px] fw-black uppercase tracking-widest" fill="rgba(255,255,255,0.4)">Staging Area</text>
           <text x="335" y="30" textAnchor="middle" className="text-[7px] fw-black uppercase tracking-widest" fill="rgba(255,255,255,0.4)">Local Repo</text>

           {/* Vertical Dividers */}
           <line x1="133" y1="40" x2="133" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
           <line x1="266" y1="40" x2="266" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />

           {/* Background placeholders */}
           {[65, 200, 335].map((x, i) => (
             <rect key={i} x={x-20} y={90} width="40" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
           ))}

           {/* FILE B (The 'Excluded' file) */}
           <motion.g x={65} y={110} initial={false}>
               <rect width="25" height="35" rx="3" x="-12.5" y="-17.5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
               <text x="0" y="5" textAnchor="middle" className="text-[5px] fw-bold" fill="rgba(255,255,255,0.3)">Readme</text>
           </motion.g>

           {/* FILE A (The 'Active' file moving through areas) */}
           <motion.g
             initial={false}
             animate={{ 
               x: step === 0 ? 65 : step === 1 ? 200 : 335,
               y: step === 0 ? 125 : 110
             }}
             transition={{ type: 'spring', stiffness: 80, damping: 15 }}
           >
              {/* File Visual */}
              <motion.rect 
                width="44" height="54" rx="4" x="-22" y="-27"
                animate={{ 
                  fill: step === 0 ? "rgba(239, 68, 68, 0.2)" : step === 1 ? "rgba(250, 204, 21, 0.2)" : "rgba(34, 197, 94, 0.2)",
                  stroke: step === 0 ? "#ef4444" : step === 1 ? "#facc15" : "#22c55e",
                  opacity: step >= 2 ? 0 : 1
                }}
                strokeWidth="2"
              />
              {step < 2 && (
                <motion.g animate={{ opacity: step >= 2 ? 0 : 1 }}>
                   <line x1="-12" y1="-10" x2="12" y2="-10" stroke="white" strokeWidth="0.5" opacity="0.3" />
                   <line x1="-12" y1="-5" x2="6" y2="-5" stroke="white" strokeWidth="0.5" opacity="0.3" />
                   <motion.text x="0" y="12" textAnchor="middle" className="text-[6px] fw-bold" fill="white">App.js</motion.text>
                </motion.g>
              )}

              {/* Commit Node Visual */}
              <motion.circle 
                r="8"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: step >= 2 ? 1 : 0,
                  fill: "#22c55e",
                  boxShadow: "0 0 20px rgba(34,197,94,0.5)"
                }}
              />
              {step >= 2 && (
                 <motion.text 
                   x="0" y="20" textAnchor="middle" className="text-[7px] fw-black" fill="#22c55e"
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 >
                   Commit
                 </motion.text>
              )}
           </motion.g>
         </svg>
      </div>
    </div>
  )
}
