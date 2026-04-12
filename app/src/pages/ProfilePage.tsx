import { motion } from 'framer-motion'
import { useAppStore, BADGES } from '../store/useAppStore'
import { Zap, CheckCircle, Award, RotateCcw, GitBranch, Package, Ship } from 'lucide-react'
import { GIT_MODULES } from '../data/git/modules'
import { DOCKER_MODULES } from '../data/docker/modules'
import { K8S_MODULES } from '../data/k8s/modules'

export default function ProfilePage() {
  const { userName, xp, completedModules, quizScores, badges, resetProgress } = useAppStore()

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

  return (
    <div className="animate-fade-up w-full">
      <div className="mb-8">
        <h1 className="text-3xl fw-black text-white">My Profile</h1>
        <p className="text-muted">Tracking your DevOps expertise</p>
      </div>

      {/* Hero Stats Card */}
      <div className="card p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl fw-black text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), #818cf8)' }}>
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl fw-black text-white mb-1">{userName}</h2>
          <p className="text-sub text-sm">Agile Internal Learner • Level 1</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-4xl fw-black text-xp flex items-center justify-center sm:justify-end gap-2">
            <Zap size={28} /> {xp}
          </p>
          <p className="text-xs text-muted fw-bold uppercase px-1">Total Experience Points</p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="page-grid-4 mb-8">
        {[
          { label: 'Git Progress', value: `${gitPct}%`, icon: GitBranch, color: 'var(--color-git)', sub: `${gitCompleted}/${totalGit} modules` },
          { label: 'Docker Progress', value: `${dockerPct}%`, icon: Package, color: 'var(--color-docker)', sub: `${dockerCompleted}/${totalDocker} modules` },
          { label: 'K8s Progress', value: `${k8sPct}%`, icon: Ship, color: 'var(--color-k8s)', sub: `${k8sCompleted}/${totalK8s} modules` },
          { label: 'Avg Quiz', value: `${avgScore}%`, icon: CheckCircle, color: 'var(--color-green)', sub: `${quizCount} attempts` },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              {/* @ts-ignore */}
              <Zap size={14} style={{ color: s.color }} />
              <span className="text-muted text-xs fw-bold uppercase">{s.label}</span>
            </div>
            <p className="text-2xl fw-black text-white">{s.value}</p>
            <p className="text-xs text-sub">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Learning Progress Table/List */}
      <div className="page-grid-2 mb-10">
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
            <Container size={16} className="text-docker" /> Docker Curriculum
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
      <div className="mb-10">
        <h3 className="text-white fw-bold mb-6 flex items-center gap-2">
          <Award size={20} className="text-k8s" /> Achievement Gallery
        </h3>
        <div className="page-grid-4">
          {Object.values(BADGES).map((b) => {
            const hasIt = badges.find(eb => eb.id === b.id)
            return (
              <div key={b.id} className={`card p-5 text-center transition-all ${!hasIt ? 'opacity-20 grayscale' : 'border-purple-500/30'}`}>
                <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${Math.random()}s` }}>{b.emoji}</div>
                <h4 className="text-white fw-bold text-xs mb-1">{b.title}</h4>
                <p className="text-muted text-[10px] uppercase fw-med">{b.description}</p>
                {hasIt?.earnedAt && (
                   <div className="mt-3 pt-3 border-t border-border text-[9px] text-sub uppercase tracking-wider">
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
        <button onClick={() => { if(confirm('Erase all progress?')) resetProgress() }} className="btn btn-danger text-xs px-6">
          Wipe Progress Data
        </button>
      </div>
    </div>
  )
}

function ModuleTinyCard({ m, isDone }: { m: any, isDone: boolean }) {
  return (
    <div className="p-2.5 rounded-xl border flex items-center gap-3 transition-colors"
      style={{ 
        background: isDone ? 'rgba(34,197,94,0.05)' : 'var(--color-surface2)',
        borderColor: isDone ? 'rgba(34,197,94,0.2)' : 'var(--color-border)',
        opacity: isDone ? 1 : 0.6
      }}
    >
      <span className="text-lg">{isDone ? '✅' : '⏳'}</span>
      <div className="flex-1 overflow-hidden">
        <p className={`text-[10px] fw-bold truncate ${isDone ? 'text-green' : 'text-sub'}`}>M{m.order}</p>
        <p className="text-muted text-[10px] truncate">{m.title}</p>
      </div>
    </div>
  )
}
