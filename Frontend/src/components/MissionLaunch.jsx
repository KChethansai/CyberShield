import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { api } from '../api/client'
import { useGame } from '../store/gameStore'
import { DIFFICULTIES } from '../utils/gameConstants'
import { filterByDifficulty } from '../utils/questions'
import { getBestScore, getMaxPoints } from '../utils/scores'
import Atmosphere from './hud/Atmosphere'
import TelemetryStrip from './hud/TelemetryStrip'
import HudHeader from './hud/HudHeader'
import TelemetryFooter from './hud/TelemetryFooter'
import BracketPanel from './hud/BracketPanel'
import StatusBadge from './hud/StatusBadge'
import ShieldLives from './hud/ShieldLives'
import BootModal from './hud/BootModal'

const TIERS = [
  { key: 'easy', codename: 'RECRUIT', desc: 'Easy + medium pool. 3 lives. Learn the threat patterns.' },
  { key: 'normal', codename: 'ANALYST', desc: 'Full pool. 3 lives. Standard operative protocol.', recommended: true },
  { key: 'hard', codename: 'SENTINEL', desc: 'Medium + hard pool. 2 lives. Zero room for error.' }
]

export default function MissionLaunch() {
  const startGame = useGame((s) => s.startGame)
  const navigate = useNavigate()
  const location = useLocation()
  const initialDiff = location.state?.difficulty || 'normal'

  const [difficulty, setDifficulty] = useState(initialDiff)
  const [booting, setBooting] = useState(false)
  const [authorizing, setAuthorizing] = useState(false)
  const [error, setError] = useState('')
  const [best, setBest] = useState(0)
  const [poolCounts, setPoolCounts] = useState(null)

  useEffect(() => {
    setBest(getBestScore())
    api
      .getQuestionsGrouped()
      .then((grouped) => {
        const counts = {}
        for (const [key] of Object.entries(DIFFICULTIES)) {
          counts[key] = getMaxPoints(filterByDifficulty(grouped, key)) / 10
        }
        setPoolCounts(counts)
      })
      .catch(() => {
        setPoolCounts({ easy: 16, normal: 24, hard: 16 })
      })
  }, [])

  async function handleAuthorize() {
    if (authorizing) return
    setAuthorizing(true)
    setError('')
    try {
      const grouped = await api.getQuestionsGrouped()
      const questions = filterByDifficulty(grouped, difficulty)
      if (getMaxPoints(questions) === 0) {
        throw new Error('empty')
      }
      startGame({
        questions,
        difficulty,
        lives: DIFFICULTIES[difficulty].lives
      })
      navigate('/play')
    } catch {
      setAuthorizing(false)
      setBooting(false)
      setError('Uplink failed. Check telemetry link and retry.')
    }
  }

  const selectedTierObj = TIERS.find((t) => t.key === difficulty) || TIERS[1]
  const currentDiffConfig = DIFFICULTIES[difficulty]

  return (
    <div className="relative min-h-screen bg-terminal-black">
      <Atmosphere />
      <TelemetryStrip />
      <HudHeader onInitialize={() => setBooting(true)} />

      <main className="relative z-10 mx-auto max-w-4xl px-4 py-10">
        <BracketPanel elevated className="p-6 sm:p-10">
          {/* Eyebrow & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-green/15 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone-dim">
              {'// MISSION LAUNCH // OPERATIVE SETUP'}
            </span>
            <StatusBadge color="cyan" pulse>
              Cockpit Uplink Standby
            </StatusBadge>
          </div>

          {/* Headline */}
          <div className="mt-6">
            <h1 className="glow-title font-display text-3xl font-bold uppercase tracking-[0.06em] text-bone-bright sm:text-4xl">
              Tactical Briefing
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-bone-muted">
              Configure mission operating parameters and confirm threat vectors before authorizing neural link.
            </p>
          </div>

          {/* Directives inset panel */}
          <div className="mt-6 rounded-sm border border-cyber-green/20 bg-pitch/90 p-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-steel/30 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-telemetry">
                [OPERATIONAL DIRECTIVES]
              </span>
              {best > 0 && (
                <span className="text-[10px] font-bold text-cyber-green">
                  PERSONAL BEST: {best} PTS
                </span>
              )}
            </div>
            <ul className="mt-3 space-y-2 text-[12px] text-bone leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-cyber-green font-bold">&gt;</span>
                <span><strong className="text-bone-bright">01 // 4 THREAT VECTORS:</strong> Phishing, weak credentials, poisoned QR codes, and social engineering scams.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-green font-bold">&gt;</span>
                <span><strong className="text-bone-bright">02 // SCORING PROTOCOL:</strong> +10 Points per verified intercept.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-green font-bold">&gt;</span>
                <span><strong className="text-cyber-green font-bold">03 // INTEGRITY PROTOCOL:</strong> −1 Shield per failed intercept or timer expiration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-green font-bold">&gt;</span>
                <span><strong className="text-alert">04 // TERMINAL STATE:</strong> Loss of all shields compromises operative and terminates mission immediately.</span>
              </li>
            </ul>
          </div>

          {/* Intensity Tier Selector */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-cyber-green">
                Select Operating Tier
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-bone-dim">
                Active: {selectedTierObj.codename}
              </span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {TIERS.map((t) => {
                const selected = difficulty === t.key
                const d = DIFFICULTIES[t.key]
                return (
                  <button
                    key={t.key}
                    onClick={() => setDifficulty(t.key)}
                    className="cursor-pointer text-left focus:outline-none"
                  >
                    <BracketPanel
                      elevated={selected}
                      brackets={selected}
                      className={`h-full p-5 transition-all duration-150 ${
                        selected
                          ? 'border-2 border-cyber-green bg-terminal-panel shadow-[0_0_24px_rgba(0,255,136,0.2)]'
                          : 'opacity-70 hover:border-steel-light hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-bone-dim">
                          TIER//{t.codename}
                        </span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            selected
                              ? 'bg-cyber-green shadow-[0_0_8px_rgba(0,255,136,0.9)] animate-pulse'
                              : 'bg-steel'
                          }`}
                        />
                      </div>
                      <h3
                        className={`mt-3 font-display text-xl font-bold uppercase tracking-[0.06em] ${
                          selected ? 'text-cyber-green' : 'text-bone-bright'
                        }`}
                      >
                        {t.codename}
                      </h3>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-bone-muted">
                        {d.label} protocol
                      </p>
                      <p className="mt-2 text-[11px] leading-relaxed text-bone-muted">{t.desc}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-cyber-green/10 pt-3">
                        <ShieldLives lives={d.lives} max={d.lives} size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-telemetry">
                          {poolCounts ? `${poolCounts[t.key]} scenarios` : '…'}
                        </span>
                      </div>
                      {t.recommended && (
                        <div className="mt-3">
                          <StatusBadge color="green">Recommended default</StatusBadge>
                        </div>
                      )}
                    </BracketPanel>
                  </button>
                )
              })}
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-sm border border-alert/50 bg-alert/10 p-4 text-center font-mono text-xs text-alert">
              {error}
            </div>
          )}

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cyber-green/15 pt-6">
            <button
              onClick={() => setBooting(true)}
              className="btn-hud btn-hud-primary px-8 py-4 text-sm"
            >
              Start Mission Protocol // Engage
            </button>
            <div className="flex gap-3">
              <Link
                to="/leaderboard"
                className="btn-hud btn-hud-steel px-6 py-3.5 text-xs"
              >
                View Leaderboard
              </Link>
              <Link
                to="/"
                className="btn-hud btn-hud-steel px-6 py-3.5 text-xs"
              >
                Back to Terminal
              </Link>
            </div>
          </div>
        </BracketPanel>
      </main>

      <TelemetryFooter />

      {/* ── Boot Sequence Modal Hinge ── */}
      <BootModal
        open={booting}
        authorizing={authorizing}
        onAbort={() => {
          setBooting(false)
          setAuthorizing(false)
        }}
        onAuthorize={handleAuthorize}
      />
    </div>
  )
}

