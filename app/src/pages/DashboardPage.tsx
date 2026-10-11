import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Award, Flame, Clock, BookOpen } from 'lucide-react'
import { useAppStore, BADGES } from '../store/useAppStore'
import { useUI } from '../lib/ui'
import { TRACK_LIST, trackProgress, levelFor, type TrackMeta } from '../lib/tracks'
import { ProgressRing } from '../components/ui/ProgressRing'
import { certPaths } from '../data/certifications'

export default function DashboardPage() {
  const { userName, xp, completedModules, badges, activityLog } = useAppStore()
  const { ui, r } = useUI()
  const navigate = useNavigate()
  const lvl = levelFor(xp)

  const progress = TRACK_LIST.map((t) => ({ track: t, p: trackProgress(t, completedModules) }))
  // Resume target: a track that is started but not finished, otherwise the first unfinished track
  const started = progress.find(({ p }) => p.done > 0 && p.done < p.total)
  const resume = started ?? progress.find(({ p }) => p.done < p.total)

  const streak = computeStreak(activityLog)
  const recentBadges = [...badges].sort((a, b) => (b.earnedAt ?? '').localeCompare(a.earnedAt ?? '')).slice(0, 4)
  const nextCert = pickNextCert(progress)

  return (
    <div className="container-x py-8 sm:py-10 flex flex-col gap-10 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="eyebrow mb-2">{ui('welcome_back')}</div>
          <h1 className="h1">{userName}</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Stat icon={Zap} label={ui('total_xp')} value={xp.toLocaleString()} color="var(--t-xp)" />
          <Stat icon={Award} label={ui('badges')} value={String(badges.length)} color="var(--t-k8s)" />
          <Stat icon={Flame} label={ui('streak')} value={`${streak} ${ui('days')}`} color="var(--t-git)" />
        </div>
      </div>

      {resume && resume.p.next && (
        <section className="panel p-5 sm:p-7 grid md:grid-cols-[1fr_auto] gap-6 items-center" style={{ ['--track' as string]: resume.track.color }}>
          <div className="min-w-0">
            <div className="eyebrow mb-2">{resume.p.done > 0 ? ui('pick_up') : ui('next_up')}</div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="tag tag-track">{resume.track.name}</span>
              <span className="text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>{ui('module')} {resume.p.next.order} / {resume.p.total}</span>
            </div>
            <h2 className="h2">{r(resume.p.next.title)}</h2>
            <p className="mt-1.5" style={{ color: 'var(--t-sub)' }}>{r(resume.p.next.subtitle)}</p>
            <div className="flex items-center gap-4 mt-4 text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>
              <span className="inline-flex items-center gap-1"><Clock size={13} /> {resume.p.next.duration}</span>
              <span className="inline-flex items-center gap-1"><Zap size={13} style={{ color: 'var(--t-xp)' }} /> +{resume.p.next.xpReward} XP</span>
              <span className="inline-flex items-center gap-1"><BookOpen size={13} /> {resume.p.next.sections.length} sections</span>
            </div>
          </div>
          <div className="flex md:flex-col items-center gap-4">
            <ProgressRing value={resume.p.pct} size={72} stroke={6}><span className="text-sm font-extrabold tabular-nums">{resume.p.pct}%</span></ProgressRing>
            <button className="btn btn-track btn-lg" onClick={() => navigate(`/${resume.track.id}/module/${resume.p.next!.id}`)}>
              {resume.p.done > 0 ? ui('continue') : ui('start')} <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="h2">{ui('your_tracks')}</h2>
          <span className="text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>{ui('level')} {lvl.level} · {lvl.into}/{lvl.need} XP</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {progress.map(({ track, p }) => <TrackCard key={track.id} track={track} done={p.done} total={p.total} pct={p.pct} nextTitle={p.next ? r(p.next.title) : null} />)}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-4">
        <section className="panel p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="h3">{ui('achievements')}</h3>
            <Link to="/profile?tab=badges" className="text-xs font-bold" style={{ color: 'var(--t-sub)' }}>{ui('nav_profile')} →</Link>
          </div>
          {recentBadges.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--t-muted)' }}>{r(BADGES['git-seedling'].description)} → 🌱</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {recentBadges.map((b) => (
                <li key={b.id} className="flex items-center gap-3 text-sm">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: 'var(--t-surface2)' }}>{b.emoji}</span>
                  <div className="min-w-0"><div className="font-bold">{r(b.title)}</div><div className="text-xs" style={{ color: 'var(--t-muted)' }}>{r(b.description)}</div></div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {nextCert && (
          <section className="panel p-5" style={{ ['--track' as string]: nextCert.color }}>
            <div className="eyebrow mb-2">{ui('roadmap')}</div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="h3">{nextCert.name}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--t-sub)' }}>{r(nextCert.description)}</p>
              </div>
              <span className="tag tag-track shrink-0">{nextCert.level}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">{nextCert.topics.map((tp) => <span key={tp} className="tag">{tp}</span>)}</div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs font-bold" style={{ color: nextCert.ready ? 'var(--t-green)' : 'var(--t-muted)' }}>{nextCert.ready ? ui('cert_ready') : ui('cert_training')}</span>
              <a href={nextCert.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">{ui('launch')} ↗</a>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function Stat({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border px-3.5 py-2" style={{ borderColor: 'var(--t-border)', background: 'var(--t-surface)' }}>
      <Icon size={16} style={{ color }} />
      <div className="leading-tight"><div className="text-sm font-extrabold tabular-nums">{value}</div><div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--t-muted)' }}>{label}</div></div>
    </div>
  )
}

function TrackCard({ track, done, total, pct, nextTitle }: { track: TrackMeta; done: number; total: number; pct: number; nextTitle: string | null }) {
  const { ui, r } = useUI()
  const Icon = track.icon
  return (
    <Link to={`/track/${track.id}`} className="panel p-5 flex flex-col gap-4 no-underline group hover:shadow-md transition-shadow" style={{ ['--track' as string]: track.color }}>
      <div className="flex items-start justify-between gap-3">
        <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'color-mix(in oklab, var(--track) 12%, transparent)', color: 'var(--track)' }}><Icon size={20} /></span>
        <ProgressRing value={pct} size={44} stroke={4}><span className="text-[10px] font-extrabold tabular-nums">{pct}%</span></ProgressRing>
      </div>
      <div>
        <h3 className="text-lg font-extrabold tracking-tight">{track.name}</h3>
        <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--t-sub)' }}>{r(track.description)}</p>
      </div>
      <div className="mt-auto">
        <div className="progress mb-2"><span style={{ width: `${pct}%` }} /></div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold" style={{ color: 'var(--t-muted)' }}>{done}/{total} {ui('modules')}</span>
          <span className="font-bold truncate max-w-[55%]" style={{ color: 'var(--track)' }}>{nextTitle ? `→ ${nextTitle}` : ui('all_done')}</span>
        </div>
      </div>
    </Link>
  )
}

function computeStreak(log: Record<string, number>): number {
  const days = new Set(Object.keys(log).filter((d) => log[d] > 0))
  let streak = 0
  const d = new Date()
  for (let i = 0; i < 400; i++) {
    const key = d.toISOString().slice(0, 10)
    if (days.has(key)) streak++
    else if (i > 0) break
    d.setDate(d.getDate() - 1)
  }
  return streak
}

function pickNextCert(progress: { track: TrackMeta; p: { pct: number } }[]) {
  const best = [...progress].sort((a, b) => b.p.pct - a.p.pct)[0]
  if (!best) return null
  const cat = certPaths.find((c) => c.color.includes(best.track.id))
  const cert = cat?.certs[0]
  if (!cert) return null
  return { ...cert, color: best.track.color, ready: best.p.pct === 100 }
}
