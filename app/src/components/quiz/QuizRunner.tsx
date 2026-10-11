import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { LocalizedString, QuizQuestion } from '../../data/types'
import { useLanguage } from '../../contexts/LanguageContext'
import { useUI } from '../../lib/ui'
import { renderInline } from '../content/Markdown'

interface Shuffled extends QuizQuestion {
  opts: LocalizedString[]
  answer: number
}

interface Props {
  questions: QuizQuestion[]
  onFinish: (correct: number, total: number) => number   // returns XP earned
  onExit: () => void
  nextLabel: string
  onNext: () => void
}

function shuffle(qs: QuizQuestion[]): Shuffled[] {
  return qs.map((q) => {
    const pairs = q.options.map((opt, i) => ({ opt, ok: i === q.correct }))
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]]
    }
    return { ...q, opts: pairs.map((p) => p.opt), answer: pairs.findIndex((p) => p.ok) }
  })
}

export function QuizRunner({ questions, onFinish, onExit, nextLabel, onNext }: Props) {
  const { resolveString } = useLanguage()
  const { ui } = useUI()
  const [seed, setSeed] = useState(0)
  const qs = useMemo(() => shuffle(questions), [questions, seed])
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const [earned, setEarned] = useState<number | null>(null)

  const q = qs[idx]
  const total = qs.length
  const finished = results.length === total && earned !== null
  const correct = results.filter(Boolean).length

  const check = () => {
    if (picked === null || checked) return
    setChecked(true)
    const ok = picked === q.answer
    setResults((r) => [...r, ok])
  }

  const next = () => {
    if (idx + 1 < total) { setIdx(idx + 1); setPicked(null); setChecked(false); return }
    const c = results.filter(Boolean).length
    const xp = onFinish(c, total)
    setEarned(xp)
    if (c === total) confetti({ particleCount: 140, spread: 70, origin: { y: 0.6 }, colors: ['#1e8a4c', '#b7791f', '#0b6fc2', '#d9480f'] })
  }

  const retry = () => { setSeed((s) => s + 1); setIdx(0); setPicked(null); setChecked(false); setResults([]); setEarned(null) }

  if (finished) {
    const pct = Math.round((correct / total) * 100)
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
        <div className="panel p-6 sm:p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background: pct === 100 ? 'color-mix(in oklab, var(--t-green) 15%, transparent)' : 'var(--t-surface2)', color: pct === 100 ? 'var(--t-green)' : 'var(--track)' }}>
            <Trophy size={26} />
          </div>
          <div className="eyebrow mb-1">{ui('quiz_score')}</div>
          <div className="h1">{pct}%</div>
          <p className="mt-1" style={{ color: 'var(--t-sub)' }}>{correct} / {total} {ui('quiz_correct')}</p>
          {earned > 0 && <p className="mt-3 font-extrabold" style={{ color: 'var(--t-xp)' }}>+{earned} XP</p>}
          {pct === 100 && <p className="text-sm mt-1" style={{ color: 'var(--t-green)' }}>{ui('quiz_perfect')}</p>}
        </div>

        <div className="flex flex-col gap-3">
          {qs.map((qq, i) => (
            <details key={qq.id} className="panel p-4 group">
              <summary className="flex items-start gap-3 cursor-pointer list-none">
                {results[i] ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--t-green)' }} /> : <XCircle size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--t-danger)' }} />}
                <span className="font-semibold text-sm" style={{ color: 'var(--t-fg)' }}>{renderInline(resolveString(qq.question), `rq-${i}`)}</span>
              </summary>
              <div className="mt-3 pl-7 text-sm flex flex-col gap-2">
                <div className="font-semibold" style={{ color: 'var(--t-green)' }}>✓ {renderInline(resolveString(qq.opts[qq.answer]), `ra-${i}`)}</div>
                <div className="prose-body text-sm"><strong>{ui('quiz_explanation')}: </strong>{renderInline(resolveString(qq.explanation), `re-${i}`)}</div>
              </div>
            </details>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button className="btn btn-ghost" onClick={retry}><RotateCcw size={15} /> {ui('quiz_retry')}</button>
          <button className="btn btn-track btn-lg" onClick={onNext}>{nextLabel} <ArrowRight size={16} /></button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <button className="btn btn-ghost btn-sm" onClick={onExit}>← {ui('review')}</button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--t-muted)' }}>{idx + 1} / {total}</span>
          <div className="progress w-32"><span style={{ width: `${((idx + (checked ? 1 : 0)) / total) * 100}%` }} /></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} className="panel p-5 sm:p-7">
          <div className="eyebrow mb-2">{ui('quiz')}</div>
          <h3 className="text-lg sm:text-xl font-extrabold leading-snug mb-5" style={{ color: 'var(--t-fg)' }}>{renderInline(resolveString(q.question), `q-${q.id}`)}</h3>
          <div className="flex flex-col gap-2.5">
            {q.opts.map((opt, oi) => {
              const state = !checked ? (picked === oi ? 'selected' : '') : oi === q.answer ? 'correct' : picked === oi ? 'wrong' : ''
              return (
                <button key={oi} disabled={checked} onClick={() => setPicked(oi)} className={`quiz-option ${state}`}>
                  <span className="key">{String.fromCharCode(65 + oi)}</span>
                  <span>{renderInline(resolveString(opt), `o-${q.id}-${oi}`)}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {checked && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                <div className="mt-5 callout" style={{ ['--accent' as string]: picked === q.answer ? 'var(--t-green)' : 'var(--t-danger)' }}>
                  <div className="font-bold mb-1 text-sm" style={{ color: picked === q.answer ? 'var(--t-green)' : 'var(--t-danger)' }}>
                    {picked === q.answer ? '✓ ' : '✗ '}{ui('quiz_explanation')}
                  </div>
                  <div className="prose-body text-[0.95rem]">{renderInline(resolveString(q.explanation), `e-${q.id}`)}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex justify-end">
            {!checked ? (
              <button className="btn btn-track" disabled={picked === null} onClick={check}>{ui('quiz_check')}</button>
            ) : (
              <button className="btn btn-track" onClick={next}>{idx + 1 < total ? ui('quiz_next') : ui('quiz_finish')} <ArrowRight size={15} /></button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
