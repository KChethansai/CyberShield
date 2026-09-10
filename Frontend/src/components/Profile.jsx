import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../store/authStore'
import { BADGE_ICONS, BADGES } from '../utils/badges'
import Atmosphere from './hud/Atmosphere'
import TelemetryStrip from './hud/TelemetryStrip'
import HudHeader from './hud/HudHeader'
import TelemetryFooter from './hud/TelemetryFooter'
import BracketPanel from './hud/BracketPanel'
import StatusBadge from './hud/StatusBadge'
import Equalizer from './hud/Equalizer'

export default function Profile() {
  const user = useAuth((s) => s.user)
  const isAuthenticated = useAuth((s) => s.isAuthenticated)
  const authLoading = useAuth((s) => s.loading)
  const logout = useAuth((s) => s.logout)
  const navigate = useNavigate()
  const [history, setHistory] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !isAuthenticated) return
    if (!isAuthenticated) return
    api
      .getMyHistory()
      .then((d) => {
        setHistory(d.scores || [])
        setError('')
      })
      .catch(() => setError('History link unreachable. Records will sync when the mainframe is back.'))
  }, [authLoading, isAuthenticated])

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  if (!authLoading && !isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-terminal-black">
        <Atmosphere />
        <TelemetryStrip />
        <HudHeader />
        <div className="relative z-10 flex min-h-[calc(100vh-140px)] items-center justify-center p-4">
          <BracketPanel elevated className="w-full max-w-md p-8 text-center">
            <StatusBadge color="amber">No Operative Session</StatusBadge>
            <h2 className="glow-title mt-4 font-display text-2xl font-bold uppercase">
              Operative Unregistered
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-bone-muted">
              Sign in to review your dossier, or run missions as a guest — no account required.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/signin" className="btn-hud btn-hud-primary px-6 py-3 text-xs">
                Sign In
              </Link>
              <Link to="/launch" className="btn-hud btn-hud-steel px-6 py-3 text-xs">
                Play as Guest
              </Link>
            </div>
          </BracketPanel>
        </div>
        <TelemetryFooter />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-terminal-black">
      <Atmosphere />
      <TelemetryStrip />
      <HudHeader />
      <main className="relative z-10 mx-auto max-w-4xl px-4 py-10">
        <BracketPanel elevated className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-green/15 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone-dim">
              {'// OPERATIVE DOSSIER // PERSONAL RECORD'}
            </span>
            <StatusBadge color="green" pulse>
              Session Active
            </StatusBadge>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="glow-title font-display text-3xl font-bold uppercase tracking-[0.06em] text-bone-bright sm:text-4xl">
                <span className="font-mono text-cyber-green">&gt;</span> {user?.username}
              </h1>
              <p className="mt-1 font-mono text-xs text-bone-muted">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="btn-hud btn-hud-alert px-5 py-2.5 text-xs">
              Sign Out
            </button>
          </div>

          <div className="my-6 grid gap-4 rounded-sm border border-cyber-green/20 bg-pitch/90 p-6 sm:grid-cols-2">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-bone-dim">
                Personal Best
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="glow-title font-display text-5xl font-extrabold text-cyber-green">
                  {user?.bestScore || 0}
                </span>
                <span className="font-mono text-xs font-bold uppercase text-bone-dim">PTS</span>
              </div>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-bone-dim">
                Clearance Earned
              </span>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-cyber-green/40 bg-cyber-green/10 text-2xl">
                  {BADGE_ICONS[user?.badge] || '🛡️'}
                </span>
                <div>
                  <p className="font-display text-xl font-bold uppercase text-cyber-green">
                    {user?.badge || 'Unranked'}
                  </p>
                  <p className="font-mono text-xs text-bone-muted">{BADGES[user?.badge] || 'complete a mission to earn clearance'}</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-cyber-green">
            Mission History
          </h3>
          <div className="mt-3">
            {error && (
              <div className="rounded-sm border border-alert/50 bg-alert/10 p-4 text-center font-mono text-xs text-alert">
                {error}
              </div>
            )}
            {!error && history === null && (
              <div className="flex flex-col items-center py-10">
                <Equalizer className="h-8" />
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-cyber-green">
                  Querying Personal Archive…
                </p>
              </div>
            )}
            {!error && history !== null && history.length === 0 && (
              <div className="rounded-sm border border-steel/40 bg-pitch/80 p-6 text-center">
                <p className="font-mono text-xs text-bone-muted">
                  No missions logged under this callsign yet. Your next run files here automatically.
                </p>
                <div className="mt-4">
                  <Link to="/launch" className="btn-hud btn-hud-primary px-6 py-2.5 text-xs">
                    Initialize Mission Launch
                  </Link>
                </div>
              </div>
            )}
            {!error && history !== null && history.length > 0 && (
              <div className="space-y-2">
                {history.map((s) => (
                  <div
                    key={s._id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-sm border border-steel/30 bg-terminal-card/60 p-3 font-mono text-xs"
                  >
                    <span className="text-bone-muted">
                      {new Date(s.createdAt).toLocaleString()}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-bone-dim">
                      {s.badge || 'Unranked'}
                    </span>
                    <span className="font-bold text-cyber-green">{s.totalScore} PTS</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-cyber-green/15 pt-6">
            <Link to="/launch" className="btn-hud btn-hud-primary px-6 py-3 text-xs">
              New Mission Run
            </Link>
            <Link to="/leaderboard" className="btn-hud btn-hud-steel px-6 py-3 text-xs">
              Mainframe Leaderboard
            </Link>
          </div>
        </BracketPanel>
      </main>
      <TelemetryFooter />
    </div>
  )
}
