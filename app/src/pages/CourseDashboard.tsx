import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { GIT_MODULES } from '../data/git/modules/index'
import { DOCKER_MODULES } from '../data/docker/modules/index'
import { K8S_MODULES } from '../data/k8s/modules/index'
import { 
  GitBranch, Package, Ship, Zap, 
  Trophy
} from 'lucide-react'
import { AnimatedCounter } from '../components/dashboard/AnimatedCounter'
import { CertificationWidget } from '../components/dashboard/CertificationWidget'
import { QuickResumeHero } from '../components/dashboard/QuickResumeHero'
import { TrackGallery } from '../components/dashboard/TrackGallery'
import { SyllabusGrid } from '../components/dashboard/SyllabusGrid'
import { AnalyticsSection } from '../components/dashboard/AnalyticsSection'

const tracks = [
  { id: 'git', icon: GitBranch, emoji: '🔴', label: 'Git', color: 'var(--color-git)', glow: 'rgba(249,115,22,0.2)', modules: GIT_MODULES, available: true },
  { id: 'docker', icon: Package, emoji: '🐳', label: 'Docker', color: 'var(--color-docker)', glow: 'rgba(56,189,248,0.2)', modules: DOCKER_MODULES, available: true },
  { id: 'k8s', icon: Ship, emoji: '☸️', label: 'Kubernetes', color: 'var(--color-k8s)', glow: 'rgba(167,139,250,0.2)', modules: K8S_MODULES, available: true },
]

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

    const getSkillValue = (track: string, moduleFilter: (id: string) => boolean, maxModules = 2) => {
      const relevant = completedModules.filter(m => m.startsWith(track) && moduleFilter(m))
      return (relevant.length / maxModules) * 100
    }

    skills[0].value = Math.min(100, 
      getSkillValue('git', m => ['git-1', 'git-3', 'git-7', 'git-8'].includes(m), 4) * 0.7 + 
      getSkillValue('docker', m => ['docker-1', 'docker-2'].includes(m)) * 0.3
    )
    
    skills[1].value = Math.min(100, 
      getSkillValue('git', m => ['git-4', 'git-6', 'git-8', 'git-10'].includes(m), 4) * 0.7 + 
      getSkillValue('docker', m => m === 'docker-4', 1) * 0.3
    )
    
    skills[2].value = Math.min(100, 
      getSkillValue('git', m => ['git-5'].includes(m), 1) * 0.6 + 
      getSkillValue('docker', m => m === 'docker-7', 1) * 0.2 +
      getSkillValue('k8s', m => ['k8s-4', 'k8s-5'].includes(m)) * 0.2
    )
    
    skills[3].value = Math.min(100, 
      getSkillValue('git', m => ['git-3', 'git-7', 'git-9'].includes(m), 3) * 0.5 + 
      getSkillValue('docker', m => m === 'docker-6', 1) * 0.3 + 
      getSkillValue('k8s', m => ['k8s-6', 'k8s-7'].includes(m)) * 0.2
    )
    
    skills[4].value = Math.min(100, 
      getSkillValue('git', m => ['git-9', 'git-11'].includes(m), 2) * 0.4 + 
      getSkillValue('k8s', m => ['k8s-1', 'k8s-3', 'k8s-8'].includes(m), 3) * 0.6
    )
    
    return skills
  }, [completedModules])

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
    
    const weeks = []
    for (let i = 0; i < data.length; i += 7) {
      weeks.push(data.slice(i, i + 7))
    }
    return weeks
  }, [activityLog])

  return (
    <div className="relative">
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

        <QuickResumeHero 
          activeTrack={activeTrack} 
          nextModule={nextModule} 
          activeTrackId={activeTrackId} 
          setActiveTrackId={setActiveTrackId} 
          tracks={tracks}
        />

        <TrackGallery 
          tracks={tracks} 
          activeTrackId={activeTrackId} 
          setActiveTrackId={setActiveTrackId} 
          getTrackProgress={getTrackProgress}
        />

        <SyllabusGrid 
          activeTrackId={activeTrackId} 
          activeTrack={activeTrack} 
          currentModules={currentModules} 
          completedModules={completedModules} 
          nextModule={nextModule} 
        />

        <CertificationWidget 
          tracks={tracks} 
          completedModules={completedModules} 
          onNavigate={() => navigate(`/profile?tab=roadmap`)}
        />

        <div className="h-20 w-full" />

        <AnalyticsSection 
          radarData={radarData} 
          activeTrack={activeTrack} 
          heatmapData={heatmapData} 
        />
      </div>
    </div>
  )
}
