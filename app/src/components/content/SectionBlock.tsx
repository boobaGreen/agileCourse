import { useState } from 'react'
import { ArrowRight, Lightbulb, Quote, Play, ExternalLink } from 'lucide-react'
import type { Section } from '../../data/types'
import { useLanguage } from '../../contexts/LanguageContext'
import { useUI } from '../../lib/ui'
import { Markdown, renderInline } from './Markdown'
import { CodeBlock } from './CodeBlock'
import { LabFrame } from './LabFrame'
import { EducationAnimation } from '../modules/EducationAnimation'
import { MiniGame } from '../modules/simulations/Games'
import { GitLabs } from '../modules/simulations/GitLabs'

interface Props {
  section: Section
  index: number
  completedLabs: string[]
  moduleId: string
  onCompleteGame: (title: string) => void
}

function ytId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
  return m ? m[1] : null
}

function VideoEmbed({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false)
  const { ui } = useUI()
  const isPlaylist = url.includes('playlist?list=')
  const id = ytId(url)
  const src = isPlaylist
    ? url.replace('youtube.com/playlist?list=', 'youtube-nocookie.com/embed/videoseries?list=')
    : id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : url
  const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null

  return (
    <div className="mt-3">
      <div className="aspect-video rounded-xl overflow-hidden border relative" style={{ borderColor: 'var(--t-border)', background: '#0b0e12' }}>
        {loaded ? (
          <iframe className="w-full h-full" src={src} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        ) : (
          <button onClick={() => setLoaded(true)} className="group w-full h-full relative flex items-center justify-center" aria-label={ui('load_video')}>
            {thumb && <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity" loading="lazy" />}
            <span className="relative z-10 inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm shadow-lg" style={{ background: '#fff', color: '#17191c' }}>
              <Play size={16} fill="currentColor" /> {ui('load_video')}
            </span>
          </button>
        )}
      </div>
      <div className="flex justify-end mt-2">
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>
          {ui('watch_youtube')} <ExternalLink size={11} />
        </a>
      </div>
    </div>
  )
}

function FlowDiagram({ steps }: { steps: NonNullable<Section['diagramSteps']> }) {
  const { resolveString } = useLanguage()
  return (
    <div className="mt-3 overflow-x-auto scrollbar-thin -mx-1 px-1">
      <div className="flex items-stretch gap-2 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center py-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center text-center gap-1.5 rounded-xl border px-4 py-3 min-w-[140px] max-w-[190px]"
              style={{ borderColor: s.color ? `color-mix(in oklab, ${s.color} 45%, var(--t-border))` : 'var(--t-border)', background: s.color ? `color-mix(in oklab, ${s.color} 7%, var(--t-surface))` : 'var(--t-surface)' }}>
              {s.icon && <span className="text-2xl leading-none">{s.icon}</span>}
              <span className="text-xs font-bold leading-snug whitespace-pre-line" style={{ color: 'var(--t-fg)' }}>{resolveString(s.label)}</span>
            </div>
            {i < steps.length - 1 && <ArrowRight size={16} className="shrink-0" style={{ color: 'var(--t-muted)' }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function DataTable({ data }: { data: NonNullable<Section['tableData']> }) {
  const { resolveString } = useLanguage()
  return (
    <div className="mt-3 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--t-border)' }}>
      <div className="overflow-x-auto">
        <table className="data-table" style={{ minWidth: 560 }}>
          <thead>
            <tr>{data.headers.map((h, i) => <th key={i}>{renderInline(resolveString(h), `th-${i}`)}</th>)}</tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri}>{row.map((c, ci) => <td key={ci}>{renderInline(resolveString(c), `td-${ri}-${ci}`)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SectionBlock({ section, index, completedLabs, moduleId, onCompleteGame }: Props) {
  const { resolveString } = useLanguage()
  const { ui } = useUI()
  const title = section.title ? resolveString(section.title) : ''
  const content = resolveString(section.content)
  const anchor = `s-${index}`

  switch (section.type) {
    case 'intro':
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-2">{renderInline(title, anchor)}</h3>}
          <Markdown text={content} className="lead" />
        </section>
      )
    case 'concept':
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-2">{renderInline(title, anchor)}</h3>}
          <Markdown text={content} />
        </section>
      )
    case 'tip':
    case 'analogy':
      return (
        <section id={anchor} className={`callout ${section.type === 'tip' ? 'callout-tip' : 'callout-analogy'}`}>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>{section.type === 'tip' ? <Lightbulb size={18} /> : <Quote size={18} />}</span>
            <div className="min-w-0 flex-1">
              {title && <div className="font-bold mb-1" style={{ color: 'var(--t-fg)' }}>{renderInline(title, anchor)}</div>}
              <Markdown text={content} className="text-[0.95rem]" />
            </div>
          </div>
        </section>
      )
    case 'code':
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-2">{renderInline(title, anchor)}</h3>}
          <Markdown text={content} />
          {section.code && <div className="mt-3"><CodeBlock code={section.code} language={section.language || 'bash'} /></div>}
        </section>
      )
    case 'table':
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-2">{renderInline(title, anchor)}</h3>}
          <Markdown text={content} />
          {section.tableData && <DataTable data={section.tableData} />}
        </section>
      )
    case 'flowchart':
      return (
        <section id={anchor} className="block rounded-2xl border p-4 sm:p-5" style={{ borderColor: 'var(--t-border)', background: 'var(--t-surface2)' }}>
          {title && <h3 className="h3 mb-1">{renderInline(title, anchor)}</h3>}
          <Markdown text={content} className="text-sm" />
          {section.diagramSteps && <FlowDiagram steps={section.diagramSteps} />}
        </section>
      )
    case 'video':
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-1">{renderInline(title.replace(/^📺\s*/, ''), anchor)}</h3>}
          <Markdown text={content} className="text-sm" />
          {section.videoUrl && <VideoEmbed url={section.videoUrl} title={title || 'Video'} />}
        </section>
      )
    case 'infographic':
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-2">{renderInline(title, anchor)}</h3>}
          {section.imageUrl && (
            <figure className="rounded-xl overflow-hidden border max-w-sm" style={{ borderColor: 'var(--t-border)' }}>
              <img src={section.imageUrl} alt={title} loading="lazy" />
              <figcaption className="text-xs p-3" style={{ color: 'var(--t-muted)' }}>{content}</figcaption>
            </figure>
          )}
        </section>
      )
    case 'animation': {
      const type = resolveString(section.animationType || section.content)
      const labKey = `${moduleId}:${title || 'Lab'}`
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-1">{renderInline(title.replace(/^🧪\s*/, ''), anchor)}</h3>}
          {content && content !== type && <Markdown text={content} className="text-sm mb-3" />}
          <LabFrame label={ui('lab')} done={completedLabs.includes(labKey)}>
            <div className="flex items-center justify-center min-h-[140px]">
              <GitLabs type={type} onComplete={() => onCompleteGame(title || 'Lab')} />
              <EducationAnimation type={type} />
            </div>
          </LabFrame>
        </section>
      )
    }
    case 'game': {
      const labKey = `${moduleId}:${title || 'Challenge'}`
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-1">{renderInline(title, anchor)}</h3>}
          {content && <Markdown text={content} className="text-sm mb-3" />}
          {section.gameType && (
            <LabFrame label={section.gameType.includes('sim') ? ui('lab') : 'Challenge'} done={completedLabs.includes(labKey)}>
              <MiniGame gameType={section.gameType} gameData={section.gameData} onComplete={() => onCompleteGame(title || 'Challenge')} />
            </LabFrame>
          )}
        </section>
      )
    }
    default:
      return (
        <section id={anchor} className="block">
          {title && <h3 className="h3 mb-2">{renderInline(title, anchor)}</h3>}
          <Markdown text={content} />
        </section>
      )
  }
}
