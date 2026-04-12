import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { Trophy, Zap } from 'lucide-react'

interface Entry { name: string; xp: number; timestamp: string }

function getEntries(): Entry[] {
  try {
    return JSON.parse(localStorage.getItem('leaderboard-v1') || '[]')
  } catch { return [] }
}

function saveEntries(entries: Entry[]) {
  localStorage.setItem('leaderboard-v1', JSON.stringify(entries))
}

export default function LeaderboardPage() {
  const { userName, xp } = useAppStore()
  const [entries] = useState<Entry[]>(() => {
    const all = getEntries()
    const idx = all.findIndex((e) => e.name === userName)
    if (idx >= 0) { all[idx] = { name: userName, xp, timestamp: new Date().toISOString() } }
    else all.push({ name: userName, xp, timestamp: new Date().toISOString() })
    const sorted = all.sort((a, b) => b.xp - a.xp)
    saveEntries(sorted)
    return sorted
  })

  const myRank = entries.findIndex((e) => e.name === userName) + 1
  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="animate-fade-up w-full">
      <div className="mb-8">
        <h1 className="text-3xl fw-black text-white flex items-center gap-3">
          <Trophy size={28} className="text-xp" /> Hall of Fame
        </h1>
        <p className="text-muted mt-1">Local session rankings (Shared board in v2.0)</p>
      </div>

      {/* Hero Rank Card */}
      <div className="card p-6 border-purple-500/30 flex items-center gap-6 mb-8 bg-surface2">
        <div className="text-4xl sm:text-5xl">
          {myRank <= 3 ? medals[myRank - 1] : '📈'}
        </div>
        <div className="flex-1">
          <p className="text-muted text-xs uppercase fw-bold tracking-widest mb-1">Your Standing</p>
          <h2 className="text-2xl fw-black text-white">Ranked #{myRank}</h2>
          <p className="text-sub text-sm mt-1">{userName}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl fw-black text-xp flex items-center gap-1">
            <Zap size={20} /> {xp}
          </p>
          <p className="text-xs text-muted uppercase">Points</p>
        </div>
      </div>

      {/* Leaderboard Table View */}
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center px-6 py-4 border-b border-border bg-surface2/50 text-[10px] fw-black text-muted uppercase tracking-widest">
          <div className="w-12">Rank</div>
          <div className="flex-1">Learner</div>
          <div className="w-20 text-right">Experience</div>
        </div>
        
        <div className="flex flex-col">
          {entries.map((entry, i) => {
            const isFirst = i === 0;
            const isMe = entry.name === userName;

            return (
              <motion.div
                key={entry.name}
                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ 
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className={`flex items-center px-6 py-5 border-b last:border-0 border-white/5 group transition-all relative
                  ${isMe ? 'bg-primary/10' : 'hover:bg-white/[0.03]'}
                  ${isFirst ? 'border-l-4 border-l-xp' : ''}
                `}
              >
                {isFirst && (
                  <div className="absolute inset-0 bg-gradient-to-r from-xp/10 to-transparent pointer-events-none" />
                )}
                
                <div className="w-12 text-sm fw-black text-muted flex items-center">
                  {i < 3 ? (
                    <motion.span 
                      animate={isFirst ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="text-xl"
                    >
                      {medals[i]}
                    </motion.span>
                  ) : (
                    <span className="opacity-40">#{i + 1}</span>
                  )}
                </div>
                
                <div className="flex-1 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs fw-black
                    ${isFirst ? 'bg-xp text-black' : 'bg-surface2 text-sub'}
                  `}>
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className={`text-sm fw-bold ${isMe || isFirst ? 'text-white' : 'text-sub'}`}>
                      {entry.name}
                      {isMe && <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[9px] uppercase fw-black">You</span>}
                    </p>
                    {isFirst && <p className="text-[9px] text-xp uppercase fw-black tracking-widest mt-0.5">Grand Master</p>}
                  </div>
                </div>

                <div className="w-24 text-right">
                   <div className="flex justify-end items-center gap-1.5">
                     <Zap size={14} className={isFirst ? "text-xp animate-pulse" : "text-sub"} />
                     <span className={`text-sm fw-black ${isFirst ? 'text-xp text-lg' : 'text-white'}`}>{entry.xp}</span>
                   </div>
                   <p className="text-[9px] text-muted uppercase fw-bold">Points</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {entries.length === 0 && (
          <div className="p-10 text-center text-muted">No learners recorded yet.</div>
        )}
      </div>

      <p className="mt-8 text-center text-muted text-xs leading-relaxed max-w-sm mx-auto">
        This leaderboard tracks individual progress stored in your browser. 
        Soon we'll connect a backend for real-time company-wide rankings!
      </p>
    </div>
  )
}
