import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// After a route change: jump to the #section if the URL names one, otherwise to
// the top. Instant on purpose; a smooth scroll across a whole new page reads as lag.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
