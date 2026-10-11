import { Fragment, type ReactNode } from 'react'

export type TermLine = { type: 'cmd' | 'out'; text: string; ok?: boolean }

const C = {
  prompt: '#7aa2ff',
  cmd: '#e6ebf1',
  out: '#a7b1bd',
  dim: '#76818e',
  ok: '#3ccf7a',
  warn: '#e2b04a',
  err: '#ff6b6b',
  key: '#9fc4ff',
  hash: '#c4a3ff',
}

// Words that carry state in Git, Docker and kubectl output
const RULES: { re: RegExp; color: string; bold?: boolean }[] = [
  { re: /\b(error|fatal|failed|failure|not found|invalid|denied|refused|rejected|unknown|CrashLoopBackOff|ImagePullBackOff|OOMKilled|NotReady|Lost)\b:?/gi, color: C.err, bold: true },
  { re: /\b(warning|hint|Pending|Terminating|ContainerCreating|exited|Exited|detached HEAD|CONFLICT)\b:?/g, color: C.warn, bold: true },
  { re: /\b(created|configured|unchanged|scaled|exposed|deleted|restarted|rolled out|Running|Ready|Bound|Available|Active|Up|Pushed|Pull complete|Downloaded|Successfully|Switched to|Fast-forward|done|installed|merged|Merge made)\b/g, color: C.ok, bold: true },
  { re: /\b[0-9a-f]{7,40}\b/g, color: C.hash },
  { re: /\b(?:[a-z0-9-]+\.)?(?:deployment|service|pod|configmap|secret|persistentvolumeclaim|release)(?:\.apps)?\/[a-z0-9.-]+/g, color: C.key },
  { re: /(\[[^\]\n]{1,30}\])/g, color: C.key },
  { re: /((?:\d{1,3}\.){3}\d{1,3}(?::\d+)?)/g, color: C.key },
]

function colorize(text: string): ReactNode[] {
  type Span = { start: number; end: number; color: string; bold?: boolean }
  const spans: Span[] = []
  for (const r of RULES) {
    r.re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = r.re.exec(text))) {
      const s = m.index, e = s + m[0].length
      if (!spans.some((x) => s < x.end && e > x.start)) spans.push({ start: s, end: e, color: r.color, bold: r.bold })
      if (m[0].length === 0) r.re.lastIndex++
    }
  }
  spans.sort((a, b) => a.start - b.start)
  const out: ReactNode[] = []
  let pos = 0
  spans.forEach((s, i) => {
    if (s.start > pos) out.push(<Fragment key={`t${i}`}>{text.slice(pos, s.start)}</Fragment>)
    out.push(<span key={`s${i}`} style={{ color: s.color, fontWeight: s.bold ? 700 : undefined }}>{text.slice(s.start, s.end)}</span>)
    pos = s.end
  })
  if (pos < text.length) out.push(<Fragment key="end">{text.slice(pos)}</Fragment>)
  return out
}

function isTableHeader(line: string) {
  // e.g. "NAME   READY   STATUS" or "CONTAINER ID   IMAGE"
  const words = line.trim().split(/\s{2,}/)
  return words.length >= 2 && words.every((w) => /^[A-Z][A-Z0-9 ()%/_-]*$/.test(w))
}

export function TerminalOutput({ lines }: { lines: TermLine[] }) {
  return (
    <>
      {lines.map((l, i) => {
        if (l.type === 'cmd') {
          const cmd = l.text.replace(/^\$\s?/, '')
          return (
            <div key={i} className="mt-2 first:mt-0 break-all" style={{ color: C.cmd }}>
              <span style={{ color: C.prompt, fontWeight: 700 }}>❯ </span>{cmd}
            </div>
          )
        }
        const failed = l.ok === false
        return (
          <div key={i} className="whitespace-pre-wrap break-words pl-3 border-l my-1" style={{ color: failed ? C.err : C.out, borderColor: failed ? 'rgba(255,107,107,0.4)' : 'rgba(255,255,255,0.08)' }}>
            {l.text.split('\n').map((line, li) => (
              <div key={li} style={isTableHeader(line) ? { color: C.dim, fontWeight: 700 } : undefined}>
                {failed || isTableHeader(line) ? line || ' ' : (line ? colorize(line) : ' ')}
              </div>
            ))}
          </div>
        )
      })}
    </>
  )
}
