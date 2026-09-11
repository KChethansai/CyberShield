// security config: CORS allowlist derived from validated env.
// CLIENT_URL may hold one origin or several comma-separated ones.
// origins are compared slash-tolerantly (a trailing slash in env must not
// silently break production while localhost keeps working).
// additionally, all *.vercel.app preview/production deployments are trusted
// so branch previews never need an env change to reach the API.
import { env, isProduction } from './env.js'

const stripSlash = (s) => (s || '').replace(/\/+$/, '')
const VERCEL_RE = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i

export const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    const clean = stripSlash(origin)
    const allowed = env.clientUrls.map(stripSlash)
    const isLocalDev = !isProduction &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(clean)
    if (allowed.includes(clean) || VERCEL_RE.test(clean) || isLocalDev) {
      callback(null, true)
    } else {
      console.warn(`CORS rejected origin: ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  }
}
