import { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'Home',        href: '#hero' },
  { label: 'Properties',  href: '#properties' },
  { label: 'Video Feed',  href: '#videos' },
  { label: 'Book a Tour', href: '#properties' },
];

export default function Navbar({ onBookTour }) {
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive]         = useState('');

  /* Scroll listener */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="nav-inner">
          {/* Logo */}
          <a href="#hero" className="nav-logo" aria-label="ZITOPY AI home">
            <div className="nav-logo-icon">Z</div>
            <span className="nav-logo-text">ZITOPY AI</span>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links" role="list">
            {links.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`nav-link${active === l.label ? ' active' : ''}`}
                  onClick={() => setActive(l.label)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions">
            <button className="nav-btn-ghost" onClick={onBookTour}>Sign In</button>
            <button className="nav-btn-primary" onClick={onBookTour}>
              Book a Tour ✦
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${drawerOpen ? ' open' : ''}`}
            onClick={() => setDrawerOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={drawerOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`nav-drawer-overlay${drawerOpen ? ' open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside className={`nav-drawer${drawerOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        <ul className="nav-drawer-links" role="list">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} className="nav-link" onClick={closeDrawer}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-drawer-actions">
          <button className="nav-btn-ghost" onClick={() => { closeDrawer(); onBookTour(); }}>Sign In</button>
          <button className="nav-btn-primary" onClick={() => { closeDrawer(); onBookTour(); }}>
            Book a Tour ✦
          </button>
        </div>
      </aside>
    </>
  );
}
