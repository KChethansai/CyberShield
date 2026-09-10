import { useEffect, useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGame, getTotalQuestions, CATEGORIES } from '../store/gameStore'
import { CATEGORY_LABELS, DIFFICULTIES } from '../utils/gameConstants'
import { useQuestionTimer, formatClock } from '../hooks/useQuestionTimer'
import { highlightTerms } from '../utils/highlight'
import Atmosphere from './hud/Atmosphere'
import TelemetryStrip from './hud/TelemetryStrip'
import TelemetryFooter from './hud/TelemetryFooter'
import BracketPanel from './hud/BracketPanel'
import DecisionOption from './hud/DecisionOption'
import ShieldLives from './hud/ShieldLives'
import SegmentedProgress from './hud/SegmentedProgress'
import StatusBadge from './hud/StatusBadge'
import CategoryIcon from './CategoryIcon'
import { playChime } from '../utils/audio'

const LETTERS = ['A', 'B', 'C', 'D']

function getThreatInspect(question) {
  const prompt = question?.prompt || ''
  const cat = question?.category || 'phishing'

  const urlMatch = prompt.match(/https?:\/\/[^\s"]+/)
  const emailMatch = prompt.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)
  const domainMatch = prompt.match(/\b([A-Za-z0-9-]+\.(?:xyz|in|com|net|org|app|io|co))\b/)
  const otpMatch = prompt.match(/\b\d{4,6}\b/)

  if (cat === 'phishing') {
    return {
      origin: emailMatch ? `MAIL_GATEWAY // ${emailMatch[0]}` : 'INBOUND_COMM // RAW_MIME',
      flag: domainMatch && domainMatch[0].endsWith('.xyz') ? 'UNRECOGNIZED TLD // SUSPICIOUS HOST' : 'LOOKALIKE SENDER // DOMAIN SPOOF',
      payload: urlMatch ? urlMatch[0] : (emailMatch ? emailMatch[0] : 'PAYLOAD: CREDENTIAL_HARVEST_URI')
    }
  }
  if (cat === 'password') {
    return {
      origin: 'AUTH_SUBSYSTEM // POLICY_HASH',
      flag: 'PREDICTABLE DICTIONARY PATTERN DETECTED',
      payload: 'POLICY CHECK: COMMON_PASS_LEAK / LOW_ENTROPY'
    }
  }
  if (cat === 'qr') {
    return {
      origin: 'OPTICAL_VECTOR // PHYSICAL_DECODER',
      flag: domainMatch ? 'TAMPERED REDIRECT // UNVERIFIED DESTINATION' : 'UNENCRYPTED COLLECT / HARVEST TARGET',
      payload: urlMatch ? urlMatch[0] : (domainMatch ? domainMatch[0] : 'QR_URI: HTTP://PAYMENT_GATEWAY_LOOKALIKE')
    }
  }
  return {
    origin: otpMatch ? 'TELECOM_INBOUND // OTP_COLLECT_DEMAND' : 'SOCIAL_ENG_VECTOR // UNREGISTERED_SIP',
    flag: 'URGENCY BAIT // PRESSURE TACTIC DETECTED',
    payload: otpMatch ? `EXTRACTED DEMAND: SHARE OTP ${otpMatch[0]}` : 'INBOUND_FLOW: VISHING_CREDENTIAL_INSPECTION'
  }
}

export default function ThreatSimulation() {
  const gameStatus = useGame((s) => s.gameStatus)
  const categoryIndex = useGame((s) => s.categoryIndex)
  const currentQuestionIndex = useGame((s) => s.currentQuestionIndex)
  const questions = useGame((s) => s.questions)
  const lives = useGame((s) => s.lives)
  const points = useGame((s) => s.points)
  const answeredQuestions = useGame((s) => s.answeredQuestions)
  const difficulty = useGame((s) => s.difficulty)
  const answerQuestion = useGame((s) => s.answerQuestion)
  const nextQuestion = useGame((s) => s.nextQuestion)
  const navigate = useNavigate()

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [transitionTo, setTransitionTo] = useState(null)
  const [abortModalOpen, setAbortModalOpen] = useState(false)

  const category = CATEGORIES[categoryIndex]
  const list = questions[category] || []
  const question = list[currentQuestionIndex]
  const answered = selectedIndex !== null

  const total = getTotalQuestions(questions)
  const answeredCount = answeredQuestions.length
  const maxLives = DIFFICULTIES[difficulty]?.lives || 3

  // Per-question countdown timer (cyan, pulsing, MM:SS format)
  const timeLeft = useQuestionTimer(question?._id, {
    paused: answered || gameStatus !== 'in-progress' || abortModalOpen,
    onExpire: handleTimeout
  })

  function handleTimeout() {
    if (answered || !question) return
    playChime('incorrect')
    setSelectedIndex(-1)
    answerQuestion({
      questionId: question._id,
      category,
      chosenIndex: -1,
      correct: false
    })
  }

  useEffect(() => {
    if (gameStatus === 'game-over' || gameStatus === 'completed') {
      navigate('/result')
    }
  }, [gameStatus, navigate])

  useEffect(() => {
    setSelectedIndex(null)
    setTransitionTo(null)
  }, [categoryIndex, currentQuestionIndex])

  const inspect = useMemo(() => getThreatInspect(question), [question])

  if (gameStatus === 'not-started' || !question) {
    return (
      <div className="relative min-h-screen bg-terminal-black">
        <Atmosphere />
        <TelemetryStrip />
        <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
          <BracketPanel elevated className="w-full max-w-md p-8 text-center">
            <StatusBadge color="amber">No Active Simulation</StatusBadge>
            <h2 className="glow-title mt-4 font-display text-2xl font-bold uppercase">
              Operative Offline
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-bone-muted">
              No active scenario mission in progress. Initialize mission briefing to begin.
            </p>
            <div className="mt-6">
              <Link to="/launch" className="btn-hud btn-hud-primary px-6 py-3 text-xs">
                Launch Mission Cockpit
              </Link>
            </div>
          </BracketPanel>
        </div>
        <TelemetryFooter />
      </div>
    )
  }

  function handleSelect(i) {
    if (answered) return
    const isCorrect = i === question.correctAnswerIndex
    playChime(isCorrect ? 'correct' : 'incorrect')
    setSelectedIndex(i)
    answerQuestion({
      questionId: question._id,
      category,
      chosenIndex: i,
      correct: isCorrect
    })
  }

  function handleNext() {
    const isLastInCategory = currentQuestionIndex >= list.length - 1
    const isLastCategory = categoryIndex >= CATEGORIES.length - 1

    if (lives <= 0 || isLastCategory) {
      nextQuestion()
    } else if (isLastInCategory) {
      setTransitionTo(CATEGORIES[categoryIndex + 1])
    } else {
      nextQuestion()
    }
  }

  // Intermission / Sector Clear Screen
  if (transitionTo) {
    return (
      <div className="relative min-h-screen bg-terminal-black">
        <Atmosphere />
        <TelemetryStrip />
        <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
          <BracketPanel elevated className="w-full max-w-lg p-8 text-center">
            <StatusBadge color="green" pulse>Sector Secure</StatusBadge>
            <h2 className="glow-title mt-4 font-display text-3xl font-bold uppercase">
              Sector 0{categoryIndex + 1} Cleared
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-bone-muted">
              {CATEGORY_LABELS[category]} neutralized
            </p>
            <div className="my-6 rounded-sm border border-cyber-green/20 bg-pitch p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone-dim">
                Initializing Vector 0{categoryIndex + 2}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2 text-cyber-green">
                <CategoryIcon category={transitionTo} size={28} />
                <span className="font-display text-xl font-bold uppercase tracking-[0.08em] text-bone-bright">
                  {CATEGORY_LABELS[transitionTo]}
                </span>
              </div>
            </div>
            <button
              onClick={() => nextQuestion()}
              className="btn-hud btn-hud-primary px-8 py-3.5 text-xs"
            >
              Proceed to Sector 0{categoryIndex + 2} →
            </button>
          </BracketPanel>
        </div>
        <TelemetryFooter />
      </div>
    )
  }

  const wasCorrect = answered && selectedIndex === question.correctAnswerIndex
  const isFinalStep = lives <= 0 || (currentQuestionIndex >= list.length - 1 && categoryIndex >= CATEGORIES.length - 1)

  return (
    <div className="relative min-h-screen bg-terminal-black">
      <Atmosphere />
      <TelemetryStrip />

      {/* ── Compact Sticky Top HUD Bar ── */}
      <header className="sticky top-[25px] z-30 border-b border-cyber-green/20 bg-obsidian/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
          {/* Left: Brand tag + sector breadcrumb */}
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display text-xs font-bold uppercase tracking-[0.08em] text-bone-bright sm:text-sm">
              <span className="text-cyber-green">[+]</span> CyberShield
            </Link>
            <span className="text-steel" aria-hidden="true">//</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyber-cyan sm:text-xs">
              Sector 0{categoryIndex + 1}/04 <span className="hidden text-bone-dim sm:inline">// {CATEGORY_LABELS[category].toUpperCase().replace(/\s+/g, '_')}</span>
            </span>
          </div>

          {/* Center: Shield icons + Segmented progress */}
          <div className="flex items-center gap-3 sm:gap-6">
            <ShieldLives lives={lives} max={maxLives} size={20} />
            <div className="w-24 sm:w-36 md:w-48">
              <SegmentedProgress total={total} filled={answeredCount} />
            </div>
          </div>

          {/* Right: Score readout + Countdown timer pill + Abort button */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.12em] text-bone-dim sm:inline">
              Score <span className="font-mono text-cyber-green">{points}</span>
            </span>

            {/* Countdown timer pill: cyan, pulsing dot, MM:SS format */}
            <div className="flex items-center gap-1.5 rounded-sm border border-cyber-cyan/50 bg-cyber-cyan/10 px-2.5 py-1 text-[11px] font-bold text-cyber-cyan shadow-[0_0_12px_rgba(0,229,255,0.25)]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-ping" />
              <span className="font-mono tracking-wider">{formatClock(timeLeft)}</span>
            </div>

            {/* Crimson-outlined Abort button */}
            <button
              onClick={() => setAbortModalOpen(true)}
              className="btn-hud btn-hud-alert px-3 py-1 text-[10px]"
            >
              Abort
            </button>
          </div>
        </div>
      </header>

      {/* ── Central Tactical Panel ── */}
      <main className="relative z-10 mx-auto max-w-4xl px-4 py-8">
        <BracketPanel elevated className="p-6 sm:p-8">
          {/* Header row: category tag with rotated diamond bullet + Incident Vector tag */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyber-green/15 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-cyber-green">
              <span className="text-cyber-green">◆</span>
              <span>{CATEGORY_LABELS[category].toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge color="cyan" pulse>
                Incident Vector #0{answeredCount + 1}
              </StatusBadge>
              <StatusBadge color={question.difficulty === 'hard' ? 'crimson' : question.difficulty === 'medium' ? 'amber' : 'green'}>
                Lvl: {question.difficulty.toUpperCase()}
              </StatusBadge>
            </div>
          </div>

          {/* Scenario prompt text with inline highlighted/bordered key terms */}
          <div className="mt-5 text-[14px] leading-relaxed text-bone-bright sm:text-[15px]">
            {highlightTerms(question.prompt)}
          </div>

          {/* Threat inspect preview box: dark inset panel showing raw technical detail */}
          <div className="my-5 rounded-sm border border-steel/40 bg-pitch/90 p-4 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.14em]">
              <span className="text-telemetry">[INTERCEPT // PAYLOAD_INSPECTION]</span>
              <span className="text-bone-dim">TELEMETRY_ID: #{question._id.toUpperCase()}</span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="rounded-xs border border-steel/50 bg-terminal-panel px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-bone-muted">
                {inspect.origin}
              </span>
              <span className="rounded-xs border border-alert/70 bg-alert/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-alert animate-pulse">
                [{inspect.flag}]
              </span>
            </div>
            <div className="mt-2 text-[11px] text-bone-dim">
              <span className="text-cyber-green">&gt;</span> <span className="text-bone-muted">{inspect.payload}</span>
            </div>
          </div>

          {/* 2x2 decision grid: lettered index chip (A/B/C/D) + option text */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            {question.options.map((opt, i) => {
              let optState = 'default'
              if (answered) {
                if (i === question.correctAnswerIndex) optState = 'correct'
                else if (i === selectedIndex) optState = 'incorrect'
                else optState = 'dim'
              }
              return (
                <DecisionOption
                  key={i}
                  letter={LETTERS[i] || `${i + 1}`}
                  text={opt}
                  state={optState}
                  disabled={answered}
                  onClick={() => handleSelect(i)}
                />
              )
            })}
          </div>

          {/* Debrief banner (appears after answering): bracket-free glowing bordered panel */}
          {answered && (
            <div
              className={`mt-6 rounded-sm border p-5 transition-all duration-300 ${
                wasCorrect
                  ? 'border-cyber-green/70 bg-cyber-green/10 shadow-[0_0_24px_rgba(0,255,136,0.25)]'
                  : 'border-alert/70 bg-alert/10 shadow-[0_0_24px_rgba(255,51,102,0.25)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`flex h-6 w-6 items-center justify-center rounded-sm font-bold ${wasCorrect ? 'bg-cyber-green text-obsidian' : 'bg-alert text-obsidian'}`}>
                  {wasCorrect ? '✓' : '✕'}
                </span>
                <h3
                  className={`font-display text-base font-bold uppercase tracking-[0.08em] sm:text-lg ${
                    wasCorrect ? 'text-cyber-green' : 'text-alert'
                  }`}
                >
                  {selectedIndex === -1
                    ? 'Defense Compromised // Response Time Expired (−1 Shield)'
                    : wasCorrect
                    ? 'Threat Neutralized (+10 Points)'
                    : 'Integrity Breach Detected (−1 Shield)'}
                </h3>
              </div>
              {question.explanation && (
                <p className="mt-2.5 font-mono text-[12px] leading-relaxed text-bone sm:text-[13px]">
                  {question.explanation}
                </p>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="btn-hud btn-hud-primary px-6 py-2.5 text-xs"
                >
                  {isFinalStep
                    ? 'Finalize Mission Debrief →'
                    : currentQuestionIndex >= list.length - 1
                    ? 'Proceed to Next Sector →'
                    : `Proceed to Incident #0${answeredCount + 2} →`}
                </button>
              </div>
            </div>
          )}
        </BracketPanel>
      </main>

      <TelemetryFooter />

      {/* ── Abort Confirmation Modal ── */}
      {abortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pitch/90 p-4 backdrop-blur-sm">
          <BracketPanel alert className="w-full max-w-md p-6 text-center">
            <StatusBadge color="crimson" pulse>Security Warning</StatusBadge>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase text-alert">
              Abort Tactical Operation?
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-bone-muted">
              Terminating the link will record current telemetry and conclude the mission. Unresolved vectors will be classified as missed.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setAbortModalOpen(false)}
                className="btn-hud btn-hud-steel flex-1 py-2.5 text-xs"
              >
                Resume Combat
              </button>
              <button
                onClick={() => {
                  setAbortModalOpen(false)
                  navigate('/result')
                }}
                className="btn-hud btn-hud-alert flex-1 py-2.5 text-xs"
              >
                Confirm Abort
              </button>
            </div>
          </BracketPanel>
        </div>
      )}
    </div>
  )
}

