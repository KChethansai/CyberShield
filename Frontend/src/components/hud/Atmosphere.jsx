// Fixed atmosphere layers: vignette + dot matrix (z-0), scanlines above content (z-40).
export default function Atmosphere() {
  return (
    <>
      <div className="fixed inset-0 z-0 tactical-vignette" aria-hidden="true" />
      <div className="fixed inset-0 z-0 cyber-matrix opacity-60" aria-hidden="true" />
      <div className="fixed inset-0 z-40 crt-overlay crt-scanlines" aria-hidden="true" />
    </>
  )
}
