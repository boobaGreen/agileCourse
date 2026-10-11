import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { HardDrive, Network, Shield, FileJson, Database, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { K8sState, K8sService, K8sPod } from '../../../data/types'

interface Props {
  state: K8sState
}

const SVC_COLORS = ['#7aa2ff', '#3ccf7a', '#e2b04a', '#ff7a3d', '#a08cff', '#4fd1c5']

function matches(svc: K8sService, pod: K8sPod) {
  const sel = Object.entries(svc.selector || {})
  return sel.length > 0 && sel.every(([k, v]) => pod.labels?.[k] === v)
}

const STATUS_COLOR: Record<string, string> = { Running: '#3ccf7a', Pending: '#e2b04a', Error: '#ff6b6b' }

interface Line { id: string; d: string; color: string; svc: string }

export function K8sVisualizer({ state }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<Line[]>([])
  const [hover, setHover] = useState<string | null>(null)

  const svcColor = useMemo(() => {
    const m: Record<string, string> = {}
    state.services.forEach((s, i) => { m[s.id] = SVC_COLORS[i % SVC_COLORS.length] })
    return m
  }, [state.services])

  const endpoints = useMemo(() => {
    const m: Record<string, K8sPod[]> = {}
    state.services.forEach((s) => { m[s.id] = state.pods.filter((p) => matches(s, p)) })
    return m
  }, [state.services, state.pods])

  // Measure DOM positions and draw curves from each Service card to each matching Pod.
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const compute = () => {
      const base = root.getBoundingClientRect()
      const next: Line[] = []
      for (const svc of state.services) {
        const sEl = root.querySelector<HTMLElement>(`[data-svc="${svc.id}"]`)
        if (!sEl) continue
        const sr = sEl.getBoundingClientRect()
        const x1 = sr.left + sr.width / 2 - base.left
        const y1 = sr.bottom - base.top
        for (const pod of endpoints[svc.id] || []) {
          const pEl = root.querySelector<HTMLElement>(`[data-pod="${pod.id}"]`)
          if (!pEl) continue
          const pr = pEl.getBoundingClientRect()
          const x2 = pr.left + pr.width / 2 - base.left
          const y2 = pr.top - base.top
          const dy = Math.max(30, (y2 - y1) / 2)
          next.push({ id: `${svc.id}-${pod.id}`, svc: svc.id, color: svcColor[svc.id], d: `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}` })
        }
      }
      setLines(next)
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(root)
    // Pods animate in; recompute once they have settled.
    const t = window.setTimeout(compute, 350)
    return () => { ro.disconnect(); window.clearTimeout(t) }
  }, [state, endpoints, svcColor])

  const hasConfig = (state.configMaps?.length ?? 0) + (state.secrets?.length ?? 0) > 0
  const hasStorage = (state.pvc?.length ?? 0) > 0

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-thin">
      <div ref={rootRef} className="relative p-4 sm:p-5 flex flex-col gap-6 min-h-full">
        {/* connection layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', zIndex: 0 }}>
          <defs>
            {SVC_COLORS.map((c, i) => (
              <marker key={i} id={`k8s-dot-${i}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                <circle cx="5" cy="5" r="4" fill={c} />
              </marker>
            ))}
          </defs>
          {lines.map((l) => {
            const dim = hover !== null && hover !== l.svc
            const idx = SVC_COLORS.indexOf(l.color)
            return (
              <motion.path key={l.id} d={l.d} fill="none" stroke={l.color} strokeWidth={dim ? 1 : 2}
                strokeDasharray="5 5" markerEnd={`url(#k8s-dot-${idx})`}
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: dim ? 0.15 : 0.85, strokeDashoffset: [0, -20] }}
                transition={{ pathLength: { duration: 0.5 }, opacity: { duration: 0.2 }, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: 'linear' } }} />
            )
          })}
        </svg>

        {/* Services */}
        <section className="relative z-10">
          <Header icon={<Network size={14} />} color="#e2b04a" label="Services" hint={state.services.length ? undefined : 'kubectl expose · kubectl apply -f'} />
          <div className="flex flex-wrap gap-3 mt-2">
            <AnimatePresence>
              {state.services.map((svc) => {
                const c = svcColor[svc.id]
                const eps = endpoints[svc.id] || []
                return (
                  <motion.div key={svc.id} data-svc={svc.id} layout initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    onMouseEnter={() => setHover(svc.id)} onMouseLeave={() => setHover(null)}
                    className="rounded-xl px-3.5 py-2.5 min-w-[180px] cursor-default"
                    style={{ background: '#11161c', border: `1px solid ${c}66`, boxShadow: hover === svc.id ? `0 0 0 3px ${c}33` : undefined }}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] font-bold" style={{ color: '#e6ebf1' }}>{svc.name}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: `${c}22`, color: c }}>{svc.type}</span>
                    </div>
                    <div className="mt-1 font-mono text-[11px]" style={{ color: '#a7b1bd' }}>{svc.clusterIP}</div>
                    {svc.externalIP && (
                      <div className="mt-0.5 font-mono text-[11px] flex items-center gap-1" style={{ color: '#3ccf7a' }}><Globe size={11} /> {svc.externalIP}</div>
                    )}
                    <div className="mt-1.5 text-[10px]" style={{ color: '#76818e' }}>
                      {Object.entries(svc.selector || {}).map(([k, v]) => `${k}=${v}`).join(', ')} · <span style={{ color: eps.length ? c : '#ff6b6b', fontWeight: 700 }}>{eps.length} endpoint{eps.length === 1 ? '' : 's'}</span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Nodes and Pods */}
        <section className="relative z-10 mt-6">
          <Header icon={<HardDrive size={14} />} color="#7aa2ff" label="Nodes" />
          <div className="flex flex-col gap-3 mt-2">
            {state.nodes.map((node) => {
              const pods = state.pods.filter((p) => p.node === node.id)
              return (
                <div key={node.id} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #232b35' }}>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12px] font-bold font-mono" style={{ color: '#e6ebf1' }}>{node.name}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: node.status === 'Ready' ? 'rgba(60,207,122,0.15)' : 'rgba(255,107,107,0.15)', color: node.status === 'Ready' ? '#3ccf7a' : '#ff6b6b' }}>{node.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 min-h-[38px]">
                    <AnimatePresence>
                      {pods.map((pod) => {
                        const owners = state.services.filter((s) => matches(s, pod))
                        const ring = owners[0] ? svcColor[owners[0].id] : '#33404d'
                        const dim = hover !== null && !owners.some((o) => o.id === hover)
                        return (
                          <motion.div key={pod.id} data-pod={pod.id} layout initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: dim ? 0.35 : 1 }} exit={{ scale: 0.6, opacity: 0 }}
                            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-mono text-[10.5px]"
                            style={{ background: '#11161c', border: `1px solid ${ring}`, color: '#e6ebf1' }}
                            title={`${pod.name}\n${Object.entries(pod.labels).map(([k, v]) => `${k}=${v}`).join(' ')}\n${pod.status}`}>
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STATUS_COLOR[pod.status] ?? '#a7b1bd' }} />
                            <span className="max-w-[130px] truncate">{pod.name}</span>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                    {pods.length === 0 && <span className="text-[11px] italic self-center" style={{ color: '#76818e' }}>No pods scheduled</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {(hasConfig || hasStorage) && (
          <section className="relative z-10 grid sm:grid-cols-2 gap-4">
            {hasConfig && (
              <div>
                <Header icon={<FileJson size={14} />} color="#7aa2ff" label="Config & Secrets" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {state.configMaps?.map((cm) => (
                    <span key={cm.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono" style={{ background: '#11161c', border: '1px solid #232b35', color: '#a7b1bd' }}><FileJson size={11} style={{ color: '#7aa2ff' }} /> {cm.name}</span>
                  ))}
                  {state.secrets?.map((s) => (
                    <span key={s.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono" style={{ background: '#11161c', border: '1px solid #232b35', color: '#a7b1bd' }}><Shield size={11} style={{ color: '#ff6b6b' }} /> {s.name}</span>
                  ))}
                </div>
              </div>
            )}
            {hasStorage && (
              <div>
                <Header icon={<Database size={14} />} color="#e2b04a" label="Storage" />
                <div className="flex flex-col gap-2 mt-2">
                  {state.pvc?.map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg" style={{ background: '#11161c', border: '1px solid #232b35' }}>
                      <span className="text-[11px] font-mono" style={{ color: '#e6ebf1' }}>{p.name} <span style={{ color: '#76818e' }}>· {p.size}</span></span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ background: p.status === 'Bound' ? 'rgba(60,207,122,0.15)' : 'rgba(226,176,74,0.15)', color: p.status === 'Bound' ? '#3ccf7a' : '#e2b04a' }}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

function Header({ icon, color, label, hint }: { icon: React.ReactNode; color: string; label: string; hint?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color }}>{icon}</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: '#a7b1bd' }}>{label}</span>
      {hint && <span className="text-[10px] font-mono" style={{ color: '#4d5864' }}>· {hint}</span>}
    </div>
  )
}
