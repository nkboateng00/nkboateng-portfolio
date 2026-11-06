import { useEffect, useState } from 'react'

// Which section is in the middle of the viewport (for nav wayfinding).
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export function useScrolledPast(px) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > px)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [px])
  return past
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// True once the element has scrolled into view (never flips back). Elements already
// on screen at load reveal immediately. Without IntersectionObserver, content shows.
export function useInViewOnce(ref, { margin = '0px 0px -12% 0px' } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin])
  return inView
}
