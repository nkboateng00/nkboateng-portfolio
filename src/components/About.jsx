import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const HIGHLIGHTS = [
  { label: 'Degree', value: 'BSc Computer Science' },
  { label: 'University', value: 'Lancaster University Ghana' },
  { label: 'Year', value: 'Year 2' },
  { label: 'Focus', value: 'Cybersecurity & Software Development' },
  { label: 'Location', value: 'Accra, Ghana' },
  { label: 'Published at', value: 'iCAD 2026 · Anglia Ruskin, Cambridge' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sky-500 font-medium text-xs uppercase tracking-widest mb-3">
            About
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 leading-tight max-w-xl">
            Turning ideas into{' '}
            <span className="text-sky-500">real software</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 text-neutral-600 dark:text-neutral-400 leading-relaxed text-[0.95rem]"
          >
            <p>
              I'm a Year 2 BSc Computer Science student at{' '}
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                Lancaster University Ghana
              </span>
              , with a focused interest in cybersecurity and full-stack software development.
            </p>
            <p>
              I build practical solutions for real problems — from campus maintenance systems
              to AI-powered educational platforms. My stack spans Laravel, React, Next.js,
              and Node.js, with a growing interest in agentic AI and workflow automation.
            </p>
            <p>
              My research on{' '}
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                SME automation using Agentic AI
              </span>{' '}
              was accepted at{' '}
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                iCAD 2026
              </span>{' '}
              at Anglia Ruskin University, Cambridge — exploring how local businesses in
              Accra can leverage AI for operational efficiency.
            </p>
            <p>
              When I'm not coding, I'm thinking about how technology can meaningfully
              shift outcomes for people in emerging markets.
            </p>
          </motion.div>

          {/* Highlight table */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className="flex items-center justify-between py-3.5 border-b border-neutral-100 dark:border-neutral-800/60 last:border-0"
              >
                <span className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                  {h.label}
                </span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 text-right ml-4">
                  {h.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
