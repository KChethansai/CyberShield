import exp from 'express'
import { scoreModel } from '../models/ScoreModel.js'

export const scoreApp = exp.Router()

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

//save a completed game score
scoreApp.post('/', async (req, res, next) => {
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
    if (typeof totalScore !== 'number' || !Number.isFinite(totalScore)) {
      return res.status(400).json({ message: 'totalScore must be a number' })
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
