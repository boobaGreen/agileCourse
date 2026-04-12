import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { GIT_MODULES } from '../data/git/modules'
import { DOCKER_MODULES } from '../data/docker/modules'
import { K8S_MODULES } from '../data/k8s/modules'
import { CheckCircle, Lock, Zap, Award, GitBranch, Package, Ship, ArrowRight } from 'lucide-react'

const tracks = [
  { id: 'git', icon: GitBranch, emoji: '🔴', label: 'Git', color: 'var(--color-git)', glow: 'rgba(249,115,22,0.2)', modules: GIT_MODULES, available: true },
  { id: 'docker', icon: Package, emoji: '🐳', label: 'Docker', color: 'var(--color-docker)', glow: 'rgba(56,189,248,0.2)', modules: DOCKER_MODULES, available: true },
  { id: 'k8s', icon: Ship, emoji: '☸️', label: 'Kubernetes', color: 'var(--color-k8s)', glow: 'rgba(167,139,250,0.2)', modules: K8S_MODULES, available: true },
]

export default function CourseDashboard() {
  const { userName, xp, completedModules, badges } = useAppStore()
  const [activeTrackId, setActiveTrackId] = useState('git')
  const navigate = useNavigate()

  const activeTrack = tracks.find(t => t.id === activeTrackId) || tracks[0]
  const currentModules = activeTrack.modules
  
  const trackCompleted = completedModules.filter((m) => m.startsWith(`${activeTrackId}-`)).length
  const totalModules = currentModules.length
  const progressPct = totalModules > 0 ? Math.round((trackCompleted / totalModules) * 100) : 0

  return (
    <div className="animate-fade-up">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl fw-black text-white mb-1">
          Hey {userName} 👋
        </h1>
        <p className="text-muted">Ready to level up your engineering skills?</p>
      </div>

      {/* Stats Dashboard */}
      <div className="page-grid-4 mb-8">
        {[
          { label: 'Total XP', value: xp, icon: Zap, color: 'var(--color-xp)' },
          { label: 'Modules Done', value: completedModules.length, icon: CheckCircle, color: '#22c55e' },
          { label: 'Badges', value: badges.length, icon: Award, color: 'var(--color-k8s)' },
          { label: 'Current Progress', value: `${progressPct}%`, icon: activeTrack.icon, color: activeTrack.color },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <stat.icon size={18} style={{ color: stat.color }} />
            <p className="text-2xl fw-black text-white">{stat.value}</p>
            <p className="text-muted text-xs fw-med">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Track Selector Tab */}
      <div className="flex gap-2 mb-8 bg-surface2/50 p-1.5 rounded-2xl w-fit">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => track.available && setActiveTrackId(track.id)}
            className={`px-6 py-2.5 rounded-xl text-sm fw-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTrackId === track.id 
                ? 'bg-surface2 text-white shadow-lg border border-border' 
                : 'text-muted hover:text-sub'
            } ${!track.available ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <track.icon size={16} />
            {track.label}
          </button>
        ))}
      </div>

      {/* Selected Track Detail */}
      <div className="animate-fade-up" key={activeTrackId}>
        <div className="flex flex-col gap-4">
          <div className="card p-5" style={{ borderColor: `${activeTrack.color}30` }}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeTrack.emoji}</span>
                <div>
                  <h2 className="text-xl fw-black text-white">{activeTrack.label} Curriculum</h2>
                  <p className="text-xs text-muted">Master the fundamentals of {activeTrack.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted uppercase fw-bold mb-1">Track Progress</p>
                <p className="text-xl fw-black" style={{ color: activeTrack.color }}>{progressPct}%</p>
              </div>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                style={{ background: activeTrack.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="module-grid">
            {currentModules.map((mod, i) => {
              const isDone = completedModules.includes(mod.id)
              const isLocked = i > 0 && !completedModules.includes(currentModules[i - 1].id)
              
              return (
                <div
                  key={mod.id}
                  onClick={() => !isLocked && navigate(`/${activeTrackId}/module/${mod.id}`)}
                  className={`module-card ${isDone ? 'done' : ''} ${isLocked ? 'locked' : ''}`}
                  style={{ borderColor: isDone ? `${activeTrack.color}60` : undefined }}
                >
                  {isDone && (
                    <div className="absolute top-3 right-3" style={{ color: activeTrack.color }}>
                      <CheckCircle size={18} />
                    </div>
                  )}
                  {isLocked && (
                    <div className="absolute top-3 right-3 text-muted">
                      <Lock size={16} />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">{mod.emoji}</span>
                    <span className="text-xs text-muted mono">M{mod.order}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-white fw-bold text-sm mb-1">{mod.title}</h3>
                    <p className="text-muted text-xs line-clamp-2">{mod.subtitle}</p>
                  </div>

                  <div className="flex justify-between mt-auto pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-xs text-muted">⏱ {mod.duration}</span>
                    <span className="text-xs fw-black" style={{ color: activeTrack.color }}>+{mod.xpReward} XP</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        </div>
    </div>
  )
}
