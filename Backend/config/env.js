// env config: validates deployment-time backend configuration.
import { config } from 'dotenv'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.join(__dirname, '../.env') })

const requiredVars = ['DB_URL']

const missingVars = requiredVars.filter((key) => !process.env[key])

if (missingVars.length > 0) {
  throw new Error(`Missing required env vars: ${missingVars.join(', ')}`)
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  dbUrl: process.env.DB_URL,
  clientUrls: (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

export const isProduction = env.nodeEnv === 'production'
