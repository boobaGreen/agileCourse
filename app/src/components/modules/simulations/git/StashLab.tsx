import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Terminal as TermIcon } from 'lucide-react'

export function StashLab() {
  const [step, setStep] = useState(0)
  const steps = [
    { 
      title: "1. Muddy Work", 
      desc: "You have unfinished files. You must switch branches to fix a bug, but you aren't ready to commit.", 
      wd: ['feat_progress.js', 'style_fix.css'],
      stash: [],
      cmd: "# I'm not ready to commit yet..."
    },
    { 
      title: "2. Git Stash", 
      desc: "You 'stash' your changes. Git takes them and puts them on a hidden shelf, leaving your workspace clean.", 
      wd: [],
      stash: ['feat_progress.js', 'style_fix.css'],
      cmd: "git stash"
    },
    { 
      title: "3. Clean Context", 
      desc: "Now your workspace is clean. You can safely switch branches, do your other work, and come back.", 
      wd: [],
      stash: ['feat_progress.js', 'style_fix.css'],
      cmd: "git checkout hotfix-branch"
    },
    { 
      title: "4. Git Stash Pop", 
      desc: "Back on main, you 'pop' the stash. Your work safely returns to your folders exactly where you left it.", 
      wd: ['feat_progress.js', 'style_fix.css'],
      stash: [],
      cmd: "git stash pop"
    }
  ]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="w-full flex items-center justify-between mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">Stash Simulation • Step {step + 1}</span>
             <h3 className="text-xl fw-black text-white">{steps[step].title}</h3>
          </div>
          <div className="flex gap-2">
             <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={18} /></button>
             <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="px-5 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm fw-bold flex gap-2 items-center">Next <ArrowRight size={18} /></button>
          </div>
       </div>


       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          {/* Working Dir Column */}
          <div className="flex flex-col gap-3">
             <span className="text-[10px] fw-black text-muted uppercase tracking-widest text-center">Working Directory</span>
             <div className="bg-surface2/40 rounded-2xl border border-white/5 p-6 min-h-[160px] flex flex-col gap-3 items-center justify-center">
                <AnimatePresence mode="popLayout">
                   {steps[step].wd.map(f => (
                     <motion.div 
                       layoutId={`stash-file-${f}`}
                       key={f} 
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ y: 20, opacity: 0 }}
                       className="w-full p-3 bg-surface border border-white/10 rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2"
                     >
                        📄 {f}
                     </motion.div>
                   ))}
                </AnimatePresence>
                {steps[step].wd.length === 0 && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} className="text-[10px] fw-bold italic text-muted">Clean Workspace ✨</motion.div>
                )}
             </div>
          </div>

          {/* Stash Shelf Column */}
          <div className="flex flex-col gap-3">
             <span className="text-[10px] fw-black text-primary uppercase tracking-widest text-center">Git Stash (Hidden Shelf)</span>
             <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 min-h-[160px] flex flex-col gap-3 items-center justify-center">
                <AnimatePresence mode="popLayout">
                   {steps[step].stash.map(f => (
                     <motion.div 
                       layoutId={`stash-file-${f}`}
                       key={f} 
                       initial={{ y: -20, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1, y: 0 }}
                       exit={{ scale: 0, opacity: 0 }}
                       className="w-full p-3 bg-primary/20 border border-primary/30 rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2"
                     >
                        📦 {f}
                     </motion.div>
                   ))}
                </AnimatePresence>
                {steps[step].stash.length === 0 && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} className="text-[10px] fw-bold italic text-white/50">Shelf Empty</motion.div>
                )}
             </div>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4 mt-2">
          <p className="text-sm text-white/90 leading-relaxed fw-medium">{steps[step].desc}</p>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3">
             <TermIcon size={18} className="text-muted" />
             <code className="text-sm font-mono text-git fw-bold">
                <span className="text-muted opacity-50 mr-2">$</span>
                {steps[step].cmd}
             </code>
          </div>
       </div>
    </div>
  )
}
