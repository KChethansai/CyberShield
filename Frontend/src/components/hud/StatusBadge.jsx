const COLORS = {
  green: 'border-cyber-green/50 bg-cyber-green/10 text-cyber-green',
  cyan: 'border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan',
  crimson: 'border-alert/50 bg-alert/10 text-alert',
  amber: 'border-threat-amber/50 bg-threat-amber/10 text-threat-amber',
  gray: 'border-steel/60 bg-steel/10 text-bone-muted'
}
const DOTS = {
  green: 'bg-cyber-green',
  cyan: 'bg-cyber-cyan',
  crimson: 'bg-alert',
  amber: 'bg-threat-amber',
  gray: 'bg-steel-light'
}

// Monospace all-caps status chip with micro dot prefix.
export default function StatusBadge({ color = 'green', pulse = false, className = '', children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ${COLORS[color]} ${className}`}>
      <span className={`h-1 w-1 rounded-full ${DOTS[color]} ${pulse ? 'animate-pulse' : ''}`} />
      {children}
    </span>
  )
}
