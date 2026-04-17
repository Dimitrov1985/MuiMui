import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import './Navbar.css'

export default function Navbar() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.home,     href: '#hero' },
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.tools,    href: '#tools' },
    { label: t.nav.contact,  href: '#contact' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="navbar-logo">
        <span className="logo-bracket">[</span>
        COACH
        <span className="logo-accent">PRO</span>
        <span className="logo-bracket">]</span>
      </a>

      <ul className={`navbar-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a
            href="https://wa.me/66945953441"
            className="navbar-cta"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            {t.nav.cta}
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        {/* Language toggle */}
        <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
          <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
          <span className="lang-divider">|</span>
          <span className={lang === 'th' ? 'lang-active' : ''}>TH</span>
        </button>

        <button
          className={`burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
