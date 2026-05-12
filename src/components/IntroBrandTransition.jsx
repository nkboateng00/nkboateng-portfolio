import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function IntroBrandTransition({ onComplete }) {
  const brandRef = useRef(null)
  const [position, setPosition] = useState(null)
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    let dockTimer
    let handoffTimer
    let cancelled = false

    const getStartPosition = () => {
      const brand = brandRef.current

      if (!brand) return null

      return {
        x: (window.innerWidth - brand.offsetWidth) / 2,
        y: (window.innerHeight - brand.offsetHeight) / 2,
        scale: 1,
      }
    }

    const getDockPosition = () => {
      const logo = document.querySelector('[data-brand-logo]')
      const brand = brandRef.current

      if (!logo || !brand) return null

      const logoRect = logo.getBoundingClientRect()

      return {
        x: logoRect.left,
        y: logoRect.top,
        scale: logoRect.width / brand.offsetWidth,
      }
    }

    const resetToCenter = () => {
      const start = getStartPosition()

      if (start) setPosition(start)
    }

    const start = async () => {
      if (document.fonts?.ready) await document.fonts.ready
      if (cancelled) return

      resetToCenter()
      window.requestAnimationFrame(() => setVisible(true))

      dockTimer = window.setTimeout(() => {
        const dock = getDockPosition()

        if (!dock) return

        setPhase('dock')
        setPosition(dock)
        handoffTimer = window.setTimeout(onComplete, 1320)
      }, 1050)
    }

    start()
    window.addEventListener('resize', resetToCenter)

    return () => {
      cancelled = true
      window.removeEventListener('resize', resetToCenter)
      window.clearTimeout(dockTimer)
      window.clearTimeout(handoffTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-white dark:bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'dock' ? 0 : 1 }}
      transition={{ opacity: { delay: phase === 'dock' ? 1.02 : 0, duration: 0.28 } }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-grid-light opacity-55 dark:bg-grid-dark dark:opacity-35"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'dock' ? 0 : 0.55 }}
        transition={{ duration: 0.7 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 origin-top-left"
        initial={false}
        animate={{
          x: position?.x ?? 0,
          y: position?.y ?? 0,
          opacity: visible ? 1 : 0,
          scale: phase === 'dock' ? position?.scale ?? 1 : 1,
          filter: visible ? 'blur(0px)' : 'blur(16px)',
        }}
        transition={{
          opacity: { duration: 0.44, ease: 'easeOut' },
          scale: { duration: phase === 'dock' ? 0.95 : 0.64, ease: [0.22, 1, 0.36, 1] },
          x: { duration: phase === 'dock' ? 0.95 : 0, ease: [0.22, 1, 0.36, 1] },
          y: { duration: phase === 'dock' ? 0.95 : 0, ease: [0.22, 1, 0.36, 1] },
          filter: { duration: 0.52 },
        }}
      >
        <span
          ref={brandRef}
          className="block font-brand text-[clamp(5rem,16vw,11rem)] leading-none text-black dark:text-white"
        >
          nkboateng
        </span>
      </motion.div>
    </motion.div>
  )
}
