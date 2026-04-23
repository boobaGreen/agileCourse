import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, CheckCircle, Clock, Zap, ExternalLink } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { certPaths } from '../../data/certifications'
import { useLanguage } from '../../contexts/LanguageContext'

export function RoadmapTab() {
  const { t, resolveString } = useLanguage()
  const { completedModules, badges } = useAppStore()
  const [filter, setFilter] = useState<'all' | 'ready' | 'progress'>('all')
  const earnedBadgeIds = badges.map(b => b.id)

  const filteredPaths = useMemo(() => {
    return certPaths.map(path => ({
      ...path,
      certs: path.certs.filter(() => {
        const isReady = earnedBadgeIds.includes(path.badge)
        if (filter === 'ready') return isReady
        if (filter === 'progress') {
          if (isReady) return false
          const trackPrefix = path.badge.split('-')[0]
          return completedModules.some(m => m.startsWith(trackPrefix + '-'))
        }
        return true
      })
    })).filter(path => path.certs.length > 0)
  }, [filter, earnedBadgeIds, completedModules])

  return (
    <motion.div
      key="roadmap"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-surface2/30 p-8 rounded-3xl border border-white/5">
        <div className="max-w-md">
          <h2 className="text-2xl fw-black text-white mb-2 italic">{t('roadmap.title')}</h2>
          <p className="text-sub text-sm leading-relaxed">{t('roadmap.subtitle')}</p>
        </div>
        
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 gap-1 shrink-0">
          {[
            { id: 'all', label: t('roadmap.filterAll'), icon: Filter },
            { id: 'ready', label: t('roadmap.filterReady'), icon: CheckCircle },
            { id: 'progress', label: t('roadmap.filterProgress'), icon: Clock },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as 'all' | 'ready' | 'progress')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs fw-bold transition-all ${
                filter === btn.id 
                  ? 'bg-surface2 text-primary shadow-lg' 
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <btn.icon size={14} /> {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative pl-8 md:pl-0">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-purple-500/50 to-k8s/50 opacity-20 hidden md:block" />
        <div className="absolute left-4 md:hidden top-0 bottom-0 w-1 bg-border opacity-20" />

        <div className="flex flex-col gap-12 relative z-10">
          {filteredPaths.map((path) => (
            <div key={resolveString(path.category)} className="relative">
              <div className="flex justify-center mb-10">
                 <div className="bg-surface2 px-6 py-2 rounded-full border border-white/10 shadow-xl relative z-20">
                   <h2 className="text-sm fw-black text-white uppercase tracking-[0.3em]" style={{ color: path.color }}>
                     {resolveString(path.category)}
                   </h2>
                 </div>
              </div>

              <div className="flex flex-col gap-8">
                {path.certs.map((cert, certIdx) => {
                  const isReady = earnedBadgeIds.includes(path.badge)
                  const isEven = certIdx % 2 === 0
                  
                  return (
                    <div
                      key={cert.name}
                      className={`flex w-full ${isEven ? 'md:justify-start' : 'md:justify-end'} justify-start`}
                    >
                      <div className={`relative w-full md:w-[45%] group`}>
                        <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-surface shadow-lg z-30
                          ${isEven ? 'md:-right-[11%] -left-[30px] md:left-auto' : 'md:-left-[11.5%] -left-[30px]'}
                        `} style={{ backgroundColor: isReady ? 'var(--color-green)' : 'var(--color-border)' }} />

                        <div className={`absolute top-1/2 -translate-y-1/2 h-1 bg-white/5 hidden md:block
                          ${isEven ? 'left-full w-[11%]' : 'right-full w-[11%]'}
                        `} />

                        <div className={`card p-6 border-white/10 hover:border-white/20 transition-all bg-surface/80 backdrop-blur-sm relative overflow-hidden group/card`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                          <div className="flex justify-between items-start mb-4 relative z-10">
                            <span className="badge-pill bg-surface2 text-muted mono text-[10px]">LVL: {cert.level}</span>
                            {isReady ? (
                              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-green flex items-center gap-1 text-[10px] fw-black uppercase">
                                <CheckCircle size={12} /> {t('roadmap.statusReady')}
                              </motion.div>
                            ) : (
                              <div className="text-sub flex items-center gap-1 text-[10px] fw-black uppercase">
                                <Clock size={12} /> {t('roadmap.statusTraining')}
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-xl fw-black text-white group-hover/card:text-primary transition-colors mb-2 relative z-10">{cert.name}</h3>
                          <p className="text-muted text-xs leading-relaxed mb-4 relative z-10">{resolveString(cert.description)}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                             {cert.topics.map(t => (
                               <span key={t} className="text-[9px] fw-bold bg-white/5 border border-border px-2 py-0.5 rounded-full text-sub">{t}</span>
                             ))}
                          </div>

                          <div className="pt-4 border-t border-border flex items-center justify-between relative z-10">
                              <div className="flex items-center gap-2 text-[10px] text-muted">
                               <Zap size={10} style={{ color: path.color }} />
                               {t('roadmap.requires')}: <span className="text-sub fw-bold">#{path.badge}</span>
                             </div>
                             <a href={cert.url} target="_blank" rel="noopener" className="btn btn-primary h-8 px-4 text-[9px] gap-1 fw-black">
                               {t('roadmap.syllabus')} <ExternalLink size={10} />
                             </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-20 card p-10 bg-primary/5 border-primary/10 text-center relative overflow-hidden">
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full" />
         <p className="text-primary text-xs fw-black uppercase tracking-widest mb-3">{t('roadmap.supportTitle')}</p>
         <p className="text-sub text-sm max-w-2xl mx-auto leading-relaxed fw-med">
           {t('roadmap.supportText')}
         </p>
      </div>
    </motion.div>
  )
}
