import { Schema, model } from 'mongoose'

//registered operative — owns scores, best badge, and play history.
//passwordHash is select:false so it NEVER leaves the DB unless explicitly selected.
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [1, 'Username is required'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      match: [/^[A-Za-z0-9_.-]+$/, 'Username may only contain letters, numbers, _, . and -'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is invalid'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false,
    },
    bestScore: {
      type: Number,
      default: 0,
      min: [0, 'Best score cannot be negative'],
    },
    badge: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true, versionKey: false, strict: 'throw' }
)

//public projection — the ONLY shape ever returned by the API.
export function toPublicUser(u) {
  if (!u) return null
  return {
    _id: String(u._id),
    username: u.username,
    email: u.email,
    bestScore: u.bestScore || 0,
    badge: u.badge || '',
    createdAt: u.createdAt,
  }
}

export const userModel = model('user', userSchema)
