import { useEffect, useState } from 'react'
import { EMAIL, PROFILE, SOCIALS } from '../data/me'
import MagneticButton from './ui/MagneticButton'
import { Lines, Reveal } from './ui/Reveal'

// Set VITE_FORMSPREE_ENDPOINT (e.g. https://formspree.io/f/abcd1234) in .env to
// receive messages directly. Without it, Send opens the visitor's email app instead.
const RAW_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT
const ENDPOINT = RAW_ENDPOINT && !RAW_ENDPOINT.includes('YOUR_FORM_ID') ? RAW_ENDPOINT : null

const FIELDS = [
  { name: 'name', label: 'What’s your name?', placeholder: 'Ama Mensah *', required: true, autoComplete: 'name' },
  {
    name: 'email',
    type: 'email',
    inputMode: 'email',
    label: 'What’s your email?',
    placeholder: 'ama@brand.com *',
    required: true,
    autoComplete: 'email',
  },
  { name: 'company', label: 'What’s the name of your brand or company?', placeholder: 'Your brand', autoComplete: 'organization' },
  { name: 'services', label: 'What are you looking for?', placeholder: 'Website, web app, automation…' },
  { name: 'message', label: 'Your message', placeholder: 'Hi NK, can you help me with… *', required: true, textarea: true },
]

function mailtoHref(d) {
  const body = [
    d.message,
    '',
    `${d.name}${d.company ? `, ${d.company}` : ''}`,
    d.email,
    d.services ? `Looking for: ${d.services}` : null,
  ]
    .filter(line => line !== null)
    .join('\r\n')
  return `mailto:${EMAIL}?subject=${encodeURIComponent(`New project · ${d.company || d.name}`)}&body=${encodeURIComponent(body)}`
}

function useLocalTime(timeZone) {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone, timeZoneName: 'short' }).format(
      new Date(),
    )
  const [time, setTime] = useState(format)
  useEffect(() => {
    const t = window.setInterval(() => setTime(format()), 15000)
    return () => window.clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone])
  return time
}

function Form() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [name, setName] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setName(String(data.name).trim().split(' ')[0])
    if (!ENDPOINT) {
      window.location.href = mailtoHref(data)
      setStatus('mailto')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent' || status === 'mailto') {
    return (
      <div role="status" className="border-t border-paper/15 pt-10">
        <p className="text-statement">
          {status === 'sent' ? `Thanks${name ? `, ${name}` : ''}. I’ll reply within a day.` : 'Your email app should now be open.'}
        </p>
        <p className="mt-4 max-w-md text-muted">
          {status === 'sent' ? (
            'Your message is in my inbox.'
          ) : (
            <>
              Just press send. If nothing opened, write to{' '}
              <a href={`mailto:${EMAIL}`} className="text-paper underline underline-offset-4">
                {EMAIL}
              </a>
              .
            </>
          )}
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="press mt-8 text-muted underline underline-offset-4">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      {FIELDS.map((f, i) => {
        const { label, textarea, ...input } = f
        const Tag = textarea ? 'textarea' : 'input'
        return (
          <Reveal
            as="label"
            key={f.name}
            delay={i * 60}
            className="grid grid-cols-[2.75rem_1fr] border-t border-paper/15 pb-6 pt-8 transition-colors duration-200 focus-within:border-paper/60 sm:grid-cols-[4.5rem_1fr]"
          >
            <span className="label pt-2 tabular-nums">0{i + 1}</span>
            <span>
              <span className="block text-[1.375rem] font-medium tracking-[-0.02em]">{label}</span>
              <Tag {...input} rows={textarea ? 4 : undefined} className={`field ${textarea ? 'resize-y' : ''}`} />
            </span>
          </Reveal>
        )
      })}

      <div className="relative border-t border-paper/15">
        {status === 'error' ? (
          <p role="alert" className="pt-6 text-[#ff8a8a]">
            That didn’t send. Please try again, or email {EMAIL}.
          </p>
        ) : null}
        {/* Sits across the closing rule, like a seal on the form. */}
        <div className="-mt-[4.5rem] flex justify-end pr-[6%] sm:-mt-20">
          <MagneticButton>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-round h-36 w-36 bg-paper text-[1.0625rem] text-ink disabled:opacity-60 sm:h-40 sm:w-40"
            >
              <span>{status === 'sending' ? 'Sending…' : 'Send it'}</span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </form>
  )
}

export default function Contact() {
  const time = useLocalTime(PROFILE.timeZone)
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="on-dark bg-ink">
      <div className="page pt-28 md:pt-40">
        <Lines as="h2" className="text-huge" stagger={120}>
          <span className="flex items-center gap-5 md:gap-8">
            <img
              src="/images/me/nk-avatar.webp"
              alt=""
              width="320"
              height="320"
              loading="lazy"
              className="h-[0.9em] w-[0.9em] rounded-full"
            />
            Let’s build
          </span>
          <span>something together</span>
        </Lines>

        <div className="mt-20 grid gap-20 md:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Form />
          </div>

          <Reveal as="dl" delay={200} className="space-y-10 lg:col-span-3 lg:col-start-10 lg:pt-8">
            <div>
              <dt className="label">Contact details</dt>
              <dd className="mt-4">
                <a href={`mailto:${EMAIL}`} className="press inline-block underline-offset-4 hover:underline">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Based in</dt>
              <dd className="mt-4">
                {PROFILE.city}, {PROFILE.country}
                <br />
                Working worldwide
              </dd>
            </div>
            <div>
              <dt className="label">Socials</dt>
              <dd className="mt-4">
                <ul className="space-y-1">
                  {SOCIALS.map(s => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-block underline-offset-4 hover:underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        </div>

        <div className="mt-28 flex flex-col gap-8 border-t border-paper/15 py-8 sm:flex-row sm:items-end sm:justify-between md:mt-40">
          <div className="flex gap-12">
            <p>
              <span className="label block">©&nbsp;{year}</span>
              <span className="mt-2 block">{PROFILE.name}</span>
            </p>
            <p>
              <span className="label block">Local time</span>
              <span className="mt-2 block tabular-nums">{time}</span>
            </p>
          </div>
          <a href="#top" className="press text-muted hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
