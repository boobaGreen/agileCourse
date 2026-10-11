import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, Zap, BookOpen, LayoutGrid, User, GitBranch, Container, Ship, Languages } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { useTheme } from '../../lib/theme'
import { useUI } from '../../lib/ui'
import { useLanguage } from '../../contexts/LanguageContext'
import { levelFor } from '../../lib/tracks'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { userName, xp } = useAppStore()
  const { resolved, toggle } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { ui } = useUI()
  const lvl = levelFor(xp)

  const trackActive = (id: string) => pathname.startsWith(`/track/${id}`) || pathname.startsWith(`/${id}/module`)

  const nav = [
    { to: '/dashboard', label: ui('nav_dashboard'), icon: LayoutGrid, active: pathname === '/dashboard' },
    { to: '/track/git', label: 'Git', icon: GitBranch, active: trackActive('git'), color: 'var(--t-git)' },
    { to: '/track/docker', label: 'Docker', icon: Container, active: trackActive('docker'), color: 'var(--t-docker)' },
    { to: '/track/k8s', label: 'Kubernetes', icon: Ship, active: trackActive('k8s'), color: 'var(--t-k8s)' },
    { to: '/cheatsheet/git', label: ui('nav_cheatsheets'), icon: BookOpen, active: pathname.startsWith('/cheatsheet') },
    { to: '/profile', label: ui('nav_profile'), icon: User, active: pathname.startsWith('/profile') },
  ]

  const initial = (userName || '?').trim().charAt(0).toUpperCase()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b" style={{ background: 'color-mix(in oklab, var(--t-bg) 86%, transparent)', backdropFilter: 'blur(10px)', borderColor: 'var(--t-border)' }}>
        <div className="container-x flex items-center gap-3 h-14">
          <Link to="/dashboard" className="flex items-center gap-2.5 no-underline shrink-0">
            <span className="w-8 h-8 rounded-lg overflow-hidden bg-white border flex items-center justify-center" style={{ borderColor: 'var(--t-border)' }}>
              <img src="/agilelab.jpg" alt="" className="w-full h-full object-contain p-0.5" />
            </span>
            <span className="leading-tight hidden sm:block">
              <span className="block text-sm font-extrabold tracking-tight" style={{ color: 'var(--t-fg)' }}>{ui('brand')}</span>
              <span className="block text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--t-muted)' }}>{ui('product')}</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {nav.map((n) => {
              const Icon = n.icon
              return (
                <NavLink key={n.to} to={n.to} className={`nav-link ${n.active ? 'active' : ''}`}>
                  <Icon size={15} style={n.color && n.active ? { color: n.color } : undefined} />
                  {n.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link to="/profile" className="hidden sm:inline-flex items-center gap-2 rounded-full border px-3 h-9 no-underline" style={{ borderColor: 'var(--t-border)', background: 'var(--t-surface)' }} title={`${ui('level')} ${lvl.level}`}>
              <Zap size={14} style={{ color: 'var(--t-xp)' }} />
              <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--t-fg)' }}>{xp.toLocaleString()} {ui('xp')}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--t-surface2)', color: 'var(--t-muted)' }}>L{lvl.level}</span>
            </Link>

            <button className="icon-btn" onClick={() => setLanguage(language === 'en' ? 'it' : 'en')} title={ui('language')} aria-label={ui('language')}>
              <span className="text-[11px] font-extrabold tracking-wide">{language.toUpperCase()}</span>
            </button>
            <button className="icon-btn" onClick={toggle} title={resolved === 'dark' ? ui('theme_light') : ui('theme_dark')} aria-label={resolved === 'dark' ? ui('theme_light') : ui('theme_dark')}>
              {resolved === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link to="/profile" className="hidden sm:inline-flex w-9 h-9 rounded-full items-center justify-center text-sm font-extrabold no-underline" style={{ background: 'var(--t-primary)', color: 'var(--t-primary-fg)' }} aria-label={ui('nav_profile')}>
              {initial}
            </Link>
            <button className="icon-btn lg:hidden" onClick={() => setOpen(true)} aria-label={ui('nav_menu')}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }} transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              className="absolute right-0 top-0 h-full w-[300px] max-w-[85vw] flex flex-col p-4 gap-2 border-l" style={{ background: 'var(--t-surface)', borderColor: 'var(--t-border)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold">{userName}</span>
                <button className="icon-btn" onClick={() => setOpen(false)} aria-label={ui('close')}><X size={18} /></button>
              </div>
              {nav.map((n) => {
                const Icon = n.icon
                return (
                  <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className={`nav-link justify-start py-3 ${n.active ? 'active' : ''}`}>
                    <Icon size={16} style={n.color ? { color: n.color } : undefined} /> {n.label}
                  </NavLink>
                )
              })}
              <div className="mt-auto flex items-center gap-2 pt-4 border-t" style={{ borderColor: 'var(--t-border)' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}><Languages size={14} /> {language === 'en' ? 'Italiano' : 'English'}</button>
                <button className="btn btn-ghost btn-sm" onClick={toggle}>{resolved === 'dark' ? <Sun size={14} /> : <Moon size={14} />}</button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <footer className="border-t mt-16" style={{ borderColor: 'var(--t-border)' }}>
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: 'var(--t-muted)' }}>
          <span>© {new Date().getFullYear()} Agile Lab · {ui('product')}</span>
          <span className="font-mono">v2.0</span>
        </div>
      </footer>
    </div>
  )
}
