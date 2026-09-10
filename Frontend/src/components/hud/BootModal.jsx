import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Equalizer from './Equalizer'
import SegmentedProgress from './SegmentedProgress'
import BracketPanel from './BracketPanel'

const LOG_LINES = [
  { text: '> SECURE HANDSHAKE ............ OK', color: 'text-cyber-green' },
  { text: '> OPERATIVE CREDENTIALS ....... VERIFIED', color: 'text-cyber-green' },
  { text: '> THREAT SCENARIO PACK ........ DECRYPTED', color: 'text-telemetry' },
  { text: '> NEURAL LINK ................. STABLE', color: 'text-telemetry' },
  { text: '> MISSION CLOCK ............... SYNCED', color: 'text-cyber-green' }
]

// Full-screen boot-up transition: equalizer + handshake log + segmented progress.
export default function BootModal({ open, authorizing, onAbort, onAuthorize }) {
  const [lines, setLines] = useState(0)
  useEffect(() => {
    if (!open) return
    setLines(0)
    const t = setInterval(() => {
      setLines((n) => {
        if (n >= LOG_LINES.length) {
          clearInterval(t)
          return n
        }
        return n + 1
      })
    }, 450)
    return () => clearInterval(t)
  }, [open ])

  if (!open) return null
  const ready = lines >= LOG_LINES.length
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-pitch/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BracketPanel elevated className="w-full max-w-lg p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-bone-muted">
          Cybershield // Mission Uplink
        </p>
        <div className="mt-4 flex h-12 items-end justify-center">
          <Equalizer className="h-12" paused={!open} />
        </div>
        <div className="mt-4 min-h-[110px] rounded-sm border border-cyber-green/20 bg-pitch p-3 text-[12px] leading-relaxed">
          {LOG_LINES.slice(0, lines).map((l, i) => (
            <p key={i} className={l.color}>{l.text}</p>
          ))}
          {!ready && <span className="terminal-cursor text-cyber-green" />}
        </div>
        <SegmentedProgress total={LOG_LINES.length} filled={lines} className="mt-4" />
        <div className="mt-5 flex gap-3">
          <button
            onClick={onAbort}
            disabled={authorizing}
            className="btn-hud btn-hud-alert flex-1 py-3 text-xs disabled:opacity-50"
          >
            Abort
          </button>
          <button
            onClick={onAuthorize}
            disabled={!ready || authorizing}
            className="btn-hud btn-hud-primary flex-1 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {authorizing ? 'Authorizing Uplink…' : 'Authorize Mission'}
          </button>
        </div>
      </BracketPanel>
    </motion.div>
  )
}
