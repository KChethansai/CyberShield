import exp from 'express'
import { scoreModel } from '../models/ScoreModel.js'

export const scoreApp = exp.Router()

// Simple in-memory rate limiter: max 10 score submissions per IP per 15 minutes.
const WINDOW_MS = 15 * 60 * 1000
const MAX_SUBMISSIONS = 10
const submissionLog = new Map()

function scoreRateLimit(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  const now = Date.now()
  const record = submissionLog.get(ip) || { count: 0, windowStart: now }

  if (now - record.windowStart > WINDOW_MS) {
    // Window expired — reset
    record.count = 1
    record.windowStart = now
  } else {
    record.count += 1
  }
  submissionLog.set(ip, record)

  if (record.count > MAX_SUBMISSIONS) {
    return res.status(429).json({ message: 'Too many score submissions — try again later' })
  }
  next()
}

//get leaderboard — top 10 scores, descending
//NOTE: defined before POST / so /leaderboard isn't treated as a param.
scoreApp.get('/leaderboard', async (req, res, next) => {
  try {
    //fetch top scores sorted by highest first
    const top = await scoreModel.find().sort({ totalScore: -1 }).limit(10).lean()
    return res.status(200).json(top)
  } catch (err) {
    next(err)
  }
})

//get aggregate telemetry analytics
scoreApp.get('/analytics', async (req, res, next) => {
  try {
    const scores = await scoreModel
      .find({}, 'totalScore badge categoryBreakdown')
      .lean()

    const totalMissions = scores.length
    const totalPoints = scores.reduce((sum, s) => sum + (s.totalScore || 0), 0)
    const highestScore = scores.reduce(
      (max, s) => Math.max(max, s.totalScore || 0),
      0
    )
    const averageScore = totalMissions > 0 ? Math.round(totalPoints / totalMissions) : 0

    const badgeDistribution = {}
    const missRateBySector = { phishing: 0, password: 0, qr: 0, scam: 0 }

    for (const s of scores) {
      if (s.badge) {
        badgeDistribution[s.badge] = (badgeDistribution[s.badge] || 0) + 1
      }
      if (s.categoryBreakdown) {
        for (const [cat, counts] of Object.entries(s.categoryBreakdown)) {
          if (missRateBySector[cat] !== undefined && counts.incorrect) {
            missRateBySector[cat] += counts.incorrect
          }
        }
      }
    }

    return res.status(200).json({
      totalMissions,
      averageScore,
      highestScore,
      badgeDistribution,
      totalMissesBySector: missRateBySector
    })
  } catch (err) {
    next(err)
  }
})

//save a completed game score
scoreApp.post('/', scoreRateLimit, async (req, res, next) => {
  try {
    const { playerName, totalScore, categoryBreakdown, badge } = req.body

    if (typeof playerName !== 'string' || playerName.trim().length === 0) {
      return res.status(400).json({ message: 'playerName is required' })
    }
    if (playerName.trim().length > 30) {
      return res
        .status(400)
        .json({ message: 'playerName must be at most 30 characters' })
    }
    if (typeof totalScore !== 'number' || !Number.isFinite(totalScore) || totalScore < 0 || totalScore > 1000) {
      return res.status(400).json({ message: 'totalScore must be a number between 0 and 1000' })
    }
    if (
      categoryBreakdown !== undefined &&
      (typeof categoryBreakdown !== 'object' ||
        categoryBreakdown === null ||
        Array.isArray(categoryBreakdown))
    ) {
      return res
        .status(400)
        .json({ message: 'categoryBreakdown must be an object' })
    }
    if (badge !== undefined && typeof badge !== 'string') {
      return res.status(400).json({ message: 'badge must be a string' })
    }

    //save score
    const score = await scoreModel.create({
      playerName: playerName.trim(),
      totalScore,
      categoryBreakdown,
      badge
    })
    return res.status(201).json(score)
  } catch (err) {
    next(err)
  }
})

