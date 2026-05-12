import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = ['About', 'Projects', 'Research', 'Contact']

export default function Navbar({ introComplete = true }) {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-black/10 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-black/72'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
        <a
          href="#"
          aria-label="nkboateng home"
          data-brand-logo
          className={`font-brand text-[2.3rem] leading-none text-black transition duration-300 hover:text-accent dark:text-white dark:hover:text-accent-dark sm:text-[2.75rem] ${
            introComplete ? 'opacity-100' : 'opacity-0'
          }`}
        >
          nkboateng
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-semibold text-neutral-600 transition-colors hover:text-accent dark:text-neutral-300 dark:hover:text-accent-dark"
            >
              {link}
            </a>
          ))}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black transition hover:border-accent hover:text-accent dark:border-white/15 dark:bg-black dark:text-white dark:hover:border-accent-dark dark:hover:text-accent-dark"
          >
            {dark ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black dark:border-white/15 dark:bg-black dark:text-white"
          >
            {dark ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(value => !value)}
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black dark:border-white/15 dark:bg-black dark:text-white"
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-black/10 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-black/95 md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-5 py-4">
              {NAV_LINKS.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-sm font-semibold text-neutral-700 transition-colors hover:text-accent dark:text-neutral-200 dark:hover:text-accent-dark"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
