import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Terminal as TermIcon } from 'lucide-react'

export function CherryPickLab() {
  const [step, setStep] = useState(0)
  const steps = [
    { 
      title: "1. The Scenario", 
      desc: "Problem: You fixed a critical bug (Fix) on the 'Experimental' branch, but the rest of that branch is a mess. You only want the fix!", 
      main: ['C1', 'C2'],
      feat: ['A', 'B', 'Fix'],
      cmd: "git log --oneline"
    },
    { 
      title: "2. The Harvest", 
      desc: "Instead of merging the whole experimental branch, you 'Cherry-pick' just the Fix commit. Surgical precision!", 
      main: ['C1', 'C2'],
      feat: ['A', 'B', 'Fix'],
      activeHash: 'Fix',
      cmd: "git cherry-pick [Fix-Hash]"
    },
    { 
      title: "3. Clean Result", 
      desc: "The fix is now in your main branch as a new commit (Fix*). Your experimental branch stays messy, but your main branch is patched.", 
      main: ['C1', 'C2', 'Fix*'],
      feat: ['A', 'B', 'Fix'],
      cmd: "# Done!"
    }
  ]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="w-full flex items-center justify-between mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-xp fw-black uppercase tracking-widest leading-none mb-2">Cherry-Pick Simulation • Step {step + 1}</span>
             <h3 className="text-xl fw-black text-white">{steps[step].title}</h3>
          </div>
          <div className="flex gap-2">
             <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={18} /></button>
             <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="px-5 py-3 rounded-xl bg-xp text-black shadow-lg shadow-xp/20 hover:scale-105 active:scale-95 transition-all text-sm fw-bold flex gap-2 items-center">Next <ArrowRight size={18} /></button>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
          <p className="text-sm text-white/90 leading-relaxed fw-medium">{steps[step].desc}</p>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
             <TermIcon size={18} className="text-muted shrink-0" />
             <code className="text-[11px] sm:text-sm font-mono text-xp fw-bold whitespace-nowrap pr-6">
                <span className="text-muted opacity-50 mr-2">$</span>
                {steps[step].cmd}
             </code>
          </div>
       </div>

       <div className="flex flex-col gap-10 mt-4 p-8 bg-surface2/20 rounded-2xl border border-white/5 relative overflow-hidden">
          {/* Main Branch Line */}
          <div className="relative">
             <div className="flex items-center gap-6 relative z-10">
                <span className="w-20 text-[10px] fw-black text-git uppercase tracking-widest">Main</span>
                <div className="flex items-center gap-4">
                   <AnimatePresence mode="popLayout">
                      {steps[step].main.map((c, i) => (
                        <div key={c} className="flex items-center">
                           <motion.div 
                              layoutId={`main-${c}`}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[10px] fw-bold border-2 ${c === 'Fix*' ? 'bg-xp border-xp text-black shadow-lg shadow-xp/30' : 'bg-surface border-white/10 text-muted'}`}
                           >
                              {c}
                           </motion.div>
                           {i < steps[step].main.length - 1 && <div className="w-6 h-0.5 bg-white/5" />}
                        </div>
                      ))}
                   </AnimatePresence>
                </div>
             </div>
             <div className="absolute left-[84px] right-0 h-0.5 bg-white/5 top-1/2 -z-0" />
          </div>

          {/* Feature Branch Line */}
          <div className="relative">
             <div className="flex items-center gap-6 relative z-10">
                <span className="w-20 text-[10px] fw-black text-primary uppercase tracking-widest">Feat</span>
                <div className="flex items-center gap-4">
                   {steps[step].feat.map((c, i) => (
                     <div key={c} className="flex items-center">
                        <motion.div 
                           className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[10px] fw-bold border-2 transition-all ${
                             steps[step].activeHash === c 
                               ? 'bg-xp border-xp text-black scale-110 shadow-xl z-20' 
                               : 'bg-surface2 border-white/5 text-muted opacity-40'
                           }`}
                        >
                           {c}
                        </motion.div>
                        {i < steps[step].feat.length - 1 && <div className="w-6 h-0.5 bg-white/5" />}
                     </div>
                   ))}
                </div>
             </div>
             <div className="absolute left-[84px] right-0 h-0.5 bg-white/5 top-1/2 -z-0" />
          </div>

          {/* Connection Line */}
          <div className="absolute left-[104px] top-[48px] bottom-[48px] w-0.5 bg-white/5 border-l border-dashed border-white/10" />
       </div>
    </div>
  )
}
