import { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, BADGES } from '../store/useAppStore'
import { Zap, CheckCircle, Award, RotateCcw, GitBranch, Package, Ship, BarChart3 } from 'lucide-react'
import { GIT_MODULES } from '../data/git/modules/index'
import { DOCKER_MODULES } from '../data/docker/modules/index'
import { K8S_MODULES } from '../data/k8s/modules/index'
import type { Module } from '../data/types'
import { 
  BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts'

export default function ProfilePage() {
  const { userName, xp, completedModules, quizScores, badges, resetProgress } = useAppStore()
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const gitCompleted = completedModules.filter((m) => m.startsWith('git-')).length
  const totalGit = GIT_MODULES.length
  const gitPct = Math.round((gitCompleted / totalGit) * 100)

  const dockerCompleted = completedModules.filter((m) => m.startsWith('docker-')).length
  const totalDocker = DOCKER_MODULES.length
  const dockerPct = Math.round((dockerCompleted / totalDocker) * 100)

  const k8sCompleted = completedModules.filter((m) => m.startsWith('k8s-')).length
  const totalK8s = K8S_MODULES.length
  const k8sPct = Math.round((k8sCompleted / totalK8s) * 100)

  const quizCount = Object.keys(quizScores).length
  const avgScore = quizCount > 0 
    ? Math.round(Object.values(quizScores).reduce((a, b) => a + b, 0) / quizCount * 10)
    : 0

  const trackXPData = useMemo(() => [
    { name: 'Git', xp: completedModules.filter(m => m.startsWith('git-')).length * 50, color: 'var(--color-git)' },
    { name: 'Docker', xp: completedModules.filter(m => m.startsWith('docker-')).length * 50, color: 'var(--color-docker)' },
    { name: 'Kubernetes', xp: completedModules.filter(m => m.startsWith('k8s-')).length * 50, color: 'var(--color-k8s)' },
  ], [completedModules])

  return (
    <div className="animate-fade-up w-full">
      <div className="mb-8">
        <h1 className="text-3xl fw-black text-white">My Profile</h1>
        <p className="text-muted">Tracking your DevOps expertise</p>
      </div>

      {/* Hero Stats Card */}
      <div className="card p-8 md:p-12 md:py-16 flex flex-col items-center justify-center mb-10 overflow-hidden relative text-center border-t border-t-white/10">
        {/* Glow effect centered behind avatar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-md h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Avatar */}
        <div className="relative mb-6 z-10 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-git via-docker to-k8s rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-surface border-4 border-white/20 flex items-center justify-center text-5xl md:text-6xl flex-col shadow-[0_0_40px_rgba(0,0,0,0.5)]">
             <span className="animate-float">🧑‍🚀</span>
          </div>
        </div>
        
        {/* Name and Tag */}
        <div className="z-10 mb-10 w-full">
          <h2 className="text-4xl md:text-6xl fw-black text-white mb-4 tracking-tight">{userName}</h2>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
             <span className="text-xs fw-bold text-sub uppercase tracking-wider">Agile Internal Learner</span>
          </div>
        </div>

        {/* Stats Divider */}
        <div className="flex items-center justify-center gap-10 md:gap-16 w-full max-w-lg border-t border-white/5 pt-8 z-10">
          <div className="text-center w-32">
            <p className="text-muted text-[10px] md:text-xs fw-black uppercase tracking-widest mb-2">Total Experience</p>
            <p className="text-4xl md:text-5xl fw-black text-xp flex items-center justify-center gap-2">
              <Zap size={28} className="text-xp" /> {xp}
            </p>
          </div>
          
          <div className="w-px h-16 bg-white/10 hidden sm:block" />
          
          <div className="text-center w-32">
            <p className="text-muted text-[10px] md:text-xs fw-black uppercase tracking-widest mb-2">Current Level</p>
            <p className="text-4xl md:text-5xl fw-black text-white">
              {Math.floor(xp / 100) + 1}
            </p>
          </div>
        </div>
      </div>

      {/* Track XP Chart */}
      <div className="card p-6 mb-10 bg-surface/40">
        <h3 className="text-xs fw-black text-muted uppercase tracking-widest flex items-center gap-2 mb-6">
          <BarChart3 size={14} className="text-primary" /> Track XP Distribution
        </h3>
        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trackXPData} layout="vertical" margin={{ left: 80, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'white', fontWeight: 'bold', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px' }}
              />
              <Bar dataKey="xp" radius={[0, 4, 4, 0]} barSize={30}>
                {trackXPData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="page-grid-4 mb-12">
        {[
          { label: 'Git Progress', value: `${gitPct}%`, icon: GitBranch, color: 'var(--color-git)', sub: `${gitCompleted}/${totalGit} modules` },
          { label: 'Docker Progress', value: `${dockerPct}%`, icon: Package, color: 'var(--color-docker)', sub: `${dockerCompleted}/${totalDocker} modules` },
          { label: 'K8s Progress', value: `${k8sPct}%`, icon: Ship, color: 'var(--color-k8s)', sub: `${k8sCompleted}/${totalK8s} modules` },
          { label: 'Avg Quiz', value: `${avgScore}%`, icon: CheckCircle, color: 'var(--color-green)', sub: `${quizCount} attempts` },
        ].map((s, i) => (
          <div key={i} className="stat-card p-6 border border-border/50 bg-surface/50 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} style={{ color: s.color }} />
              <span className="text-muted text-xs md:text-sm fw-bold uppercase">{s.label}</span>
            </div>
            <p className="text-3xl md:text-4xl fw-black text-white mb-1">{s.value}</p>
            <p className="text-xs md:text-sm text-sub">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Learning Progress Table/List */}
      <div className="page-grid-3 mb-16">
        {/* Git Tracker */}
        <div className="card p-5">
           <h3 className="text-white fw-bold mb-4 flex items-center gap-2 text-sm">
            <GitBranch size={16} className="text-git" /> Git Curriculum
          </h3>
          <div className="progress-bar mb-4">
            <motion.div className="progress-fill" style={{ background: 'var(--color-git)' }} initial={{ width: 0 }} animate={{ width: `${gitPct}%` }} />
          </div>
          <div className="flex flex-col gap-2">
            {GIT_MODULES.map((m) => (
              <ModuleTinyCard key={m.id} m={m} isDone={completedModules.includes(m.id)} />
            ))}
          </div>
        </div>

        {/* Docker Tracker */}
        <div className="card p-5">
           <h3 className="text-white fw-bold mb-4 flex items-center gap-2 text-sm">
            <Package size={16} className="text-docker" /> Docker Curriculum
          </h3>
          <div className="progress-bar mb-4">
            <motion.div className="progress-fill" style={{ background: 'var(--color-docker)' }} initial={{ width: 0 }} animate={{ width: `${dockerPct}%` }} />
          </div>
          <div className="flex flex-col gap-2">
            {DOCKER_MODULES.map((m) => (
              <ModuleTinyCard key={m.id} m={m} isDone={completedModules.includes(m.id)} />
            ))}
          </div>
        </div>

        {/* K8s Tracker */}
        <div className="card p-5">
           <h3 className="text-white fw-bold mb-4 flex items-center gap-2 text-sm">
            <Ship size={16} className="text-k8s" /> K8s Curriculum
          </h3>
          <div className="progress-bar mb-4">
            <motion.div className="progress-fill" style={{ background: 'var(--color-k8s)' }} initial={{ width: 0 }} animate={{ width: `${k8sPct}%` }} />
          </div>
          <div className="flex flex-col gap-2">
            {K8S_MODULES.map((m) => (
              <ModuleTinyCard key={m.id} m={m} isDone={completedModules.includes(m.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Badge Trophy Case */}
      <div className="mb-10" id="badges">
        <h3 className="text-white fw-bold mb-6 flex items-center gap-2">
          <Award size={20} className="text-k8s" /> Achievement Gallery
        </h3>
        <div className="page-grid-4">
          {Object.values(BADGES).map((b, i) => {
            const hasIt = badges.find(eb => eb.id === b.id)
            return (
              <div key={b.id} className={`card p-5 text-center transition-all ${!hasIt ? 'opacity-20 grayscale' : 'border-purple-500/30'}`}>
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${i * 0.15}s` }}>{b.emoji}</div>
                <h4 className="text-white fw-black text-sm md:text-base mb-1">{b.title}</h4>
                <p className="text-muted text-[10px] md:text-xs uppercase fw-bold">{b.description}</p>
                {hasIt?.earnedAt && (
                   <div className="mt-4 pt-4 border-t border-border text-[9px] md:text-[10px] text-sub uppercase tracking-wider">
                     Unlocked {new Date(hasIt.earnedAt).toLocaleDateString()}
                   </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-6 border-red-900/30 bg-red-900/5">
        <h3 className="text-white fw-bold mb-2 flex items-center gap-2">
          <RotateCcw size={18} className="text-red-400" /> Data Management
        </h3>
        <p className="text-sub text-sm mb-6">Resetting your progress will permanently remove all XP, badges, and completed modules.</p>
        <button onClick={() => setShowConfirmModal(true)} className="btn btn-danger text-xs px-6">
          Wipe Progress Data
        </button>
      </div>

      {/* Custom Confirmation Modal */}
      {createPortal(
        <AnimatePresence>
          {showConfirmModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               onClick={() => setShowConfirmModal(false)}
            />
            <motion.div
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="card p-8 max-w-md w-full relative z-10 border border-red-500/30 shadow-2xl"
               style={{ background: 'var(--color-surface)' }}
            >
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 mx-auto">
                <RotateCcw size={28} />
              </div>
              <h3 className="text-2xl fw-black text-white text-center mb-2">Erase all progress?</h3>
              <p className="text-muted text-sm text-center mb-8 leading-relaxed">
                This action is irreversible. All your <strong className="text-xp">XP</strong>, badges, and completed modules will be 
                <span className="text-red-400"> permanently wiped</span> from the system.
              </p>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowConfirmModal(false)} className="flex-1 btn bg-surface2 text-white border border-border hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={() => { resetProgress(); setShowConfirmModal(false); }} 
                  className="flex-1 btn bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Yes, wipe it
                </button>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

function ModuleTinyCard({ m, isDone }: { m: Module, isDone: boolean }) {
  return (
    <div className="p-3 md:p-4 rounded-xl border flex items-center gap-3 transition-colors"
      style={{ 
        background: isDone ? 'rgba(34,197,94,0.05)' : 'var(--color-surface2)',
        borderColor: isDone ? 'rgba(34,197,94,0.2)' : 'var(--color-border)',
        opacity: isDone ? 1 : 0.6
      }}
    >
      <span className="text-xl md:text-2xl">{isDone ? '✅' : '⏳'}</span>
      <div className="flex-1 overflow-hidden">
        <p className={`text-xs fw-black truncate mb-0.5 ${isDone ? 'text-green' : 'text-sub'}`}>Module {m.order}</p>
        <p className="text-muted text-xs md:text-sm truncate fw-med">{m.title}</p>
      </div>
    </div>
  )
}
