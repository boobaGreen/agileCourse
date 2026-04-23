import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Track, Module } from '../../data/types'

interface SyllabusGridProps {
  activeTrackId: string
  activeTrack: Track
  currentModules: Module[]
  completedModules: string[]
  nextModule: Module | undefined
}

export function SyllabusGrid({ activeTrackId, activeTrack, currentModules, completedModules, nextModule }: SyllabusGridProps) {
  const navigate = useNavigate()

  return (
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
  )
}
