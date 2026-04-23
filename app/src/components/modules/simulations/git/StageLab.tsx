import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, RefreshCcw } from 'lucide-react'

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
