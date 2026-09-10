import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'
import Atmosphere from './hud/Atmosphere'
import TelemetryStrip from './hud/TelemetryStrip'
import HudHeader from './hud/HudHeader'
import TelemetryFooter from './hud/TelemetryFooter'
import BracketPanel from './hud/BracketPanel'
import StatusBadge from './hud/StatusBadge'

const inputCls =
  'w-full bg-transparent font-mono text-sm tracking-wider text-bone-bright placeholder:text-bone-dim focus:outline-none'

function TerminalField({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-bone-dim">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-sm border border-steel/50 bg-pitch px-4 py-3 focus-within:border-cyber-green focus-within:ring-1 focus-within:ring-cyber-green">
        <span className="font-mono font-bold text-cyber-green">&gt;</span>
        <input {...props} className={inputCls} />
      </div>
    </label>
  )
}

export default function SignUp() {
  const register = useAuth((s) => s.register)
  const authLoading = useAuth((s) => s.loading)
  const authError = useAuth((s) => s.error)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const ok = await register({ username: username.trim(), email: email.trim(), password })
    if (ok) navigate('/launch')
  }

  return (
    <div className="relative min-h-screen bg-terminal-black">
      <Atmosphere />
      <TelemetryStrip />
      <HudHeader />
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-140px)] max-w-xl items-center justify-center px-4 py-10">
        <BracketPanel elevated className="w-full p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-green/15 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-bone-dim">
              {'// OPERATIVE REGISTRATION // NEW IDENTITY'}
            </span>
            <StatusBadge color="cyan" pulse>
              Uplink Secure
            </StatusBadge>
          </div>
          <h1 className="glow-title mt-6 font-display text-3xl font-bold uppercase tracking-[0.06em] text-bone-bright sm:text-4xl">
            Create Callsign<span className="terminal-cursor" />
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-bone-muted">
            Register an operative identity to persist leaderboard records and mission history across sessions.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <TerminalField
              label="Callsign [1–30 chars: letters, numbers, _, . -]"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. night_owl.07"
              maxLength={30}
              autoComplete="username"
              required
            />
            <TerminalField
              label="Email frequency"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operative@domain.com"
              autoComplete="email"
              required
            />
            <TerminalField
              label="Passphrase [min 8 chars]"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              autoComplete="new-password"
              minLength={8}
              required
            />
            {authError && (
              <div className="rounded-sm border border-alert/50 bg-alert/10 p-3 font-mono text-xs text-alert">
                {authError}
              </div>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="btn-hud btn-hud-primary w-full py-3.5 text-xs disabled:cursor-not-allowed disabled:opacity-40"
            >
              {authLoading ? 'Encrypting Identity…' : 'Register Operative // Engage'}
            </button>
          </form>
          <p className="mt-5 text-center font-mono text-xs text-bone-muted">
            Existing operative?{' '}
            <Link to="/signin" className="font-bold text-cyber-green hover:underline">
              Sign in
            </Link>
            {' '}· Guest play needs no account —{' '}
            <Link to="/launch" className="font-bold text-cyber-cyan hover:underline">
              launch directly
            </Link>
          </p>
        </BracketPanel>
      </main>
      <TelemetryFooter />
    </div>
  )
}
