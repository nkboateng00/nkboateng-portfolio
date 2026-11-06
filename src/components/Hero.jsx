import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PORTRAIT, PROFILE } from '../data/me'
import { EASE_OUT } from '../lib/motion'
import { useMediaQuery } from '../lib/hooks'
import { Lines, Reveal } from './ui/Reveal'
import WordPortrait from './ui/WordPortrait'

/*
  Split portrait. `split` is how much of the head (from the left) is drawn in
  words; the rest is the photo.

  Mouse: the split glides after the cursor on a critically damped spring;
  moving toward a side gives that side more of the face.
  Touch: the edge is grabbed and tracks the finger 1:1 (from wherever it was
  grabbed). On release the flick's velocity is projected forward, the nearest
  resting point (words, half, photo) is chosen from where it *would* land, and
  the spring takes over at the finger's speed so there is no seam.
  Every animation starts from the live value, so any of it can be interrupted.
*/

const FOLLOW = { type: 'spring', bounce: 0, duration: 0.7 }
const SNAPS = [0, 0.5, 1]
const clamp01 = v => Math.min(1, Math.max(0, v))
// Apple's momentum projection (Designing Fluid Interfaces): where a flick would come to rest.
const project = (velocity, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate)

const DESIGN_TOKENS = [
  { text: 'Aa', className: 'left-[7%] top-[66%] text-[2.75rem] font-semibold' },
  { text: '#455CE9', className: 'left-[16%] top-[78%] text-[1.05rem]', swatch: true },
  { text: '8pt grid', className: 'left-[4%] top-[86%] text-[0.95rem]' },
  { text: 'kerning −2%', className: 'left-[22%] top-[90%] text-[0.95rem]' },
  { text: 'auto layout', className: 'left-[24%] top-[70%] text-[1.15rem] font-light' },
]
const CODE_TOKENS = [
  { text: '<html>', className: 'right-[22%] top-[66%] text-[1.1rem]' },
  { text: 'display: grid;', className: 'right-[5%] top-[71%] text-[1rem]' },
  { text: 'useState()', className: 'right-[15%] top-[79%] text-[1.4rem]' },
  { text: 'git push', className: 'right-[4%] top-[86%] text-[0.95rem]' },
  { text: '200 OK', className: 'right-[24%] top-[89%] text-[0.95rem]' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const sectionRef = useRef(null)
  const portraitRef = useRef(null)
  const touched = useRef(false)
  const drag = useRef(null)

  const split = useMotionValue(0.5)
  // The word layer is a clipping window that slides left while its content
  // slides right by the same amount: transforms only, no clip-path repaint.
  const coverX = useTransform(split, v => `${(v - 1) * 100}%`)
  const innerX = useTransform(split, v => `${(1 - v) * 100}%`)
  const designerOpacity = useTransform(split, [0, 0.5], [0.16, 1])
  const developerOpacity = useTransform(split, [0.5, 1], [1, 0.16])

  // Scrolling away: the portrait sinks slightly and the words drift up faster.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-35%'])

  // A one-time sweep after the entrance, to show the face can be split.
  useEffect(() => {
    if (reduce) return
    let live = true
    const step = to => (live && !touched.current ? animate(split, to, { type: 'spring', bounce: 0, duration: 0.9 }) : null)
    const t = window.setTimeout(async () => {
      await step(0.7)
      await step(0.32)
      await step(0.5)
    }, 1900)
    return () => {
      live = false
      window.clearTimeout(t)
    }
  }, [reduce, split])

  // --- Mouse: follow the cursor -------------------------------------------
  const onMouseMove = e => {
    if (e.pointerType !== 'mouse' || !fine) return
    touched.current = true
    const r = sectionRef.current.getBoundingClientRect()
    const p = (e.clientX - r.left) / r.width
    animate(split, clamp01(0.5 + (0.5 - p) * 1.7), FOLLOW)
  }
  const onMouseLeave = e => {
    if (e.pointerType === 'mouse') animate(split, 0.5, FOLLOW)
  }

  // --- Touch: drag the edge, flick to throw it -----------------------------
  const onDown = e => {
    if (e.pointerType === 'mouse') return
    touched.current = true
    split.stop() // grab it mid-flight
    drag.current = {
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      s0: split.get(),
      w: portraitRef.current.getBoundingClientRect().width,
      active: false,
      history: [{ x: e.clientX, t: e.timeStamp }],
    }
  }
  const onMove = e => {
    const d = drag.current
    if (!d || e.pointerId !== d.id) return
    const dx = e.clientX - d.x0
    if (!d.active) {
      // ~8px of hysteresis, then commit to horizontal or let the page scroll.
      if (Math.abs(dx) < 8 && Math.abs(e.clientY - d.y0) < 8) return
      if (Math.abs(e.clientY - d.y0) > Math.abs(dx)) {
        drag.current = null
        return
      }
      d.active = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    split.set(clamp01(d.s0 + dx / d.w))
    d.history.push({ x: e.clientX, t: e.timeStamp })
    while (d.history.length > 2 && e.timeStamp - d.history[0].t > 100) d.history.shift()
  }
  const onUp = e => {
    const d = drag.current
    drag.current = null
    if (!d?.active || e.pointerId !== d.id) return
    const a = d.history[0]
    const b = d.history[d.history.length - 1]
    const vPx = ((b.x - a.x) / Math.max(1, b.t - a.t)) * 1000
    const landing = split.get() + project(vPx) / d.w
    const target = SNAPS.reduce((best, s) => (Math.abs(s - landing) < Math.abs(best - landing) ? s : best))
    // A thrown edge may overshoot a touch; it carried momentum.
    animate(split, target, { type: 'spring', bounce: 0.18, duration: 0.5, velocity: vPx / d.w })
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onMouseMove}
      onPointerLeave={onMouseLeave}
      className="relative h-[100svh] min-h-[40rem] overflow-hidden bg-paper"
    >
      <h1 className="sr-only">
        {PROFILE.name}, freelance {PROFILE.role.toLowerCase()} in {PROFILE.city}, {PROFILE.country}
      </h1>

      {/* Faint working vocabulary of each side, behind the portrait. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none text-ink/[0.14] md:block">
        <motion.div style={{ opacity: designerOpacity }} className="absolute inset-0">
          {DESIGN_TOKENS.map((t, i) => (
            <Reveal key={t.text} delay={1100 + i * 90} className={`absolute flex items-center gap-2 ${t.className}`}>
              {t.swatch ? <span className="h-3 w-3 rounded-full bg-accent/60" /> : null}
              {t.text}
            </Reveal>
          ))}
        </motion.div>
        <motion.div style={{ opacity: developerOpacity }} className="absolute inset-0 font-mono">
          {CODE_TOKENS.map((t, i) => (
            <Reveal key={t.text} delay={1150 + i * 90} className={`absolute ${t.className}`}>
              {t.text}
            </Reveal>
          ))}
        </motion.div>
      </div>

      {/* Portrait */}
      <div className="absolute inset-0 flex items-end justify-center">
        <motion.div style={{ y: portraitY }} className="w-[min(132vw,36rem)] shrink-0 md:h-[72%] md:w-auto">
          <motion.div
            ref={portraitRef}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.1 }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="relative aspect-[680/620] w-full touch-pan-y select-none md:h-full md:w-auto"
          >
            <img
              src={PORTRAIT}
              alt=""
              width="680"
              height="620"
              fetchpriority="high"
              decoding="async"
              draggable="false"
              className="absolute inset-0 h-full w-full"
            />
            <motion.div style={{ x: coverX }} className="absolute inset-0 overflow-hidden bg-paper">
              <motion.div style={{ x: innerX }} className="absolute inset-0">
                <WordPortrait src={PORTRAIT} className="h-full w-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Labels */}
      <motion.div
        style={{ y: copyY }}
        className="page pointer-events-none absolute inset-x-0 top-[18%] z-10 flex flex-col gap-3 md:top-[31%] md:flex-row md:justify-between"
      >
        <motion.div style={{ opacity: designerOpacity }}>
          <Lines as="p" delay={250} className="text-hero">
            <span>designer</span>
          </Lines>
          <Reveal as="p" delay={650} className="mt-5 hidden max-w-[19rem] text-lead text-muted text-pretty sm:block">
            Designer crafting clean, considered interfaces and brands that feel right.
          </Reveal>
        </motion.div>
        <motion.div style={{ opacity: developerOpacity }} className="self-end md:self-auto">
          <Lines as="p" delay={380} className="text-hero">
            <span>
              <span className="font-light text-accent">&lt;</span>developer<span className="font-light text-accent">&gt;</span>
            </span>
          </Lines>
          <Reveal as="p" delay={780} className="mt-5 hidden max-w-[19rem] text-lead text-muted text-pretty sm:block">
            Developer who writes clean, fast and reliable code, from the first pixel to the server.
          </Reveal>
        </motion.div>
      </motion.div>

      {/* Corners */}
      <div className="page pointer-events-none absolute inset-x-0 bottom-0 hidden justify-between pb-8 text-[0.9375rem] text-muted md:flex">
        <Reveal delay={1300}>
          Freelance · {PROFILE.city}, {PROFILE.country}
        </Reveal>
        <Reveal delay={1400} className="flex items-center gap-2">
          {fine ? 'Move across my face' : 'Drag across my face'}
        </Reveal>
      </div>
    </section>
  )
}
