import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'

export function ForcePushLab() {
  const [step, setStep] = useState(0)
  const steps = [
    { 
      title: "1. The Stable State", 
      desc: "Everyone is synchronized. The server (Origin) and your machine have the same history (A -> B).",
      cmd: "# History is clean",
      op: 'sync' 
    },
    { 
      title: "2. Teammate Work (C)", 
      desc: "A teammate pushes commit 'C'. The server now has (A -> B -> C). You don't have 'C' yet.",
      cmd: "# Teammate: git push origin main",
      op: 'remote_move' 
    },
    { 
      title: "3. Divergent Force Push", 
      desc: "You make commit 'D' from 'B', ignoring 'C'. Then you run 'git push --force'.",
      cmd: "git push origin main --force",
      op: 'force_push' 
    },
    { 
      title: "4. DISASTER: History Wiped", 
      desc: "CRITICAL: Commit 'C' is GONE from the server! Your teammate's work is deleted. Chaos ensues.",
      cmd: "# Teammate: Error! Diverged history!",
      op: 'disaster' 
    }
  ]

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4">
      {/* Storyboard Navigation */}
      <div className="w-full max-w-lg bg-white/5 p-4 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex flex-col">
               <span className="text-[10px] text-danger fw-black uppercase tracking-widest leading-none mb-1">Warning Simulation • Step {step + 1}</span>
               <h3 className="text-sm fw-black text-white">{steps[step].title}</h3>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
               <button 
                 disabled={step === 0}
                 onClick={() => setStep(s => s - 1)}
                 className="flex-1 sm:flex-none p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all flex justify-center"
               >
                  <ArrowLeft size={16} />
               </button>
               <button 
                 disabled={step === steps.length - 1}
                 onClick={() => setStep(s => s + 1)}
                 className="flex-[2] sm:flex-none px-4 py-2 rounded-xl bg-danger text-white shadow-lg shadow-danger/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 fw-bold text-xs"
               >
                  <span className="hidden xs:inline">Next Step</span>
                  <span className="xs:hidden">Next</span>
                  <ArrowRight size={16} />
               </button>
            </div>
         </div>
         
         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-danger"
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
         </div>
      </div>

      <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] bg-black/40 rounded-3xl border border-white/5 p-3 sm:p-6 flex flex-col overflow-hidden shadow-2xl mt-4">
         <svg viewBox="0 0 400 200" className="w-full h-full">
           {/* Track Labels */}
           <text x="15" y="55" className="text-[8px] font-black uppercase tracking-wider" fill="#4fd1c5">Remote (Origin)</text>
           <text x="15" y="145" className="text-[8px] font-black uppercase tracking-wider" fill="#68d391">Local (Your PC)</text>

           {/* Tracks Lines */}
           <line x1="50" y1="60" x2="380" y2="60" stroke="rgba(79, 209, 197, 0.1)" strokeWidth="1" />
           <line x1="50" y1="150" x2="380" y2="150" stroke="rgba(104, 211, 145, 0.1)" strokeWidth="1" />

           {/* SHARED History (A, B) */}
           {[80, 140].map(x => (
             <g key={x}>
               <circle cx={x} cy="60" r="5" fill="#4fd1c5" opacity="0.4" />
               <circle cx={x} cy="150" r="5" fill="#68d391" />
             </g>
           ))}

           {/* Commit C (Teammate's Work on Server) */}
           <AnimatePresence>
              {step >= 1 && step < 3 && (
                <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                   <circle cx="200" cy="60" r="5" fill="#4fd1c5" />
                   <text x="200" y="45" textAnchor="middle" className="text-[6px] font-bold" fill="#4fd1c5">Teammate commit (C)</text>
                   {step === 2 && (
                     <motion.circle 
                       animate={{ r: [5, 12, 5], opacity: [1, 0, 1] }}
                       transition={{ repeat: Infinity }}
                       cx="200" cy="60" stroke="#4fd1c5" fill="none" 
                     />
                   )}
                </motion.g>
              )}
           </AnimatePresence>

           {/* Commit D (Your Work) */}
           {step >= 2 && (
             <motion.g
               animate={{ 
                  x: 0,
                  y: step >= 3 ? -90 : 0
               }}
               transition={{ type: 'spring', stiffness: 60 }}
             >
                <circle cx="200" cy="150" r="5" fill="#68d391" />
                <text x="200" y="165" textAnchor="middle" className="text-[7px] font-bold" fill="#68d391">Your commit (D)</text>
                
                {step >= 3 && (
                   <motion.circle 
                     cx="200" cy="150" r="20" fill="rgba(239, 68, 68, 0.2)" 
                     initial={{ scale: 0 }} animate={{ scale: 1.5 }}
                   />
                )}
             </motion.g>
           )}

           {/* Warning UI for step 3/4 */}
           {step >= 3 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <rect x="180" y="40" width="40" height="40" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                 <text x="200" y="85" textAnchor="middle" className="text-[10px] font-black" fill="#ef4444">OVERWRITTEN!</text>
                 <motion.text x="320" y="60" textAnchor="middle" className="text-[20px]" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity }}>😱</motion.text>
                 <text x="320" y="75" textAnchor="middle" className="text-[6px] font-bold" fill="#ef4444">Teammate is crying</text>
              </motion.g>
           )}
         </svg>
      </div>

      {/* Narrative Panel */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 p-3 sm:p-5 rounded-3xl shadow-2xl mx-auto"
          >
             <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2.5 rounded-2xl ${step === 3 ? 'bg-danger/20 text-danger animate-pulse' : 'bg-primary/20 text-primary'} shrink-0 shadow-lg shadow-primary/10`}>
                   <ShieldCheck size={18} />
                </div>
                <div className="flex flex-col gap-3 w-full min-w-0">
                   <div className="flex flex-col gap-2 sm:gap-3">
                      <div className="flex items-center gap-2">
                         <span className={`text-[10px] ${step === 3 ? 'text-danger' : 'text-primary'} fw-black uppercase tracking-widest whitespace-normal sm:whitespace-nowrap`}>
                           {step === 3 ? 'Critical Warning' : 'Collaboration Habit'}
                         </span>
                         <div className="h-[1px] w-full bg-white/10" />
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed fw-medium">
                         {steps[step].desc}
                      </p>
                   </div>

                   {/* Mini-Terminal Badge */}
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
    </div>
  )
}
