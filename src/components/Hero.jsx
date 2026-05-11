import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const { dark } = useTheme()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 opacity-50 ${
            dark ? 'bg-grid-dark' : 'bg-grid-light'
          }`}
        />
        {/* Gradient mask over grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/90 to-white dark:from-neutral-950/60 dark:via-neutral-950/90 dark:to-neutral-950" />

        {/* Floating orbs */}
        {/* Orbs: static blur, only opacity pulses — blur+transform together kills perf */}
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-sky-400/20 dark:bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[380px] h-[380px] rounded-full bg-sky-300/15 dark:bg-sky-600/10 blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-32 text-center">
        <motion.div variants={container} initial="hidden" animate="show" style={{ willChange: 'opacity, transform' }}>
          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 text-sky-600 dark:text-sky-400 text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.05] mb-5"
          >
            Nana Kwame
            <br />
            <span className="text-sky-500">Boateng</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={fadeUp}
            className="font-heading font-semibold text-lg md:text-xl text-neutral-500 dark:text-neutral-400 mb-5 tracking-wide"
          >
            Software Developer
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10"
          >
            Building thoughtful digital experiences from Accra, Ghana —
            where curiosity meets clean code.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-medium text-sm transition-colors duration-200 shadow-lg shadow-sky-500/25 w-full sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-sm transition-colors duration-200 w-full sm:w-auto"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Location strip */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex items-center justify-center gap-3 text-neutral-400 dark:text-neutral-600 text-xs tracking-widest uppercase"
          >
            <span>Accra, Ghana</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span>Lancaster University Ghana</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-neutral-400 dark:from-neutral-600 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
