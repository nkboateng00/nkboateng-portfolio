import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

const projects = [
  {
    title: 'CampusFix',
    description:
      'A full-stack campus maintenance ticketing application built with Laravel 11 for Lancaster University Ghana. Students and staff can report issues, track ticket progress, receive OTP-secured access, and keep technicians updated through WhatsApp notifications and CSV-powered admin workflows.',
    impact:
      'Streamlining maintenance requests for staff and students at Lancaster University Ghana.',
    tags: ['Laravel', 'PHP', 'MySQL', 'WhatsApp API'],
    image: '/projects/campusfix.png',
    link: 'https://lugcampusfix.online',
    linkLabel: 'Visit site',
  },
  {
    title: 'IntelliLearn',
    description:
      'An educational platform for LUG students with past exam papers, AI explanations, quizzes, answer submissions, and a discussion-first learning flow. It gives students a cleaner way to find resources, revise faster, and learn with context.',
    impact: 'Giving LUG students smarter access to study resources.',
    tags: ['React', 'Node.js', 'Cloudflare R2'],
    image: '/projects/intellilearn.png',
    link: 'https://intellilearnlug.com',
    linkLabel: 'Visit site',
  },
  {
    title: 'De Keuken',
    description:
      'A polished restaurant website for De Keuken in Accra, built around a warm visual identity, live reservations, menu exploration, and WhatsApp Cloud API booking notifications for the team.',
    impact: 'Live for a real restaurant client in Accra.',
    tags: ['Next.js', 'WhatsApp Cloud API', 'Vercel', 'GA4'],
    image: '/projects/de-keuken.png',
    link: 'https://dekeukengh.com',
    linkLabel: 'Visit site',
  },
  {
    title: 'mNotify Points System',
    description:
      'An internal points and rewards system built for mNotify, a Ghanaian bulk messaging company. Features an admin dashboard, points distribution tracking, leaderboards, activity feed, user management, and live email tracking.',
    impact: 'Built for mNotify staff — live at pointing.mnotify.com',
    tags: ['Laravel', 'PHP', 'MySQL'],
    image: '/images/mnotify-points.png',
    link: 'https://pointing.mnotify.com',
    linkLabel: 'Visit site',
  },
]

const sectionMotion = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
}

function BrowserFrame({ project }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group block overflow-hidden rounded-b-2xl rounded-t-[1.35rem] border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-neutral-950 dark:shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
      aria-label={`Open ${project.title}`}
    >
      <div className="flex h-12 items-center gap-2 border-b border-black/10 bg-neutral-50 px-6 dark:border-white/10 dark:bg-neutral-900">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="bg-white p-4 dark:bg-neutral-950 sm:p-6">
        <img
          src={project.image}
          alt={`${project.title} website screenshot`}
          className="aspect-[16/9] w-full object-cover object-top transition duration-500 group-hover:scale-[1.015]"
          loading="lazy"
        />
      </div>
    </motion.a>
  )
}

function ProjectText({ project }) {
  return (
    <div className="flex max-w-xl flex-col justify-center">
      <h3 className="font-heading text-4xl font-semibold leading-tight text-black dark:text-white">
        {project.title}
      </h3>
      <p className="mt-6 text-lg font-medium leading-9 text-neutral-700 dark:text-neutral-300">
        {project.description}
      </p>
      <p className="mt-5 border-l-2 border-accent pl-4 text-sm font-bold italic leading-6 text-accent">
        {project.impact}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="border border-black/10 px-3 py-1.5 text-xs font-bold text-neutral-700 dark:border-white/10 dark:text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex w-fit items-center gap-1 border-b border-black pb-1 text-base font-bold text-black transition hover:border-accent hover:text-accent dark:border-white dark:text-white dark:hover:border-accent-dark dark:hover:text-accent-dark"
      >
        {project.linkLabel}
        <FiArrowUpRight size={17} />
      </a>
    </div>
  )
}

export default function Projects() {
  return (
    <motion.section id="projects" className="px-5 py-24 sm:px-6" {...sectionMotion}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Work
          </p>
          <h2 className="font-heading text-4xl font-bold leading-tight text-black sm:text-5xl dark:text-white">
            Projects
          </h2>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, index) => {
            const imageFirst = index % 2 === 0

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.24 }}
                transition={{ duration: 0.68, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-14 xl:gap-20"
              >
                <div className={imageFirst ? 'md:order-1' : 'md:order-2'}>
                  <BrowserFrame project={project} />
                </div>
                <div className={imageFirst ? 'md:order-2' : 'md:order-1'}>
                  <ProjectText project={project} />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
