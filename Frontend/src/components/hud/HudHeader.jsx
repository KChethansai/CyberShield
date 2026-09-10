import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../store/authStore'
import Equalizer from './Equalizer'

// Sticky HUD navbar with corner brackets.
export default function HudHeader() {
  const [muted, setMuted] = useState(false)
  const user = useAuth((s) => s.user)
  const isAuthenticated = useAuth((s) => s.isAuthenticated)
  return (
    <header className="sticky top-[25px] z-30 border-b border-cyber-green/20 bg-obsidian/90 backdrop-blur">
      <div className="bracket-wrap mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5">
        <span className="hud-bracket hud-bracket-bl" aria-hidden="true" />
        <span className="hud-bracket hud-bracket-br" aria-hidden="true" />
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-cyber-green shadow-[0_0_6px_rgba(0,255,136,0.9)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyber-cyan shadow-[0_0_6px_rgba(0,229,255,0.9)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-alert shadow-[0_0_6px_rgba(255,51,102,0.9)]" />
          </span>
          <Link to="/" className="font-display text-sm font-bold uppercase tracking-[0.08em] text-bone-bright">
            <span className="text-cyber-green">[+]</span> CyberShield <span className="hidden text-bone-dim sm:inline">// Protocol_Ops</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-[11px] font-bold uppercase tracking-[0.14em] text-bone-muted lg:flex">
          <a href="/#vectors" className="transition-colors hover:text-cyber-green">Threat Vectors</a>
          <a href="/#intensity" className="transition-colors hover:text-cyber-green">Mission Specs</a>
          <a href="/#launch" className="transition-colors hover:text-cyber-green">Squad Protocols</a>
        </nav>
        <div className="flex items-center gap-3">
          <Equalizer className="hidden h-4 sm:flex" paused={muted} />
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? 'Enable visualizer' : 'Pause visualizer'}
            className="hidden text-[11px] font-bold uppercase tracking-[0.14em] text-bone-muted transition-colors hover:text-cyber-green sm:block"
          >
            {muted ? 'VIZ:OFF' : 'VIZ:ON'}
          </button>
          <Link
            to="/launch"
            className="rounded border border-cyber-green bg-cyber-green/10 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.1em] text-cyber-green shadow-[0_0_16px_rgba(0,255,136,0.35)] transition-all hover:bg-cyber-green hover:text-obsidian hover:shadow-[0_0_28px_rgba(0,255,136,0.7)] sm:px-4"
          >
            Initialize
          </Link>
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="max-w-28 truncate whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-cyber-cyan transition-colors hover:text-cyber-green"
              title="Operative dossier"
            >
              <span className="text-cyber-green">&gt;</span> {user?.username}
            </Link>
          ) : (
            <Link
              to="/signin"
              className="whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-bone-muted transition-colors hover:text-cyber-green"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
