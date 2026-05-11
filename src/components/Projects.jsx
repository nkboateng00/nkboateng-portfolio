import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

const PROJECTS = [
  {
    type: 'Web App',
    name: 'CampusFix',
    description:
      'A campus maintenance ticketing system that streamlines issue reporting and resolution. Features OTP-based registration, automated WhatsApp notifications to technicians, and CSV import/export for admin workflows.',
    tags: ['Laravel', 'PHP', 'MySQL'],
  },
  {
    type: 'Platform',
    name: 'IntelliLearn',
    description:
      'An educational platform tailored for Lancaster University Ghana students — past exam papers, AI-powered explanations, quizzes, and discussion forums. Built with OTP auth and Cloudflare R2 for secure document storage.',
    tags: ['React', 'Node.js', 'Cloudflare'],
  },
  {
    type: 'Web App',
    name: 'De Keuken',
    description:
      'A restaurant website with a live reservation management system and real-time WhatsApp Cloud API notifications, keeping kitchen and front-of-house staff instantly informed of new bookings.',
    tags: ['Next.js', 'WhatsApp API', 'Vercel'],
  },
  {
    type: 'Publication',
    name: 'iCAD 2026 Research Paper',
    description:
      '"Reimagining SME Automation: Leveraging Agentic AI for Increased Productivity Among Local Businesses in Accra." Accepted at iCAD 2026 at Anglia Ruskin University, Cambridge.',
    tags: ['Research', 'Agentic AI', 'n8n'],
  },
]

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="group relative flex flex-col bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-sky-300/60 dark:hover:border-sky-800/60 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-[10px] font-semibold text-sky-500 uppercase tracking-widest">
            {project.type}
          </span>
          <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-neutral-50 mt-1 leading-tight">
            {project.name}
          </h3>
        </div>
        <div className="mt-1 w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-sky-500 group-hover:border-sky-300/60 dark:group-hover:border-sky-700/60 transition-all duration-200 shrink-0">
          <FiArrowUpRight size={14} />
        </div>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="projects"
      className="py-28 px-6 bg-neutral-50/60 dark:bg-neutral-900/20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sky-500 font-medium text-xs uppercase tracking-widest mb-3">
            Work
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 leading-tight">
            Selected <span className="text-sky-500">projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
