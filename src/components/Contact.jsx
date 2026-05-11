import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/nkboateng',
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/nkboateng',
    icon: FiLinkedin,
  },
  {
    label: 'Email',
    href: 'mailto:lovkwame05@gmail.com',
    icon: FiMail,
  },
]

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 dark:focus:border-sky-600 transition-colors duration-200'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const { name, email, message } = form
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )
    window.location.href = `mailto:lovkwame05@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sky-500 font-medium text-xs uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 leading-tight">
            Let's <span className="text-sky-500">connect</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: copy + socials */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[0.95rem]">
              I'm always open to interesting conversations, collaboration
              opportunities, or just a friendly hello. Whether it's a project
              idea, research topic, or internship opportunity — reach out.
            </p>

            <div className="flex flex-wrap gap-3">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-sky-300 dark:hover:border-sky-700 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200 text-sm font-medium"
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-medium text-sm transition-colors duration-200 shadow-lg shadow-sky-500/20"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
