import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'

const inputClass =
  'w-full border border-black/10 bg-white px-4 py-3.5 text-sm font-medium text-black outline-none transition placeholder:text-neutral-400 focus:border-accent focus:ring-4 focus:ring-accent/10 dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-neutral-600'

const socials = [
  { label: 'GitHub', href: 'https://github.com/nkboateng00', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nkboateng', icon: FiLinkedin },
]

const sectionMotion = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
}

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="border-t border-black/10 bg-neutral-50 px-5 py-24 dark:border-white/10 dark:bg-neutral-950 sm:px-6"
      {...sectionMotion}
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Contact
          </p>
          <h2 className="font-heading text-4xl font-bold leading-tight text-black sm:text-5xl dark:text-white">
            Get In Touch
          </h2>
          <p className="mt-6 text-lg text-neutral-700 dark:text-neutral-300">
            I usually reply within 24 hours.
          </p>
          <a
            href="mailto:nkboateng0@icloud.com"
            className="mt-5 inline-flex items-center gap-2 text-base font-bold text-black transition hover:text-accent dark:text-white dark:hover:text-accent-dark"
          >
            <FiMail size={18} />
            nkboateng0@icloud.com
          </a>

          <div className="mt-8 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center border border-black/10 bg-white text-black transition hover:border-accent hover:bg-accent hover:text-white dark:border-white/10 dark:bg-black dark:text-white"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          action="https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT"
          method="POST"
          className="border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-black sm:p-7"
        >
          {/* Replace YOUR_FORMSPREE_ENDPOINT with Nana's Formspree form ID before going live. */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                Name
              </span>
              <input className={inputClass} type="text" name="name" required placeholder="Your name" />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                Email
              </span>
              <input className={inputClass} type="email" name="email" required placeholder="you@example.com" />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
              Message
            </span>
            <textarea
              className={`${inputClass} min-h-40 resize-y`}
              name="message"
              required
              placeholder="Tell me what you're building."
            />
          </label>

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#be123c]"
          >
            Submit
            <FiSend size={16} />
          </button>
        </motion.form>
      </div>
    </motion.section>
  )
}
