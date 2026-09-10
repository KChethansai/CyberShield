import exp from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { env, isProduction } from './config/env.js'
import { corsOptions } from './config/security.js'
import { questionApp } from './APIs/QuestionAPI.js'
import { scoreApp } from './APIs/ScoreAPI.js'
import { authApp } from './APIs/AuthAPI.js'

const app = exp()

app.set('trust proxy', 1)
app.disable('x-powered-by')

// Configure CORS
app.use(cors(corsOptions))

// Parse JSON bodies
app.use(exp.json({ limit: '20kb' }))
app.use(cookieParser())

// API Routes
app.use('/question-api', questionApp)
app.use('/score-api', scoreApp)
app.use('/api/auth', authApp)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

// 404 handler
app.use((req, res) => {
  return res.status(404).json({ message: `path ${req.url} is invalid` })
})

// Global Error Handler
app.use((err, req, res, next) => {
  if (!isProduction) {
    console.error('Error Name:', err.name)
    console.error('Error Message:', err.message)
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid request data' })
  }
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'Origin not allowed' })
  }
  return res.status(500).json({ message: 'Internal server error' })
})

// Database Connection & Server Initialization
const connectDB = async () => {
  try {
    await connect(env.dbUrl, { family: 4 })
    console.log('DB connected')
    const server = app.listen(env.port, () => {
      console.log(`Server listening on ${env.port}`)
    })

    const gracefulShutdown = (signal) => {
      console.log(`${signal} received, shutting down`)
      server.close(() => process.exit(0))
      setTimeout(() => process.exit(1), 10_000).unref()
    }
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  } catch (err) {
    console.error('DB connection failed:', err.message)
    process.exit(1)
  }
}

connectDB()
