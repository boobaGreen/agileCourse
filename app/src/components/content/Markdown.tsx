import { Fragment, type ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import { CodeBlock } from './CodeBlock'

/* ───────────────────────── inline ───────────────────────── */

const INLINE = /(\*\*(?:[^*]|\*(?!\*))+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+|\*[^*\s][^*]*\*)/g

export function renderInline(text: string, keyPrefix = 'i'): ReactNode[] {
  if (!text) return []
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}-${i}`
    if (!part) return null
    let m: RegExpMatchArray | null
    if ((m = part.match(/^`([^`]+)`$/))) return <code key={key} className="inline-code">{m[1]}</code>
    if ((m = part.match(/^\*\*(.+)\*\*$/))) return <strong key={key}>{renderInline(m[1], `${key}-b`)}</strong>
    if ((m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/))) {
      return <a key={key} href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>
    }
    if (/^https?:\/\//.test(part)) return <a key={key} href={part} target="_blank" rel="noopener noreferrer" className="break-all">{part}</a>
    if ((m = part.match(/^\*([^*].*)\*$/))) return <em key={key}>{m[1]}</em>
    return <Fragment key={key}>{part}</Fragment>
  })
}

/* ───────────────────────── blocks ───────────────────────── */

type Block =
  | { kind: 'p'; lines: string[]; desktopOnly: boolean }
  | { kind: 'h'; level: number; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'code'; lang: string; code: string }
  | { kind: 'hr' }
  | { kind: 'links'; parts: string[] }

const DESKTOP_MARK = '<!-- desktop-only -->'

function parse(text: string): Block[] {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const blocks: Block[] = []
  let i = 0
  const flushP = (buf: string[], desktopOnly: boolean) => { if (buf.length) blocks.push({ kind: 'p', lines: [...buf], desktopOnly }) }
  let pBuf: string[] = []
  let pDesktop = false

  while (i < lines.length) {
    let raw = lines[i]
    const desktopOnly = raw.includes(DESKTOP_MARK)
    raw = raw.replace(DESKTOP_MARK, '')
    const line = raw.trimEnd()
    const t = line.trim()

    if (t.startsWith('```')) {
      flushP(pBuf, pDesktop); pBuf = []
      const lang = t.slice(3).trim() || 'bash'
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) { code.push(lines[i]); i++ }
      i++ // closing fence
      blocks.push({ kind: 'code', lang, code: code.join('\n') })
      continue
    }
    if (t === '') { flushP(pBuf, pDesktop); pBuf = []; pDesktop = false; i++; continue }
    if (/^-{3,}$/.test(t)) { flushP(pBuf, pDesktop); pBuf = []; blocks.push({ kind: 'hr' }); i++; continue }
    const h = t.match(/^(#{1,4})\s+(.*)$/)
    if (h) { flushP(pBuf, pDesktop); pBuf = []; blocks.push({ kind: 'h', level: h[1].length, text: h[2] }); i++; continue }
    if (t.includes(' · ') && /\[[^\]]+\]\([^)]+\)/.test(t)) {
      flushP(pBuf, pDesktop); pBuf = []
      blocks.push({ kind: 'links', parts: t.split(' · ') }); i++; continue
    }
    const ul = t.match(/^(?:[-•*]|•)\s+(.*)$/)
    if (ul) {
      flushP(pBuf, pDesktop); pBuf = []
      const items = [ul[1]]
      i++
      while (i < lines.length) {
        const nt = lines[i].replace(DESKTOP_MARK, '').trim()
        const m = nt.match(/^(?:[-•*])\s+(.*)$/)
        if (m) { items.push(m[1]); i++; continue }
        // indented continuation line belongs to the previous item
        if (nt && /^\s{2,}/.test(lines[i]) && !/^\d+\.\s/.test(nt)) { items[items.length - 1] += ' ' + nt; i++; continue }
        break
      }
      blocks.push({ kind: 'ul', items }); continue
    }
    const ol = t.match(/^(\d+)[.)]\s+(.*)$/)
    if (ol) {
      flushP(pBuf, pDesktop); pBuf = []
      const items = [ol[2]]
      i++
      while (i < lines.length) {
        const nt = lines[i].replace(DESKTOP_MARK, '').trim()
        const m = nt.match(/^\d+[.)]\s+(.*)$/)
        if (m) { items.push(m[1]); i++; continue }
        if (nt && /^\s{2,}/.test(lines[i]) && !/^[-•*]\s/.test(nt)) { items[items.length - 1] += ' ' + nt; i++; continue }
        break
      }
      blocks.push({ kind: 'ol', items }); continue
    }
    pBuf.push(t)
    pDesktop = pDesktop || desktopOnly
    i++
  }
  flushP(pBuf, pDesktop)
  return blocks
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  if (!text) return null
  const blocks = parse(text)
  return (
    <div className={`prose-body ${className ?? ''}`}>
      {blocks.map((b, bi) => {
        const key = `b-${bi}`
        switch (b.kind) {
          case 'p':
            return (
              <p key={key} className={b.desktopOnly ? 'hidden sm:block' : undefined}>
                {b.lines.map((l, li) => (
                  <Fragment key={li}>{li > 0 && <br />}{renderInline(l, `${key}-${li}`)}</Fragment>
                ))}
              </p>
            )
          case 'h':
            return <h4 key={key}>{renderInline(b.text, key)}</h4>
          case 'ul':
            return <ul key={key} className="list-disc">{b.items.map((it, ii) => <li key={ii}>{renderInline(it, `${key}-${ii}`)}</li>)}</ul>
          case 'ol':
            return <ol key={key} className="list-decimal">{b.items.map((it, ii) => <li key={ii}>{renderInline(it, `${key}-${ii}`)}</li>)}</ol>
          case 'code':
            return <div key={key} className="my-3"><CodeBlock code={b.code} language={b.lang} /></div>
          case 'hr':
            return <hr key={key} className="my-4 border-0 h-px" style={{ background: 'var(--t-border)' }} />
          case 'links':
            return (
              <div key={key} className="flex flex-wrap gap-2 mt-3">
                {b.parts.map((part, pi) => {
                  const m = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
                  if (!m) return <span key={pi}>{renderInline(part, `${key}-${pi}`)}</span>
                  return (
                    <a key={pi} href={m[2]} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
                      {m[1]} <ExternalLink size={12} />
                    </a>
                  )
                })}
              </div>
            )
        }
      })}
    </div>
  )
}
