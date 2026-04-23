import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, ShieldCheck, Cloud, Code2, CheckCircle, Trophy } from 'lucide-react'

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
