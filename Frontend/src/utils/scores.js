import { CATEGORIES, POINTS_PER_CORRECT } from './gameConstants'

export const getMaxPoints = (questions) => {
  return (
    CATEGORIES.reduce((sum, cat) => sum + (questions[cat]?.length || 0), 0) *
    POINTS_PER_CORRECT
  )
}

// { phishing: { correct, incorrect }, ... } — also the POST /score-api shape.
export const getCategoryBreakdown = (answeredQuestions) => {
  const breakdown = Object.fromEntries(
    CATEGORIES.map((cat) => [cat, { correct: 0, incorrect: 0 }])
  )
  for (const a of answeredQuestions) {
    if (!breakdown[a.category]) continue
    if (a.correct) breakdown[a.category].correct += 1
    else breakdown[a.category].incorrect += 1
  }
  return breakdown
}

export const getWeakestCategory = (breakdown) => {
  let weakest = null
  for (const cat of CATEGORIES) {
    if (!weakest || breakdown[cat].incorrect > breakdown[weakest].incorrect) {
      weakest = cat
    }
  }
  return weakest
}

// Mistakes for the debrief review list (non-trivial filter kept out of components).
export const getMistakes = (answeredQuestions) =>
  (answeredQuestions || []).filter((a) => !a.correct)

const BEST_KEY = 'cybershield-best'

export const getBestScore = (storage = globalThis.localStorage) => {
  try {
    return Number(storage?.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

export const saveBestScore = (points, storage = globalThis.localStorage) => {
  try {
    if (points > getBestScore(storage)) {
      storage?.setItem(BEST_KEY, String(points))
      return true
    }
  } catch {
    // storage unavailable (private mode etc.) — non-fatal
  }
  return false
}
