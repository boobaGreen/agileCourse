import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import { LanguageProvider } from './contexts/LanguageProvider'
import { ThemeProvider } from './lib/theme'
import AppShell from './components/layout/AppShell'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import TrackPage from './pages/TrackPage'
import ModulePage from './pages/ModulePage'
import CheatsheetPage from './pages/CheatsheetPage'
import ProfilePage from './pages/ProfilePage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname])
  return null
}

function Protected({ children }: { children: React.ReactNode }) {
  const userName = useAppStore((s) => s.userName)
  if (!userName) return <Navigate to="/" replace />
  return <AppShell>{children}</AppShell>
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
