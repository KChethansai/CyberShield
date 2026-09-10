// Mini live audio equalizer (4 bars).
export default function Equalizer({ className = 'h-4', paused = false }) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      <span className="eq-bar eq-bar-1 h-full" style={paused ? { animationPlayState: 'paused' } : undefined} />
      <span className="eq-bar eq-bar-2 h-full" style={paused ? { animationPlayState: 'paused' } : undefined} />
      <span className="eq-bar eq-bar-3 h-full" style={paused ? { animationPlayState: 'paused' } : undefined} />
      <span className="eq-bar eq-bar-4 h-full" style={paused ? { animationPlayState: 'paused' } : undefined} />
    </div>
  )
}
