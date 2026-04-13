import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronRight, Lock } from 'lucide-react'
import type { Module } from '../data/git/modules'

interface ModuleSidebarProps {
  modules: Module[]
  currentId: string
  completedIds: string[]
  trackColor: string
  onItemClick?: () => void
  isCollapsed?: boolean
}

export default function ModuleSidebar({ 
  modules, 
  currentId, 
  completedIds, 
  trackColor, 
  onItemClick,
  isCollapsed 
}: ModuleSidebarProps) {
  const navigate = useNavigate()
  
  if (isCollapsed) return null

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="mb-4 px-2">
        <h3 className="text-xs fw-black text-muted uppercase tracking-widest mb-1 opacity-50">Track Curriculum</h3>
        <div className="h-1 w-8 rounded-full" style={{ background: trackColor }} />
      </div>
      
      <div className="flex flex-col gap-1.5 overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {modules.map((m, i) => {
          const isCompleted = completedIds.includes(m.id)
          const isActive = m.id === currentId
          const isLocked = i > 0 && !completedIds.includes(modules[i-1].id) && !isCompleted && !isActive

          return (
            <button
              key={m.id}
              disabled={isLocked}
              onClick={() => {
                navigate(`/${m.track}/module/${m.id}`)
                if (onItemClick) onItemClick()
              }}
              className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all group relative overflow-hidden ${
                isActive 
                  ? 'bg-white/10 text-white shadow-lg' 
                  : isLocked 
                    ? 'opacity-30 cursor-not-allowed grayscale' 
                    : 'text-sub hover:bg-white/5 hover:text-white'
              }`}
              style={{
                borderColor: isActive ? `${trackColor}40` : 'transparent',
                borderWidth: isActive ? '1px' : '0px'
              }}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 z-0 bg-gradient-to-r from-white/5 to-transparent"
                  initial={false}
                />
              )}
              
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-xl shrink-0">{m.emoji}</span>
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-[10px] text-muted mono block uppercase mb-1">Module {m.order}</span>
                    <h4 className="text-[13px] fw-black text-white leading-tight line-clamp-2">{m.title}</h4>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-green/20 text-green flex items-center justify-center">
                      <CheckCircle size={14} />
                    </div>
                  ) : isActive ? (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ChevronRight size={16} className="text-primary" />
                    </motion.div>
                  ) : isLocked ? (
                    <Lock size={14} className="text-muted" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/10" />
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
