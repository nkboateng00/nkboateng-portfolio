import { motion } from 'framer-motion'
import { FiAward, FiCalendar, FiMapPin } from 'react-icons/fi'

const sectionMotion = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
}

export default function Research() {
  return (
    <motion.section
      id="research"
      className="border-y border-black/10 bg-neutral-50 px-5 py-24 dark:border-white/10 dark:bg-neutral-950 sm:px-6"
      {...sectionMotion}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Research
          </p>
          <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>

        <motion.div
          whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="tilt-card border border-black bg-white p-6 shadow-[10px_10px_0_#e11d48] dark:border-white dark:bg-black sm:p-10 lg:p-12"
        >
          <div className="mb-8 inline-flex items-center gap-2 bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
            <FiAward size={14} />
            Published Research · iCAD 2026
          </div>

          <h2 className="max-w-4xl font-heading text-3xl font-bold leading-tight text-black sm:text-5xl dark:text-white">
            Reimagining SME Automation: Leveraging Agentic AI for Increased Productivity
            Among Local Businesses in Accra
          </h2>

          <div className="mt-9 grid gap-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300 sm:grid-cols-2">
            <div className="flex items-start gap-3 border-t border-black/10 pt-4 dark:border-white/10">
              <FiMapPin className="mt-0.5 text-accent" size={18} />
              <span>iCAD 2026 — Anglia Ruskin University, Cambridge, UK</span>
            </div>
            <div className="flex items-start gap-3 border-t border-black/10 pt-4 dark:border-white/10">
              <FiCalendar className="mt-0.5 text-accent" size={18} />
              <span>June 17–19, 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
