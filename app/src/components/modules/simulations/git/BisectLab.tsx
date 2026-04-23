import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Terminal as TermIcon, ArrowUp } from 'lucide-react'

export function BisectLab() {
  const [step, setStep] = useState(0)
  const marked: Partial<Record<number, 'good' | 'bad'>> = useMemo(() => {
    if (step === 1) return { 1: 'good', 7: 'bad', 4: 'bad' }
    if (step === 2) return { 1: 'good', 7: 'bad', 4: 'bad', 2: 'good' }
    if (step === 3 || step === 4) return { 1: 'good', 7: 'bad', 4: 'bad', 2: 'good', 3: 'bad' }
    return { 1: 'good', 7: 'bad' }
  }, [step])

  const steps = [
    {
      title: "1. The Bug Hunter",
      desc: "A bug was introduced somewhere! Commit 1 is 'Good' (Green), but Commit 7 is 'Bad' (Red). Let's find the exact culprit.",
      cmd: "git bisect start",
      focus: null
    },
    {
      title: "2. The Middle Ground",
      desc: "Git picks the middle commit (4) for you to test. You run your tests and find it's also 'Bad'.",
      cmd: "git bisect bad",
      focus: 4
    },
    {
      title: "3. Narrowing Down",
      desc: "Since 4 is Bad, the bug must be between 1 and 4. Git now suggests Commit 2. You test it and it's 'Good'!",
      cmd: "git bisect good",
      focus: 2
    },
    {
       title: "4. The Final Check",
       desc: "The search is almost over. Git picks Commit 3. You test it and it's 'Bad'. That's it!",
       cmd: "git bisect bad",
       focus: 3
    },
    {
       title: "5. Culprit Found!",
       desc: "Commit 3 is the first 'Bad' commit. You found the needle in the haystack! Now you can fix it.",
       cmd: "a1b2c3d is the first bad commit",
       focus: 3
    }
  ]

  const current = steps[step]

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/10 shadow-2xl">
       <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-primary fw-black uppercase tracking-widest leading-none mb-2">Bisect Lab • Step {step + 1}</span>
             <h3 className="text-xl fw-black text-white">{current.title}</h3>
          </div>
          <div className="flex gap-2">
             <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="p-3 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"><ArrowLeft size={18} /></button>
             <button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)} className="px-5 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm fw-bold flex gap-2 items-center">Next <ArrowRight size={18} /></button>
          </div>
       </div>


       <div className="bg-surface2/40 rounded-2xl border border-white/5 p-10 mt-2 relative flex items-center justify-between gap-2 overflow-hidden">
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-white/5 -translate-y-1/2 rounded-full" />
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={i} className="flex flex-col items-center gap-4 relative z-10">
               <motion.div 
                 animate={{ 
                   scale: current.focus === i ? 1.2 : 1,
                   borderColor: marked[i] === 'good' ? '#06d6a0' : marked[i] === 'bad' ? '#ff4b4b' : 'rgba(255,255,255,0.1)',
                   backgroundColor: marked[i] === 'good' ? 'rgba(6, 214, 160, 0.1)' : marked[i] === 'bad' ? 'rgba(255, 75, 75, 0.1)' : 'rgba(0,0,0,0.4)'
                 }}
                 className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-[10px] fw-bold shadow-xl transition-all ${current.focus === i ? 'ring-4 ring-primary/20' : ''}`}
               >
                  {i}
               </motion.div>
               {marked[i] && (
                 <motion.span 
                   initial={{ y: 20, opacity: 0 }} 
                   animate={{ y: 0, opacity: 1 }}
                   className={`text-[8px] fw-black uppercase tracking-widest ${marked[i] === 'good' ? 'text-git' : 'text-danger'}`}
                 >
                   {marked[i]}
                 </motion.span>
               )}
               {current.focus === i && (
                 <motion.div layoutId="cursor" className="absolute -top-10 text-primary animate-bounce">
                    <ArrowUp size={20} />
                 </motion.div>
               )}
            </div>
          ))}
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4 mt-2">
          <p className="text-sm text-white/90 leading-relaxed fw-medium">{current.desc}</p>
          <div className="bg-black/80 border border-white/5 rounded-xl p-4 flex items-center gap-3 overflow-x-auto min-w-0 scrollbar-hide">
             <TermIcon size={18} className="text-muted shrink-0" />
             <code className="text-[11px] sm:text-sm font-mono text-primary fw-bold whitespace-nowrap pr-6">
                <span className="text-muted opacity-50 mr-2">$</span>
                {current.cmd}
             </code>
          </div>
       </div>
    </div>
  )
}
