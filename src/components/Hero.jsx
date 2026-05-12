import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiArrowDown, FiArrowRight, FiMail } from 'react-icons/fi'

const title = 'Software Developer. Researcher. Problem Solver.'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const [typedTitle, setTypedTitle] = useState('')

  useEffect(() => {
    let index = 0
    let direction = 1
    let interval
    let timeout

    const startTyping = () => {
      interval = window.setInterval(() => {
        index += direction
        setTypedTitle(title.slice(0, index))

        if (index === title.length) {
          direction = -1
          window.clearInterval(interval)
          timeout = window.setTimeout(startTyping, 1700)
        }

        if (index === 0 && direction === -1) {
          direction = 1
          window.clearInterval(interval)
          timeout = window.setTimeout(startTyping, 450)
        }
      }, 42)
    }

    timeout = window.setTimeout(startTyping, 520)

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  return (
    <section className="relative flex min-h-[82svh] items-start overflow-hidden px-5 pt-28 sm:px-6 sm:pt-32 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-grid-light opacity-70 dark:bg-grid-dark dark:opacity-45" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-white dark:to-black" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl pb-24"
      >
        <motion.h1
          variants={fadeUp}
          className="max-w-5xl font-heading text-5xl font-bold leading-[0.95] text-black sm:text-7xl lg:text-8xl dark:text-white"
        >
          Nana Kwame Boateng
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="mt-7 min-h-[4rem] max-w-4xl font-heading text-2xl font-semibold leading-tight text-accent sm:min-h-[2.75rem] sm:text-3xl lg:text-4xl"
          aria-label={title}
        >
          <span>{typedTitle}</span>
          <motion.span
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-1 inline-block h-7 w-0.5 translate-y-1 bg-accent sm:h-9"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700 sm:text-xl dark:text-neutral-300"
        >
          Building real software that solves real problems — designed with care and shipped
          with intent.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_50px_rgba(225,29,72,0.28)] transition hover:-translate-y-0.5 hover:bg-[#be123c]"
          >
            Explore Projects
            <FiArrowRight size={17} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border border-black px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:border-white dark:text-white dark:hover:border-accent-dark dark:hover:text-accent-dark"
          >
            <FiMail size={16} />
            Get In Touch
          </a>
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="#about"
          className="mx-auto mt-10 flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 transition hover:text-accent dark:text-neutral-400 dark:hover:text-accent-dark"
          aria-label="Scroll to About section"
        >
          <span className="relative flex h-16 w-6 items-start justify-center rounded-full border border-black/20 dark:border-white/25">
            <motion.span
              animate={{ y: [8, 38, 8], opacity: [1, 0.38, 1] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1 h-1.5 w-1.5 rounded-full bg-accent"
            />
          </span>
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiArrowDown size={14} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
