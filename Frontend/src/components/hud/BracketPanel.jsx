// Corner-bracket wrapper: literal ┌ ┐ └ ┘ divs, green (or crimson for alert).
export default function BracketPanel({ alert = false, elevated = false, brackets = true, className = '', children }) {
  const box = alert ? 'tactical-box-alert' : elevated ? 'tactical-box-elevated' : ''
  const br = alert ? 'hud-bracket hud-bracket-alert' : 'hud-bracket'
  return (
    <div className={`bracket-wrap tactical-box ${box} ${className}`}>
      {brackets && (
        <>
          <span className={`${br} hud-bracket-tl`} aria-hidden="true" />
          <span className={`${br} hud-bracket-tr`} aria-hidden="true" />
          <span className={`${br} hud-bracket-bl`} aria-hidden="true" />
          <span className={`${br} hud-bracket-br`} aria-hidden="true" />
        </>
      )}
      {children}
    </div>
  )
}
