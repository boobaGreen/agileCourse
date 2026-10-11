import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type ThemePref = 'light' | 'dark' | 'system'
type Resolved = 'light' | 'dark'

interface ThemeCtx {
  pref: ThemePref
  resolved: Resolved
  setPref: (p: ThemePref) => void
  toggle: () => void
}

const Ctx = createContext<ThemeCtx | null>(null)

function readPref(): ThemePref {
  try {
    const v = localStorage.getItem('theme')
    if (v === 'light' || v === 'dark') return v
  } catch { /* storage unavailable */ }
  return 'system'
}

function systemTheme(): Resolved {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [pref, setPrefState] = useState<ThemePref>(readPref)
  const [sys, setSys] = useState<Resolved>(systemTheme)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSys(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const resolved: Resolved = pref === 'system' ? sys : pref

  useEffect(() => {
    const root = document.documentElement
    if (resolved === 'dark') root.setAttribute('data-theme', 'dark')
    else root.removeAttribute('data-theme')
  }, [resolved])

  const setPref = useCallback((p: ThemePref) => {
    setPrefState(p)
    try {
      if (p === 'system') localStorage.removeItem('theme')
      else localStorage.setItem('theme', p)
    } catch { /* ignore */ }
  }, [])

  const toggle = useCallback(() => setPref(resolved === 'dark' ? 'light' : 'dark'), [resolved, setPref])

  const value = useMemo(() => ({ pref, resolved, setPref, toggle }), [pref, resolved, setPref, toggle])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTheme() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useTheme outside ThemeProvider')
  return v
}
