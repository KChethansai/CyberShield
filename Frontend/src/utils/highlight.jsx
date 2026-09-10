// Wraps suspicious tokens (URLs, emails, domains, amounts, codes) in bordered tags.
const TOKEN_RE = /(https?:\/\/\S+|www\.\S+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|\b(?:[A-Za-z0-9-]+\.)+(?:xyz|ly|in|com|net|org|app|io|co)\S*|₹[\d,]+|\b\d{4,6}\b|"[^"]{2,60}")/g

export function highlightTerms(text) {
  if (!text) return text
  const parts = String(text).split(TOKEN_RE)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <span key={i} className="inspect-term">{part}</span>
      : <span key={i}>{part}</span>
  )
}
