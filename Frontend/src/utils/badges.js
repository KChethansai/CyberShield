// Badge tiers mirror the 240-max bands (0-99 / 100-169 / 170-219 / 220+),
// scaled to the game's achievable max so filtered pools stay fair.
export const BADGES = {
  'Cyber Sentinel': 'expert — you think like a security analyst',
  Guardian: 'strong awareness — stay sharp',
  Aware: 'decent awareness — keep practicing',
  Novice: 'needs more practice — run it back'
}

export const BADGE_ICONS = {
  'Cyber Sentinel': '🏆',
  Guardian: '🛡️',
  Aware: '🔰',
  Novice: '🌱'
}

export const BADGE_CLASSES = {
  'Cyber Sentinel': 'badge-sentinel',
  Guardian: 'badge-guardian',
  Aware: 'badge-aware',
  Novice: 'badge-novice'
}

export const getBadge = (points, maxPoints) => {
  const ratio = maxPoints > 0 ? points / maxPoints : 0
  if (ratio >= 220 / 240) return 'Cyber Sentinel'
  if (ratio >= 170 / 240) return 'Guardian'
  if (ratio >= 100 / 240) return 'Aware'
  return 'Novice'
}
