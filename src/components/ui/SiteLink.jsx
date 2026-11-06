import { forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

/*
  One link for every destination on the site:
    '#contact'  a section on this page (the footer is on every page)
    '/#about'   a section on the home page: a plain jump when already home,
                otherwise a route change (ScrollManager then scrolls to it)
    '/work'     another page
*/
const SiteLink = forwardRef(function SiteLink({ to, children, ...rest }, ref) {
  const { pathname } = useLocation()
  if (to.startsWith('#')) {
    return (
      <a ref={ref} href={to} {...rest}>
        {children}
      </a>
    )
  }
  const [path, hash] = to.split('#')
  if (hash && path === pathname) {
    return (
      <a ref={ref} href={`#${hash}`} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link ref={ref} to={to} {...rest}>
      {children}
    </Link>
  )
})

export default SiteLink
