import { motion } from 'framer-motion'
import { ArrowRight, Activity, Zap, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Track, Module } from '../../data/types'

interface QuickResumeHeroProps {
  activeTrack: Track
  nextModule: Module | undefined
  activeTrackId: string
  setActiveTrackId: (id: string) => void
  tracks: Track[]
}

export function QuickResumeHero({ activeTrack, nextModule, activeTrackId, setActiveTrackId, tracks }: QuickResumeHeroProps) {
  const navigate = useNavigate()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-0 overflow-hidden mb-12 border-none bg-surface/30 backdrop-blur-3xl relative group"
    >
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
              <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 pointer-events-none" style={{ backgroundColor: activeTrack.color }} />
              CONTINUE LEARNING <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => {
                const nextIndex = (tracks.findIndex((t: any) => t.id === activeTrackId) + 1) % tracks.length
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
  )
}
