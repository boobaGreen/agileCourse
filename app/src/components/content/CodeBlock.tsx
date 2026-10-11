import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

const DOCKER_KW = /^(FROM|RUN|CMD|LABEL|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|HEALTHCHECK|SHELL)\b/
const CLI = /^(git|docker|docker-compose|kubectl|helm|npm|cd|mkdir|curl|echo)\b/

function highlight(line: string, lang: string): React.ReactNode {
  const trimmed = line.trimStart()
  const indent = line.slice(0, line.length - trimmed.length)
  // whole-line comments
  if (/^(#|\/\/)/.test(trimmed)) return <span className="c-comment">{line}</span>

  // split trailing comment
  let main = line
  let comment = ''
  const ci = line.indexOf(' #')
  if (ci > 0 && lang !== 'json') { main = line.slice(0, ci); comment = line.slice(ci) }

  const parts: React.ReactNode[] = []
  let rest = main
  let k = 0
  if (lang === 'yaml' || lang === 'yml') {
    const m = rest.match(/^(\s*-?\s*)([A-Za-z0-9_.-]+)(:)(\s|$)/)
    if (m) {
      parts.push(<span key={k++}>{m[1]}</span>, <span key={k++} className="c-key">{m[2]}</span>, <span key={k++}>{m[3]}</span>)
      rest = rest.slice(m[0].length - m[4].length)
    }
  } else if (lang === 'dockerfile') {
    const m = trimmed.match(DOCKER_KW)
    if (m) { parts.push(<span key={k++}>{indent}</span>, <span key={k++} className="c-kw">{m[1]}</span>); rest = trimmed.slice(m[1].length) }
  } else if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
    const m = trimmed.match(CLI)
    if (m) { parts.push(<span key={k++}>{indent}</span>, <span key={k++} className="c-kw">{m[1]}</span>); rest = trimmed.slice(m[1].length) }
  }
  // strings
  const strSplit = rest.split(/("[^"]*"|'[^']*')/g)
  strSplit.forEach((s, i) => {
    if (!s) return
    if (/^(".*"|'.*')$/.test(s)) parts.push(<span key={k++} className="c-str">{s}</span>)
    else parts.push(<span key={`${k++}-${i}`}>{s}</span>)
  })
  if (comment) parts.push(<span key={k++} className="c-comment">{comment}</span>)
  return <>{parts}</>
}

export function CodeBlock({ code, language = 'bash', title }: { code: string; language?: string; title?: string }) {
  const [copied, setCopied] = useState(false)
  const lines = code.replace(/\r\n/g, '\n').split('\n')
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ }
  }
  return (
    <div className="code-frame">
      <div className="code-frame-head">
        <span>{title ?? language}</span>
        <button onClick={copy} className="inline-flex items-center gap-1 text-[11px] font-bold normal-case tracking-normal" style={{ color: copied ? '#3ccf7a' : '#a7b1bd' }}>
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre><code>{lines.map((l, i) => <div key={i}>{highlight(l, language) || ' '}</div>)}</code></pre>
    </div>
  )
}
