import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ExternalLink, Sparkles, Zap, HelpCircle } from 'lucide-react'
import { useAppStore, BADGES } from '../store/useAppStore'
import { getTrack, findModule } from '../lib/tracks'
import { useUI } from '../lib/ui'
import { SectionBlock } from '../components/content/SectionBlock'
import { QuizRunner } from '../components/quiz/QuizRunner'
import { renderInline } from '../components/content/Markdown'

const MODULE_BADGE: Record<string, keyof typeof BADGES> = {
  'git-1': 'git-seedling', 'git-9': 'git-branching', 'git-11': 'git-pro',
  'docker-1': 'docker-swim', 'docker-9': 'docker-harbor',
  'k8s-1': 'k8s-deck', 'k8s-9': 'k8s-helmsman',
}
const LAB_BADGE: Record<string, keyof typeof BADGES> = { 'git-6': 'git-workflow', 'git-8': 'git-destructive' }

export default function ModulePage() {
  const { track: trackId, id } = useParams()
  const track = getTrack(trackId)
  const mod = findModule(id)
  const navigate = useNavigate()
  const { ui, r } = useUI()
  const { completedModules, completedLabs, completedMissions, completeModule, saveQuizScore, completeLab, claimMission, awardBadge } = useAppStore()
  const [view, setView] = useState<'theory' | 'quiz'>('theory')
  const [missionInput, setMissionInput] = useState('')

  useEffect(() => { setView('theory'); setMissionInput('') }, [id])

  const trackModules = track?.modules ?? []
  const index = trackModules.findIndex((m) => m.id === id)
  const nextMod = index >= 0 ? trackModules[index + 1] : undefined
  const prevMod = index > 0 ? trackModules[index - 1] : undefined
  const done = !!mod && completedModules.includes(mod.id)
  const hasQuiz = !!mod?.quiz?.length

  const onCompleteGame = useCallback((title: string) => {
    if (!mod) return
    completeLab(`${mod.id}:${title}`, 25)
    const b = LAB_BADGE[mod.id]
    if (b) awardBadge(BADGES[b])
  }, [mod, completeLab, awardBadge])

  const markComplete = useCallback(() => {
    if (!mod) return
    if (!completedModules.includes(mod.id)) {
      completeModule(mod.id, mod.xpReward)
      const b = MODULE_BADGE[mod.id]
      if (b) awardBadge(BADGES[b])
      const all = ['git-11', 'docker-9', 'k8s-9']
      const now = [...completedModules, mod.id]
      if (all.every((x) => now.includes(x))) awardBadge(BADGES['full-stack'])
    }
  }, [mod, completedModules, completeModule, awardBadge])

  const toc = useMemo(() => (mod?.sections ?? []).map((s, i) => ({ i, title: s.title ? r(s.title).replace(/^[^\p{L}\p{N}]+/u, '') : '', type: s.type })).filter((s) => s.title), [mod, r])

  if (!track || !mod || mod.track !== track.id) return <Navigate to="/dashboard" replace />

  const goNext = () => navigate(nextMod ? `/${track.id}/module/${nextMod.id}` : `/track/${track.id}`)
  const nextLabel = nextMod ? `${ui('next_module')}: ${r(nextMod.title)}` : ui('back_to_track')

  const primaryAction = () => {
    markComplete()
    if (hasQuiz) { setView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
    else goNext()
  }

  return (
    <div style={{ ['--track' as string]: track.color }}>
      <div className="h-1" style={{ background: `linear-gradient(90deg, var(--track) ${Math.round(((index + 1) / trackModules.length) * 100)}%, var(--t-surface3) 0)` }} />
      <div className="container-x py-6 sm:py-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_200px]">
        {/* Left: track syllabus */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 flex flex-col gap-3">
            <Link to={`/track/${track.id}`} className="nav-link justify-start px-2 -ml-2"><ArrowLeft size={14} /> {track.name}</Link>
            <ol className="flex flex-col gap-0.5">
              {trackModules.map((m, i) => {
                const isDone = completedModules.includes(m.id)
                return (
                  <li key={m.id}>
                    <Link to={`/${track.id}/module/${m.id}`} className={`side-item no-underline ${m.id === mod.id ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                      <span className="idx">{isDone ? '✓' : i + 1}</span>
                      <span className="line-clamp-2">{r(m.title)}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </aside>

        {/* Center column */}
        <article className="min-w-0 max-w-3xl">
          <div className="lg:hidden mb-4"><Link to={`/track/${track.id}`} className="nav-link justify-start px-2 -ml-2"><ArrowLeft size={14} /> {track.name}</Link></div>

          {view === 'theory' ? (
            <>
              <header className="mb-8">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="tag tag-track">{track.name}</span>
                  <span className="tag">{ui('module')} {mod.order} / {trackModules.length}</span>
                  {done && <span className="tag" style={{ color: 'var(--t-green)' }}><CheckCircle2 size={12} /> {ui('completed')}</span>}
                </div>
                <h1 className="h1 flex items-start gap-3"><span className="text-3xl sm:text-4xl leading-none mt-1">{mod.emoji}</span><span>{r(mod.title)}</span></h1>
                <p className="lead mt-3">{r(mod.subtitle)}</p>
                <div className="flex items-center gap-4 mt-4 text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>
                  <span className="inline-flex items-center gap-1"><Clock size={13} /> {mod.duration}</span>
                  <span className="inline-flex items-center gap-1"><Zap size={13} style={{ color: 'var(--t-xp)' }} /> +{mod.xpReward} XP</span>
                  {hasQuiz && <span className="inline-flex items-center gap-1"><HelpCircle size={13} /> {mod.quiz!.length} quiz</span>}
                </div>
                {mod.funFact && (
                  <div className="callout mt-6" style={{ ['--accent' as string]: 'var(--t-k8s)' }}>
                    <div className="flex items-start gap-3">
                      <Sparkles size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--t-k8s)' }} />
                      <p className="text-sm" style={{ color: 'var(--t-sub)' }}><strong style={{ color: 'var(--t-fg)' }}>{ui('fun_fact')}. </strong>{renderInline(r(mod.funFact), 'ff')}</p>
                    </div>
                  </div>
                )}
              </header>

              <div className="flex flex-col gap-9">
                {mod.sections.map((s, i) => <SectionBlock key={i} section={s} index={i} moduleId={mod.id} completedLabs={completedLabs} onCompleteGame={onCompleteGame} />)}
              </div>

              {mod.externalLink && (
                <section className="panel p-5 mt-10">
                  <div className="eyebrow mb-1">{ui('mission')}</div>
                  <p className="text-sm mb-4" style={{ color: 'var(--t-sub)' }}>{r(mod.externalLink.xpPrompt)}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={mod.externalLink.url} target="_blank" rel="noopener noreferrer" className="btn btn-track flex-1">{ui('launch')} {r(mod.externalLink.label)} <ExternalLink size={14} /></a>
                    <div className="flex gap-2 flex-1">
                      <input type="number" min={0} className="input" placeholder={ui('mission_placeholder')} value={missionInput} onChange={(e) => setMissionInput(e.target.value)} disabled={completedMissions.includes(mod.id)} />
                      <button className="btn btn-primary shrink-0" disabled={completedMissions.includes(mod.id) || !missionInput}
                        onClick={() => { const amt = Math.min(200, Math.max(25, parseInt(missionInput || '0', 10) * 5)); if (claimMission(mod.id, amt)) setMissionInput('') }}>
                        {completedMissions.includes(mod.id) ? ui('mission_claimed') : ui('mission_claim')}
                      </button>
                    </div>
                  </div>
                </section>
              )}

              <footer className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--t-border)' }}>
                {prevMod ? <Link to={`/${track.id}/module/${prevMod.id}`} className="btn btn-ghost"><ArrowLeft size={15} /> {r(prevMod.title)}</Link> : <span />}
                <button className="btn btn-track btn-lg" onClick={primaryAction}>
                  {hasQuiz ? ui('quiz_start') : done ? ui('next_module') : ui('complete_module')} <ArrowRight size={16} />
                </button>
              </footer>
            </>
          ) : (
            <QuizRunner
              questions={mod.quiz!}
              onFinish={(c, t) => saveQuizScore(mod.id, c, t)}
              onExit={() => setView('theory')}
              nextLabel={nextLabel}
              onNext={goNext}
            />
          )}
        </article>

        {/* Right: in-page TOC */}
        {view === 'theory' && (
          <aside className="hidden xl:block">
            <div className="sticky top-20">
              <div className="eyebrow mb-3">{ui('on_this_page')}</div>
              <ul className="flex flex-col gap-1 border-l" style={{ borderColor: 'var(--t-border)' }}>
                {toc.map((t) => (
                  <li key={t.i}>
                    <a href={`#s-${t.i}`} className="block pl-3 py-1 text-xs leading-snug no-underline hover:underline" style={{ color: t.type === 'game' || t.type === 'animation' ? 'var(--track)' : 'var(--t-sub)' }}>{t.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
