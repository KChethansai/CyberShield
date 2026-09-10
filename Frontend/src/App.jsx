import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAuth } from './store/authStore'

// Lazy load route components
const LandingPage = lazy(() => import('./components/LandingPage'))
const MissionLaunch = lazy(() => import('./components/MissionLaunch'))
const ThreatSimulation = lazy(() => import('./components/ThreatSimulation'))
const MissionDebrief = lazy(() => import('./components/MissionDebrief'))
const Leaderboard = lazy(() => import('./components/Leaderboard'))
const SignUp = lazy(() => import('./components/SignUp'))
const SignIn = lazy(() => import('./components/SignIn'))
const Profile = lazy(() => import('./components/Profile'))

function TitleManager() {
  const location = useLocation()
  useEffect(() => {
    const titles = {
      '/': 'CyberShield // Command Terminal',
      '/launch': 'CyberShield // Mission Launch Briefing',
      '/play': 'CyberShield // Threat Simulation Active',
      '/result': 'CyberShield // Tactical Mission Debrief',
      '/leaderboard': 'CyberShield // Mainframe Intelligence Archive',
      '/signup': 'CyberShield // Operative Registration',
      '/signin': 'CyberShield // Operative Sign-In',
      '/profile': 'CyberShield // Operative Dossier'
    }
    document.title = titles[location.pathname] || 'CyberShield // Signal Lost'
  }, [location])
  return null
}

function NotFound() {
  return (
    <div className="relative min-h-screen bg-terminal-black flex items-center justify-center p-4">
      <div className="tactical-box tactical-box-elevated bracket-wrap w-full max-w-md p-8 text-center">
        <span className="hud-bracket hud-bracket-tl" aria-hidden="true" />
        <span className="hud-bracket hud-bracket-tr" aria-hidden="true" />
        <span className="hud-bracket hud-bracket-bl" aria-hidden="true" />
        <span className="hud-bracket hud-bracket-br" aria-hidden="true" />
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-alert">
          // SIGNAL LOST // NODE UNREACHABLE
        </p>
        <h1 className="mt-4 font-display text-6xl font-extrabold text-alert" style={{ textShadow: '0 0 20px rgba(255,51,102,0.6)' }}>
          404
        </h1>
        <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-[0.06em] text-bone-bright">
          Frequency Not Found
        </h2>
        <p className="mt-3 font-mono text-xs leading-relaxed text-bone-muted">
          Requested tactical node is offline or does not exist. Re-route to Command Terminal.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-hud btn-hud-primary px-6 py-3 text-xs">
            Return to Command Terminal
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const checkMe = useAuth((s) => s.checkMe)
  useEffect(() => {
    checkMe()
  }, [checkMe])
  return (
    <BrowserRouter>
      <TitleManager />
      <Suspense
        fallback={
          <div className="relative min-h-screen bg-terminal-black flex items-center justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyber-green animate-pulse">
              Initializing…
            </p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/launch" element={<MissionLaunch />} />
          <Route path="/play" element={<ThreatSimulation />} />
          <Route path="/result" element={<MissionDebrief />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
