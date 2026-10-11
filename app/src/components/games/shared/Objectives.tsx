import { Check } from 'lucide-react'
import type { LocalizedString } from '../../../data/types'
import { useLanguage } from '../../../contexts/LanguageContext'

interface Task { id: string; instruction: LocalizedString; completed?: boolean }

const ACCENT = '#7aa2ff'

export function Objectives({ tasks, right }: { tasks: Task[]; right?: React.ReactNode }) {
  const { resolveString, language } = useLanguage()
  const currentId = tasks.find((t) => !t.completed)?.id
  const done = tasks.filter((t) => t.completed).length
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: '#76818e' }}>
          {language === 'it' ? 'Obiettivi' : 'Objectives'}
        </span>
        <div className="flex items-center gap-2">
          {right}
          <span className="text-[11px] font-bold tabular-nums" style={{ color: done === tasks.length ? '#3ccf7a' : '#a7b1bd' }}>{done}/{tasks.length}</span>
        </div>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(done / Math.max(1, tasks.length)) * 100}%`, background: '#3ccf7a' }} />
      </div>
      <ol className="flex flex-col gap-1.5 m-0 p-0 list-none">
        {tasks.map((t, i) => {
          const isCurrent = t.id === currentId
          return (
            <li key={t.id} className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors"
              style={{
                background: isCurrent ? 'rgba(122,162,255,0.1)' : 'transparent',
                border: `1px solid ${isCurrent ? 'rgba(122,162,255,0.35)' : 'transparent'}`,
              }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold font-mono mt-px"
                style={t.completed
                  ? { background: '#3ccf7a', color: '#0b0e12' }
                  : isCurrent
                    ? { border: `1.5px solid ${ACCENT}`, color: ACCENT }
                    : { border: '1.5px solid #33404d', color: '#76818e' }}>
                {t.completed ? <Check size={12} strokeWidth={3} /> : i + 1}
              </span>
              <span className="text-[13px] leading-snug"
                style={{ color: t.completed ? '#76818e' : isCurrent ? '#e6ebf1' : '#a7b1bd', fontWeight: isCurrent ? 600 : 500, textDecoration: t.completed ? 'line-through' : undefined, textDecorationColor: 'rgba(118,129,142,0.6)' }}>
                {resolveString(t.instruction)}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
