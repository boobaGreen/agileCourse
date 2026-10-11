import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock, Zap, BookOpen, FlaskConical, HelpCircle } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getTrack, trackProgress } from '../lib/tracks'
import { useUI } from '../lib/ui'
import { ProgressRing } from '../components/ui/ProgressRing'

export default function TrackPage() {
  const { track: id } = useParams()
  const track = getTrack(id)
  const { completedModules, quizScores } = useAppStore()
  const { ui, r } = useUI()
  if (!track) return <Navigate to="/dashboard" replace />
  const p = trackProgress(track, completedModules)
  const Icon = track.icon
  const labCount = track.modules.reduce((a, m) => a + m.sections.filter((s) => s.type === 'game' || s.type === 'animation').length, 0)
  const quizCount = track.modules.reduce((a, m) => a + (m.quiz?.length ?? 0), 0)

  return (
    <div style={{ ['--track' as string]: track.color }}>
      <div className="border-b" style={{ borderColor: 'var(--t-border)', background: `linear-gradient(180deg, color-mix(in oklab, ${track.color} 7%, var(--t-bg)), var(--t-bg))` }}>
        <div className="container-x py-10 sm:py-14 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'color-mix(in oklab, var(--track) 14%, transparent)', color: 'var(--track)' }}><Icon size={24} /></span>
              <span className="eyebrow">{ui('nav_tracks')}</span>
            </div>
            <h1 className="h1">{track.name}</h1>
            <p className="lead mt-3">{r(track.description)}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="tag"><BookOpen size={12} /> {track.modules.length} {ui('modules')}</span>
              <span className="tag"><FlaskConical size={12} /> {labCount} lab</span>
              <span className="tag"><HelpCircle size={12} /> {quizCount} quiz</span>
              <span className="tag"><Zap size={12} style={{ color: 'var(--t-xp)' }} /> {p.xpTotal} XP</span>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {p.next ? (
                <Link to={`/${track.id}/module/${p.next.id}`} className="btn btn-track btn-lg">{p.done > 0 ? ui('continue') : ui('start')}: {r(p.next.title)} <ArrowRight size={16} /></Link>
              ) : (
                <span className="btn btn-soft btn-lg"><CheckCircle2 size={16} style={{ color: 'var(--t-green)' }} /> {ui('all_done')}</span>
              )}
              <Link to={`/cheatsheet/${track.id}`} className="btn btn-ghost btn-lg">{r(track.cheatsheetLabel)}</Link>
            </div>
          </div>
          <div className="flex items-center gap-5 lg:flex-col lg:items-end">
            <ProgressRing value={p.pct} size={112} stroke={9}><div className="text-center"><div className="text-2xl font-extrabold tabular-nums">{p.pct}%</div><div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--t-muted)' }}>{ui('track_stats')}</div></div></ProgressRing>
            <div className="text-sm" style={{ color: 'var(--t-sub)' }}>{p.done}/{p.total} {ui('modules')} · {p.xpEarned}/{p.xpTotal} XP</div>
          </div>
        </div>
      </div>

      <div className="container-x py-10">
        <h2 className="h2 mb-5">{ui('syllabus')}</h2>
        <ol className="flex flex-col gap-2">
          {track.modules.map((m, i) => {
            const done = completedModules.includes(m.id)
            const isNext = p.next?.id === m.id
            const score = quizScores[m.id]
            const labs = m.sections.filter((s) => s.type === 'game' || s.type === 'animation').length
            return (
              <li key={m.id}>
                <Link to={`/${track.id}/module/${m.id}`} className="panel p-4 sm:p-5 flex items-start sm:items-center gap-4 no-underline hover:shadow-md transition-shadow" style={isNext ? { borderColor: 'color-mix(in oklab, var(--track) 50%, var(--t-border))' } : undefined}>
                  <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold border"
                    style={done ? { background: 'var(--track)', borderColor: 'var(--track)', color: '#fff' } : { borderColor: 'var(--t-border-strong)', color: 'var(--t-muted)' }}>
                    {done ? <CheckCircle2 size={16} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold tracking-tight">{r(m.title)}</span>
                      {isNext && <span className="tag tag-track">{ui('next_up')}</span>}
                      {done && score !== undefined && m.quiz && <span className="tag">quiz {score}/{m.quiz.length}</span>}
                    </div>
                    <div className="text-sm mt-0.5" style={{ color: 'var(--t-sub)' }}>{r(m.subtitle)}</div>
                    <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold" style={{ color: 'var(--t-muted)' }}>
                      <span className="inline-flex items-center gap-1"><Clock size={11} /> {m.duration}</span>
                      {labs > 0 && <span className="inline-flex items-center gap-1"><FlaskConical size={11} /> {labs} lab</span>}
                      {m.quiz && <span className="inline-flex items-center gap-1"><HelpCircle size={11} /> {m.quiz.length} quiz</span>}
                      <span className="inline-flex items-center gap-1"><Zap size={11} style={{ color: 'var(--t-xp)' }} /> {m.xpReward} XP</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="shrink-0 hidden sm:block" style={{ color: 'var(--t-muted)' }} />
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
