import { Fragment, type ElementType } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, Sparkles, Code2, Lightbulb, LayoutGrid, 
  Workflow, Play, Image, Gamepad2, ArrowRight, Zap
} from 'lucide-react'

// Types
import type { Section } from '../../data/types'

// Components
import { EducationAnimation } from './EducationAnimation'
import { MiniGame } from './simulations/Games'
import { GitLabs } from './simulations/GitLabs'

import { useLanguage } from '../../contexts/LanguageContext'

export function SectionCard({ section, onCompleteGame }: { section: Section, onCompleteGame: (title: string) => void }) {
  const { resolveString } = useLanguage()
  const icons: Record<string, ElementType> = {
    intro: BookOpen,
    concept: Sparkles,
    code: Code2,
    tip: Lightbulb,
    analogy: Lightbulb,
    table: LayoutGrid,
    flowchart: Workflow,
    video: Play,
    infographic: Image,
    animation: Zap,
    game: Gamepad2
  }

  const Icon = icons[section.type] || BookOpen

  return (
    <div className={`section-card s-${section.type}`}>
      {section.title && (
        <div className="flex items-center gap-2 mb-3">
          <Icon size={16} className={`text-${section.type === 'code' ? 'git' : section.type === 'intro' ? 'blue-400' : 'purple-400'}`} />
          <h3 className="fw-bold text-white text-sm">{resolveString(section.title)}</h3>
        </div>
      )}
      
      <div className="text-sub text-sm leading-relaxed">
        {resolveString(section.content).split('\n').map((line, i) => {
          const isDesktopOnly = line.includes('<!-- desktop-only -->');
          const cleanLine = line.replace('<!-- desktop-only -->', '');
          return (
          <div key={i} className={`mb-2 last:mb-0 ${isDesktopOnly ? 'hidden sm:block' : ''}`}>
             {cleanLine.includes(' · ') && cleanLine.includes('[') ? (
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 mt-4">
                   {line.split(' · ').map((part, pi) => {
                      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                      const emoji = part.match(/^([\u2600-\u27BF]|[\uD83C-\uD83E][\uDC00-\uDFFF])/);
                      if (match) {
                         return (
                            <a 
                               key={pi} 
                               href={match[2]} 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-primary hover:bg-primary/10 hover:border-primary transition-all text-xs fw-bold w-full sm:w-auto"
                            >
                               {emoji?.[0]} {match[1]} ↗
                            </a>
                         )
                      }
                      return <span key={pi}>{part}</span>;
                   })}
                </div>
             ) : line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g).map((part, pi) => {
                 const boldMatch = part.match(/^\*\*(.*?)\*\*$/)
                 if (boldMatch) return <strong key={`${pi}-${i}`} className="text-white fw-black">{boldMatch[1]}</strong>
                 
                 const mdMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
                 if (mdMatch) {
                    return <a key={`${pi}-${i}`} href={mdMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">{mdMatch[1]} ↗</a>
                 }
                 if (/^https?:\/\//.test(part)) {
                    return <a key={`${pi}-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{part}</a>
                 }
                 return <Fragment key={`${pi}-${i}`}>{part}</Fragment>
             })}
          </div>
        )
      })}
      </div>

      {/* Code Block Rendering */}
      {section.type === 'code' && section.code && (
        <div className="code-block mt-4">
          <div className="code-block-header">
            <div className="dot bg-danger" />
            <div className="dot bg-xp" />
            <div className="dot bg-green" />
            <span className="ml-2 text-xs text-muted mono">{section.language || 'bash'}</span>
          </div>
          <pre>
            {section.code.split('\n').map((line, li) => (
              <div key={li} className={line.trim().startsWith('#') ? 'comment' : ''}>
                {line}
              </div>
            ))}
          </pre>
        </div>
      )}

      {/* Table Rendering with Scroll Hint */}
      {section.type === 'table' && section.tableData && (
        <div className="mt-4 relative overflow-hidden rounded-xl border border-white/10 bg-surface2/30 shadow-2xl">
          <div className="overflow-x-auto scrollbar-hide py-2 px-1">
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none sm:hidden rounded-r-xl z-20 flex items-center justify-end pr-2">
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-white/40">
                <ArrowRight size={16} />
              </motion.div>
            </div>

            <table className="w-full text-left" style={{ minWidth: '600px' }}>
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  {section.tableData.headers.map((h, i) => (
                    <th key={i} className="p-3 text-[10px] fw-black text-white uppercase tracking-wider">{resolveString(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.tableData.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-3 text-xs text-sub leading-relaxed">{resolveString(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Flowchart / diagram rendering */}
      {section.type === 'flowchart' && section.diagramSteps && (
        <div className="mt-4 relative">
          <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-6 px-2 scrollbar-hide sm:justify-center sm:flex-wrap group">
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/60 to-transparent pointer-events-none sm:hidden z-20 flex items-center justify-end pr-2">
                <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-white/20">
                   <ArrowRight size={14} />
                </motion.div>
             </div>

            {section.diagramSteps.map((step, si) => (
              <Fragment key={si}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: si * 0.1 }}
                  className="flex flex-col items-center gap-2 px-5 sm:px-7 py-4 sm:py-5 rounded-2xl border border-white/10 bg-white/[0.03] min-w-fit max-w-[180px] text-center shadow-lg relative z-10"
                  style={{ borderColor: step.color ? `${step.color}50` : undefined }}
                >
                  {step.icon && <span className="text-2xl sm:text-3xl mb-1">{step.icon}</span>}
                  <span className="text-[11px] sm:text-sm fw-bold text-white leading-tight whitespace-pre-line">{resolveString(step.label)}</span>
                </motion.div>
                {si < section.diagramSteps!.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: si * 0.1 + 0.05 }}
                    className="text-muted text-lg sm:text-xl shrink-0"
                  >
                    →
                  </motion.span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Video Content */}
      {section.type === 'video' && section.videoUrl && (
        <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe
            className="w-full h-full"
            src={section.videoUrl.includes('playlist?list=')
              ? section.videoUrl.replace('youtube.com/playlist?list=', 'youtube.com/embed/videoseries?list=')
              : section.videoUrl.replace('watch?v=', 'embed/')}
            title={section.title || 'Educational Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Infographic / Image */}
      {section.type === 'infographic' && section.imageUrl && (
        <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-surface2 relative group">
           <img src={section.imageUrl} alt="Module Infographic" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-xs text-white fw-bold">Click to expand</span>
           </div>
        </div>
      )}

      {/* Specialized Animations */}
      {section.type === 'animation' && (
        <div className="mt-4 p-6 rounded-2xl border border-white/5 bg-surface2/30 flex items-center justify-center overflow-hidden min-h-[150px]">
           <GitLabs type={section.animationType || section.content} onComplete={() => onCompleteGame(section.title || 'Lab')} />
           <EducationAnimation type={section.animationType || section.content} />
        </div>
      )}

      {/* Mini-Games */}
      {section.type === 'game' && section.gameType && (
        <div className="mt-4">
           <MiniGame 
             gameType={section.gameType} 
             gameData={section.gameData} 
             onComplete={() => onCompleteGame(section.title || 'Challenge')} 
           />
        </div>
      )}
    </div>
  )
}
