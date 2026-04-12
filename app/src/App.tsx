import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import LandingPage from './pages/LandingPage'
import CourseDashboard from './pages/CourseDashboard'
import ModulePage from './pages/ModulePage'
import ProfilePage from './pages/ProfilePage'
import LeaderboardPage from './pages/LeaderboardPage'
import CertRoadmapPage from './pages/CertRoadmapPage'
import AppShell from './components/AppShell'

function App() {
  const userName = useAppStore((s) => s.userName)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            userName ? (
              <AppShell>
                <Routes>
                  <Route path="/dashboard" element={<CourseDashboard />} />
                  <Route path="/:track/module/:id" element={<ModulePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/certifications" element={<CertRoadmapPage />} />
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
  )
}

export default App
