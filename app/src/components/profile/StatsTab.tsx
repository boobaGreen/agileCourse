import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Zap, CheckCircle, Award, BarChart3, GitBranch, Package, Ship } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { useAppStore, BADGES } from '../../store/useAppStore'
import { GIT_MODULES } from '../../data/git/modules/index'
import { DOCKER_MODULES } from '../../data/docker/modules/index'
import { K8S_MODULES } from '../../data/k8s/modules/index'
import { ModuleTinyCard } from './ModuleTinyCard'
import { useLanguage } from '../../contexts/LanguageContext'

export function StatsTab() {
  const { t, resolveString } = useLanguage()
  const { userName, xp, completedModules, quizScores, badges } = useAppStore()

  const gitCompleted = completedModules.filter((m) => m.startsWith('git-')).length
  const totalGit = GIT_MODULES.length
  const gitPct = Math.round((gitCompleted / totalGit) * 100)

  const dockerCompleted = completedModules.filter((m) => m.startsWith('docker-')).length
  const totalDocker = DOCKER_MODULES.length
  const dockerPct = Math.round((dockerCompleted / totalDocker) * 100)

  const k8sCompleted = completedModules.filter((m) => m.startsWith('k8s-')).length
  const totalK8s = K8S_MODULES.length
  const k8sPct = Math.round((k8sCompleted / totalK8s) * 100)

  const allModules = useMemo(() => [...GIT_MODULES, ...DOCKER_MODULES, ...K8S_MODULES], [])
  
  const quizCount = Object.keys(quizScores).length
  const avgScore = useMemo(() => {
    if (quizCount === 0) return 0
    
    let totalPct = 0
    let count = 0
    
    Object.entries(quizScores).forEach(([modId, score]) => {
      const mod = allModules.find(m => m.id === modId)
      if (mod && mod.quiz) {
        const pct = (score / mod.quiz.length) * 100
        totalPct += pct
        count++
      }
    })
    
    return count > 0 ? Math.round(totalPct / count) : 0
  }, [quizScores, allModules, quizCount])

  const trackXPData = useMemo(() => [
    { name: 'Git', xp: completedModules.filter(m => m.startsWith('git-')).length * 50, color: 'var(--color-git)' },
    { name: 'Docker', xp: completedModules.filter(m => m.startsWith('docker-')).length * 50, color: 'var(--color-docker)' },
    { name: 'Kubernetes', xp: completedModules.filter(m => m.startsWith('k8s-')).length * 50, color: 'var(--color-k8s)' },
  ], [completedModules])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-full"
    >
      {/* Hero Stats Card */}
      <div className="card p-8 md:p-12 md:py-16 flex flex-col items-center justify-center mb-10 overflow-hidden relative text-center border-t border-t-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-md h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative mb-6 z-10 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-git via-docker to-k8s rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-surface border-4 border-white/20 flex items-center justify-center text-5xl md:text-6xl flex-col shadow-[0_0_40px_rgba(0,0,0,0.5)]">
             <span className="animate-float">🧑‍🚀</span>
          </div>
        </div>
        
        <div className="z-10 mb-10 w-full">
          <h2 className="text-4xl md:text-6xl fw-black text-white mb-4 tracking-tight">{userName}</h2>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
             <span className="text-xs fw-bold text-sub uppercase tracking-wider">Agile Internal Learner</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-10 md:gap-16 w-full max-w-lg border-t border-white/5 pt-8 z-10">
          <div className="text-center w-32">
            <p className="text-muted text-[10px] md:text-xs fw-black uppercase tracking-widest mb-2">{t('stats.totalExperience')}</p>
            <p className="text-4xl md:text-5xl fw-black text-xp flex items-center justify-center gap-2">
              <Zap size={28} className="text-xp" /> {xp}
            </p>
          </div>
          
          <div className="w-px h-16 bg-white/10 hidden sm:block" />
          
          <div className="text-center w-32">
            <p className="text-muted text-[10px] md:text-xs fw-black uppercase tracking-widest mb-2">{t('stats.currentLevel')}</p>
            <p className="text-4xl md:text-5xl fw-black text-white">
              {Math.floor(xp / 100) + 1}
            </p>
          </div>
        </div>
      </div>

      {/* Track XP Chart */}
      <div className="card p-6 mb-10 bg-surface/40">
        <h3 className="text-xs fw-black text-muted uppercase tracking-widest flex items-center gap-2 mb-6">
          <BarChart3 size={14} className="text-primary" /> {t('stats.trackDistribution')}
        </h3>
        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trackXPData} layout="vertical" margin={{ left: 80, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'white', fontWeight: 'bold', fontSize: 12 }} />
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
          { label: t('stats.gitProgress'), value: `${gitPct}%`, icon: GitBranch, color: 'var(--color-git)', sub: `${gitCompleted}/${totalGit} ${t('stats.modules')}` },
          { label: t('stats.dockerProgress'), value: `${dockerPct}%`, icon: Package, color: 'var(--color-docker)', sub: `${dockerCompleted}/${totalDocker} ${t('stats.modules')}` },
          { label: t('stats.k8sProgress'), value: `${k8sPct}%`, icon: Ship, color: 'var(--color-k8s)', sub: `${k8sCompleted}/${totalK8s} ${t('stats.modules')}` },
          { label: t('stats.avgQuiz'), value: `${avgScore}%`, icon: CheckCircle, color: 'var(--color-green)', sub: `${quizCount} ${t('stats.attempts')}` },
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
          <Award size={20} className="text-k8s" /> {t('stats.achievementGallery')}
        </h3>
        <div className="page-grid-4">
          {Object.values(BADGES).map((b, i) => {
            const hasIt = badges.find(eb => eb.id === b.id)
            return (
              <div key={b.id} className={`card p-5 text-center transition-all ${!hasIt ? 'opacity-20 grayscale' : 'border-purple-500/30'}`}>
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${i * 0.15}s` }}>{b.emoji}</div>
                <h4 className="text-white fw-black text-sm md:text-base mb-1">{resolveString(b.title)}</h4>
                <p className="text-muted text-[10px] md:text-xs uppercase fw-bold">{resolveString(b.description)}</p>
                {hasIt?.earnedAt && (
                   <div className="mt-4 pt-4 border-t border-border text-[9px] md:text-[10px] text-sub uppercase tracking-wider">
                     {t('stats.unlocked')} {new Date(hasIt.earnedAt).toLocaleDateString()}
                   </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
