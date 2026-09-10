import exp from 'express'
import { questionModel } from '../models/QuestionModel.js'

export const questionApp = exp.Router()

const CATEGORIES = ['phishing', 'password', 'qr', 'scam']

//get all questions grouped by category
questionApp.get('/', async (req, res, next) => {
  try {
    //fetch all questions
    const questions = await questionModel.find().lean()
    const grouped = Object.fromEntries(CATEGORIES.map((c) => [c, []]))
    for (const q of questions) {
      if (grouped[q.category]) grouped[q.category].push(q)
    }
    return res.status(200).json(grouped)
  } catch (err) {
    next(err)
  }
})

//get questions for one category
questionApp.get('/:category', async (req, res, next) => {
  const { category } = req.params
  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' })
  }
  try {
    //fetch questions by category
    const questions = await questionModel.find({ category }).lean()
    return res.status(200).json(questions)
  } catch (err) {
    next(err)
  }
})
