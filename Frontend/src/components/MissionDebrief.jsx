import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api/client'
import { useGame, getTotalQuestions, CATEGORIES } from '../store/gameStore'
import { CATEGORY_LABELS } from '../utils/gameConstants'
import { BADGES, BADGE_ICONS, getBadge } from '../utils/badges'
import {
  getCategoryBreakdown,
  getMaxPoints,
  getMistakes,
  getWeakestCategory,
  saveBestScore
} from '../utils/scores'
import { highlightTerms } from '../utils/highlight'
import Atmosphere from './hud/Atmosphere'
import TelemetryStrip from './hud/TelemetryStrip'
import HudHeader from './hud/HudHeader'
import TelemetryFooter from './hud/TelemetryFooter'
import BracketPanel from './hud/BracketPanel'
import StatusBadge from './hud/StatusBadge'
import SegmentedProgress from './hud/SegmentedProgress'
import CategoryIcon from './CategoryIcon'

export default function MissionDebrief() {
  const questions = useGame((s) => s.questions)
  const points = useGame((s) => s.points)
  const answeredQuestions = useGame((s) => s.answeredQuestions)
  const gameStatus = useGame((s) => s.gameStatus)
  const resetGame = useGame((s) => s.resetGame)
  const navigate = useNavigate()

  const [playerName, setPlayerName] = useState('')
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const [isNewBest] = useState(() => saveBestScore(points))

  const total = getTotalQuestions(questions)
  const maxPoints = getMaxPoints(questions)
  const correct = answeredQuestions.filter((a) => a.correct).length
  const answered = answeredQuestions.length
  const completed = gameStatus === 'completed'
  const badge = getBadge(points, maxPoints)
  const breakdown = useMemo(
    () => getCategoryBreakdown(answeredQuestions),
    [answeredQuestions]
  )
  const weakest = getWeakestCategory(breakdown)

  const questionById = useMemo(() => {
    const map = {}
    for (const cat of CATEGORIES) {
      for (const q of questions[cat] || []) map[q._id] = q
    }
    return map
  }, [questions])

  const mistakes = getMistakes(answeredQuestions)

  async function handleSave() {
    if (!playerName.trim() || saveState === 'saving' || saveState === 'saved') {
      return
    }
    setSaveState('saving')
    try {
      await api.saveScore({
        playerName: playerName.trim(),
        totalScore: points,
        categoryBreakdown: breakdown,
        badge
      })
      setSaveState('saved')
    } catch {
      setSaveState('error')
    }
  }

  function handlePlayAgain() {
    resetGame()
    navigate('/launch')
  }

  if (gameStatus === 'not-started' || answered === 0) {
    return (
      <div className="relative min-h-screen bg-terminal-black">
        <Atmosphere />
        <TelemetryStrip />
        <HudHeader />
        <div className="relative z-10 flex min-h-[calc(100vh-140px)] items-center justify-center p-4">
          <BracketPanel elevated className="w-full max-w-md p-8 text-center">
            <StatusBadge color="amber">Telemetry Void</StatusBadge>
            <h2 className="glow-title mt-4 font-display text-2xl font-bold uppercase">
              No Debrief Available
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-bone-muted">
              Run an active scenario mission first to generate tactical debrief data.
            </p>
            <div className="mt-6">
              <Link to="/launch" className="btn-hud btn-hud-primary px-6 py-3 text-xs">
                Initialize Mission Launch
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
        <BracketPanel elevated alert={!completed} className="p-6 sm:p-10">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-green/15 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone-dim">
              {'// MISSION DEBRIEF // AFTER-ACTION REPORT'}
            </span>
            <StatusBadge color={completed ? 'green' : 'crimson'} pulse>
              {completed ? 'Operation Successful' : 'Operative Compromised'}
            </StatusBadge>
          </div>

          {/* Title & summary */}
          <div className="mt-6 text-center sm:text-left">
            <h1
              className={`glow-title font-display text-4xl font-bold uppercase tracking-[0.06em] sm:text-5xl ${
                completed ? 'text-cyber-green' : 'text-alert'
              }`}
            >
              {completed ? 'Mission Complete // Sectors Secured' : 'Mission Failed // Defense Breached'}
            </h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-bone-muted">
              {completed
                ? `${correct} of ${answered} threats neutralized. Survival index: ${Math.round((correct / Math.max(1, answered)) * 100)}%`
                : `Operative down after ${answered} encounters. System integrity lost.`}
            </p>
          </div>

          {/* Badge & Score Display Card */}
          <div className="my-8 grid gap-6 rounded-sm border border-cyber-green/20 bg-pitch/90 p-6 md:grid-cols-2">
            {/* Badge Reveal Card */}
            <div className="flex flex-col justify-between border-b border-cyber-green/15 pb-6 md:border-b-0 md:border-r md:pr-6 md:pb-0">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-bone-dim">
                  Security Clearance Conferred
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-cyber-green/40 bg-cyber-green/10 text-3xl shadow-[0_0_16px_rgba(0,255,136,0.3)]">
                    {BADGE_ICONS[badge] || '🛡️'}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-cyber-green">
                      {badge}
                    </h3>
                    <p className="font-mono text-xs text-bone-muted">{BADGES[badge]}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <StatusBadge color="cyan">Clearance Verified // Node Synced</StatusBadge>
              </div>
            </div>

            {/* Score Readout Card */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-bone-dim">
                  Total Telemetry Score
                </span>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="glow-title font-display text-5xl font-extrabold text-cyber-green sm:text-6xl">
                    {points}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-bone-dim">
                    / {maxPoints} PTS MAX
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {isNewBest && (
                  <StatusBadge color="green" pulse>
                    ★ New Personal Best Record
                  </StatusBadge>
                )}
                <StatusBadge color="gray">
                  Accuracy: {Math.round((correct / Math.max(1, answered)) * 100)}%
                </StatusBadge>
              </div>
            </div>
          </div>

          {/* Performance by Sector */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-cyber-green">
              Performance by Tactical Sector
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {CATEGORIES.map((cat) => {
                const b = breakdown[cat] || { correct: 0, incorrect: 0 }
                const catTotal = b.correct + b.incorrect
                const isWeak = cat === weakest && b.incorrect > 0
                return (
                  <div
                    key={cat}
                    className={`rounded-sm border p-4 font-mono transition-all ${
                      isWeak
                        ? 'border-alert/50 bg-alert/5 shadow-[0_0_14px_rgba(255,51,102,0.15)]'
                        : 'border-steel/40 bg-terminal-card hover:border-cyber-green/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs font-bold uppercase text-bone-bright">
                        <CategoryIcon category={cat} size={18} />
                        {CATEGORY_LABELS[cat]}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isWeak ? 'text-alert' : 'text-cyber-green'
                        }`}
                      >
                        {b.correct}/{catTotal}
                      </span>
                    </div>
                    <div className="mt-3">
                      <SegmentedProgress total={catTotal || 1} filled={b.correct} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-bone-dim">
                      <span>Rate: {catTotal > 0 ? Math.round((b.correct / catTotal) * 100) : 0}%</span>
                      {isWeak ? (
                        <span className="font-bold text-alert">Vulnerable</span>
                      ) : (
                        <span className="text-cyber-green">Neutralized</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {weakest && breakdown[weakest].incorrect > 0 && (
              <div className="mt-4 rounded-sm border border-alert/30 bg-alert/10 p-3 text-xs leading-relaxed text-bone">
                <span className="font-bold text-alert">PRIORITY TRAINING ADVISORY:</span> Sector{' '}
                <strong className="text-bone-bright">{CATEGORY_LABELS[weakest]}</strong> registered the highest miss rate. Recommended remedial drill.
              </div>
            )}
          </div>

          {/* Missed Encounters Review */}
          {mistakes.length > 0 && (
            <details className="group mt-8 rounded-sm border border-steel/40 bg-pitch/80 p-4 transition-all">
              <summary className="cursor-pointer font-mono text-xs font-bold uppercase tracking-[0.14em] text-threat-amber hover:text-bone-bright focus:outline-none">
                ▸ Review Missed Intercepts ({mistakes.length} Logged)
              </summary>
              <div className="mt-4 space-y-4 border-t border-steel/30 pt-4">
                {mistakes.map((m, i) => {
                  const q = questionById[m.questionId]
                  if (!q) return null
                  return (
                    <div
                      key={i}
                      className="rounded-sm border border-steel/30 bg-terminal-panel p-4 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-[10px] text-bone-dim">
                        <span>INCIDENT #{i + 1} // {CATEGORY_LABELS[q.category]?.toUpperCase()}</span>
                        <span className="text-alert font-bold">FAILED</span>
                      </div>
                      <p className="mt-2 text-bone-bright leading-relaxed">
                        {highlightTerms(q.prompt)}
                      </p>
                      <div className="mt-3 space-y-1 text-[11px]">
                        <p className="text-alert">
                          ✕ Your Call: <span className="line-through">{m.chosenIndex >= 0 ? q.options[m.chosenIndex] : 'TIME EXPIRED'}</span>
                        </p>
                        <p className="text-cyber-green">
                          ✓ Verified Protocol: <strong>{q.options[q.correctAnswerIndex]}</strong>
                        </p>
                      </div>
                      {q.explanation && (
                        <p className="mt-2 border-t border-steel/20 pt-2 text-[11px] leading-relaxed text-bone-muted">
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </details>
          )}

          {/* Save Callsign Row */}
          <div className="mt-8 border-t border-cyber-green/15 pt-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-bone-dim">
              Commit Telemetry Record
            </span>
            {saveState === 'saved' ? (
              <div className="mt-3 flex items-center gap-2">
                <StatusBadge color="cyan" pulse>
                  ✓ Operative score successfully committed to mainframe leaderboard
                </StatusBadge>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  className="flex-1 rounded-sm border border-steel/50 bg-pitch px-4 py-3 font-mono text-xs uppercase tracking-wider text-bone-bright placeholder:text-bone-dim focus:border-cyber-green focus:outline-none focus:ring-1 focus:ring-cyber-green"
                  placeholder="ENTER OPERATIVE CALLSIGN [MAX 20 CHARS]"
                  maxLength={20}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  disabled={saveState === 'saving'}
                />
                <button
                  onClick={handleSave}
                  disabled={saveState === 'saving' || !playerName.trim()}
                  className="btn-hud btn-hud-primary shrink-0 px-6 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {saveState === 'saving' ? 'Filing…' : 'File Score to Mainframe'}
                </button>
              </div>
            )}
            {saveState === 'error' && (
              <p className="mt-2 text-xs text-alert font-mono">
                Telemetry transmission failed. Retry recording score.
              </p>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cyber-green/15 pt-6">
            <button
              onClick={handlePlayAgain}
              className="btn-hud btn-hud-primary px-8 py-3.5 text-xs"
            >
              New Mission Run
            </button>
            <div className="flex gap-3">
              <Link
                to="/leaderboard"
                className="btn-hud btn-hud-steel px-6 py-3.5 text-xs"
              >
                Mainframe Leaderboard
              </Link>
              <Link
                to="/"
                className="btn-hud btn-hud-steel px-6 py-3.5 text-xs"
              >
                Command Terminal
              </Link>
            </div>
          </div>
        </BracketPanel>
      </main>

      <TelemetryFooter />
    </div>
  )
}

