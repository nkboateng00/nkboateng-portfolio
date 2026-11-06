import { brands } from '../data/brands'
import { Reveal } from './ui/Reveal'

/*
  A row of logos that rolls continuously. The list is rendered twice and the
  track slides exactly one copy, so the loop has no seam. Spacing lives on each
  item (not a flex gap) so both copies are the same width.
  Hovering pauses it, so a moving logo is never a moving target.
  Reduced motion: the copy is dropped and the logos wrap into a still grid.
*/
function Logos({ copy = false }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      className={`flex shrink-0 items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center ${copy ? 'motion-reduce:hidden' : ''}`}
    >
      {brands.map(b => {
        const img = (
          <img
            src={b.logo}
            alt={copy ? '' : b.name}
            style={{ height: `calc(${b.height}px * var(--logo-scale))` }}
            className="logo-mono w-auto max-w-none select-none"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        )
        return (
          <li key={b.name} className="flex h-36 items-center px-9 md:h-52 md:px-16">
            {b.url ? (
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={copy ? -1 : undefined}
                aria-label={copy ? undefined : `${b.name} (opens in a new tab)`}
                className="press block opacity-80 transition-opacity duration-200 ease-[ease] hover:opacity-100"
              >
                {img}
              </a>
            ) : (
              img
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function Brands() {
  return (
    <section aria-labelledby="brands-title" className="pb-24 [--logo-scale:0.65] md:pb-36 md:[--logo-scale:1]">
      <div className="page">
        <Reveal as="h2" id="brands-title" className="label border-b border-ink/15 pb-6">
          Brands I’ve worked with
        </Reveal>
      </div>
      <Reveal delay={150} className="marquee-edge pause-on-hover overflow-hidden">
        <div className="marquee flex w-max motion-reduce:w-full" style={{ '--marquee-duration': '50s' }}>
          <Logos />
          <Logos copy />
        </div>
      </Reveal>
    </section>
  )
}
