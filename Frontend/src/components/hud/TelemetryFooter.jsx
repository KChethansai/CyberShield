import { useEffect, useMemo, useState } from 'react'

// Footer telemetry strip: packet ID, session ID, latency, gateway status.
export default function TelemetryFooter() {
  const sessionId = useMemo(() => Math.random().toString(16).slice(2, 8).toUpperCase(), [])
  const [latency, setLatency] = useState(24)
  useEffect(() => {
    const t = setInterval(() => setLatency(14 + Math.floor(Math.random() * 30)), 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <footer className="relative z-10 border-t border-cyber-green/20 bg-pitch/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-bone-dim">
        <span>PKT <span className="text-telemetry">#{(Math.floor(Math.random() * 0xffff) + 0x1000).toString(16).toUpperCase()}</span></span>
        <span>SES <span className="text-telemetry">{sessionId}</span></span>
        <span>LAT <span className="text-cyber-green">{latency}ms</span></span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse" />
          GTWY <span className="text-cyber-green">SECURE</span>
        </span>
      </div>
    </footer>
  )
}
