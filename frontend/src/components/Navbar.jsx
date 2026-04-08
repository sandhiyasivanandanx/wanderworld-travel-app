import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-icon">✈</span>
          <span>Wander<span className="brand-accent">World</span></span>
        </NavLink>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/destinations">Destinations</NavLink></li>
          <li><NavLink to="/tours">Group Tours</NavLink></li>
        </ul>

        <div className="navbar-actions">
          <NavLink to="/login" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '14px', border: 'none' }}>
            Login
          </NavLink>
          <NavLink to="/tours" className="btn btn-primary navbar-cta">
            Book a Tour
          </NavLink>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
