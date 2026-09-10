import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const LINES = [
  'ESTABLISHING SECURE UPLINK…',
  'VERIFYING OPERATIVE CREDENTIALS…',
  'LOADING THREAT SCENARIOS…',
  'MISSION LIVE',
];

export default function BootSequence() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setLineIndex((i) => (i + 1) % LINES.length),
      550
    );
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="boot-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="boot-box brackets">
        <p className="hud-label">CYBERSHIELD // MISSION UPLINK</p>
        <p className="boot-line" key={lineIndex}>
          {LINES[lineIndex]}
        </p>
        <div className="progress-bar boot-bar">
          <div className="progress-fill boot-fill" />
        </div>
      </div>
    </motion.div>
  );
}
