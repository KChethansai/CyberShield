import { CATEGORIES, DIFFICULTIES, QUESTIONS_PER_CATEGORY } from './gameConstants'

// Keep only questions whose difficulty is in the mode's pool.
export const filterByDifficulty = (grouped, level) => {
  const pool = DIFFICULTIES[level]?.pool || DIFFICULTIES.normal.pool
  return Object.fromEntries(
    CATEGORIES.map((cat) => [
      cat,
      (grouped[cat] || []).filter((q) => pool.includes(q.difficulty))
    ])
  )
}

// Random subset per category so a run stays session-sized. No repeats within
// a run (slice after shuffle). // ponytail: unseeded Math.random — add a
// seeded RNG only if reproducible question sets ever matter.
export const selectSubset = (grouped, n = QUESTIONS_PER_CATEGORY) => {
  return Object.fromEntries(
    CATEGORIES.map((cat) => {
      const list = [...(grouped[cat] || [])]
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[list[i], list[j]] = [list[j], list[i]]
      }
      return [cat, list.slice(0, n)]
    })
  )
}
