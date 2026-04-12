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
          {entries.map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center px-6 py-4 border-b last:border-0 border-border group transition-colors ${entry.name === userName ? 'bg-primary/5' : 'hover:bg-white/5'}`}
            >
              <div className="w-12 text-sm fw-black text-muted">
                {i < 3 ? medals[i] : `#${i + 1}`}
              </div>
              <div className="flex-1">
                <p className={`text-sm fw-bold ${entry.name === userName ? 'text-white' : 'text-sub'}`}>
                  {entry.name}
                  {entry.name === userName && <span className="ml-2 tag badge-pill bg-purple-500/20 text-purple-400">You</span>}
                </p>
              </div>
              <div className="w-20 text-right text-xp fw-black text-sm flex items-center justify-end gap-1">
                 <Zap size={14} /> {entry.xp}
              </div>
            </motion.div>
          ))}
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
