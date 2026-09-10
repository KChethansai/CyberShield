import { FALLBACK_QUESTIONS } from '../utils/fallbackQuestions'

//base api url
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

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
      if (data && Object.keys(data).length > 0) return data
      return FALLBACK_QUESTIONS
    } catch {
      return FALLBACK_QUESTIONS
    }
  },
  getQuestionsByCategory: async (category) => {
    try {
      return await request(`/question-api/${category}`)
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
};

