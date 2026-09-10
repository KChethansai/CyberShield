import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Atmosphere from './hud/Atmosphere'
import TelemetryStrip from './hud/TelemetryStrip'
import HudHeader from './hud/HudHeader'
import TelemetryFooter from './hud/TelemetryFooter'
import BracketPanel from './hud/BracketPanel'
import StatusBadge from './hud/StatusBadge'
import Equalizer from './hud/Equalizer'

export default function Leaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    setLoading(true)
    setError('')
    api
      .getLeaderboard()
      .then(setScores)
      .catch(() => setError('Telemetry link dropped. Mainframe connection unreachable.'))
      .finally(() => setLoading(false))
  }

  function getBadgeColor(badge) {
    if (badge === 'Cyber Sentinel') return 'green'
    if (badge === 'Guardian') return 'cyan'
    if (badge === 'Aware') return 'amber'
    return 'gray'
  }

  return (
    <div className="relative min-h-screen bg-terminal-black">
      <Atmosphere />
      <TelemetryStrip />
      <HudHeader />

      <main className="relative z-10 mx-auto max-w-4xl px-4 py-10">
        <BracketPanel elevated className="p-6 sm:p-10">
          {/* Eyebrow & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-green/15 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone-dim">
              {'// GLOBAL INTELLIGENCE ARCHIVE // MAINFRAME FEED'}
            </span>
            <StatusBadge color="cyan" pulse>
              Mainframe Synced // Live Records
            </StatusBadge>
          </div>

          {/* Headline */}
          <div className="mt-6">
            <h1 className="glow-title font-display text-3xl font-bold uppercase tracking-[0.06em] text-bone-bright sm:text-4xl">
              Mainframe Leaderboard // Top Operatives
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-bone-muted">
              Verified mission telemetry recorded from active tactical nodes across all sectors.
            </p>
          </div>

          {/* Content Area */}
          <div className="mt-8">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Equalizer className="h-8" />
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-cyber-green">
                  Querying Mainframe Database…
                </p>
              </div>
            )}

            {error && (
              <div className="rounded-sm border border-alert/50 bg-alert/10 p-6 text-center">
                <p className="font-mono text-xs text-alert">{error}</p>
                <button
                  onClick={loadData}
                  className="btn-hud btn-hud-alert mt-4 px-4 py-2 text-xs"
                >
                  Retry Connection
                </button>
              </div>
            )}

            {!loading && !error && scores.length === 0 && (
              <div className="rounded-sm border border-steel/40 bg-pitch/80 p-8 text-center">
                <p className="font-mono text-xs text-bone-muted">
                  No operative records logged in current tick. Execute a mission to register.
                </p>
                <div className="mt-6">
                  <Link to="/launch" className="btn-hud btn-hud-primary px-6 py-2.5 text-xs">
                    Initialize Mission Launch
                  </Link>
                </div>
              </div>
            )}

            {!loading && !error && scores.length > 0 && (
              <div className="space-y-2">
                {/* Table Header Row */}
                <div className="grid grid-cols-12 gap-2 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-bone-dim">
                  <span className="col-span-2 sm:col-span-1">Rank</span>
                  <span className="col-span-5 sm:col-span-4">Callsign</span>
                  <span className="hidden sm:col-span-4 sm:inline">Clearance</span>
                  <span className="col-span-5 text-right sm:col-span-3">Telemetry</span>
                </div>

                {/* Segmented Data Rows */}
                {scores.map((s, idx) => {
                  const rankNum = idx + 1
                  const isTop3 = rankNum <= 3
                  const rankColor =
                    rankNum === 1
                      ? 'border-cyber-green text-cyber-green shadow-[0_0_10px_rgba(0,255,136,0.5)]'
                      : rankNum === 2
                      ? 'border-cyber-cyan text-cyber-cyan'
                      : rankNum === 3
                      ? 'border-threat-amber text-threat-amber'
                      : 'border-steel text-bone-dim'

                  return (
                    <div
                      key={s._id || idx}
                      className={`grid grid-cols-12 items-center gap-2 rounded-sm border p-3 font-mono text-xs transition-all duration-150 ${
                        isTop3
                          ? 'border-cyber-green/30 bg-terminal-card hover:border-cyber-green/60 hover:bg-cyber-green/5'
                          : 'border-steel/30 bg-terminal-card/60 hover:border-steel-light'
                      }`}
                    >
                      {/* Rank */}
                      <div className="col-span-2 sm:col-span-1">
                        <span
                          className={`inline-flex h-6 w-7 items-center justify-center rounded-xs border text-[11px] font-bold ${rankColor}`}
                        >
                          #{String(rankNum).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Callsign */}
                      <div className="col-span-5 flex items-center gap-2 sm:col-span-4">
                        <span className="text-cyber-green font-mono">&gt;</span>
                        <span className="font-display text-sm font-bold uppercase tracking-wider text-bone-bright truncate">
                          {s.playerName}
                        </span>
                      </div>

                      {/* Clearance Badge */}
                      <div className="hidden sm:col-span-4 sm:flex sm:items-center">
                        <StatusBadge color={getBadgeColor(s.badge)}>
                          {s.badge}
                        </StatusBadge>
                      </div>

                      {/* Points Score */}
                      <div className="col-span-5 flex items-center justify-end gap-2 text-right sm:col-span-3">
                        <span className="glow-title font-mono text-sm font-bold text-cyber-green sm:text-base">
                          {s.totalScore}
                        </span>
                        <span className="text-[10px] uppercase text-bone-dim">PTS</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cyber-green/15 pt-6">
            <Link
              to="/launch"
              className="btn-hud btn-hud-primary px-8 py-3.5 text-xs"
            >
              Initialize New Mission
            </Link>
            <Link
              to="/"
              className="btn-hud btn-hud-steel px-6 py-3.5 text-xs"
            >
              Return to Terminal
            </Link>
          </div>
        </BracketPanel>
      </main>

      <TelemetryFooter />
    </div>
  )
}

