import exp from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userModel, toPublicUser } from '../models/UserModel.js'
import { env } from '../config/env.js'
import { COOKIE_NAME, sessionCookieOptions, verifyToken } from '../middlewares/verifyToken.js'

export const authApp = exp.Router()

//in-memory sliding-window limiter (same pattern as ScoreAPI — no new dependency).
//ponytail: resets on restart; Redis only if this ever runs multi-instance.
function makeRateLimit(windowMs, max) {
  const log = new Map()
  return (req, res, next) => {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown'
    const now = Date.now()
    const record = log.get(ip) || { count: 0, windowStart: now }
    if (now - record.windowStart > windowMs) {
      record.count = 1
      record.windowStart = now
    } else {
      record.count += 1
    }
    log.set(ip, record)
    if (record.count > max) {
      return res.status(429).json({ message: 'Too many attempts — try again later' })
    }
    next()
  }
}

const loginLimit = makeRateLimit(15 * 60 * 1000, 10)
const registerLimit = makeRateLimit(60 * 60 * 1000, 10)

const USERNAME_RE = /^[A-Za-z0-9_.-]{1,30}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function signSession(res, userId) {
  const token = jwt.sign({ sub: String(userId) }, env.jwtSecret, { expiresIn: '7d' })
  res.cookie(COOKIE_NAME, token, sessionCookieOptions())
}

//POST /api/auth/register — creates the account AND logs in (instant session).
authApp.post('/register', registerLimit, async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {}
    if (typeof username !== 'string' || !USERNAME_RE.test(username.trim())) {
      return res.status(400).json({ message: 'Username must be 1–30 chars: letters, numbers, _, . or -' })
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ message: 'Email format is invalid' })
    }
    if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }
    const cleanName = username.trim()
    const cleanEmail = email.trim().toLowerCase()
    if (await userModel.exists({ username: cleanName })) {
      return res.status(409).json({ message: 'Username is already taken' })
    }
    if (await userModel.exists({ email: cleanEmail })) {
      return res.status(409).json({ message: 'An account with this email already exists' })
    }
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await userModel.create({ username: cleanName, email: cleanEmail, passwordHash })
    signSession(res, user._id)
    return res.status(201).json({ user: toPublicUser(user) })
  } catch (err) {
    next(err)
  }
})

//POST /api/auth/login — generic message on failure (no user enumeration).
authApp.post('/login', loginLimit, async (req, res, next) => {
  try {
    const { identifier, password } = req.body || {}
    if (typeof identifier !== 'string' || identifier.trim().length === 0 || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const clean = identifier.trim()
    const user = await userModel
      .findOne({ $or: [{ username: clean }, { email: clean.toLowerCase() }] })
      .select('+passwordHash')
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    signSession(res, user._id)
    return res.status(200).json({ user: toPublicUser(user) })
  } catch (err) {
    next(err)
  }
})

//POST /api/auth/logout — clears the session cookie.
authApp.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  return res.status(200).json({ ok: true })
})

//GET /api/auth/me — restores the session on app load. Never includes the hash.
authApp.get('/me', verifyToken, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId).lean()
    if (!user) return res.status(401).json({ message: 'Authentication required' })
    return res.status(200).json({ user: toPublicUser(user) })
  } catch (err) {
    next(err)
  }
})
