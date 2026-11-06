import { bio, research, timeline } from '../data/story'
import { Reveal, Words } from './ui/Reveal'

export default function About() {
  return (
    <section id="about" className="scroll-mt-8 bg-[#f4f4f2] py-24 md:py-40">
      <div className="page">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Words
            as="h2"
            text="From campus tools to brands across Accra."
            stagger={50}
            className="text-big text-balance md:col-span-7"
          />
          <Reveal delay={200} className="space-y-6 text-muted text-pretty md:col-span-4 md:col-start-9 md:pt-3">
            {bio.map(p => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>

        <Reveal as="article" className="mt-24 border-t border-ink/15 pt-8 md:mt-36">
          <p className="label">Published research</p>
          <h3 className="mt-8 max-w-5xl text-statement text-balance">{research.title}</h3>
          <p className="mt-6 text-muted">
            {research.venue} · {research.dates}
          </p>
        </Reveal>

        <div className="mt-24 md:mt-36">
          <Reveal as="h3" className="label pb-6">
            The journey so far
          </Reveal>
          <ol className="border-b border-ink/15">
            {timeline.map(t => (
              <Reveal as="li" key={t.title} className="grid gap-2 border-t border-ink/15 py-7 md:grid-cols-12 md:gap-8">
                <p className="text-muted tabular-nums md:col-span-2">{t.when}</p>
                <p className="text-[1.375rem] font-medium leading-snug tracking-[-0.02em] md:col-span-5">{t.title}</p>
                <p className="text-muted text-pretty md:col-span-5">{t.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
