import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

//strict: rejects requests without a valid session cookie (401).
export function verifyToken(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return res.status(401).json({ message: 'Authentication required' })
  try {
    const payload = jwt.verify(token, env.jwtSecret)
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
      req.userId = jwt.verify(token, env.jwtSecret).sub
    } catch {
      // invalid/expired cookie on an optional route — treat as guest, not an error
    }
  }
  next()
}

export const COOKIE_NAME = 'cybershield_token'

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  }
}
