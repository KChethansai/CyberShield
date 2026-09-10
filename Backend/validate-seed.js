// Standalone seed validator — no DB needed. Run: node validate-seed.js
// Checks: 50/50/50/50 counts, even difficulty spread, valid correctAnswerIndex
// bounds, exact + near-duplicate prompts within each category.
import {
  ORIGINAL_QUESTIONS,
  EXTRA_PHISHING,
  EXTRA_PASSWORD,
  EXTRA_QR,
  EXTRA_SCAM,
} from './questions-data.js'

const CATEGORIES = ['phishing', 'password', 'qr', 'scam']
const byCategory = {
  phishing: [...ORIGINAL_QUESTIONS.filter((q) => q.category === 'phishing'), ...EXTRA_PHISHING],
  password: [...ORIGINAL_QUESTIONS.filter((q) => q.category === 'password'), ...EXTRA_PASSWORD],
  qr: [...ORIGINAL_QUESTIONS.filter((q) => q.category === 'qr'), ...EXTRA_QR],
  scam: [...ORIGINAL_QUESTIONS.filter((q) => q.category === 'scam'), ...EXTRA_SCAM],
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9₹]/g, '')
// identity = prompt + options (same stem with different option sets is legitimate variety)
const identity = (q) => norm(q.prompt) + '||' + q.options.map(norm).join('|')
let failures = 0
const fail = (msg) => { failures += 1; console.error('FAIL:', msg) }

for (const cat of CATEGORIES) {
  const list = byCategory[cat]
  if (list.length !== 50) fail(`${cat}: expected 50, got ${list.length}`)
  const dist = { easy: 0, medium: 0, hard: 0 }
  const seen = new Map()
  for (const q of list) {
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) fail(`${cat}: bad difficulty ${q.difficulty}`)
    else dist[q.difficulty] += 1
    if (q.category !== cat) fail(`miscategorized question in ${cat}`)
    if (!Array.isArray(q.options) || q.options.length < 2) fail(`${cat}: <2 options: ${q.prompt.slice(0, 60)}`)
    if (!Number.isInteger(q.correctAnswerIndex) || q.correctAnswerIndex < 0 || q.correctAnswerIndex >= q.options.length) {
      fail(`${cat}: correctAnswerIndex ${q.correctAnswerIndex} out of bounds (options=${q.options.length}): ${q.prompt.slice(0, 60)}`)
    }
    if (!q.prompt || !q.explanation) fail(`${cat}: empty prompt/explanation`)
    const key = identity(q)
    if (seen.has(key)) fail(`${cat}: duplicate prompt: ${q.prompt.slice(0, 70)}`)
    seen.set(key, true)
    // near-duplicate: same first 40 normalized chars as another question
    for (const other of seen.keys()) {
      if (other !== key && other.slice(0, 40) === key.slice(0, 40)) {
        fail(`${cat}: near-duplicate opening 40 chars: ${q.prompt.slice(0, 70)}`)
        break
      }
    }
  }
  const vals = Object.values(dist)
  if (Math.max(...vals) - Math.min(...vals) > 2) fail(`${cat}: uneven difficulty ${JSON.stringify(dist)}`)
  console.log(`${cat}: total=${list.length} dist=${JSON.stringify(dist)}`)
}

// cross-category exact duplicates (same scam text filed under two categories)
const allKeys = new Map()
for (const cat of CATEGORIES) {
  for (const q of byCategory[cat]) {
    const key = identity(q)
    if (allKeys.has(key)) fail(`cross-category duplicate: ${cat} vs ${allKeys.get(key)}: ${q.prompt.slice(0, 70)}`)
    else allKeys.set(key, cat)
  }
}

const total = Object.values(byCategory).reduce((s, l) => s + l.length, 0)
console.log(`TOTAL: ${total}`)
if (failures > 0) { console.error(`${failures} FAILURE(S)`); process.exit(1) }
console.log('VALIDATION PASSED')
