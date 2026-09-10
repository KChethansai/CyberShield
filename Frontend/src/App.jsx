import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Lazy load route components
const LandingPage = lazy(() => import('./components/LandingPage'))
const MissionLaunch = lazy(() => import('./components/MissionLaunch'))
const ThreatSimulation = lazy(() => import('./components/ThreatSimulation'))
const MissionDebrief = lazy(() => import('./components/MissionDebrief'))
const Leaderboard = lazy(() => import('./components/Leaderboard'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="container utility">
            <div className="card center">
              <p className="muted">Loading…</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/launch" element={<MissionLaunch />} />
          <Route path="/play" element={<ThreatSimulation />} />
          <Route path="/result" element={<MissionDebrief />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
