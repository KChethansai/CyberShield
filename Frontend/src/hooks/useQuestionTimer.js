import { useEffect, useRef, useState } from 'react'

// Per-question countdown. Resets when resetKey changes; pauses when paused.
// Fires onExpire exactly once per question.
export const QUESTION_TIME_LIMIT = 30

export function useQuestionTimer(resetKey, { paused, onExpire }) {
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_TIME_LIMIT)
  const firedRef = useRef(false)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    setSecondsLeft(QUESTION_TIME_LIMIT)
    firedRef.current = false
  }, [resetKey])

  useEffect(() => {
    if (paused) return
    if (secondsLeft <= 0) {
      if (!firedRef.current) {
        firedRef.current = true
        onExpireRef.current?.()
      }
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft, paused])

  return secondsLeft
}

export const formatClock = (totalSeconds) => {
  const s = Math.max(0, totalSeconds)
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}
