import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCcw } from 'lucide-react'

interface Commit {
  id: string
  number: number
  files: string[]
  colorClass: {
    border: string
    bg: string
    text: string
    badge: string
  }
}

const COMMIT_PALETTE = [
  { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
  { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
  { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
  { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' }
]

export function StageLab() {
    const [staged, setStaged] = useState<string[]>([])
    const [commits, setCommits] = useState<Commit[]>([])
    const [files] = useState(['file1.js', 'file2.css', 'file3.html'])
    
    const isStaged = (f: string) => staged.includes(f)
    const isCommitted = (f: string) => commits.some(c => c.files.includes(f))
    
    const handleAdd = (f: string) => {
      if (isStaged(f)) return
      setStaged([...staged, f])
    }
    
    const handleCommit = () => {
      if (staged.length === 0) return
      
      // Genera un breve hash esadecimale casuale
      const randomHash = Math.random().toString(16).substring(2, 8)
      const commitNumber = commits.length + 1
      const palette = COMMIT_PALETTE[commits.length % COMMIT_PALETTE.length]
      
      const newCommit: Commit = {
        id: randomHash,
        number: commitNumber,
        files: [...staged],
        colorClass: palette
      }
      
      setCommits([...commits, newCommit])
      setStaged([])
    }

    const handleReset = () => {
      setStaged([])
      setCommits([])
    }

    return (
      <div className="w-full flex flex-col gap-6 p-4 sm:p-6 bg-surface/30 rounded-3xl border border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:h-80">
           {/* Working Directory */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] fw-black text-danger uppercase tracking-widest text-center">Working Dir</span>
              <div className="flex-1 bg-black/40 rounded-2xl border border-danger/20 p-3 flex flex-col gap-2 relative overflow-y-auto scrollbar-thin">
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
              <div className="flex-1 bg-black/40 rounded-2xl border border-primary/20 p-3 flex flex-col gap-2 relative overflow-y-auto scrollbar-thin">
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
              <div className="flex-1 bg-black/40 rounded-2xl border border-git/20 p-3 flex flex-col gap-2 relative overflow-y-auto scrollbar-thin">
                 <AnimatePresence>
                    {commits.map((commit) => (
                      <motion.div 
                        key={commit.id}
                        initial={{ scale: 0.9, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className={`p-2.5 rounded-xl border ${commit.colorClass.border} ${commit.colorClass.bg} flex flex-col gap-1.5 shadow-lg relative`}
                      >
                         <div className="flex justify-between items-center border-b border-white/5 pb-1">
                            <span className="font-mono text-[9px] font-black uppercase tracking-wider text-white/90">
                               📦 commit {commit.id}
                            </span>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tight ${commit.colorClass.badge}`}>
                               Commit #{commit.number}
                            </span>
                         </div>
                         
                         <div className="flex flex-col gap-1">
                            {commit.files.map(f => (
                               <motion.div 
                                 layoutId={`file-${f}`}
                                 key={f}
                                 className={`p-1.5 rounded bg-black/40 border border-white/5 text-[9px] font-mono ${commit.colorClass.text} flex items-center gap-1.5`}
                               >
                                  📄 {f}
                               </motion.div>
                            ))}
                         </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
                 {commits.length === 0 && (
                   <div className="absolute inset-0 flex items-center justify-center text-[9px] text-muted fw-bold opacity-50">Empty</div>
                 )}
              </div>
           </div>
        </div>
        
        <div className="flex justify-between items-start px-2 mt-4">
           <div className="text-[12px] text-white/70 max-w-[240px] leading-relaxed fw-med">
             {staged.length === 0 && commits.length === 0 && "1. Click a file in the Working Directory to add it to staging."}
             {staged.length > 0 && "2. Hit 'Git Commit' to save staged files to the repository permanently."}
             {commits.length > 0 && staged.length === 0 && `3. Committed! You created Commit #${commits.length}.`}
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
