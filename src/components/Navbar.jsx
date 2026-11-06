import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { SOCIALS } from '../data/me'
import { useActiveSection, useMediaQuery, useScrolledPast } from '../lib/hooks'
import { EASE_DRAWER, EASE_OUT } from '../lib/motion'
import MagneticButton from './ui/MagneticButton'
import SiteLink from './ui/SiteLink'

const LINKS = [
  { id: 'work', label: 'Work', to: '/work' },
  { id: 'about', label: 'About', to: '/#about' },
  { id: 'contact', label: 'Contact', to: '#contact' },
]
const IDS = LINKS.map(l => l.id)
const EMPTY = []
const MENU = [{ id: 'top', label: 'Home', to: '/#top' }, ...LINKS]

// The drawer enters on the iOS sheet curve and leaves the way it came, faster.
// Its links follow it in, one after another, so the eye reads them top to bottom.
const drawer = {
  hidden: { x: '100%' },
  shown: {
    x: '0%',
    transition: { duration: 0.5, ease: EASE_DRAWER, staggerChildren: 0.05, delayChildren: 0.12 },
  },
  gone: { x: '100%', transition: { duration: 0.3, ease: EASE_OUT } },
}
const item = {
  hidden: { x: 48, opacity: 0 },
  shown: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
  gone: { opacity: 1 },
}

function Logo() {
  const trackRef = useRef(null)
  const codeRef = useRef(null)

  // The slide distance is the rendered width of "Code by ", re-measured when the
  // webfont swaps in or the text resizes.
  useLayoutEffect(() => {
    const track = trackRef.current
    const code = codeRef.current
    const measure = () => track.style.setProperty('--shift', `${code.getBoundingClientRect().width}px`)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(code)
    return () => ro.disconnect()
  }, [])

  return (
    <SiteLink to="/#top" aria-label="nkboateng, home" className="logo -ml-1 px-1 py-2 text-[1.0625rem] font-medium">
      <span aria-hidden="true" className="logo-c">
        ©
      </span>
      <span className="logo-clip">
        <span ref={trackRef} className="logo-track">
          <span ref={codeRef} className="logo-code pr-[0.28em]">
            Code by
          </span>
          <span>nk</span>
          <span className="logo-rest">boateng</span>
        </span>
      </span>
    </SiteLink>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const section = useActiveSection(pathname === '/' ? IDS : EMPTY)
  // On the work page, "Work" is where you are; at home, follow the section in view.
  const active = pathname.startsWith('/work') ? 'work' : section
  const wide = useMediaQuery('(min-width: 768px)')
  const touch = useMediaQuery('(pointer: coarse)')
  const past = useScrolledPast(160)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const firstLinkRef = useRef(null)

  // The round button replaces the inline nav once it has scrolled away (always, on phones).
  const showButton = open || past || !wide

  useEffect(() => {
    if (!open) return
    firstLinkRef.current?.focus()
    const onKey = e => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>

      {/* Sits on the hero and scrolls away with it. */}
      <header className="absolute inset-x-0 top-0 z-30">
        <nav aria-label="Primary" className="page flex items-center justify-between py-7 text-ink">
          <Logo />
          <ul className="hidden items-center gap-2 md:flex">
            {LINKS.map(link => (
              <li key={link.id}>
                <SiteLink
                  to={link.to}
                  className="nav-link text-[1.0625rem]"
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div
        className={`fixed right-4 top-4 z-[60] transition-[transform,opacity] duration-300 ease-out sm:right-7 sm:top-7 ${
          showButton ? 'scale-100 opacity-100' : 'pointer-events-none scale-[0.85] opacity-0'
        }`}
      >
        <MagneticButton>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            tabIndex={showButton ? undefined : -1}
            className={`btn-round glass h-14 w-14 ring-1 ring-paper/15 sm:h-[4.5rem] sm:w-[4.5rem] ${open ? '!bg-accent' : ''}`}
          >
            {/* Two bars that cross into an X. */}
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-200 ease-out ${
                  open ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-200 ease-out ${
                  open ? 'top-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </MagneticButton>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              key="scrim"
              type="button"
              tabIndex={-1}
              aria-label="Close menu"
              className="fixed inset-0 z-50 cursor-default bg-night/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE_OUT } }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              id="site-menu"
              aria-label="Menu"
              className="on-dark fixed inset-y-0 right-0 z-50 flex w-full touch-pan-y flex-col justify-between bg-ink px-8 pb-10 pt-32 sm:w-[30rem] sm:px-14"
              variants={drawer}
              initial="hidden"
              animate="shown"
              exit="gone"
              // Touch: swipe it back out to the right. A quick flick is enough;
              // the exit picks up from wherever the finger let go.
              drag={touch ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.04, right: 0.9 }}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x > 110 || info.velocity.x > 450) setOpen(false)
              }}
            >
              <div>
                <motion.p variants={item} className="label border-b border-paper/15 pb-6">
                  Navigation
                </motion.p>
                <ul className="mt-8 space-y-1">
                  {MENU.map((link, i) => (
                    <motion.li key={link.id} variants={item}>
                      <SiteLink
                        ref={i === 0 ? firstLinkRef : undefined}
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className="press group flex items-center gap-5 py-1 text-[clamp(2.5rem,6vw,3.5rem)] font-medium leading-tight tracking-[-0.035em]"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-2.5 w-2.5 rounded-full bg-paper transition-[transform,opacity] duration-200 ease-out ${
                            active === link.id ? 'scale-100 opacity-100' : 'scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                          }`}
                        />
                        {link.label}
                      </SiteLink>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div variants={item}>
                <p className="label">Socials</p>
                <ul className="mt-4 flex gap-6">
                  {SOCIALS.map(s => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="press">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
