import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle } from 'lucide-react'

export function EducationAnimation({ type }: { type: string }) {
  const [input, setInput] = useState('Git')

  const hash = useMemo(() => {
    // Simple but deterministic hash for educational visual demo
    if (!type.includes('SHA')) return ''
    let h1 = 0x811c9dc5, h2 = 0xad3f3d1e
    for (let i = 0; i < input.length; i++) {
      h1 = Math.imul(h1 ^ input.charCodeAt(i), 16777619)
      h2 = Math.imul(h2 ^ input.charCodeAt(i), 0x5bd1e995)
    }
    const s1 = (h1 >>> 0).toString(16).padStart(8, '0')
    const s2 = (h2 >>> 0).toString(16).padStart(8, '0')
    const s3 = ((Math.imul(h1, h2) >>> 0).toString(16) + 'abcdef0123456789').slice(0, 24)
    return (s1 + s2 + s3).slice(0, 40)
  }, [input, type])
  
  if (type.includes('SHA')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-4">
         <div className="flex items-center justify-between">
           <div className="text-[10px] text-muted uppercase fw-black tracking-widest">Avalanche Effect Simulator</div>
           <div className="flex gap-2">
              <button 
                onClick={() => setInput('Git')} 
                className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted hover:text-white transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={() => setInput(input === 'Git' ? 'Git!' : 'Git')} 
                className="text-[9px] px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all fw-bold"
              >
                Change 1 char
              </button>
           </div>
         </div>
         <div className="relative group">
           <input 
             value={input} 
             onChange={e => setInput(e.target.value)}
             className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-center text-sm font-medium focus:border-primary/50 outline-none transition-all shadow-inner"
             placeholder="Type message here..."
           />
           <Sparkles size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
         </div>
         
         <div className="bg-surface p-5 rounded-2xl border border-primary/20 flex flex-col items-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} className="text-primary" />
              <span className="text-[10px] text-primary fw-black uppercase tracking-widest">Git Snapshot ID (SHA-1)</span>
            </div>
            <div className="w-full hidden sm:flex justify-center">
              <div className="mono text-[11px] sm:text-xs text-xp tracking-widest bg-black/40 py-3 px-4 rounded-xl border border-white/10 text-center flex flex-row shadow-inner w-full min-w-0 overflow-hidden items-center justify-center">
                <div className="whitespace-nowrap">
                  {hash.substring(0, 20).split('').map((char, i) => (
                    <motion.span 
                      key={`${input}-${i}`}
                      initial={{ opacity: 0, scale: 0.5 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ delay: i * 0.005 }}
                      className={/[a-f]/.test(char) ? 'text-primary/80' : 'text-xp'}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="whitespace-nowrap">
                  {hash.substring(20, 40).split('').map((char, j) => {
                    const i = j + 20;
                    return (
                      <motion.span 
                        key={`${input}-${i}`}
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: i * 0.005 }}
                        className={/[a-f]/.test(char) ? 'text-primary/80' : 'text-xp'}
                      >
                        {char}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 opacity-50">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-[9px] text-muted fw-bold uppercase">Integrity Verified</span>
            </div>
         </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('rolling') || type.toLowerCase().includes('update')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-6 items-center">
        <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Rolling Update Visualization</div>
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ backgroundColor: '#118ab2', y: 0 }}
              animate={{ backgroundColor: ['#118ab2', '#ffb703', '#06d6a0'], y: [0, -10, 0] }}
              transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              className="w-12 h-16 rounded-lg flex items-center justify-center text-white fw-black shadow-lg"
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                v1
              </motion.span>
              <motion.span
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1] }}
                transition={{ delay: i * 2, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                v2
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('container') || type.toLowerCase().includes('shipping')) {
    return (
      <div className="w-full max-w-sm flex flex-col gap-6 items-center">
        <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Build Once, Run Anywhere</div>
        <div className="flex items-center gap-4 w-full justify-between relative px-4">
          <div className="text-3xl">💻</div>
          
          <motion.div 
            className="absolute left-10 text-2xl z-10"
            animate={{ x: [0, 200], y: [0, -20, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            📦
          </motion.div>
          
          <div className="flex-1 border-b-2 border-dashed border-white/20 mx-4" />
          <div className="text-3xl">☁️</div>
        </div>
      </div>
    )
  }

  if (type.toLowerCase().includes('distributed') || type.toLowerCase().includes('network')) {
    return (
      <div className="w-full flex flex-col items-center gap-6 py-4">
        <div className="text-[10px] text-muted uppercase fw-black tracking-widest text-center">Distributed Architecture</div>
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Central Cloud (The concept of a shared remote) */}
          <motion.div 
            animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-4xl z-20 bg-surface rounded-full p-4 border border-white/10 shadow-[0_0_30px_rgba(17,138,178,0.2)]"
          >
            ☁️
          </motion.div>
          
          {/* Connection lines from center to peers */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 200 200">
             {[0, 45, 135, 180, 225, 315].map((angle, i) => {
                const r = 85;
                const rad = (angle - 90) * (Math.PI / 180);
                const x = 100 + Math.cos(rad) * r;
                const y = 100 + Math.sin(rad) * r;
                return (
                  <motion.line 
                    key={i}
                    x1="100" y1="100" x2={x} y2={y} 
                    stroke="var(--color-primary)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                  />
                );
             })}
          </svg>
          
          {/* Peer Nodes around */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const r = 75;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = Math.cos(rad) * r;
            const y = Math.sin(angle === 180 ? rad + 0.1 : rad) * r; // Tiny jitter
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                style={{ 
                  position: 'absolute',
                  left: `calc(50% + ${x}px - 16px)`, 
                  top: `calc(50% + ${y}px - 16px)` 
                }}
                className="flex flex-col items-center group cursor-help"
              >
                <div className="text-xl sm:text-2xl bg-surface2 rounded-xl p-2 border border-white/5 shadow-lg group-hover:border-primary/50 transition-colors">
                  {i === 0 ? '👩‍💻' : i === 3 ? '👨‍💻' : '💻'}
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-[7px] text-primary/70 fw-black uppercase mt-1 tracking-tighter"
                >
                  FULL COPY
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    )
  }

  // Fallback
  return null
}
