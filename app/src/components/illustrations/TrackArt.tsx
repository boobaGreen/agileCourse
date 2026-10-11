/**
 * Theme-aware SVG illustrations. Colours come from CSS variables so the art
 * follows light and dark mode and each track accent automatically.
 */
import { motion } from 'framer-motion'

const fg = 'var(--t-fg)'
const surface = 'var(--t-surface)'
const surface2 = 'var(--t-surface2)'
const border = 'var(--t-border-strong)'
const muted = 'var(--t-muted)'

/* ───────────────────────────── Git ───────────────────────────── */

export function GitArt({ className }: { className?: string }) {
  const c = 'var(--t-git)'
  const main = [40, 110, 180, 250, 320]
  return (
    <svg viewBox="0 0 360 220" className={className} role="img" aria-label="Git commit graph">
      <rect x="8" y="8" width="344" height="204" rx="18" fill={surface} stroke={border} />
      {/* main line */}
      <line x1="40" y1="130" x2="320" y2="130" stroke={c} strokeWidth="4" strokeLinecap="round" />
      {/* feature branch */}
      <motion.path d="M110 130 C 130 70, 150 70, 180 70 L 220 70 C 240 70, 240 130, 250 130" fill="none" stroke={c} strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 0"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
      {main.map((x, i) => (
        <motion.g key={x} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * i, type: 'spring', stiffness: 300 }} style={{ transformOrigin: `${x}px 130px` }}>
          <circle cx={x} cy="130" r={x === 250 ? 13 : 11} fill={surface} stroke={c} strokeWidth="4" />
          {x === 250 && <circle cx={x} cy="130" r="5" fill={c} />}
        </motion.g>
      ))}
      {[180, 220].map((x, i) => (
        <motion.circle key={x} cx={x} cy="70" r="10" fill={surface} stroke={c} strokeOpacity="0.7" strokeWidth="4"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + 0.12 * i }} style={{ transformOrigin: `${x}px 70px` }} />
      ))}
      {/* labels */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">
        <rect x="282" y="150" width="56" height="22" rx="6" fill={c} />
        <text x="310" y="165" textAnchor="middle" fill="#fff">main</text>
        <rect x="186" y="34" width="70" height="22" rx="6" fill={surface2} stroke={border} />
        <text x="221" y="49" textAnchor="middle" fill={fg}>feature</text>
        <text x="40" y="190" fill={muted}>a1b2c3d</text>
        <text x="236" y="190" fill={muted}>merge</text>
      </g>
    </svg>
  )
}

/* ──────────────────────────── Docker ─────────────────────────── */

export function DockerArt({ className }: { className?: string }) {
  const c = 'var(--t-docker)'
  const layers = [
    { label: 'FROM node:18-alpine', o: 0.25 },
    { label: 'RUN npm install', o: 0.4 },
    { label: 'COPY . .', o: 0.6 },
  ]
  return (
    <svg viewBox="0 0 360 220" className={className} role="img" aria-label="Docker image layers and containers">
      <rect x="8" y="8" width="344" height="204" rx="18" fill={surface} stroke={border} />
      {/* image layers */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="10.5" fontWeight="600">
        {layers.map((l, i) => (
          <motion.g key={l.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 * (layers.length - i) }}>
            <rect x="32" y={140 - i * 36} width="160" height="30" rx="7" fill={c} fillOpacity={l.o} stroke={c} strokeOpacity="0.6" />
            <text x="44" y={159 - i * 36} fill={fg}>{l.label}</text>
          </motion.g>
        ))}
        <text x="32" y="192" fill={muted}>image · read-only</text>
      </g>
      {/* arrow */}
      <path d="M205 105 H 228" stroke={muted} strokeWidth="2" markerEnd="url(#dk-arrow)" />
      <defs>
        <marker id="dk-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill={muted} /></marker>
      </defs>
      {/* containers */}
      {[0, 1, 2].map((i) => (
        <motion.g key={i} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7 + i * 0.15, type: 'spring', stiffness: 260 }} style={{ transformOrigin: `${292}px ${62 + i * 46}px` }}>
          <rect x="242" y={44 + i * 46} width="96" height="36" rx="8" fill={surface2} stroke={c} strokeWidth="2" />
          <rect x="242" y={44 + i * 46} width="96" height="9" rx="4" fill={c} fillOpacity="0.85" />
          <circle cx="256" cy={67 + i * 46} r="4" fill="var(--t-green)" />
          <text x="266" y={71 + i * 46} fontFamily="JetBrains Mono, monospace" fontSize="10.5" fontWeight="600" fill={fg}>web-{i + 1}</text>
        </motion.g>
      ))}
      <text x="242" y="192" fontFamily="JetBrains Mono, monospace" fontSize="10.5" fontWeight="600" fill={muted}>containers</text>
    </svg>
  )
}

/* ────────────────────────── Kubernetes ───────────────────────── */

export function K8sArt({ className }: { className?: string }) {
  const c = 'var(--t-k8s)'
  const nodes = [{ x: 40 }, { x: 190 }]
  return (
    <svg viewBox="0 0 360 220" className={className} role="img" aria-label="Kubernetes service routing to pods on two nodes">
      <rect x="8" y="8" width="344" height="204" rx="18" fill={surface} stroke={border} />
      {/* service */}
      <rect x="130" y="26" width="100" height="32" rx="9" fill={c} />
      <text x="180" y="47" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="#fff">Service</text>
      {/* connections */}
      {[[85, 120], [135, 120], [235, 120], [285, 120]].map(([x, y], i) => (
        <motion.path key={i} d={`M180 58 C 180 90, ${x} 86, ${x} ${y}`} fill="none" stroke={c} strokeWidth="2" strokeDasharray="4 5"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8, strokeDashoffset: [0, -18] }}
          transition={{ pathLength: { delay: 0.3 + i * 0.1, duration: 0.6 }, opacity: { delay: 0.3 }, strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: 'linear' } }} />
      ))}
      {/* nodes */}
      {nodes.map((n, ni) => (
        <g key={ni}>
          <rect x={n.x} y="104" width="130" height="86" rx="12" fill={surface2} stroke={border} strokeDasharray="4 4" />
          <text x={n.x + 12} y="180" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" fill={muted}>node-{ni + 1}</text>
          {[0, 1].map((p) => (
            <motion.g key={p} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + (ni * 2 + p) * 0.12, type: 'spring', stiffness: 300 }} style={{ transformOrigin: `${n.x + 45 + p * 50}px 140px` }}>
              <rect x={n.x + 25 + p * 50} y="120" width="40" height="40" rx="10" fill={surface} stroke={c} strokeWidth="2.5" />
              <circle cx={n.x + 45 + p * 50} cy="140" r="7" fill={c} fillOpacity="0.85" />
            </motion.g>
          ))}
        </g>
      ))}
    </svg>
  )
}

/* ───────────────────────────── Hero ──────────────────────────── */

/** Landing composition: commit → image → cluster, read left to right. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <div className={`grid gap-3 ${className ?? ''}`}>
      <div className="grid grid-cols-2 gap-3">
        <GitArt className="w-full h-auto" />
        <DockerArt className="w-full h-auto" />
      </div>
      <K8sArt className="w-full h-auto" />
    </div>
  )
}

export function TrackArt({ track, className }: { track: 'git' | 'docker' | 'k8s'; className?: string }) {
  if (track === 'git') return <GitArt className={className} />
  if (track === 'docker') return <DockerArt className={className} />
  return <K8sArt className={className} />
}
