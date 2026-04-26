import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import LandingPage from './pages/LandingPage.tsx'
import CourseDashboard from './pages/CourseDashboard.tsx'
import ModulePage from './pages/ModulePage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import CheatsheetPage from './pages/CheatsheetPage.tsx'
import AppShell from './components/AppShell.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'

import { LanguageProvider } from './contexts/LanguageProvider.tsx'

function App() {
  const userName = useAppStore((s) => s.userName)

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/*"
            element={
              userName ? (
                <AppShell>
                  <Routes>
                    <Route path="/dashboard" element={<CourseDashboard />} />
                    <Route path="/cheatsheet" element={<CheatsheetPage />} />
                    <Route path="/:track/module/:id" element={<ModulePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </AppShell>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
