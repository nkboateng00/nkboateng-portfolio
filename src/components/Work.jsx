import { useState } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { projects } from '../data/projects'
import { useMediaQuery } from '../lib/hooks'
import { follow, followLoose } from '../lib/motion'
import { Reveal, Words } from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'
import SiteLink from './ui/SiteLink'

/*
  Desktop: a list of titles. Hovering a row shows a preview that follows the
  cursor on a spring; moving between rows slides the image strip instead of
  swapping images, so the preview reads as one object.
  Touch: each row simply shows its screenshot.
  Rows open the project's write-up on /work.
*/
function Preview({ index, x, y, lagX, lagY }) {
  const visible = index !== null
  return (
    <>
      <motion.div aria-hidden="true" style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-40">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-300 ease-out ${
            visible ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-0'
          }`}
        >
          <div className="h-[20rem] w-[25rem] overflow-hidden bg-[#ececea]">
            <div
              className="h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(${-(index ?? 0) * 100}%)` }}
            >
              {projects.map(p => (
                <div key={p.slug} className="flex h-full items-center justify-center p-7">
                  <img src={p.image} alt="" className="w-full shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)]" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div aria-hidden="true" style={{ x: lagX, y: lagY }} className="pointer-events-none fixed left-0 top-0 z-40">
        <span
          className={`grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-[0.9375rem] text-paper transition-[transform,opacity] duration-300 ease-out ${
            visible ? 'scale-100 opacity-100' : 'scale-[0.6] opacity-0'
          }`}
        >
          Read
        </span>
      </motion.div>
    </>
  )
}

export default function Work() {
  const reduce = useReducedMotion()
  const hover = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 768px)')
  const [index, setIndex] = useState(null)
  const x = useSpring(0, follow)
  const y = useSpring(0, follow)
  const lagX = useSpring(0, followLoose)
  const lagY = useSpring(0, followLoose)
  const all = [x, y, lagX, lagY]

  const move = e => {
    const v = [e.clientX, e.clientY, e.clientX, e.clientY]
    // With reduced motion the preview still appears, but jumps instead of gliding.
    all.forEach((s, i) => (reduce ? s.jump(v[i]) : s.set(v[i])))
  }
  // First entry: place the preview under the cursor, so it never flies in from the corner.
  const enter = e => {
    const v = [e.clientX, e.clientY, e.clientX, e.clientY]
    all.forEach((s, i) => s.jump(v[i]))
  }

  return (
    <section id="work" className="page pb-24 md:pb-40">
      <Reveal as="h2" className="label pb-6">
        Recent work
      </Reveal>

      <ul
        className="border-b border-ink/15"
        onPointerEnter={hover ? enter : undefined}
        onPointerMove={hover ? move : undefined}
        onPointerLeave={() => setIndex(null)}
      >
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug}>
            <SiteLink
              to={`/work#${p.slug}`}
              onPointerEnter={() => hover && setIndex(i)}
              className="group grid items-baseline gap-y-3 border-t border-ink/15 py-9 md:grid-cols-12 md:px-[3%] md:py-14"
            >
              <img
                src={p.image}
                alt=""
                className="mb-4 aspect-[16/10] w-full rounded-sm object-cover object-top md:hidden"
                loading="lazy"
                decoding="async"
              />
              <Words
                as="h3"
                text={p.title}
                delay={80}
                stagger={45}
                className="text-big transition-[transform,opacity] duration-300 ease-out group-hover:-translate-x-3 group-hover:opacity-50 md:col-span-7"
              />
              <div className="text-muted transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-3 group-hover:opacity-50 md:col-span-5 md:text-right">
                <p className="flex justify-between gap-4 md:justify-end md:gap-10">
                  <span>{p.role}</span>
                  <span className="tabular-nums">{p.year}</span>
                </p>
                <p className="mt-2 text-[0.9375rem] text-ink/45">
                  <span className="sr-only">Built with </span>
                  {p.stack.slice(0, 4).join(' · ')}
                </p>
              </div>
            </SiteLink>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-14 flex justify-center md:mt-20">
        <MagneticButton>
          <SiteLink to="/work" className="btn-pill">
            <span>See all work in detail</span>
            <span aria-hidden="true">→</span>
          </SiteLink>
        </MagneticButton>
      </Reveal>

      {hover ? <Preview index={index} x={x} y={y} lagX={lagX} lagY={lagY} /> : null}
    </section>
  )
}
