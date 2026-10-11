import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Search, X, Eye, Terminal } from 'lucide-react'
import { GIT_CHEATSHEET, type CheatsheetCommand } from '../data/git/cheatsheet'
import { DOCKER_CHEATSHEET } from '../data/docker/cheatsheet'
import { K8S_CHEATSHEET } from '../data/k8s/cheatsheet'
import { CommandVisual } from '../components/cheatsheet/CommandVisual'
import { getTrack, TRACK_LIST } from '../lib/tracks'
import { useUI } from '../lib/ui'

const LEVEL_COLOR: Record<string, string> = { beginner: 'var(--t-green)', intermediate: 'var(--t-warning)', advanced: 'var(--t-danger)' }

export default function CheatsheetPage() {
  const { track: id } = useParams()
  const track = getTrack(id)
  const { ui, r } = useUI()
  const [q, setQ] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [sel, setSel] = useState<CheatsheetCommand | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const data = useMemo(() => {
    const src = track?.id === 'docker' ? DOCKER_CHEATSHEET : track?.id === 'k8s' ? K8S_CHEATSHEET : GIT_CHEATSHEET
    const needle = q.trim().toLowerCase()
    if (!needle) return src
    return src.map((c) => ({ ...c, commands: c.commands.filter((cmd) => cmd.command.toLowerCase().includes(needle) || r(cmd.description).toLowerCase().includes(needle)) })).filter((c) => c.commands.length)
  }, [track, q, r])

  if (!track) return <Navigate to="/cheatsheet/git" replace />

  const copy = async (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    try { await navigator.clipboard.writeText(text); setCopied(text); setTimeout(() => setCopied(null), 1500) } catch { /* ignore */ }
  }

  return (
    <div className="container-x py-8 sm:py-10" style={{ ['--track' as string]: track.color }}>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
        <div>
          <div className="eyebrow mb-2">{ui('nav_cheatsheets')}</div>
          <h1 className="h1">{r(track.cheatsheetLabel)}</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex rounded-xl border p-1 gap-1" style={{ borderColor: 'var(--t-border)', background: 'var(--t-surface)' }}>
            {TRACK_LIST.map((t) => (
              <Link key={t.id} to={`/cheatsheet/${t.id}`} className="px-3.5 py-1.5 rounded-lg text-sm font-bold no-underline transition-colors"
                style={t.id === track.id ? { background: t.color, color: '#fff' } : { color: 'var(--t-sub)' }}>{t.name}</Link>
            ))}
          </div>
          <label className="relative block sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--t-muted)' }} />
            <input className="input pl-9" placeholder={ui('search_commands')} value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
        </div>
      </div>

      {data.length === 0 && <p className="py-16 text-center" style={{ color: 'var(--t-muted)' }}>{ui('no_results')} “{q}”.</p>}

      <div className="flex flex-col gap-10">
        {data.map((cat) => (
          <section key={cat.level}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: LEVEL_COLOR[cat.level] }} />
              <h2 className="h3">{r(cat.title)}</h2>
              <span className="text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>{cat.commands.length}</span>
            </div>
            <div className="panel overflow-hidden divide-y" style={{ borderColor: 'var(--t-border)' }}>
              {cat.commands.map((cmd) => {
                const inspectable = !!(cmd.visualType || cmd.example || cmd.output)
                return (
                  <div key={cmd.command} className="grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] items-center gap-2 sm:gap-4 px-4 py-3 hover:bg-[var(--t-surface2)] transition-colors" style={{ borderColor: 'var(--t-border)' }}
                    role={inspectable ? 'button' : undefined} onClick={() => inspectable && setSel(cmd)}>
                    <code className="font-mono text-[13px] font-semibold break-all" style={{ color: 'var(--track)' }}>{cmd.command}</code>
                    <span className="text-sm" style={{ color: 'var(--t-sub)' }}>{r(cmd.description)}</span>
                    <div className="flex items-center gap-1 justify-end">
                      {inspectable && <span className="icon-btn w-8 h-8" title={ui('inspect')}><Eye size={14} /></span>}
                      <button className="icon-btn w-8 h-8" onClick={(e) => copy(cmd.command, e)} title={ui('copy')}>{copied === cmd.command ? <Check size={14} style={{ color: 'var(--t-green)' }} /> : <Copy size={14} />}</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {sel && (
            <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}>
              <div className="absolute inset-0" style={{ background: 'rgba(10,12,14,0.55)', backdropFilter: 'blur(4px)' }} />
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                onClick={(e) => e.stopPropagation()} className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border" style={{ background: 'var(--t-surface)', borderColor: 'var(--t-border)', ['--track' as string]: track.color }}>
                <div className="flex items-start justify-between gap-4 p-5 border-b" style={{ borderColor: 'var(--t-border)' }}>
                  <div className="min-w-0">
                    <code className="font-mono text-base sm:text-lg font-bold break-all" style={{ color: 'var(--track)' }}>{sel.command}</code>
                    <p className="text-sm mt-1" style={{ color: 'var(--t-sub)' }}>{r(sel.description)}</p>
                  </div>
                  <button className="icon-btn shrink-0" onClick={() => setSel(null)} aria-label={ui('close')}><X size={16} /></button>
                </div>
                {sel.visualType && sel.visualHighlight && (
                  <div className="console p-4 sm:p-8 border-b" style={{ borderColor: 'var(--t-border)' }}>
                    <CommandVisual type={sel.visualType} highlight={sel.visualHighlight} />
                  </div>
                )}
                {(sel.example || sel.output) && (
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2 eyebrow" style={{ color: 'var(--track)' }}><Terminal size={13} /> {ui('example')}</div>
                    {sel.example && (
                      <div className="code-frame">
                        <div className="code-frame-head"><span>shell</span><button onClick={() => copy(sel.example!)} className="inline-flex items-center gap-1 text-[11px] font-bold normal-case tracking-normal" style={{ color: copied === sel.example ? '#3ccf7a' : '#a7b1bd' }}>{copied === sel.example ? <Check size={12} /> : <Copy size={12} />} {ui('copy')}</button></div>
                        <pre><code>{sel.example.split('\n').map((l, i) => <div key={i}><span className="c-comment">$ </span>{l}</div>)}</code></pre>
                      </div>
                    )}
                    {sel.output && (
                      <div>
                        <div className="eyebrow mb-2">{ui('output')}</div>
                        <pre className="rounded-xl p-4 text-xs leading-relaxed whitespace-pre-wrap font-mono" style={{ background: '#0b0e12', color: '#a7b1bd', border: '1px solid #1f2630' }}>{sel.output}</pre>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
