import { FALLBACK_QUESTIONS } from '../utils/fallbackQuestions'

//base api url — trailing slashes stripped so `${BASE_URL}/path`
//never produces a double-slash (which Express would not route-match).
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '')

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    let message = `API error: ${res.status}`
    try {
      const body = await res.clone().json()
      if (body?.message) message = body.message
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

// mongo ObjectIds have no .toUpperCase and serialize unpredictably —
// normalize to strings once, at the client boundary.
const normalizeIds = (grouped) =>
  Object.fromEntries(
    Object.entries(grouped || {}).map(([cat, list]) => [
      cat,
      (list || []).map((q) => ({ ...q, _id: String(q._id) })),
    ])
  )

const LOCAL_LEADERBOARD_KEY = 'cybershield-local-leaderboard'

function getLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(LOCAL_LEADERBOARD_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

function saveLocalLeaderboard(entry) {
  try {
    const list = getLocalLeaderboard()
    list.push({ ...entry, _id: 'rec-' + Date.now() })
    list.sort((a, b) => b.totalScore - a.totalScore)
    localStorage.setItem(LOCAL_LEADERBOARD_KEY, JSON.stringify(list.slice(0, 20)))
  } catch {}
}

export const api = {
  getHealth: () => request('/api/health'),
  getQuestionsGrouped: async () => {
    try {
      const data = await request('/question-api')
      if (data && Object.keys(data).length > 0) return normalizeIds(data)
      return FALLBACK_QUESTIONS
    } catch {
      return FALLBACK_QUESTIONS
    }
  },
  getQuestionsByCategory: async (category) => {
    try {
      const list = await request(`/question-api/${category}`)
      return (list || []).map((q) => ({ ...q, _id: String(q._id) }))
    } catch {
      return FALLBACK_QUESTIONS[category] || []
    }
  },
  saveScore: async (score) => {
    saveLocalLeaderboard(score)
    try {
      return await request('/score-api', { method: 'POST', body: JSON.stringify(score) })
    } catch {
      return { ok: true, local: true }
    }
  },
  getLeaderboard: async () => {
    try {
      const data = await request('/score-api/leaderboard')
      if (Array.isArray(data)) return data
      return getLocalLeaderboard()
    } catch {
      return getLocalLeaderboard()
    }
  },
  getMyHistory: () => request('/score-api/mine'),
  register: (payload) =>
    request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  getMe: () => request('/api/auth/me'),
};

