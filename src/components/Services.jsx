import { services } from '../data/services'
import { Reveal, Words } from './ui/Reveal'

export default function Services() {
  return (
    <section aria-labelledby="services-title" className="page pb-24 md:pb-40">
      <Words as="h2" id="services-title" text="I can help you with…" stagger={60} className="text-big block max-w-3xl text-balance" />
      <ol className="mt-14 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-10">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 120}>
            <p className="label border-b border-ink/15 pb-6 tabular-nums">0{i + 1}</p>
            <h3 className="mt-8 text-title">{s.title}</h3>
            <p className="mt-5 text-muted text-pretty">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
