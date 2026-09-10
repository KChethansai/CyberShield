import { connect, disconnect } from 'mongoose'
import { questionModel } from './models/QuestionModel.js'
import { env } from './config/env.js'
import {
  ORIGINAL_QUESTIONS,
  EXTRA_PHISHING,
  EXTRA_PASSWORD,
  EXTRA_QR,
  EXTRA_SCAM,
} from './questions-data.js'

// 200 questions, 50 per category. Inserted in one batch per category so a
// failure is isolated to that category's batch instead of losing everything.
const BATCHES = {
  phishing: [...ORIGINAL_QUESTIONS.filter((q) => q.category === 'phishing'), ...EXTRA_PHISHING],
  password: [...ORIGINAL_QUESTIONS.filter((q) => q.category === 'password'), ...EXTRA_PASSWORD],
  qr: [...ORIGINAL_QUESTIONS.filter((q) => q.category === 'qr'), ...EXTRA_QR],
  scam: [...ORIGINAL_QUESTIONS.filter((q) => q.category === 'scam'), ...EXTRA_SCAM],
}

async function seed() {
  await connect(env.dbUrl)
  await questionModel.deleteMany({})
  const counts = {}
  for (const [category, batch] of Object.entries(BATCHES)) {
    if (batch.length > 0) await questionModel.insertMany(batch)
    counts[category] = { total: batch.length, easy: 0, medium: 0, hard: 0 }
    for (const q of batch) counts[category][q.difficulty] += 1
  }
  console.log(`Seeded ${Object.values(counts).reduce((s, c) => s + c.total, 0)} questions:`, JSON.stringify(counts))
  await disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
