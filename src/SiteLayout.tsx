import { useEffect, useLayoutEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

function navClassName(isActive: boolean) {
  return `pf-navLink${isActive ? ' pf-navLink--active' : ''}`
}

export function SiteLayout() {
  const { pathname, hash } = useLocation()

  const contactHref = pathname === '/' ? '/#contact' : `${pathname}#contact`

  useLayoutEffect(() => {
    if (hash === '#contact') {
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  useEffect(() => {
    if (hash !== '#contact') {
      return
    }
    const t = window.setTimeout(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      document.getElementById('contact')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }, 0)
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  return (
    <div className="pf-page">
      <header className="pf-header">
        <nav className="pf-nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => navClassName(isActive)}>
            HOME
          </NavLink>
          <NavLink to="/work" className={({ isActive }) => navClassName(isActive)}>
            WORK
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => navClassName(isActive)}>
            ABOUT
          </NavLink>
          <Link className="pf-navLink" to={contactHref}>
            CONTACT
          </Link>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}
