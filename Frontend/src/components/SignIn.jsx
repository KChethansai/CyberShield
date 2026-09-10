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

export default function SignIn() {
  const login = useAuth((s) => s.login)
  const authLoading = useAuth((s) => s.loading)
  const authError = useAuth((s) => s.error)
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const ok = await login({ identifier: identifier.trim(), password })
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
              {'// OPERATIVE AUTH // RETURNING IDENTITY'}
            </span>
            <StatusBadge color="cyan" pulse>
              Uplink Secure
            </StatusBadge>
          </div>
          <h1 className="glow-title mt-6 font-display text-3xl font-bold uppercase tracking-[0.06em] text-bone-bright sm:text-4xl">
            Operative Sign-In<span className="terminal-cursor" />
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-bone-muted">
            Re-authenticate to restore your callsign, best score, and mission history.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <TerminalField
              label="Callsign or email"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="night_owl.07"
              autoComplete="username"
              required
            />
            <TerminalField
              label="Passphrase"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              autoComplete="current-password"
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
              {authLoading ? 'Verifying Credentials…' : 'Authorize // Enter Terminal'}
            </button>
          </form>
          <p className="mt-5 text-center font-mono text-xs text-bone-muted">
            No identity on file?{' '}
            <Link to="/signup" className="font-bold text-cyber-green hover:underline">
              Register
            </Link>
            {' '}·{' '}
            <Link to="/launch" className="font-bold text-cyber-cyan hover:underline">
              continue as guest
            </Link>
          </p>
        </BracketPanel>
      </main>
      <TelemetryFooter />
    </div>
  )
}
