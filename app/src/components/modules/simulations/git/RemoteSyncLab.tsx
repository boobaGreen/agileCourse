import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, RotateCcw, Terminal as TermIcon, Laptop, Cloud, Search } from 'lucide-react'

interface LabStep {
  title: string
  desc: string
  cmd: string
  label?: string
  local: string[]
  remote: string[]
  tracking: string[]
}

export function RemoteSyncLab() {
  const [step, setStep] = useState(0)

  const steps: LabStep[] = [
    {
      title: "1. Divergence",
      desc: "You have a new local commit (C2), but your teammate has already pushed (T1) to the server. You are out of sync!",
      cmd: "git status",
      label: "Inspect repository",
      local: ['C1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1']
    },
    {
      title: "2. The Fetch",
      desc: "Git downloads the teammate's commit (T1) into your 'Remote Tracking' branch (origin/main) so you can see it safely.",
      cmd: "git fetch origin",
      label: "Download updates",
      local: ['C1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1', 'T1']
    },
    {
      title: "3. The Integration",
      desc: "Merge the remote changes into your local branch. Now your history contains both your work (C2) and theirs (T1).",
      cmd: "git merge origin/main",
      label: "Sync history",
      local: ['C1', 'T1', 'C2'],
      remote: ['C1', 'T1'],
      tracking: ['C1', 'T1']
    },
    {
      title: "4. The Push",
      desc: "Now that you are up-to-date, you can safely push your commit (C2) to the server for the whole team to see.",
      cmd: "git push origin",
      label: "Update server",
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

       <div className="w-full bg-black/40 rounded-3xl p-3 sm:p-6 border border-white/5 flex flex-col gap-2 sm:gap-4 z-10 backdrop-blur-sm mt-2 sm:mt-4">
          <p className="text-[11px] sm:text-base text-white/80 leading-relaxed fw-medium italic text-center sm:text-left">"{current.desc}"</p>
          
          <div className="flex flex-col gap-2">
             {current.label && (
               <div className="flex items-center gap-2 px-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                 <span className="text-[9px] sm:text-[10px] fw-black text-secondary/60 uppercase tracking-[0.2em]">{current.label}</span>
               </div>
             )}
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
    </div>
  )
}
