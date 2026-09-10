import Equalizer from './Equalizer'

// Fixed top tactical telemetry strip.
export default function TelemetryStrip() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-cyber-green/20 bg-pitch/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-bone-dim">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-threat-amber animate-pulse" />
          DEFCON <span className="text-threat-amber">3</span>
        </span>
        <span className="hidden sm:inline">SYS.TICK <span className="text-telemetry">60Hz</span></span>
        <span className="hidden md:inline">SEC.CORE <span className="text-cyber-green">ONLINE</span></span>
        <span className="hidden sm:inline">NODE <span className="text-telemetry">VX-07</span></span>
        <span>LOC <span className="text-bone-muted">GRID 12.9N</span></span>
      </div>
    </div>
  )
}

export { Equalizer }
