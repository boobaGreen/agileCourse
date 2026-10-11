import { CheckCircle2, FlaskConical } from 'lucide-react'

interface Props {
  label: string
  title?: string
  done?: boolean
  children: React.ReactNode
  id?: string
}

/** Always-dark frame for simulators, labs and games. */
export function LabFrame({ label, title, done, children, id }: Props) {
  return (
    <div id={id} className="console lab-frame">
      <div className="lab-frame-head">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: 'color-mix(in oklab, var(--track) 22%, transparent)', color: 'var(--track)' }}>
            <FlaskConical size={14} />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: '#76818e' }}>{label}</div>
            {title && <div className="text-sm font-bold truncate" style={{ color: '#e6ebf1' }}>{title}</div>}
          </div>
        </div>
        {done && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(60,207,122,0.15)', color: '#3ccf7a' }}>
            <CheckCircle2 size={13} /> Done
          </span>
        )}
      </div>
      <div className="lab-frame-body">{children}</div>
    </div>
  )
}
