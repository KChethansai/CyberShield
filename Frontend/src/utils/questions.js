import { CATEGORIES, DIFFICULTIES } from './gameConstants'

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
