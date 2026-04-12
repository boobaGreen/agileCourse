import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { GIT_MODULES } from '../data/git/modules'
import { DOCKER_MODULES } from '../data/docker/modules'
import { K8S_MODULES } from '../data/k8s/modules'
import { CheckCircle, Lock, GitBranch, Package, Ship, ArrowRight } from 'lucide-react'

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
  
  // Calculate progress for ALL tracks (for the gallery)
  const getTrackProgress = (tId: string, mods: { id: string }[]) => {
    const done = completedModules.filter((m) => m.startsWith(`${tId}-`)).length
    return mods.length > 0 ? Math.round((done / mods.length) * 100) : 0
  }

  return (
    <div className="relative">
      {/* Dynamic Background Glow */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none transition-all duration-1000"
        style={{ background: activeTrack.color }}
      />
      
      <div className="animate-fade-up relative z-10">
        {/* Welcome Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl fw-black text-white mb-1">
              Mission <span style={{ color: activeTrack.color }}>Control</span>
            </h1>
            <p className="text-muted">Welcome back, {userName}. Choose your training track.</p>
          </div>
          <div className="hidden md:flex gap-4">
             <div className="text-right">
                <p className="text-[10px] text-muted uppercase fw-bold">Global XP</p>
                <p className="text-xl fw-black text-xp">{xp}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] text-muted uppercase fw-bold">Badges</p>
                <p className="text-xl fw-black text-white">{badges.length}</p>
             </div>
          </div>
        </div>

        {/* Immersive Track Gallery */}
        <div className="flex md:grid md:grid-cols-3 gap-4 mb-10 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {tracks.map((track) => {
            const progress = getTrackProgress(track.id, track.modules)
            const isActive = activeTrackId === track.id
            
            return (
              <motion.div
                key={track.id}
                onClick={() => track.available && setActiveTrackId(track.id)}
                whileHover={track.available ? { y: -5, scale: 1.02 } : {}}
                whileTap={track.available ? { scale: 0.98 } : {}}
                className={`card p-5 cursor-pointer transition-all duration-300 relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[300px] md:w-auto snap-center ${
                  isActive ? 'border-2 shadow-xl' : 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'
                } ${!track.available ? 'opacity-30 cursor-not-allowed' : ''}`}
                style={{ 
                  borderColor: isActive ? track.color : 'var(--color-border)',
                  boxShadow: isActive ? `${track.color}20 0 15px` : 'none',
                  background: isActive ? `linear-gradient(135deg, var(--color-surface), ${track.color}08)` : 'var(--color-surface)'
                }}
              >
                {isActive && (
                   <motion.div 
                     layoutId="active-indicator"
                     className="absolute top-0 right-0 p-2"
                   >
                     <div className="bg-white/10 p-1 rounded-full"><ArrowRight size={12} style={{ color: track.color }} /></div>
                   </motion.div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl animate-float" style={{ animationDelay: `${tracks.indexOf(track)*0.2}s` }}>
                    {track.emoji}
                  </span>
                  <div>
                    <h3 className="text-lg fw-black text-white uppercase tracking-tight">{track.label}</h3>
                    <p className="text-[10px] text-muted fw-bold uppercase">{track.modules.length} Modules</p>
                  </div>
                </div>

                <div className="mt-4">
                   <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] text-muted fw-bold">TRACK PROGRESS</span>
                      <span className="text-xs fw-black" style={{ color: track.color }}>{progress}%</span>
                   </div>
                   <div className="progress-bar h-1.5 bg-white/5">
                      <motion.div 
                        className="progress-fill" 
                        style={{ background: track.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                   </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Selected Track Detail */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTrackId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-border opacity-50" />
              <h2 className="text-[10px] md:text-xs fw-black text-muted uppercase tracking-[0.2em] px-4">
                Curriculum: <span style={{ color: activeTrack.color }}>{activeTrack.label}</span>
              </h2>
              <div className="h-px flex-1 bg-border opacity-50" />
            </div>

            <div className="module-grid">
              {currentModules.map((mod, i) => {
                const isDone = completedModules.includes(mod.id)
                const isLocked = i > 0 && !completedModules.includes(currentModules[i - 1].id)
                
                return (
                  <div
                    key={mod.id}
                    onClick={() => !isLocked && navigate(`/${activeTrackId}/module/${mod.id}`)}
                    className={`module-card group ${isDone ? 'done' : ''} ${isLocked ? 'locked' : ''}`}
                    style={{ 
                      borderColor: isDone ? `${activeTrack.color}60` : undefined,
                      boxShadow: !isLocked && !isDone ? `hover: ${activeTrack.color}15 0 10px` : undefined
                    }}
                  >
                    {isDone && (
                      <div className="absolute top-4 right-4" style={{ color: activeTrack.color }}>
                        <CheckCircle size={20} />
                      </div>
                    )}
                    {isLocked && (
                      <div className="absolute top-4 right-4 text-muted">
                        <Lock size={16} />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-10 h-10 rounded-xl bg-surface2 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        {mod.emoji}
                       </div>
                       <div>
                         <span className="text-[10px] text-muted mono block uppercase">Module {mod.order}</span>
                         <h3 className="text-white fw-bold text-sm leading-tight">{mod.title}</h3>
                       </div>
                    </div>
                    
                    <p className="text-muted text-[11px] leading-relaxed mb-4 line-clamp-2">
                      {mod.subtitle}
                    </p>

                    <div className="mt-auto flex justify-between items-center py-3 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted">
                        <span>⏱ {mod.duration}</span>
                        <span>•</span>
                        <span className="fw-bold" style={{ color: activeTrack.color }}>+{mod.xpReward} XP</span>
                      </div>
                      <button 
                        className="p-1.5 rounded-lg bg-surface2 text-muted group-hover:text-white transition-colors"
                        disabled={isLocked}
                      >
                         <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
