import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { GIT_MODULES } from '../data/git/modules/index'
import { DOCKER_MODULES } from '../data/docker/modules/index'
import { K8S_MODULES } from '../data/k8s/modules/index'
import { 
  CheckCircle, GitBranch, Package, Ship, ArrowRight, Zap, 
  Target, Activity, Trophy, Star, Award
} from 'lucide-react'
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts'

const tracks = [
  { id: 'git', icon: GitBranch, emoji: '🔴', label: 'Git', color: 'var(--color-git)', glow: 'rgba(249,115,22,0.2)', modules: GIT_MODULES, available: true },
  { id: 'docker', icon: Package, emoji: '🐳', label: 'Docker', color: 'var(--color-docker)', glow: 'rgba(56,189,248,0.2)', modules: DOCKER_MODULES, available: true },
  { id: 'k8s', icon: Ship, emoji: '☸️', label: 'Kubernetes', color: 'var(--color-k8s)', glow: 'rgba(167,139,250,0.2)', modules: K8S_MODULES, available: true },
]

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 1, stiffness: 100, damping: 30 })
  const displayValue = useTransform(spring, (current) => Math.round(current))

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{displayValue}</motion.span>
}

export default function CourseDashboard() {
  const { userName, xp, completedModules, activityLog, badges } = useAppStore()
  const [activeTrackId, setActiveTrackId] = useState('git')
  const navigate = useNavigate()

  const activeTrack = tracks.find(t => t.id === activeTrackId) || tracks[0]
  const currentModules = activeTrack.modules
  const nextModule = useMemo(() => {
    return currentModules.find(m => !completedModules.includes(m.id))
  }, [currentModules, completedModules])
  
  const getTrackProgress = (tId: string, mods: { id: string }[]) => {
    const done = completedModules.filter((m) => m.startsWith(`${tId}-`)).length
    return mods.length > 0 ? Math.round((done / mods.length) * 100) : 0
  }

  // Calculate skill data for radar chart
  const radarData = useMemo(() => {
    const skills = [
      { subject: 'Architecture', value: 0, fullMark: 100 },
      { subject: 'Workflows', value: 0, fullMark: 100 },
      { subject: 'Networking', value: 0, fullMark: 100 },
      { subject: 'Persistence', value: 0, fullMark: 100 },
      { subject: 'Ops & Scale', value: 0, fullMark: 100 },
    ]

    // Dynamic calculation based on module content
    const getSkillValue = (track: string, moduleFilter: (id: string) => boolean, maxModules = 2) => {
      const relevant = completedModules.filter(m => m.startsWith(track) && moduleFilter(m))
      return (relevant.length / maxModules) * 100
    }

    // Calculating each skill by combining relevant track progress (max 100)
    // ARC: Fundamentals, Object DB, Index, Core State
    skills[0].value = Math.min(100, 
      getSkillValue('git', m => ['git-1', 'git-3', 'git-7', 'git-8'].includes(m), 4) * 0.7 + 
      getSkillValue('docker', m => ['docker-1', 'docker-2'].includes(m)) * 0.3
    )
    
    // WORKFLOWS: Branching, Remote Collab, Undo, Stash, Flow techniques
    skills[1].value = Math.min(100, 
      getSkillValue('git', m => ['git-4', 'git-6', 'git-8', 'git-10'].includes(m), 4) * 0.7 + 
      getSkillValue('docker', m => m === 'docker-4', 1) * 0.3
    )
    
    // NETWORKING: Fetch, Push, Remote Repos, Pull Requests
    skills[2].value = Math.min(100, 
      getSkillValue('git', m => ['git-5'].includes(m), 1) * 0.6 + 
      getSkillValue('docker', m => m === 'docker-7', 1) * 0.2 +
      getSkillValue('k8s', m => ['k8s-4', 'k8s-5'].includes(m)) * 0.2
    )
    
    // PERSISTENCE: Snapshots, Hashing, Object Database, Reflogs
    skills[3].value = Math.min(100, 
      getSkillValue('git', m => ['git-3', 'git-7', 'git-9'].includes(m), 3) * 0.5 + 
      getSkillValue('docker', m => m === 'docker-6', 1) * 0.3 + 
      getSkillValue('k8s', m => ['k8s-6', 'k8s-7'].includes(m)) * 0.2
    )
    
    // OPS & SCALE: Security (Ignore), Cleanup, Staging, Final Quiz
    skills[4].value = Math.min(100, 
      getSkillValue('git', m => ['git-9', 'git-11'].includes(m), 2) * 0.4 + 
      getSkillValue('k8s', m => ['k8s-1', 'k8s-3', 'k8s-8'].includes(m), 3) * 0.6
    )
    
    return skills
  }, [completedModules])

  // Process heatmap data (fixed 1-year range)
  const heatmapData = useMemo(() => {
    const data = []
    const now = new Date()
    const weeksToShow = 52
    for (let i = weeksToShow * 7; i >= 0; i--) {
      const d = new Date()
      d.setDate(now.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      data.push({
        date: dateStr,
        count: activityLog[dateStr] || 0
      })
    }
    
    // Group into weeks
    const weeks = []
    for (let i = 0; i < data.length; i += 7) {
      weeks.push(data.slice(i, i + 7))
    }
    return weeks
  }, [activityLog])

  return (
    <div className="relative">
      {/* Dynamic Background Glow */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none transition-all duration-1000"
        style={{ background: activeTrack.color }}
      />
      
      <div className="animate-fade-up relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-24 pb-12">
        {/* Welcome Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl fw-black text-white mb-1">
              Mission <span style={{ color: activeTrack.color }}>Control</span>
            </h1>
            <p className="text-muted">Welcome back, {userName}. Your DevOps journey continues.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <div className="flex-1 md:flex-none card p-4 py-3 border-xp/20 bg-xp/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-xp/20 flex items-center justify-center text-xp">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase fw-bold">Global XP</p>
                  <p className="text-xl fw-black text-xp"><AnimatedCounter value={xp} /></p>
                </div>
             </div>
             
             <div 
               onClick={() => navigate('/profile?tab=stats#badges')}
               className="flex-1 md:flex-none card p-4 py-3 border-purple-500/20 bg-purple-500/5 flex items-center gap-4 cursor-pointer hover:bg-purple-500/10 transition-all group/badge"
             >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover/badge:scale-110 transition-transform">
                  <Trophy size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase fw-bold">Badges</p>
                  <p className="text-xl fw-black text-white">{badges.length}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Quick Resume Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-0 overflow-hidden mb-12 border-none bg-surface/30 backdrop-blur-3xl relative group"
        >
          {/* Glass Overlay with Dynamic Border Mask */}
          <div className="absolute inset-[1px] rounded-[15px] bg-surface/90 z-10 transition-colors group-hover:bg-surface/85" />
          <div 
            className="absolute inset-0 opacity-[0.15] blur-2xl group-hover:opacity-25 transition-opacity"
            style={{ background: activeTrack.color }}
          />
          
          <div className="relative z-20 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
               <span className="text-[10px] fw-black tracking-[0.3em] text-muted uppercase mb-3 block">
                 Status: <span style={{ color: activeTrack.color }}>Ready for Next Mission</span>
               </span>
               {nextModule ? (
                 <>
                   <div className="flex items-center gap-5 mb-4">
                     <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl shadow-inner border border-white/5">
                        {nextModule.emoji}
                     </div>
                     <div>
                       <h2 className="text-2xl md:text-3xl fw-black text-white leading-tight">
                         {nextModule.title}
                       </h2>
                       <p className="text-sub text-base mt-1 line-clamp-1">{nextModule.subtitle}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4 text-[10px] md:text-xs text-muted fw-bold uppercase mt-6 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5">
                      <span className="flex items-center gap-2">
                        <Activity size={14} style={{ color: activeTrack.color }} /> 
                        Estimated {nextModule.duration}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="flex items-center gap-2 text-xp">
                        <Zap size={14} /> 
                        +{nextModule.xpReward} XP Reward
                      </span>
                   </div>
                 </>
               ) : (
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-xp/10 flex items-center justify-center text-4xl text-xp border border-xp/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                       <Trophy size={48} />
                    </div>
                    <div>
                       <h2 className="text-2xl md:text-4xl fw-black text-white leading-tight">Track Mastered!</h2>
                       <p className="text-sub text-base mt-2">You've conquered every challenge in the {activeTrack.label} track. Incredible achievement!</p>
                    </div>
                 </div>
               )}
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              {nextModule ? (
                <button
                  onClick={() => navigate(`/${activeTrackId}/module/${nextModule.id}`)}
                  className="group relative w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl fw-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                  style={{ background: activeTrack.color, color: '#fff' }}
                >
                  {/* Pulse Effect Background */}
                  <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 pointer-events-none" style={{ backgroundColor: activeTrack.color }} />
                  CONTINUE LEARNING <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    const nextIndex = (tracks.findIndex(t => t.id === activeTrackId) + 1) % tracks.length
                    setActiveTrackId(tracks[nextIndex].id)
                  }}
                  className="w-full md:w-auto px-10 py-5 rounded-2xl fw-black text-lg bg-surface2 text-white border border-white/10 hover:bg-white/5 transition-all shadow-xl"
                >
                  EXPLORE NEXT TRACK
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Immersive Track Gallery */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {tracks.map((track) => {
            const progress = getTrackProgress(track.id, track.modules)
            const isActive = activeTrackId === track.id

            return (
              <motion.div
                key={track.id}
                onClick={() => track.available && setActiveTrackId(track.id)}
                whileHover={track.available ? { y: -2, scale: 1.01 } : {}}
                whileTap={track.available ? { scale: 0.98 } : {}}
                className={`card relative overflow-hidden transition-all duration-300 cursor-pointer flex items-center md:flex-col md:items-start p-4 md:p-6 ${
                  isActive ? 'border-2 shadow-lg ring-1 transition-all' : 'opacity-60 hover:opacity-100 grayscale-[0.3] hover:grayscale-0'
                } ${!track.available ? 'opacity-30 cursor-not-allowed' : ''}`}
                style={{ 
                  borderColor: isActive ? track.color : 'var(--color-border)',
                  boxShadow: isActive ? `${track.color}15 0 20px` : 'none',
                  background: isActive ? `linear-gradient(135deg, var(--color-surface), ${track.color}08)` : 'var(--color-surface)'
                }}
              >
                {/* Status Indicator Dot (Mobile) */}
                <div className={`md:hidden w-1.5 h-8 rounded-full mr-4 transition-all duration-500 ${isActive ? 'scale-y-110 shadow-[0_0_10px_currentColor]' : 'scale-y-75 opacity-20'}`} 
                  style={{ backgroundColor: track.color, color: track.color }} 
                />

                <div className="flex items-center gap-4 flex-1 md:w-full">
                  <span className="text-3xl md:text-4xl animate-float shrink-0" style={{ animationDelay: `${tracks.indexOf(track)*0.2}s` }}>
                    {track.emoji}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg fw-black text-white uppercase tracking-tight">{track.label}</h3>
                    <p className="hidden md:block text-[10px] text-muted fw-bold uppercase">{track.modules.length} Modules</p>
                    
                    {/* Compact stats for mobile */}
                    <div className="md:hidden flex items-center gap-3 mt-1">
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div className="h-full" style={{ background: track.color, width: `${progress}%` }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-[10px] fw-black" style={{ color: track.color }}>{progress}%</span>
                    </div>
                  </div>
                </div>

                {/* Progress Detail (Desktop) */}
                <div className="hidden md:block mt-6 w-full">
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

                {isActive && (
                   <motion.div 
                     layoutId="active-indicator"
                     className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 rounded-full"
                   >
                      <Star size={14} fill="currentColor" style={{ color: track.color }} />
                   </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Selected Track Detail - MOVED UP HERE (The 'Accordion' behavior) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTrackId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-visible mb-16"
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="h-[1px] flex-1 bg-primary/20" />
              <div className="flex items-center gap-2 px-6">
                 <span className="text-[10px] text-muted uppercase fw-black tracking-[0.2em]">Syllabus for</span>
                 <span className="text-xs fw-black uppercase tracking-[0.1em]" style={{ color: activeTrack.color }}>{activeTrack.label} Hub</span>
              </div>
              <div className="h-[1px] flex-1 bg-primary/20" />
            </div>

            <div className="module-grid">
              {currentModules.map((mod, mIdx) => {
                const isDone = completedModules.includes(mod.id)
                const isNext = nextModule?.id === mod.id
                
                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: mIdx * 0.05 }}
                    onClick={() => navigate(`/${activeTrackId}/module/${mod.id}`)}
                    className={`module-card group relative ${isDone ? 'done' : ''} ${isNext ? 'ring-2 ring-primary/40 scale-[1.02]' : ''}`}
                    style={{ 
                      borderColor: isDone ? `${activeTrack.color}60` : undefined,
                    }}
                  >
                    {isDone && (
                      <div className="absolute top-4 right-4" style={{ color: activeTrack.color }}>
                        <CheckCircle size={20} />
                      </div>
                    )}

                    {isNext && (
                      <div className="absolute -top-3 left-4 bg-primary text-white text-[10px] fw-black px-3 py-1 rounded-full shadow-lg z-10">
                        NEXT UP
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 rounded-xl bg-surface2 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {mod.emoji}
                       </div>
                       <div className="flex-1">
                         <span className="text-[11px] md:text-xs text-muted mono block uppercase mb-0.5">Module {mod.order}</span>
                         <h3 className="text-white fw-black text-base md:text-lg leading-tight line-clamp-1">{mod.title}</h3>
                       </div>
                    </div>
                    
                    <p className="text-muted text-xs md:text-sm leading-relaxed mb-6 line-clamp-2">
                      {mod.subtitle}
                    </p>

                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-sub">
                        <span>⏱ {mod.duration}</span>
                        <span>•</span>
                        <span className="fw-black flex items-center gap-1" style={{ color: activeTrack.color }}><Zap size={12}/> {mod.xpReward} XP</span>
                      </div>
                      <button 
                        className="p-2.5 rounded-lg bg-surface2 text-muted group-hover:bg-white/10 group-hover:text-white transition-colors"
                      >
                         <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="h-10 w-full" />

        {/* Dynamic Certification Readiness Widget */}
        <CertificationWidget 
          tracks={tracks} 
          completedModules={completedModules} 
          onNavigate={() => navigate(`/profile?tab=roadmap`)}
        />

        <div className="h-20 w-full" />

        {/* Analytics Section - Spaced out */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24">
          {/* Skills Radar */}
          <div className="lg:col-span-1 card p-6 bg-surface/40 flex flex-col items-center justify-center min-h-[320px] min-w-0">
            <div className="w-full flex justify-between items-center mb-4">
              <h3 className="text-xs fw-black text-muted uppercase tracking-widest flex items-center gap-2">
                <Target size={14} className="text-primary" /> Skill Radar
              </h3>
            </div>
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke={activeTrack.color}
                    fill={activeTrack.color}
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Progress Activity Feed / Heatmap */}
          <div className="lg:col-span-2 card p-6 bg-surface/40 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h3 className="text-xs fw-black text-muted uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="text-green" /> Activity Heatmap
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-1 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {heatmapData.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1">
                    {week.map((day, dayIdx) => {
                      const count = day.count
                      return (
                        <div 
                          key={dayIdx} 
                          title={`${day.date}: ${count} XP`}
                          className="w-3 h-3 rounded-sm transition-colors duration-500" 
                          style={{ 
                            background: count > 300 ? activeTrack.color : count > 100 ? `${activeTrack.color}80` : count > 0 ? `${activeTrack.color}40` : 'rgba(255,255,255,0.05)'
                          }}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted fw-bold">
                <span>1 YEAR OF ACTIVITY</span>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                    <div className="w-2.5 h-2.5 rounded-sm opacity-50" style={{ background: activeTrack.color }} />
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: activeTrack.color }} />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function CertificationWidget({ tracks, completedModules, onNavigate }: { 
  tracks: { id: string }[], 
  completedModules: string[], 
  onNavigate: () => void 
}) {
  const milestones = [
    { trackId: 'git', certName: 'GitHub Foundations', badge: 'git-branching', color: 'var(--color-git)', icon: GitBranch },
    { trackId: 'docker', certName: 'Docker Certified Associate', badge: 'docker-harbor', color: 'var(--color-docker)', icon: Package },
    { trackId: 'k8s', certName: 'CKAD (Application Developer)', badge: 'k8s-helmsman', color: 'var(--color-k8s)', icon: Ship },
  ]

  const activeMilestones = milestones.filter(m => {
    const track = tracks.find(t => t.id === m.trackId)
    if (!track) return false
    const done = completedModules.filter(mod => mod.startsWith(`${m.trackId}-`)).length
    return done >= 3 // Show after 3 modules completed in the track
  })

  if (activeMilestones.length === 0) return null

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {activeMilestones.map((m) => (
        <div 
          key={m.trackId}
          onClick={() => onNavigate()}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-surface2/30 p-6 backdrop-blur-xl transition-all hover:bg-white/5 hover:border-white/20"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-20 transition-all group-hover:opacity-40" style={{ background: m.color }} />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ background: m.color }}>
              <Award size={24} />
            </div>
            <div>
              <p className="text-[10px] fw-black text-muted uppercase tracking-widest">Next Career Goal</p>
              <h4 className="text-white fw-black text-lg">{m.certName}</h4>
            </div>
          </div>

          <p className="text-sub text-xs leading-relaxed mb-6">
            Your progress in the <span className="fw-bold text-white">{m.trackId.toUpperCase()}</span> track has unlocked a professional milestone. Explore the official syllabus.
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[10px] fw-black text-muted flex items-center gap-1">
              <m.icon size={12} style={{ color: m.color }} /> VERIFIED BY DEVHARBOR
            </span>
            <div className="flex items-center gap-1 text-primary text-[10px] fw-black uppercase">
              View Roadmap <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
