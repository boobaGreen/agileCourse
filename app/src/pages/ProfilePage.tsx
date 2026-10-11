import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { Award, BarChart3, Map, RotateCcw, Lock, ExternalLink, Zap } from 'lucide-react'
import { useAppStore, BADGES } from '../store/useAppStore'
import { TRACK_LIST, trackProgress, levelFor } from '../lib/tracks'
import { useUI } from '../lib/ui'
import { certPaths } from '../data/certifications'
import { useTheme } from '../lib/theme'

type Tab = 'stats' | 'badges' | 'roadmap'

export default function ProfilePage() {
  const { userName, xp, completedModules, quizScores, badges, activityLog, resetProgress } = useAppStore()
  const { ui, r } = useUI()
  const { resolved } = useTheme()
  const [params, setParams] = useSearchParams()
  const tab = (params.get('tab') as Tab) || 'stats'
  const [confirm, setConfirm] = useState(false)
  const lvl = levelFor(xp)

  const progress = TRACK_LIST.map((t) => ({ track: t, p: trackProgress(t, completedModules) }))
  const radar = progress.map(({ track, p }) => ({ subject: track.name, value: p.pct }))
  const avgQuiz = useMemo(() => {
    const entries = Object.entries(quizScores)
    if (!entries.length) return null
    let got = 0, tot = 0
    for (const [id, s] of entries) {
      const m = TRACK_LIST.flatMap((t) => t.modules).find((mm) => mm.id === id)
      if (m?.quiz) { got += s; tot += m.quiz.length }
    }
    return tot ? Math.round((got / tot) * 100) : null
  }, [quizScores])

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'stats', label: ui('stats'), icon: BarChart3 },
    { id: 'badges', label: ui('achievements'), icon: Award },
    { id: 'roadmap', label: ui('roadmap'), icon: Map },
  ]

  return (
    <div className="container-x py-8 sm:py-10 flex flex-col gap-8 animate-fade-up">
      <header className="flex flex-col sm:flex-row sm:items-center gap-5">
        <span className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold" style={{ background: 'var(--t-primary)', color: 'var(--t-primary-fg)' }}>{userName.trim().charAt(0).toUpperCase()}</span>
        <div className="flex-1 min-w-0">
          <h1 className="h1">{userName}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-bold">{ui('level')} {lvl.level}</span>
            <div className="progress w-40"><span style={{ width: `${lvl.pct}%`, background: 'var(--t-xp)' }} /></div>
            <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--t-muted)' }}>{lvl.into}/{lvl.need} XP</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border px-4 py-2.5" style={{ borderColor: 'var(--t-border)', background: 'var(--t-surface)' }}>
          <Zap size={16} style={{ color: 'var(--t-xp)' }} /><span className="font-extrabold tabular-nums">{xp.toLocaleString()}</span><span className="text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>{ui('total_xp')}</span>
        </div>
      </header>

      <div className="flex gap-1 border-b" style={{ borderColor: 'var(--t-border)' }}>
        {tabs.map((t) => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button key={t.id} onClick={() => setParams({ tab: t.id })} className="inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-bold border-b-2 -mb-px transition-colors"
              style={{ borderColor: active ? 'var(--t-fg)' : 'transparent', color: active ? 'var(--t-fg)' : 'var(--t-muted)' }}>
              <Icon size={15} /> {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'stats' && (
        <div className="grid lg:grid-cols-[1fr_320px] gap-5">
          <div className="flex flex-col gap-5">
            <section className="panel p-5">
              <h3 className="h3 mb-4">{ui('track_stats')}</h3>
              <div className="flex flex-col gap-4">
                {progress.map(({ track, p }) => (
                  <div key={track.id} style={{ ['--track' as string]: track.color }}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-bold">{track.name}</span>
                      <span className="tabular-nums" style={{ color: 'var(--t-muted)' }}>{p.done}/{p.total} {ui('modules')} · {p.xpEarned} XP</span>
                    </div>
                    <div className="progress"><span style={{ width: `${p.pct}%` }} /></div>
                  </div>
                ))}
              </div>
              {avgQuiz !== null && <p className="text-sm mt-5" style={{ color: 'var(--t-sub)' }}>Quiz: <strong style={{ color: 'var(--t-fg)' }}>{avgQuiz}%</strong> · {Object.keys(quizScores).length} {ui('completed').toLowerCase()}</p>}
            </section>

            <section className="panel p-5">
              <h3 className="h3 mb-4">{ui('activity')}</h3>
              <Heatmap log={activityLog} />
            </section>
          </div>

          <div className="flex flex-col gap-5">
            <section className="panel p-5">
              <h3 className="h3 mb-2">Skill radar</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radar} outerRadius="75%">
                    <PolarGrid stroke={resolved === 'dark' ? '#2a3038' : '#e3e3dd'} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: resolved === 'dark' ? '#aab0b7' : '#4d525a', fontSize: 12, fontWeight: 700 }} />
                    <Radar dataKey="value" stroke="var(--t-docker)" fill="var(--t-docker)" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="panel p-5">
              <h3 className="h3 mb-1">{ui('reset_progress')}</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--t-sub)' }}>{ui('reset_warning')}</p>
              {!confirm ? (
                <button className="btn btn-danger btn-sm" onClick={() => setConfirm(true)}><RotateCcw size={14} /> {ui('reset_progress')}</button>
              ) : (
                <div className="flex gap-2">
                  <button className="btn btn-danger btn-sm" onClick={() => { resetProgress(); setConfirm(false) }}>{ui('confirm')}</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setConfirm(false)}>{ui('cancel')}</button>
                </div>
              )}
            </section>
          </div>
        </div>
      )}

      {tab === 'badges' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.values(BADGES).map((b) => {
            const earned = badges.find((x) => x.id === b.id)
            return (
              <div key={b.id} className="panel p-4 flex items-center gap-4" style={{ opacity: earned ? 1 : 0.6 }}>
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: 'var(--t-surface2)', filter: earned ? 'none' : 'grayscale(1)' }}>{earned ? b.emoji : <Lock size={18} style={{ color: 'var(--t-muted)' }} />}</span>
                <div className="min-w-0">
                  <div className="font-bold">{r(b.title)}</div>
                  <div className="text-xs" style={{ color: 'var(--t-muted)' }}>{r(b.description)}</div>
                  {earned?.earnedAt && <div className="text-[10px] mt-1 font-mono" style={{ color: 'var(--t-muted)' }}>{new Date(earned.earnedAt).toLocaleDateString()}</div>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'roadmap' && (
        <div className="flex flex-col gap-6">
          {certPaths.map((cat) => {
            const track = TRACK_LIST.find((t) => cat.color.includes(t.id))
            const p = track ? trackProgress(track, completedModules) : null
            return (
              <section key={cat.badge} style={{ ['--track' as string]: track?.color }}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="h3">{r(cat.category)}</h3>
                  {p && <span className="tag tag-track">{p.pct}%</span>}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {cat.certs.map((c) => (
                    <div key={c.name} className="panel p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div><div className="font-extrabold">{c.name}</div><div className="text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>{c.level}</div></div>
                        <span className="text-xs font-bold" style={{ color: p?.pct === 100 ? 'var(--t-green)' : 'var(--t-muted)' }}>{p?.pct === 100 ? ui('cert_ready') : ui('cert_training')}</span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--t-sub)' }}>{r(c.description)}</p>
                      <div className="flex flex-wrap gap-1.5">{c.topics.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm self-start mt-auto">{ui('launch')} <ExternalLink size={12} /></a>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Heatmap({ log }: { log: Record<string, number> }) {
  const weeks = 26
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - (weeks * 7 - 1) - today.getDay())
  const cells: { key: string; v: number }[] = []
  const d = new Date(start)
  while (d <= today) {
    const key = d.toISOString().slice(0, 10)
    cells.push({ key, v: log[key] || 0 })
    d.setDate(d.getDate() + 1)
  }
  const max = Math.max(1, ...cells.map((c) => c.v))
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, 10px)' }}>
        {cells.map((c) => {
          const a = c.v === 0 ? 0 : 0.25 + 0.75 * (c.v / max)
          return <span key={c.key} title={`${c.key}: ${c.v} XP`} className="w-2.5 h-2.5 rounded-[2px]" style={{ background: c.v === 0 ? 'var(--t-surface3)' : `color-mix(in oklab, var(--t-green) ${Math.round(a * 100)}%, var(--t-surface3))` }} />
        })}
      </div>
    </div>
  )
}
