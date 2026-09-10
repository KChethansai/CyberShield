// Bracketed decision button with lettered index chip.
// state: default | correct | incorrect | dim
export default function DecisionOption({ letter, text, state = 'default', disabled, onClick }) {
  const isAlert = state === 'incorrect'
  const isCorrect = state === 'correct'
  const brCls = isAlert ? 'hud-bracket hud-bracket-alert' : 'hud-bracket'

  const styles = {
    default: 'border-steel/50 bg-terminal-card hover:border-cyber-green/60 hover:bg-cyber-green/5 text-bone hover:shadow-[0_0_16px_rgba(0,255,136,0.15)]',
    correct: 'pulse-green border-2 border-cyber-green bg-cyber-green/15 text-bone-bright shadow-[0_0_24px_rgba(0,255,136,0.4)]',
    incorrect: 'pulse-crimson border-2 border-alert bg-alert/15 text-bone-bright shadow-[0_0_24px_rgba(255,51,102,0.4)]',
    dim: 'border-steel/20 bg-pitch text-bone-dim opacity-50'
  }
  const chips = {
    default: 'border-steel/60 text-bone-muted bg-terminal-panel',
    correct: 'border-cyber-green bg-cyber-green text-obsidian font-black shadow-[0_0_10px_rgba(0,255,136,0.8)]',
    incorrect: 'border-alert bg-alert text-obsidian font-black shadow-[0_0_10px_rgba(255,51,102,0.8)]',
    dim: 'border-steel/30 text-bone-dim bg-pitch'
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bracket-wrap relative flex w-full items-center gap-3.5 rounded border px-4 py-3.5 text-left font-mono text-[13px] leading-snug transition-all duration-200 ${styles[state]} ${disabled && state === 'default' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {(isCorrect || isAlert) && (
        <>
          <span className={`${brCls} hud-bracket-tl`} aria-hidden="true" />
          <span className={`${brCls} hud-bracket-tr`} aria-hidden="true" />
          <span className={`${brCls} hud-bracket-bl`} aria-hidden="true" />
          <span className={`${brCls} hud-bracket-br`} aria-hidden="true" />
        </>
      )}
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border font-display text-sm font-bold tracking-wider ${chips[state]}`}>
        {state === 'correct' ? '✓' : state === 'incorrect' ? '✕' : letter}
      </span>
      <span className="flex-1 font-medium">{text}</span>
    </button>
  )
}

