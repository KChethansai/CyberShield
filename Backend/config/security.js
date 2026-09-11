// security config: CORS allowlist derived from validated env.
// CLIENT_URL may hold one origin or several comma-separated ones.
// origins are compared slash-tolerantly (a trailing slash in env must not
// silently break production while localhost keeps working).
import { env, isProduction } from './env.js'

const stripSlash = (s) => (s || '').replace(/\/+$/, '')

export const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    const clean = stripSlash(origin)
    const allowed = env.clientUrls.map(stripSlash)
    const isLocalDev = !isProduction &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(clean)
    if (allowed.includes(clean) || isLocalDev) {
      callback(null, true)
    } else {
      console.warn(`CORS rejected origin: ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  }
}
