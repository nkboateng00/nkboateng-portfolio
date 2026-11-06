import { useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { finePointer, follow } from '../../lib/motion'

// The wrapper drifts toward the pointer on a spring; the button inside keeps
// its own instant press scale. Fine pointers only, never with reduced motion.
export default function MagneticButton({ children, strength = 0.3, max = 18, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, follow)
  const y = useSpring(0, follow)

  const onPointerMove = e => {
    if (reduce || !finePointer() || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const clamp = v => Math.max(-max, Math.min(max, v * strength))
    x.set(clamp(e.clientX - (r.left + r.width / 2)))
    y.set(clamp(e.clientY - (r.top + r.height / 2)))
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
