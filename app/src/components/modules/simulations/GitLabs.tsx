import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, ArrowRight, Zap, RotateCcw, 
  Terminal as TermIcon, Laptop, Cloud, 
  Search, CheckCircle, RefreshCcw, ArrowUp,
  ShieldCheck, Code2, Lightbulb, Trophy, LayoutGrid
} from 'lucide-react'

// Note: GitGraphSim is imported from its own directory
// but we will keep the labs that use it or are related to it here.


export function GitLabs({ type, onComplete }: { type: string, onComplete?: () => void }) {
  if (type.toLowerCase().includes('merge') || type.toLowerCase().includes('rebase')) {
    return <MergeRebaseLab />
  }

  if (type.toLowerCase().includes('remote') || type.toLowerCase().includes('sim')) {
    return <RemoteSyncLab />
  }
  
  if (type === 'git-force-danger') {
    return <ForcePushLab />
  }

  if (type === 'git-stage-lab') {
    return <StageLab />
  }

  if (type === 'git-head-lab') {
    return <HeadLab />
  }

  if (type === 'git-undo-lab') {
    return <UndoSandbox />
  }

  if (type === 'git-cherry-pick-lab') {
    return <CherryPickLab />
  }

  if (type === 'git-vs-manual') {
    return <ManualVsGitLab />
  }

  if (type === 'git-stash-lab') {
    return <StashLab />
  }

  if (type === 'git-bisect-lab') {
    return <BisectLab />
  }

  if (type === 'git-ignore-lab') {
    return <IgnoreLab onComplete={onComplete} />
  }

  if (type.toLowerCase().includes('core') || type === 'git-core-sim') {
    return <CoreConceptsLab />
  }

  return null
}

export function ManualVsGitLab() {
  const [count, setCount] = useState(1)
  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-surface/30 rounded-3xl border border-white/5">
       <div className="flex justify-between items-center px-4">
          <h4 className="text-[10px] fw-black text-muted uppercase tracking-widest">Scaling to {count} changes</h4>
          <button 
            onClick={() => setCount(c => Math.min(c + 1, 5))} 
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs fw-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 border border-white/10"
          >
            <Zap size={14} fill="currentColor" /> + ADD CHANGE
          </button>
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
             <span className="text-[9px] text-center text-danger fw-black uppercase">Manual Folder 📁</span>
             <div className="bg-black/40 rounded-2xl p-4 flex flex-col gap-1 min-h-[160px]">
                {Array.from({ length: count }).map((_, i) => (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} key={i} className="p-2 rounded-lg bg-surface2 border border-white/5 text-[9px] text-white font-mono flex items-center gap-2 overflow-hidden">
                     <span className="truncate break-all">📄 project_final{i > 0 ? `_v${i+1}` : ''}{i === count-1 ? '_REAL_FINAL' : ''}.zip</span>
                  </motion.div>
                ))}
             </div>
          </div>
          <div className="flex flex-col gap-3">
             <span className="text-[9px] text-center text-git fw-black uppercase">Git History 🐙</span>
             <div className="bg-black/40 rounded-2xl p-4 flex flex-col-reverse gap-4 min-h-[160px] relative">
                <div className="absolute left-[26px] top-6 bottom-6 w-[2px] bg-git/20" />
                {Array.from({ length: count }).map((_, i) => (
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} className="flex items-center gap-3 relative z-10">
                     <div className="w-4 h-4 rounded-full bg-git shadow-lg shadow-git/20" />
                     <div className="flex flex-col">
                        <span className="text-[8px] text-git font-mono fw-black uppercase">bc{i}f{i}a{i}</span>
                        <span className="text-[8px] text-white opacity-60">Feature {i+1} added</span>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
       </div>
    </div>
  )
}

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

