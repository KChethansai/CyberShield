import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Atmosphere from './hud/Atmosphere'
import TelemetryStrip from './hud/TelemetryStrip'
import HudHeader from './hud/HudHeader'
import TelemetryFooter from './hud/TelemetryFooter'
import BracketPanel from './hud/BracketPanel'
import StatusBadge from './hud/StatusBadge'
import ShieldLives from './hud/ShieldLives'
import BootModal from './hud/BootModal'
import CategoryIcon from './CategoryIcon'
import { api } from '../api/client'
import { useGame } from '../store/gameStore'
import { CATEGORIES, CATEGORY_LABELS, DIFFICULTIES } from '../utils/gameConstants'
import { filterByDifficulty, selectSubset } from '../utils/questions'
import { getMaxPoints } from '../utils/scores'

const VECTORS = {
  phishing: { tag: 'PHISHING // CREDENTIAL HARVEST', level: 'HIGH', hash: '0xPH1SH', desc: 'Deceptive messages engineered to steal logins, OTPs, and sessions.' },
  password: { tag: 'PASSWORD // WEAK CREDENTIALS', level: 'ELEVATED', hash: '0xP4SS', desc: 'Weak, reused, and predictable password patterns under brute force.' },
  qr: { tag: 'QR // POISONED CODES', level: 'SEVERE', hash: '0xQR77', desc: 'Tampered codes redirecting to lookalike harvest and payment pages.' },
  scam: { tag: 'SCAM // SOCIAL ENGINEERING', level: 'CRITICAL', hash: '0xSC4M', desc: 'UPI, SMS, courier, job, and voice fraud running at full volume.' }
}

const TIERS = [
  { key: 'easy', codename: 'RECRUIT', desc: 'Easy + medium pool. 3 lives. Learn the patterns.' },
  { key: 'normal', codename: 'ANALYST', desc: 'Full pool. 3 lives. Standard operative protocol.', recommended: true },
  { key: 'hard', codename: 'SENTINEL', desc: 'Medium + hard pool. 2 lives. No margin for error.' }
]

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: 'easeOut' }
}

