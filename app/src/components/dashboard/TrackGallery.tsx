import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import type { Track, Module } from '../../data/types'

interface TrackGalleryProps {
  tracks: Track[]
  activeTrackId: string
  setActiveTrackId: (id: string) => void
  getTrackProgress: (tId: string, mods: Module[]) => number
}

export function TrackGallery({ tracks, activeTrackId, setActiveTrackId, getTrackProgress }: TrackGalleryProps) {
  return (
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
                
                <div className="md:hidden flex items-center gap-3 mt-1">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full" style={{ background: track.color, width: `${progress}%` }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-[10px] fw-black" style={{ color: track.color }}>{progress}%</span>
                </div>
              </div>
            </div>

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
  )
}
