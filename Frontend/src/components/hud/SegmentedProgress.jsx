// Segmented progress bar: glowing green filled segments, dark bordered empties.
export default function SegmentedProgress({ total, filled, className = '' }) {
  const segs = Math.max(1, total)
  const on = Math.min(segs, Math.max(0, filled))
  return (
    <div className={`flex gap-1 ${className}`} role="progressbar" aria-valuenow={on} aria-valuemin={0} aria-valuemax={segs}>
      {Array.from({ length: segs }, (_, i) => (
        <span key={i} className={`seg ${i < on ? 'seg-fill' : 'seg-empty'}`} />
      ))}
    </div>
  )
}
