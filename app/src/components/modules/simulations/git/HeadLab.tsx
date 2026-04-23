import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Terminal as TermIcon } from 'lucide-react'

export function HeadLab() {
    const [step, setStep] = useState(0)
    const steps = [
      { 
        title: "Initial State", 
        desc: "HEAD points to the 'main' branch, which points to commit C1.", 
        pos: { main: 0, head: 'main' },
        cmd: "# On branch main"
      },
      { 
        title: "New Commit", 
        desc: "You made C2. 'main' moved to C2, and HEAD followed 'main'.", 
        pos: { main: 1, head: 'main' },
        cmd: "git commit -m 'Add C2'"
      },
      { 
        title: "Detached HEAD", 
        desc: "You checked out C1 directly. HEAD now points to the commit, NOT a branch!", 
        pos: { main: 1, head: 0 },
        cmd: "git checkout C1"
      }
    ]

    return (
      <div className="w-full flex flex-col items-center gap-6 p-4 sm:p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
        <div className="w-full flex items-center justify-between mb-2">
           <div className="flex flex-col">
              <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">HEAD Simulation • Step {step + 1}</span>
              <h3 className="text-xl fw-black text-white">{steps[step].title}</h3>
           </div>
           <div className="flex gap-2">
              <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={18} /></button>
              <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="px-5 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm fw-bold flex gap-2 items-center">Next <ArrowRight size={18} /></button>
           </div>
        </div>

        {/* Narrative & Command Panel */}
        <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
           <p className="text-sm text-white/90 leading-relaxed fw-medium">{steps[step].desc}</p>
           <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
              <TermIcon size={18} className="text-muted shrink-0" />
              <code className="text-[11px] sm:text-sm font-mono text-git fw-bold whitespace-nowrap pr-6">
                 <span className="text-muted opacity-50 mr-2">$</span>
                 {steps[step].cmd}
              </code>
           </div>
        </div>

        {/* Visualization */}
        <div className="w-full bg-surface2/40 rounded-2xl border border-white/5 p-12 relative min-h-[220px] flex flex-col items-center justify-center gap-12 mt-2">
           <div className="flex gap-24 relative">
              <div className="absolute top-1/2 left-6 right-6 h-1 bg-white/10 -translate-y-1/2 rounded-full" />
              {[0, 1].map(i => (
                <div key={i} className="flex flex-col items-center gap-4 relative">
                   <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-lg fw-black font-mono shadow-xl transition-all ${step >= i ? 'bg-surface border-git text-white shadow-git/20 scale-100' : 'bg-surface2 border-white/5 text-muted opacity-30 scale-90'}`}>C{i+1}</div>
                   {steps[step].pos.main === i && (
                     <motion.div layoutId="main-label" className="absolute -bottom-12 px-4 py-2 rounded-lg bg-git text-[11px] fw-black text-white shadow-lg">MAIN</motion.div>
                   )}
                   {steps[step].pos.head === i && (
                     <motion.div layoutId="head-label" className="absolute -top-12 px-4 py-2 rounded-lg bg-primary text-[11px] fw-black text-white shadow-lg shadow-primary/20 z-10">HEAD 📍</motion.div>
                   )}
                </div>
              ))}
           </div>
           
           {steps[step].pos.head === 'main' && (
              <motion.div layoutId="head-label" className="absolute top-6 right-8 px-4 py-2 rounded-lg bg-primary text-[11px] fw-black text-white shadow-lg shadow-primary/20 z-10">
                 HEAD 📍 (attached to Main)
              </motion.div>
           )}
        </div>
      </div>
    )
}
