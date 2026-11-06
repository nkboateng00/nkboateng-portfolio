import { useEffect } from 'react'
import { projects } from '../data/projects'
import { PROFILE } from '../data/me'
import { ImageReveal, Lines, Reveal, Words } from '../components/ui/Reveal'
import MagneticButton from '../components/ui/MagneticButton'

const pad = n => String(n).padStart(2, '0')

function CaseStudy({ project: p, index }) {
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="scroll-mt-6 border-t border-ink/15 pb-24 pt-10 md:pb-36 md:pt-14">
      <div className="grid gap-y-5 md:grid-cols-12 md:gap-x-8">
        <Reveal as="p" className="label tabular-nums md:col-span-2 md:pt-4">
          {pad(index + 1)} / {pad(projects.length)}
        </Reveal>
        <div className="md:col-span-10">
          <Words as="h2" id={`${p.slug}-title`} text={p.title} stagger={45} className="text-big block text-balance" />
          <Reveal as="p" delay={150} className="mt-4 text-lead text-muted">
            {p.client} · {p.platform} · {p.year}
          </Reveal>
        </div>
      </div>

      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="mt-10 block rounded-[1.25rem] bg-[#f2f2f4] p-4 sm:p-8 md:mt-14 md:p-14"
      >
        <ImageReveal
          src={p.image}
          className="aspect-[16/10] rounded-[0.75rem] shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)]"
          imgClassName="h-full w-full object-cover object-top"
        />
      </a>

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
        <Reveal className="space-y-5 text-lead text-pretty md:col-span-7">
          {p.about.map(para => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Reveal>

        <Reveal as="dl" delay={120} className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-4 md:col-start-9 md:grid-cols-1">
          <div>
            <dt className="label">Role</dt>
            <dd className="mt-3">{p.role}</dd>
          </div>
          <div>
            <dt className="label">Year</dt>
            <dd className="mt-3 tabular-nums">{p.year}</dd>
          </div>
          <div className="col-span-2 md:col-span-1">
            <dt className="label">Stack</dt>
            <dd className="mt-4">
              <ul className="flex flex-wrap gap-2">
                {p.stack.map(t => (
                  <li key={t} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[0.9375rem] leading-none">
                    {t}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="col-span-2 md:col-span-1">
            <dt className="label">Outcome</dt>
            <dd className="mt-3 text-pretty">{p.outcome}</dd>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 md:mt-24">
        <Reveal as="h3" className="label border-b border-ink/15 pb-5">
          Highlights
        </Reveal>
        <ul className="grid sm:grid-cols-2 sm:gap-x-8">
          {p.highlights.map((h, i) => (
            <Reveal
              as="li"
              key={h}
              delay={(i % 2) * 90}
              className="grid grid-cols-[2.5rem_1fr] border-b border-ink/15 py-5 text-[1.125rem] font-medium tracking-[-0.015em]"
            >
              <span className="label pt-1 tabular-nums">{pad(i + 1)}</span>
              <span className="text-pretty">{h}</span>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <MagneticButton>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-pill">
            <span>Visit the live site</span>
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens {p.title} in a new tab)</span>
          </a>
        </MagneticButton>
      </Reveal>
    </article>
  )
}

export default function WorkPage() {
  useEffect(() => {
    const previous = document.title
    document.title = `Work · ${PROFILE.name}`
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <>
      <header className="page pb-20 pt-40 md:pb-28 md:pt-52">
        <Reveal as="p" className="label">
          Selected work · {pad(projects.length)} projects
        </Reveal>
        <Lines as="h1" className="text-huge mt-6" stagger={110}>
          <span>Work that real</span>
          <span>people use</span>
        </Lines>
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal as="p" delay={200} className="text-lead text-muted text-pretty md:col-span-5">
            Websites, web apps and internal tools for restaurants, events, a university and a
            messaging company, each designed and built end to end. Here is what each one does, how it
            works and what it was built with. I build mobile apps too.
          </Reveal>

          {/* Index: wayfinding for a long page. */}
          <nav aria-label="Projects on this page" className="md:col-span-6 md:col-start-7">
            <ol className="border-t border-ink/15">
              {projects.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 50}>
                  <a
                    href={`#${p.slug}`}
                    className="press group flex items-baseline gap-5 border-b border-ink/15 py-4"
                  >
                    <span className="label tabular-nums">{pad(i + 1)}</span>
                    <span className="text-[1.25rem] font-medium tracking-[-0.02em] transition-transform duration-300 ease-out group-hover:translate-x-2">
                      {p.title}
                    </span>
                    <span className="ml-auto hidden text-[0.9375rem] text-muted sm:inline">{p.platform}</span>
                  </a>
                </Reveal>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <div className="page">
        {projects.map((p, i) => (
          <CaseStudy key={p.slug} project={p} index={i} />
        ))}
      </div>

      {/* Mobile apps */}
      <section aria-labelledby="mobile-title" className="bg-[#f4f4f2] py-24 md:py-36">
        <div className="page grid items-end gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <Reveal as="p" className="label">
              Mobile apps
            </Reveal>
            <Words
              as="h2"
              id="mobile-title"
              text="Need it in people’s pockets? I build mobile apps too."
              stagger={45}
              className="text-big mt-6 block text-balance"
            />
            <Reveal as="p" delay={200} className="mt-8 max-w-xl text-lead text-muted text-pretty">
              iOS and Android apps for bookings, ordering, loyalty and on-the-go tools. Designed to feel
              native, built from one codebase and connected to the same back end as your website.
            </Reveal>
          </div>
          <Reveal delay={300} className="md:col-span-4 md:flex md:justify-end">
            <MagneticButton>
              <a href="#contact" className="btn-round h-40 w-40 text-[1.0625rem] sm:h-44 sm:w-44">
                <span>Start a project</span>
              </a>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