export function RemoteSyncLab() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "1. Divergence",
      desc: "You have a new local commit (C2), but your teammate has already pushed (T1) to the server. You are out of sync!",
      cmd: "# Check remote status...",
      local: ['C1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1']
    },
    {
      title: "2. The Fetch",
      desc: "Git downloads the teammate's commit (T1) into your 'Remote Tracking' branch (origin/main) so you can see it safely.",
      cmd: "git fetch origin",
      local: ['C1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1', 'T1']
    },
    {
      title: "3. The Integration",
      desc: "Merge the remote changes into your local branch. Now your history contains both your work (C2) and theirs (T1).",
      cmd: "git merge origin/main",
      local: ['C1', 'T1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1', 'T1']
    },
    {
      title: "4. The Push",
      desc: "Now that you are up-to-date, you can safely push your commit (C2) to the server for the whole team to see.",
      cmd: "git push origin",
      local: ['C1', 'T1', 'C2'],
      remote: ['C1', 'T1', 'C2'],
      tracking: ['C1', 'T1', 'C2']
    }
  ]

  const current = steps[step]

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 p-3 sm:p-8 bg-surface/40 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden">
       <div className="absolute top-0 right-0 w-64 h-64 bg-git/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
       
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-0 sm:mb-2 z-10 gap-2 sm:gap-6">
          <div className="flex flex-col gap-0.5">
             <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded-full bg-secondary/20 text-[8px] sm:text-[10px] text-secondary fw-black uppercase tracking-wider border border-secondary/30">M5</span>
                <span className="text-[8px] sm:text-[10px] text-muted fw-bold uppercase tracking-widest">Lab • {step + 1}/4</span>
             </div>
             <h3 className="text-lg sm:text-2xl fw-black text-white tracking-tight leading-tight">{current.title}</h3>
          </div>
          <div className="flex gap-3">
             <button 
                disabled={step === 0} 
                onClick={() => setStep(s => s - 1)} 
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 active:scale-90 transition-all shadow-inner"
             >
                <ArrowLeft size={20} />
             </button>
             {step === steps.length - 1 ? (
                <button 
                   onClick={() => setStep(0)} 
                   className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-95 transition-all text-xs sm:text-sm fw-bold flex gap-2 items-center shadow-lg"
                >
                   <RotateCcw size={16} /> Restart
                </button>
             ) : (
                <button 
                   onClick={() => setStep(s => s + 1)} 
                   className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-git text-white shadow-[0_10px_30px_rgba(240,80,50,0.4)] hover:shadow-[0_15px_40px_rgba(240,80,50,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all text-xs sm:text-sm fw-black flex gap-2 items-center"
                >
                   Next <ArrowRight size={16} />
                </button>
             )}
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-12 mt-2 sm:mt-4 pt-2 sm:pt-4 relative min-h-[auto] sm:min-h-[300px] z-10">
          <div className="absolute top-[4.5rem] left-[25%] right-[25%] h-0.5 hidden md:block z-0">
             <svg className="w-full h-12 overflow-visible">
                <path d="M 0 6 L 200 6" className="stroke-white/10 stroke-[2] fill-none" strokeDasharray="4 4" />
                <AnimatePresence>
                   {(step === 1 || step === 3) && (
                      <motion.circle
                         initial={{ cx: step === 1 ? "100%" : "0%" }}
                         animate={{ cx: step === 1 ? "0%" : "100%" }}
                         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                         r="4"
                         cy="6"
                         className={step === 1 ? "fill-secondary shadow-[0_0_10px_rgba(var(--color-secondary),1)]" : "fill-git shadow-[0_0_10px_rgba(240,80,50,1)]"}
                      />
                   )}
                </AnimatePresence>
             </svg>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
             <div className="bg-surface2/40 rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-8 border border-white/10 flex flex-col gap-4 sm:gap-8 shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-git/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-2 sm:pb-5">
                   <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-git/10 text-git flex items-center justify-center shadow-lg border border-git/20">
                         <Laptop size={18} className="sm:hidden" />
                         <Laptop size={24} className="hidden sm:block" />
                      </div>
                      <div className="flex flex-col">
                         <div className="flex items-center gap-2">
                            <span className="text-[8px] sm:text-[10px] fw-black text-muted uppercase tracking-[0.2em] leading-none">Station</span>
                            <div className="flex items-center gap-1 sm:hidden">
                               <div className="w-1.5 h-1.5 rounded-full bg-git animate-pulse" />
                               <span className="text-[7px] fw-bold text-git/80 uppercase">Active</span>
                            </div>
                         </div>
                         <span className="text-xs sm:text-sm fw-black text-white">Local Repository</span>
                      </div>
                   </div>
                   <div className="hidden sm:flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-git animate-pulse" />
                      <span className="text-[10px] fw-bold text-git/80 uppercase">Active</span>
                   </div>
                </div>
                
                <div className="flex flex-col gap-10">
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-1 h-3 bg-git/50 rounded-full" />
                         <span className="text-[9px] fw-black text-white/40 uppercase tracking-widest">Master / Main Branch</span>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center">
                         <AnimatePresence mode="popLayout">
                            {current.local.map((c, i) => (
                              <motion.div 
                                 key={`local-node-${c}`}
                                 layoutId={`local-id-${c}`}
                                 initial={{ scale: 0, opacity: 0, y: 10 }}
                                 animate={{ scale: 1, opacity: 1, y: 0 }}
                                 exit={{ scale: 0, opacity: 0 }}
                                 transition={{ delay: i * 0.1, type: "spring", damping: 15 }}
                                 className="relative"
                              >
                                 <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono text-[8px] sm:text-[10px] fw-black border-2 transition-all duration-500 shadow-xl ${
                                    c === 'C2' 
                                    ? 'bg-git border-git text-white ring-4 ring-git/10' 
                                    : 'bg-surface border-white/20 text-muted/80'
                                 }`}>
                                    {c}
                                 </div>
                                 {i < current.local.length - 1 && (
                                    <div className="absolute top-1/2 -right-4 w-4 h-[2px] bg-white/5 -translate-y-1/2" />
                                 )}
                              </motion.div>
                            ))}
                         </AnimatePresence>
                      </div>
                   </div>

                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-1 h-3 bg-secondary/50 rounded-full" />
                         <span className="text-[9px] fw-black text-secondary/40 uppercase tracking-widest">Origin/Main (Mirror)</span>
                      </div>
                      <div className="flex flex-wrap gap-4 items-center">
                         <AnimatePresence mode="popLayout">
                            {current.tracking.map((c, i) => (
                              <motion.div 
                                 key={`track-node-${c}`}
                                 layoutId={`track-id-${c}`}
                                 initial={{ scale: 0, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 0.7 }}
                                 transition={{ delay: i * 0.1 }}
                                 className="relative"
                              >
                                 <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-dashed flex items-center justify-center font-mono text-[8px] sm:text-[9px] fw-black transition-all ${
                                    c === 'T1' ? 'border-secondary/60 text-secondary bg-secondary/5' : 'border-white/10 text-muted/30'
                                 }`}>
                                    {c}
                                 </div>
                              </motion.div>
                            ))}
                         </AnimatePresence>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
             <div className="bg-secondary/5 rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-8 border border-secondary/20 flex flex-col gap-4 sm:gap-8 shadow-xl relative overflow-hidden h-fit sm:h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="flex items-center justify-between border-b border-secondary/10 pb-2 sm:pb-5">
                   <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shadow-lg border border-secondary/20">
                         <Cloud size={18} className="sm:hidden" />
                         <Cloud size={24} className="hidden sm:block" />
                      </div>
                      <div className="flex flex-col">
                         <div className="flex items-center gap-2">
                           <span className="text-[8px] sm:text-[10px] fw-black text-secondary/40 uppercase tracking-[0.2em] leading-none">Server</span>
                           <div className="px-1.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 flex items-center gap-1 sm:hidden">
                              <div className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
                              <span className="text-[6px] fw-black text-secondary uppercase tracking-widest">Cloud</span>
                           </div>
                         </div>
                         <span className="text-xs sm:text-sm fw-black text-white">GitHub (Remote)</span>
                      </div>
                   </div>
                   <div className="hidden sm:flex px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      <span className="text-[8px] fw-black text-secondary uppercase tracking-widest">Cloud Sync</span>
                   </div>
                </div>

                <div className="flex-1 flex flex-col h-full items-center justify-center py-4">
                   <div className="flex flex-wrap gap-6 justify-center items-center">
                      <AnimatePresence mode="popLayout">
                         {current.remote.map((c, i) => (
                           <motion.div 
                              key={`remote-node-${c}`}
                              layoutId={`remote-id-${c}`}
                              initial={{ scale: 0, opacity: 0, x: 20 }}
                              animate={{ scale: 1.1, opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, type: "spring" }}
                              className="relative"
                           >
                              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-mono text-[9px] sm:text-[12px] fw-black border-2 shadow-2xl transition-all duration-700 ${
                                 c === 'T1' 
                                 ? 'bg-secondary/20 border-secondary text-secondary shadow-[0_0_30px_rgba(var(--color-secondary),0.3)]' 
                                 : c === 'C2' 
                                 ? 'bg-git/20 border-git text-git shadow-[0_0_30px_rgba(240,80,50,0.3)]' 
                                 : 'bg-black/60 border-white/10 text-muted/40'
                              }`}>
                                 {c}
                              </div>
                              {i < current.remote.length - 1 && (
                                 <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="absolute -right-6 top-1/2 w-6 h-[1px] bg-secondary/20 -translate-y-1/2" 
                                 />
                              )}
                           </motion.div>
                         ))}
                      </AnimatePresence>
                   </div>
                </div>

                <div className="mt-auto pt-2 sm:pt-6 border-t border-secondary/5 flex items-center justify-center gap-2 text-[8px] sm:text-[10px] fw-black text-secondary/30 uppercase tracking-[0.3em]">
                   <Search size={10} className="sm:hidden" />
                   <Search size={12} className="hidden sm:block" />
                   Remote Visibility
                </div>
             </div>
          </div>
       </div>

       <div className="w-full bg-black/40 rounded-3xl p-3 sm:p-6 border border-white/5 flex flex-col gap-2 sm:gap-5 z-10 backdrop-blur-sm mt-2 sm:mt-4">
          <p className="text-[11px] sm:text-base text-white/80 leading-relaxed fw-medium italic text-center sm:text-left">"{current.desc}"</p>
          <div className="bg-black/60 border border-white/10 rounded-2xl p-2 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-inner overflow-x-auto min-w-0 scrollbar-hide">
             <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <TermIcon size={14} className="sm:hidden" />
                <TermIcon size={18} className="hidden sm:block" />
             </div>
             <code className="text-[11px] sm:text-[15px] font-mono text-secondary fw-bold flex items-center gap-2 whitespace-nowrap pr-6">
                <span className="text-muted opacity-30 select-none">course @ git:</span>
                <span className="text-white">{current.cmd}</span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-5 bg-secondary/50 rounded-sm" />
             </code>
          </div>
       </div>
    </div>
  )
}

export function StageLab() {
    const [staged, setStaged] = useState<string[]>([])
    const [committed, setCommitted] = useState<string[]>([])
    const [files] = useState(['file1.js', 'file2.css', 'file3.html'])
    
    const isStaged = (f: string) => staged.includes(f)
    const isCommitted = (f: string) => committed.includes(f)
    
    const handleAdd = (f: string) => {
      if (isStaged(f)) return
      setStaged([...staged, f])
    }
    
    const handleCommit = () => {
      if (staged.length === 0) return
      setCommitted([...committed, ...staged])
      setStaged([])
    }

    const handleReset = () => {
      setStaged([])
      setCommitted([])
    }

    return (
      <div className="w-full flex flex-col gap-6 p-4 sm:p-6 bg-surface/30 rounded-3xl border border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:h-64">
           {/* Working Directory */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] fw-black text-danger uppercase tracking-widest text-center">Working Dir</span>
              <div className="flex-1 bg-black/40 rounded-2xl border border-danger/20 p-3 flex flex-col gap-2 relative">
                 {files.filter(f => !isStaged(f) && !isCommitted(f)).map(f => (
                   <motion.button 
                     layoutId={`file-${f}`}
                     key={f}
                     onClick={() => handleAdd(f)}
                     className="w-full p-3 bg-surface2 border border-danger/30 rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2 hover:bg-danger/20 hover:scale-105 active:scale-95 transition-all shadow-lg"
                   >
                     📄 {f}
                   </motion.button>
                 ))}
                 {files.filter(f => !isStaged(f) && !isCommitted(f)).length === 0 && (
                   <div className="absolute inset-0 flex items-center justify-center text-[9px] text-muted fw-bold opacity-50">Empty</div>
                 )}
              </div>
           </div>

           {/* Staging Area */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] fw-black text-primary uppercase tracking-widest text-center">Staging</span>
              <div className="flex-1 bg-black/40 rounded-2xl border border-primary/20 p-3 flex flex-col gap-2 relative">
                 {staged.map(f => (
                   <motion.div 
                     layoutId={`file-${f}`}
                     key={f}
                     className="w-full p-3 bg-surface2 border border-primary/30 rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2 shadow-lg"
                   >
                     📄 {f}
                   </motion.div>
                 ))}
                 {staged.length === 0 && (
                   <div className="absolute inset-0 flex items-center justify-center text-[9px] text-muted fw-bold opacity-50">Empty</div>
                 )}
              </div>
           </div>

           {/* Repository */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] fw-black text-git uppercase tracking-widest text-center">Repository</span>
              <div className="flex-1 bg-black/40 rounded-2xl border border-git/20 p-3 flex flex-col gap-2 relative">
                 {committed.map((f, i) => (
                   <motion.div 
                     layoutId={`file-${f}`}
                     key={f}
                     className="w-full p-3 bg-git border border-git rounded-xl text-[10px] fw-bold font-mono text-white flex items-center gap-2 shadow-lg shadow-git/20"
                     style={{ zIndex: i }}
                   >
                     <CheckCircle size={12} className="text-white/80" /> {f}
                   </motion.div>
                 ))}
                 {committed.length === 0 && (
                   <div className="absolute inset-0 flex items-center justify-center text-[9px] text-muted fw-bold opacity-50">Empty</div>
                 )}
              </div>
           </div>
        </div>
        
        <div className="flex justify-between items-start px-2 mt-4">
           <div className="text-[12px] text-white/70 max-w-[200px] leading-relaxed fw-med">
             {staged.length === 0 && committed.length === 0 && "1. Click a file in the Working Directory to add it to staging."}
             {staged.length > 0 && "2. Hit 'Git Commit' to save staged files to the repository permanently."}
             {committed.length > 0 && staged.length === 0 && "3. Committed! Files are safely stored."}
           </div>
           <div className="flex gap-2">
             <button 
               onClick={handleReset}
               className="p-3 rounded-xl bg-surface2 text-muted hover:text-white transition-all border border-white/5 active:scale-95"
               title="Reset Lab"
             >
               <RefreshCcw size={16} />
             </button>
             <button 
               disabled={staged.length === 0} 
               onClick={handleCommit} 
               className="px-6 py-3 rounded-xl bg-git text-white text-[12px] fw-black disabled:opacity-20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-git/20"
             >
               GIT COMMIT
             </button>
           </div>
        </div>
      </div>
    )
}

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

       {/* Narrative & Command Panel */}
        <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
           <div className="flex justify-between items-start">
              <p className="text-sm text-white/90 leading-relaxed fw-medium max-w-[70%]">
                 {currentStep.desc}
              </p>
              <div className="flex gap-2">
                 <button 
                   disabled={step === 0} 
                   onClick={() => setStep(s => s - 1)} 
                   className="p-2 rounded-xl bg-surface2 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-all"
                 >
                   <ArrowLeft size={16} />
                 </button>
                 <button 
                   disabled={step === currentScenario.length - 1} 
                   onClick={() => setStep(s => s + 1)} 
                   className={`px-4 py-2 rounded-xl text-white shadow-lg transition-all text-xs fw-bold flex gap-2 items-center ${mode === 'revert' ? 'bg-primary shadow-primary/20' : 'bg-danger shadow-danger/20'} disabled:opacity-30`}
                 >
                   Next <ArrowRight size={16} />
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

       <div className="bg-surface2/40 rounded-3xl border border-white/5 p-12 flex flex-col items-center justify-center gap-8 relative min-h-[220px]">
          <div className="flex items-center relative w-full justify-center">
             <AnimatePresence mode="popLayout">
                {currentStep.commits.map((c, i) => (
                   <motion.div key={c} layout className="flex items-center">
                     <motion.div 
                       layout
                       initial={{ scale: 0, opacity: 0, rotate: -45 }}
                       animate={{ scale: 1, opacity: 1, rotate: 0 }}
                       exit={{ scale: 0, opacity: 0, y: 50, rotate: 90, filter: 'blur(10px)' }}
                       transition={{ type: 'spring', damping: 20 }}
                       className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center text-[10px] fw-black font-mono shadow-xl relative z-10 transition-colors ${
                         c.includes('Error')
                            ? 'border-danger/40 bg-danger/10 text-danger/60 ' + (step === 2 && mode === 'revert' ? 'line-through' : '')
                            : c.includes('Fix')
                               ? 'border-primary bg-primary/20 text-primary shadow-primary/20' 
                               : 'border-git/50 bg-surface text-white shadow-git/10'
                       }`}
                     >
                        <span className="text-base">{c.split(' ')[0]}</span>
                        {c.includes('(') && <span className="text-[8px] opacity-70 uppercase tracking-widest mt-1">{c.split(' ')[1]?.replace(/[()]/g, '')}</span>}
                     </motion.div>
                     
                     {i < currentStep.commits.length - 1 && (
                       <motion.div layout initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="text-white/20 px-3">
                          <div className="h-1 w-8 bg-white/10 rounded-full" />
                       </motion.div>
                     )}
                   </motion.div>
                ))}
             </AnimatePresence>
          </div>
       </div>

    </div>
  )
}

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
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[10px] fw-bold border-2 ${c === 'C*' ? 'bg-xp border-xp text-black shadow-lg shadow-xp/30' : 'bg-surface border-white/10 text-muted'}`}
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

export function IgnoreLab({ onComplete }: { onComplete?: () => void }) {
  const [ignored, setIgnored] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isDone, setIsDone] = useState(false)
  
  const files = [
    { name: 'index.html', type: 'code', shouldIgnore: false, tip: "Keep! This is your project's heart." },
    { name: 'node_modules/', type: 'bulky', shouldIgnore: true, tip: "Ignore! It's too big and can be rebuilt via npm install." },
    { name: '.env', type: 'secret', shouldIgnore: true, tip: "IGNORE! Never share your API keys or passwords." },
    { name: 'style.css', type: 'code', shouldIgnore: false, tip: "Keep! Essential for your app's look." },
    { name: 'secrets.txt', type: 'secret', shouldIgnore: true, tip: "IGNORE! Private notes should never be on GitHub." },
    { name: 'dist/', type: 'bulky', shouldIgnore: true, tip: "Ignore! These are generated files, not source code." }
  ]

  const handleToggle = (name: string) => {
    if (isDone) return;
    const file = files.find(f => f.name === name)
    if (!file) return
    
    let newIgnored;
    if (ignored.includes(name)) {
      newIgnored = ignored.filter(n => n !== name);
    } else {
      newIgnored = [...ignored, name];
      setFeedback(file.tip);
      setTimeout(() => setFeedback(null), 3000);
    }
    
    setIgnored(newIgnored);
    
    // Check completion immediately
    const newScore = files.filter(f => (f.shouldIgnore && newIgnored.includes(f.name)) || (!f.shouldIgnore && !newIgnored.includes(f.name))).length;
    if (newScore === files.length) {
      setIsDone(true);
      if (onComplete) onComplete();
    }
  }

  const score = files.filter(f => (f.shouldIgnore && ignored.includes(f.name)) || (!f.shouldIgnore && !ignored.includes(f.name))).length;

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-[#0d1117]/80 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
       <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
             <span className="text-xs text-secondary font-black uppercase tracking-widest leading-none mb-2">Security Lab • .gitignore</span>
             <h3 className="text-xl font-black text-white">The Filtering Game</h3>
          </div>
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-[10px] font-black text-muted">
             ACCURACY: <span className={score === files.length ? 'text-[#06d6a0]' : 'text-primary'}>{Math.round((score/files.length)*100)}%</span>
          </div>
       </div>

       <div className="w-full bg-black/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-4">
          <p className="text-sm text-white/90 leading-relaxed font-medium">Click on the files you think should be **ignored** (kept out of Git).</p>
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold flex items-center gap-2"
              >
                <Lightbulb size={14} /> {feedback}
              </motion.div>
            )}
          </AnimatePresence>
       </div>

       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
          {files.map(f => (
            <motion.button
              key={f.name}
              onClick={() => handleToggle(f.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative ${
                ignored.includes(f.name) 
                  ? 'bg-black/60 border-[#06d6a0] shadow-lg shadow-[#06d6a0]/10' 
                  : 'bg-[#1c2128] border-white/5 hover:border-white/10 hover:bg-[#22272e]'
              }`}
            >
               <div className={`p-3 rounded-xl ${ignored.includes(f.name) ? 'bg-[#06d6a0]/10 text-[#06d6a0]' : 'bg-white/5 text-muted'}`}>
                  {f.type === 'secret' ? <ShieldCheck size={20} /> : f.type === 'bulky' ? <Cloud size={20} /> : <Code2 size={20} />}
               </div>
               <span className={`text-[10px] font-black uppercase tracking-wider ${ignored.includes(f.name) ? 'text-white' : 'text-muted'}`}>{f.name}</span>
               {ignored.includes(f.name) && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#06d6a0] text-black flex items-center justify-center shadow-lg shadow-[#06d6a0]/40">
                    <CheckCircle size={14} />
                 </motion.div>
               )}
            </motion.button>
          ))}
       </div>

       {score === files.length && (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#06d6a0]/10 border border-[#06d6a0]/20 p-4 rounded-xl flex items-center justify-center gap-3">
            <Trophy className="text-[#06d6a0]" size={20} />
            <span className="text-xs font-black text-[#06d6a0] uppercase tracking-widest italic">Mission Cleared! Your repo is safe and clean.</span>
         </motion.div>
       )}
    </div>
  )
}

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
