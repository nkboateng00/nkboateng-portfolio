import { motion } from 'framer-motion'

const sectionMotion = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
}

export default function About() {
  return (
    <motion.section id="about" className="px-5 py-24 sm:px-6" {...sectionMotion}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            About
          </p>
          <h2 className="font-heading text-4xl font-bold leading-tight text-black sm:text-5xl dark:text-white">
            About Me
          </h2>
        </div>

        <div className="border-l-2 border-accent pl-6 sm:pl-8">
          <p className="max-w-3xl text-lg leading-9 text-neutral-700 dark:text-neutral-300">
            I'm a BSc Computer Science student at Lancaster University Ghana with a focus
            on cybersecurity and software development. I build full-stack products that
            solve real problems for real people. My work ranges from campus
            management systems to AI-powered automation tools. I'm also a published
            researcher — my paper on agentic AI for SME automation was accepted at iCAD
            2026 at Anglia Ruskin University, Cambridge. I believe in writing clean code,
            shipping working products, and continuously pushing what's possible.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
