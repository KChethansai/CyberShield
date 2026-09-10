// security config: CORS allowlist derived from validated env.
import { env } from './env.js'

export const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const isLocalDev = env.nodeEnv !== 'production' &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '')
    if (!origin || env.clientUrls.includes(origin) || isLocalDev) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
