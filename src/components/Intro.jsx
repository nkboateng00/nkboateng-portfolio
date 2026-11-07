import { Reveal, Words } from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'

export default function Intro() {
  return (
    <section aria-label="Introduction" className="page grid gap-12 pb-14 pt-24 md:grid-cols-12 md:gap-8 md:py-40">
      <Words
        as="p"
        stagger={18}
        className="text-statement text-balance md:col-span-8"
        text="Helping brands in Ghana and beyond look world-class online. Websites, web apps and mobile apps, designed and built by one person who cares about every detail, from the first sketch to launch day."
      />
      <div className="flex flex-col items-start gap-14 md:col-span-4 md:pl-6 md:pt-2">
        <Reveal as="p" delay={250} className="max-w-xs text-muted text-pretty">
          Developer and designer in Accra, studying Computer Science at Lancaster University Ghana.
          My research on agentic AI for small businesses was published at iCAD 2026.
        </Reveal>
        <Reveal delay={400} className="md:ml-auto">
          <MagneticButton>
            <a href="#about" className="btn-round h-40 w-40 text-[1.0625rem] sm:h-44 sm:w-44">
              <span>About me</span>
            </a>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
