// Shield/life icons: green filled active, crimson pulsing compromised.
export default function ShieldLives({ lives, max, size = 22 }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${lives} lives left`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined ${i < lives ? 'shield-active' : 'shield-lost'}`}
          style={{ fontSize: size }}
          aria-hidden="true"
        >
          shield
        </span>
      ))}
    </span>
  )
}
