import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

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
