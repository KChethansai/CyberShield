export const CATEGORIES = ['phishing', 'password', 'qr', 'scam']

export const CATEGORY_LABELS = {
  phishing: 'Phishing Defense',
  password: 'Password Security',
  qr: 'QR Code Safety',
  scam: 'Scam Spotting'
}

export const POINTS_PER_CORRECT = 10
export const STARTING_LIVES = 3

// pool = which question difficulties load; lives override per mode.
export const DIFFICULTIES = {
  easy: { label: 'Easy', lives: 3, pool: ['easy', 'medium'] },
  normal: { label: 'Normal', lives: 3, pool: ['easy', 'medium', 'hard'] },
  hard: { label: 'Hard', lives: 2, pool: ['medium', 'hard'] }
}
