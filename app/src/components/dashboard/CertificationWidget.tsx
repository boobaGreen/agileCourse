import { motion } from 'framer-motion'
import { Award, ArrowRight, GitBranch, Package, Ship } from 'lucide-react'
import type { Track } from '../../data/types'

export function CertificationWidget({ tracks, completedModules, onNavigate }: { 
  tracks: Track[], 
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
