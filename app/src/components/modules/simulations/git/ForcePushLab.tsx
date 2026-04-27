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
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-6 p-4 lg:p-8">
      
      {/* LEFT/TOP: Simulation Viewport */}
      <div className="w-full lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[500px] bg-black/40 rounded-[2rem] border border-white/5 p-4 sm:p-8 flex flex-col overflow-hidden shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-danger/10 blur-[100px] rounded-full" />
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          </div>

          <svg viewBox="0 0 400 200" className="w-full h-full relative z-10">
            {/* Track Labels */}
            <text x="15" y="55" className="text-[9px] font-black uppercase tracking-wider" fill="#4fd1c5" style={{ opacity: 0.8 }}>Remote (Origin)</text>
            <text x="15" y="145" className="text-[9px] font-black uppercase tracking-wider" fill="#68d391" style={{ opacity: 0.8 }}>Local (Your PC)</text>

            {/* Tracks Lines */}
            <line x1="50" y1="60" x2="380" y2="60" stroke="rgba(79, 209, 197, 0.15)" strokeWidth="1.5" />
            <line x1="50" y1="150" x2="380" y2="150" stroke="rgba(104, 211, 145, 0.15)" strokeWidth="1.5" />

            {/* SHARED History (A, B) */}
            {[80, 140].map(x => (
              <g key={x}>
                <circle cx={x} cy="60" r="5" fill="#4fd1c5" opacity="0.4" />
                <circle cx={x} cy="150" r="5" fill="#68d391" />
                <line x1={x} y1="65" x2={x} y2="145" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.1" />
              </g>
            ))}

            {/* Commit C (Teammate's Work on Server) */}
            <AnimatePresence>
               {step >= 1 && step < 3 && (
                 <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                    <circle cx="200" cy="60" r="6" fill="#4fd1c5" />
                    <text x="200" y="45" textAnchor="middle" className="text-[7px] font-bold" fill="#4fd1c5">Teammate commit (C)</text>
                    {step === 2 && (
                      <motion.circle 
                        animate={{ r: [6, 14, 6], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        cx="200" cy="60" stroke="#4fd1c5" fill="none" strokeWidth="1"
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
                transition={{ type: 'spring', stiffness: 50, damping: 12 }}
              >
                 <circle cx="200" cy="150" r="6" fill="#68d391" />
                 <text x="200" y="168" textAnchor="middle" className="text-[8px] font-bold" fill="#68d391">Your commit (D)</text>
                 
                 {step >= 3 && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                       <circle 
                         cx="200" cy="150" r="22" fill="rgba(239, 68, 68, 0.15)" 
                         stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1"
                         initial={{ scale: 0 }} animate={{ scale: 1.5 }}
                       />
                       <text x="200" y="153" textAnchor="middle" className="text-[10px]" style={{ filter: 'drop-shadow(0 0 5px rgba(239,68,68,0.5))' }}>🔥</text>
                    </motion.g>
                 )}
              </motion.g>
            )}

            {/* Warning UI for step 3/4 */}
            {step >= 3 && (
               <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                  <rect x="175" y="35" width="50" height="50" rx="8" fill="rgba(239, 68, 68, 0.05)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="200" y="28" textAnchor="middle" className="text-[10px] font-black" fill="#ef4444">OVERWRITTEN!</text>
                  
                  <motion.g animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                     <text x="330" y="60" textAnchor="middle" className="text-[24px]">😱</text>
                     <text x="330" y="80" textAnchor="middle" className="text-[7px] font-bold" fill="#ef4444" style={{ textShadow: '0 0 8px rgba(239,68,68,0.3)' }}>Teammate's reaction</text>
                  </motion.g>
               </motion.g>
            )}
          </svg>
        </div>
      </div>

      {/* RIGHT/BOTTOM: Controls & Info */}
      <div className="w-full lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
        
        {/* Navigation Card */}
        <div className="w-full bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md">
           <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                 <span className="text-[11px] text-danger font-black uppercase tracking-widest leading-none mb-2">Warning Simulation • Step {step + 1} of {steps.length}</span>
                 <h3 className="text-xl font-black text-white">{steps[step].title}</h3>
              </div>
              
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                   animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                   transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                 />
              </div>

              <div className="flex gap-3 pt-2">
                 <button 
                   disabled={step === 0}
                   onClick={() => setStep(s => s - 1)}
                   className="flex-1 p-3 rounded-2xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all flex justify-center items-center group"
                 >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                 </button>
                 <button 
                   disabled={step === steps.length - 1}
                   onClick={() => setStep(s => s + 1)}
                   className="flex-[3] py-4 rounded-2xl bg-danger text-white shadow-xl shadow-danger/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 font-black text-sm uppercase tracking-wider"
                 >
                    <span>{step === steps.length - 1 ? 'Simulation Complete' : 'Next Step'}</span>
                    <ArrowRight size={20} className="animate-pulse" />
                 </button>
              </div>
           </div>
        </div>

        {/* Narrative & Terminal Panel */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full flex-1 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl flex flex-col gap-5"
          >
             <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${step === 3 ? 'bg-danger/20 text-danger animate-pulse shadow-danger/20' : 'bg-primary/20 text-primary shadow-primary/20'} shrink-0 shadow-lg`}>
                   <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col gap-4 w-full min-w-0">
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                         <span className={`text-[11px] ${step === 3 ? 'text-danger' : 'text-primary'} font-black uppercase tracking-widest`}>
                           {step === 3 ? 'Critical Alert' : 'Habit insight'}
                         </span>
                         <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed font-medium">
                         {steps[step].desc}
                      </p>
                   </div>

                   {/* Modern Terminal View */}
                   <div className="bg-black/80 rounded-2xl p-4 border border-white/10 shadow-inner flex flex-col gap-3 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1.5">
                           <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                           <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                           <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">bash</span>
                      </div>
                      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                        <code className="text-[11px] sm:text-xs font-mono text-git font-black whitespace-nowrap">
                           <span className="text-white/30 mr-2">$</span>
                           {steps[step].cmd}
                        </code>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
