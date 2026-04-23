import type { Module } from '../../data/types'
import { useLanguage } from '../../contexts/LanguageContext'

export function ModuleTinyCard({ m, isDone }: { m: Module, isDone: boolean }) {
  const { t, resolveString } = useLanguage()
  return (
    <div className="p-3 md:p-4 rounded-xl border flex items-center gap-3 transition-colors"
      style={{ 
        background: isDone ? 'rgba(34,197,94,0.05)' : 'var(--color-surface2)',
        borderColor: isDone ? 'rgba(34,197,94,0.2)' : 'var(--color-border)',
        opacity: isDone ? 1 : 0.6
      }}
    >
      <span className="text-xl md:text-2xl">{isDone ? '✅' : '⏳'}</span>
      <div className="flex-1 overflow-hidden">
        <p className={`text-xs fw-black truncate mb-0.5 ${isDone ? 'text-green' : 'text-sub'}`}>{t('dashboard.module')} {m.order}</p>
        <p className="text-muted text-xs md:text-sm truncate fw-med">{resolveString(m.title)}</p>
      </div>
    </div>
  )
}
