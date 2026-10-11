import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import { LanguageProvider } from './contexts/LanguageProvider'
import { ThemeProvider } from './lib/theme'
import AppShell from './components/layout/AppShell'
import LandingPage from './pages/LandingPage'

// Every page except the landing is loaded on demand.
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const TrackPage = lazy(() => import('./pages/TrackPage'))
const ModulePage = lazy(() => import('./pages/ModulePage'))
const CheatsheetPage = lazy(() => import('./pages/CheatsheetPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))

function PageFallback() {
  return <div className="container-x py-16"><div className="h-8 w-48 rounded-lg animate-pulse" style={{ background: 'var(--t-surface2)' }} /></div>
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname])
  return null
}

function Protected({ children }: { children: React.ReactNode }) {
  const userName = useAppStore((s) => s.userName)
  if (!userName) return <Navigate to="/" replace />
  return <AppShell><Suspense fallback={<PageFallback />}>{children}</Suspense></AppShell>
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
            <Route path="/track/:track" element={<Protected><TrackPage /></Protected>} />
            <Route path="/:track/module/:id" element={<Protected><ModulePage /></Protected>} />
            <Route path="/cheatsheet" element={<Navigate to="/cheatsheet/git" replace />} />
            <Route path="/cheatsheet/:track" element={<Protected><CheatsheetPage /></Protected>} />
            <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}
