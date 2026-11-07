import { useLayoutEffect, useRef } from 'react'
import { brands } from '../data/brands'
import { Reveal } from './ui/Reveal'

/*
  A row of logos that rolls continuously. The list is rendered twice and the
  track slides exactly one copy, so the loop has no seam. Spacing lives on each
  item (not a flex gap) so both copies are the same width.
  The logos load straight away and carry their own aspect ratio, so no logo is
  ever a blank gap and the row never changes width mid-loop.
  Speed is set in pixels per second (not a fixed loop time), so it moves at the
  same pace however wide the row is.
  Hovering pauses it, so a moving logo is never a moving target.
  Reduced motion: the copy is dropped and the logos wrap into a still grid.
*/
const SPEED = { phone: 72, wide: 110 } // px per second

function Logos({ copy = false, listRef }) {
  return (
    <ul
      ref={listRef}
      aria-hidden={copy || undefined}
      className={`flex shrink-0 items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center ${copy ? 'motion-reduce:hidden' : ''}`}
    >
      {brands.map(b => {
        const img = (
          <img
            src={b.logo}
            alt={copy ? '' : b.name}
            width={b.size[0]}
            height={b.size[1]}
            style={{ height: `calc(${b.height}px * var(--logo-scale))` }}
            className="logo-mono w-auto max-w-none select-none"
            decoding="async"
            draggable="false"
          />
        )
        return (
          <li key={b.name} className="flex h-24 items-center px-8 md:h-52 md:px-16">
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
  const trackRef = useRef(null)
  const listRef = useRef(null)

  // One loop = one copy's width at a steady speed. Re-measured when the row resizes.
  useLayoutEffect(() => {
    const track = trackRef.current
    const list = listRef.current
    const measure = () => {
      const speed = window.innerWidth < 768 ? SPEED.phone : SPEED.wide
      const width = list.getBoundingClientRect().width
      if (width) track.style.setProperty('--marquee-duration', `${(width / speed).toFixed(2)}s`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [])

  return (
    <section aria-labelledby="brands-title" className="pb-10 [--logo-scale:0.65] md:pb-36 md:[--logo-scale:1]">
      <div className="page">
        <Reveal as="h2" id="brands-title" className="label border-b border-ink/15 pb-6">
          Brands I’ve worked with
        </Reveal>
      </div>
      <Reveal delay={150} className="marquee-edge pause-on-hover overflow-hidden">
        <div ref={trackRef} className="marquee flex w-max motion-reduce:w-full">
          <Logos listRef={listRef} />
          <Logos copy />
        </div>
      </Reveal>
    </section>
  )
}