export default function LandingPage() {
  const navigate = useNavigate()
  const startGame = useGame((s) => s.startGame)
  const [tier, setTier] = useState('normal')
  const [poolCounts, setPoolCounts] = useState(null)
  const [bootOpen, setBootOpen] = useState(false)
  const [authorizing, setAuthorizing] = useState(false)

  useEffect(() => {
    api
      .getQuestionsGrouped()
      .then((grouped) => {
        const counts = {}
        for (const [key] of Object.entries(DIFFICULTIES)) {
          counts[key] = getMaxPoints(selectSubset(filterByDifficulty(grouped, key))) / 10
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
    try {
      const grouped = await api.getQuestionsGrouped()
      const questions = selectSubset(filterByDifficulty(grouped, tier))
      startGame({
        questions,
        difficulty: tier,
        lives: DIFFICULTIES[tier].lives
      })
      navigate('/play')
    } catch {
      setAuthorizing(false)
      setBootOpen(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-terminal-black">
      <Atmosphere />
      <TelemetryStrip />
      <HudHeader onInitialize={() => setBootOpen(true)} />

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <StatusBadge color="cyan" pulse>
            MISSION COCKPIT LINK: [CS-VX07] // DST 12.9N / TGT ACTIVE
          </StatusBadge>
        </motion.div>
        <motion.h1
          className="glow-title glow-title-pulse mt-6 font-display text-5xl font-bold uppercase leading-none tracking-[0.06em] sm:text-7xl lg:text-9xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          Cyber<span className="text-cyber-green">Shield</span>
        </motion.h1>
        <motion.p
          className="mt-4 bg-gradient-to-r from-cyber-green to-cyber-cyan bg-clip-text font-display text-sm font-bold uppercase tracking-[0.2em] text-transparent sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          See the attack before it sees you<span className="terminal-cursor" />
        </motion.p>
        <motion.p
          className="mt-4 max-w-xl text-[13px] leading-relaxed text-bone-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          {'// A cyber-tactical training protocol. Four threat vectors. Live telemetry. Zero second chances.'}
        </motion.p>
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
        >
          <StatusBadge color="green">24 Challenges</StatusBadge>
          <StatusBadge color="amber">03 Lives</StatusBadge>
          <StatusBadge color="cyan">04 Threat Types</StatusBadge>
        </motion.div>
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          <button
            onClick={() => setBootOpen(true)}
            className="btn-hud btn-hud-primary px-8 py-3.5 text-sm"
          >
            Initialize Mission // Enter Escape Room
          </button>
          <button
            onClick={() => setBootOpen(true)}
            className="btn-hud btn-hud-steel px-8 py-3.5 text-sm"
          >
            Simulate Boot-Up Hinge
          </button>
        </motion.div>
        <motion.p
          className="mt-12 text-[10px] uppercase tracking-[0.2em] text-bone-dim"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
        >
          ↓ scroll for briefing
        </motion.p>
      </section>

      {/* ── Threat vectors ── */}
      <section id="vectors" className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <motion.p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyber-green" {...fadeUp}>
          {'// Threat Vectors'}
        </motion.p>
        <motion.h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-[0.06em] text-bone-bright sm:text-4xl" {...fadeUp}>
          Four threats. One operative: you.
        </motion.h2>
        <motion.p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-bone-muted" {...fadeUp}>
          Attacks don&apos;t break in. They get invited in. Train your instincts before it costs you.
        </motion.p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => {
            const v = VECTORS[cat]
            const alert = i >= 2
            return (
              <motion.div key={cat} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}>
                <BracketPanel alert={alert} className="h-full p-6">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.12em] text-bone-dim">
                    <span>VECTOR//0{i + 1}</span>
                    <span className="text-telemetry">SYS_HASH {v.hash}</span>
                  </div>
                  <div className={`mt-4 flex h-12 w-12 items-center justify-center rounded-sm border ${alert ? 'border-alert/50 bg-alert/10 text-alert shadow-[0_0_12px_rgba(255,51,102,0.3)]' : 'border-cyber-green/50 bg-cyber-green/10 text-cyber-green shadow-[0_0_12px_rgba(0,255,136,0.3)]'}`}>
                    <CategoryIcon category={cat} size={26} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-[0.06em] text-bone-bright">
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <p className={`mt-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${alert ? 'text-alert' : 'text-cyber-green'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${alert ? 'bg-alert animate-pulse' : 'bg-cyber-green'}`} />
                    {v.tag}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-bone-muted">{v.desc}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-cyber-green/10 pt-3">
                    <StatusBadge color={alert ? 'crimson' : 'amber'}>Threat lvl: {v.level}</StatusBadge>
                    <StatusBadge color={alert ? 'crimson' : 'green'} pulse={alert}>Armed</StatusBadge>
                  </div>
                </BracketPanel>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Intensity tiers ── */}
      <section id="intensity" className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <motion.p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyber-green" {...fadeUp}>
          {'// Mission Specs'}
        </motion.p>
        <motion.h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-[0.06em] text-bone-bright sm:text-4xl" {...fadeUp}>
          Mission Intensity Tier
        </motion.h2>
        <motion.p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-bone-muted" {...fadeUp}>
          Select your operating parameters. Difficulty sets the scenario pool; tier sets your lives.
        </motion.p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {TIERS.map((t) => {
            const selected = tier === t.key
            const d = DIFFICULTIES[t.key]
            return (
              <button
                key={t.key}
                onClick={() => setTier(t.key)}
                className="group cursor-pointer text-left focus:outline-none"
              >
                <BracketPanel
                  elevated={selected}
                  brackets={selected}
                  className={`h-full p-6 transition-all duration-200 ${
                    selected
                      ? 'border-2 border-cyber-green bg-terminal-panel shadow-[0_0_32px_rgba(0,255,136,0.2)]'
                      : 'opacity-70 hover:border-steel-light hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-bone-dim">
                      TIER//{t.codename}
                    </span>
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        selected
                          ? 'bg-cyber-green shadow-[0_0_10px_rgba(0,255,136,0.9)] animate-pulse'
                          : 'bg-steel'
                      }`}
                    />
                  </div>
                  <h3
                    className={`mt-4 font-display text-2xl font-bold uppercase tracking-[0.06em] ${
                      selected ? 'text-cyber-green' : 'text-bone-bright'
                    }`}
                  >
                    {t.codename}
                  </h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-bone-muted">
                    {d.label} protocol
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-bone-muted">{t.desc}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-cyber-green/10 pt-3">
                    <ShieldLives lives={d.lives} max={d.lives} size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-telemetry">
                      {poolCounts ? `${poolCounts[t.key]} scenarios` : '… scenarios'}
                    </span>
                  </div>
                  {t.recommended && (
                    <div className="mt-4">
                      <StatusBadge color="green">Recommended default</StatusBadge>
                    </div>
                  )}
                </BracketPanel>
              </button>
            )
          })}
        </div>

        {/* ── Bottom action strip ── */}
        <div id="launch" className="mt-10">
          <BracketPanel elevated className="flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <StatusBadge color="green" pulse>Authorization: granted</StatusBadge>
              <p className="mt-2 font-display text-xl font-bold uppercase tracking-[0.06em] text-bone-bright">
                Tier locked: {TIERS.find((t) => t.key === tier)?.codename}
              </p>
              <p className="mt-1 text-[12px] text-bone-muted">Proceed to mission cockpit for operative setup.</p>
            </div>
            <button
              onClick={() => setBootOpen(true)}
              className="btn-hud btn-hud-primary shrink-0 px-8 py-4 text-sm"
            >
              Launch Simulation Cockpit
            </button>
          </BracketPanel>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-6 text-center text-[10px] uppercase tracking-[0.2em] text-bone-dim">
        CYBERSHIELD // PROTOCOL OPS // ENGINE CORE V2.4.9 // DEFCON 3 READY
      </div>
      <TelemetryFooter />

      {/* ── Boot-up sequence modal ── */}
      <BootModal
        open={bootOpen}
        authorizing={authorizing}
        onAbort={() => {
          setBootOpen(false)
          setAuthorizing(false)
        }}
        onAuthorize={handleAuthorize}
      />
    </div>
  )
}

