import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sun, Moon, Terminal, Gamepad2, Award } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useUI } from '../lib/ui'
import { useTheme } from '../lib/theme'
import { TRACK_INFO_LIST as TRACK_LIST, COURSE_STATS } from '../lib/trackMeta'
import { TrackArt } from '../components/illustrations/TrackArt'
import { useLanguage } from '../contexts/LanguageContext'

export default function LandingPage() {
  const { userName, setUserName } = useAppStore()
  const [name, setName] = useState(userName || '')
  const navigate = useNavigate()
  const { ui, r } = useUI()
  const { resolved, toggle } = useTheme()
  const { language, setLanguage } = useLanguage()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    if (!n) return
    setUserName(n)
    navigate('/dashboard')
  }

  const features = [
    { icon: Terminal, en: 'Simulated Git, Docker and kubectl terminals that react to every command', it: 'Terminali simulati Git, Docker e kubectl che reagiscono a ogni comando' },
    { icon: Gamepad2, en: 'Short modules, interactive labs, quizzes with explanations', it: 'Moduli brevi, laboratori interattivi, quiz con spiegazioni' },
    { icon: Award, en: 'XP, badges and a roadmap towards real certifications', it: 'XP, badge e una roadmap verso certificazioni reali' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container-x h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg overflow-hidden bg-white border flex items-center justify-center" style={{ borderColor: 'var(--t-border)' }}>
            <img src="/agilelab.jpg" alt="" className="w-full h-full object-contain p-0.5" />
          </span>
          <span className="text-sm font-extrabold tracking-tight">{ui('brand')}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="icon-btn" onClick={() => setLanguage(language === 'en' ? 'it' : 'en')} aria-label={ui('language')}><span className="text-[11px] font-extrabold">{language.toUpperCase()}</span></button>
          <button className="icon-btn" onClick={toggle} aria-label="theme">{resolved === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
        </div>
      </header>

      <main className="flex-1 container-x grid lg:grid-cols-12 gap-10 lg:gap-12 items-center py-10 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-6 max-w-xl">
          <div className="eyebrow mb-4">{ui('landing_eyebrow')}</div>
          <h1 className="display" style={{ fontSize: 'clamp(2.4rem, 1.6rem + 3.4vw, 4.25rem)' }}>{ui('landing_title')}</h1>
          <p className="lead mt-5">{ui('landing_sub')}</p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 max-w-md">
            <label className="text-sm font-bold" htmlFor="name">{ui('landing_name')}</label>
            <div className="flex gap-2">
              <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada" autoComplete="given-name" maxLength={40} />
              <button type="submit" className="btn btn-primary shrink-0" disabled={!name.trim()}>{ui('landing_cta')} <ArrowRight size={16} /></button>
            </div>
            <p className="text-xs" style={{ color: 'var(--t-muted)' }}>{ui('landing_hint')}</p>
          </form>

          <ul className="mt-10 flex flex-col gap-3">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--t-sub)' }}>
                  <span className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: 'var(--t-surface2)', color: 'var(--t-fg)' }}><Icon size={14} /></span>
                  <span className="pt-1">{language === 'it' ? f.it : f.en}</span>
                </li>
              )
            })}
          </ul>
        </motion.div>

        <div className="lg:col-span-6 flex flex-col gap-3">
          {TRACK_LIST.map((t, i) => {
            const Icon = t.icon
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i + 0.1 }}
                className="panel p-3 flex items-center gap-4" style={{ ['--track' as string]: t.color }}>
                <TrackArt track={t.id} className="w-32 sm:w-40 h-auto shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <Icon size={16} style={{ color: 'var(--track)' }} className="self-center" />
                    <span className="font-extrabold text-lg tracking-tight">{t.name}</span>
                    <span className="text-xs font-semibold" style={{ color: 'var(--t-muted)' }}>{t.moduleCount} {ui('modules')}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--t-sub)' }}>{r(t.tagline)}</p>
                </div>
              </motion.div>
            )
          })}
          <div className="rounded-2xl p-4 text-sm flex items-center justify-between gap-3 grid-dots border" style={{ borderColor: 'var(--t-border)' }}>
            <span style={{ color: 'var(--t-sub)' }}>{COURSE_STATS.modules} {ui('modules')} · {COURSE_STATS.quiz} quiz · {COURSE_STATS.labs} lab</span>
            <span className="font-mono text-xs" style={{ color: 'var(--t-muted)' }}>git · docker · kubectl</span>
          </div>
        </div>
      </main>
    </div>
  )
}
