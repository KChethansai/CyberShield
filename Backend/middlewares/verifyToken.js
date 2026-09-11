import jwt from 'jsonwebtoken'
import { env, isProduction } from '../config/env.js'

//strict: rejects requests without a valid session cookie (401).
export function verifyToken(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return res.status(401).json({ message: 'Authentication required' })
  try {
    const payload = jwt.verify(token, env.secretKey)
    req.userId = payload.sub
    next()
  } catch {
    return res.status(401).json({ message: 'Session expired — please sign in again' })
  }
}

//optional: attaches req.userId when a valid cookie exists, otherwise null.
//lets score submission work for guests AND authenticated operatives.
export function optionalAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  req.userId = null
  if (token) {
    try {
      req.userId = jwt.verify(token, env.secretKey).sub
    } catch {
      // invalid/expired cookie on an optional route — treat as guest, not an error
    }
  }
  next()
}

export const COOKIE_NAME = 'cybershield_token'

export function sessionCookieOptions() {
  // frontend and backend live on different hosts in production (cross-site),
  // so the session cookie needs SameSite=None + Secure or browsers drop it.
  // localhost dev stays Lax + non-secure (plain http).
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  }
}
