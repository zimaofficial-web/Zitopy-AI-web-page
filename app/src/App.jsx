import { useState, useEffect, useRef } from 'react';
import './index.css';
import './App.css';

import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import PropertyFeed from './components/PropertyFeed';
import VideoFeed    from './components/VideoFeed';
import BookingModal from './components/BookingModal';
import SocialActionLinks from '../SocialActionLinks';

/* ---- Global Scroll Reveal ---- */
function useGlobalReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal, .auto-reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ---- CTA Section ---- */
function CtaSection({ onBook }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="cta-section" aria-label="Call to action">
      <div className="bg-orb cta-orb-a" aria-hidden="true" />
      <div className="bg-orb cta-orb-b" aria-hidden="true" />
      <div className={`cta-card reveal${vis ? ' visible' : ''}`} ref={ref}>
        <h2 className="cta-title">
          Ready to Find Your<br />
          <span className="gradient-text">Perfect Property?</span>
        </h2>
        <p className="cta-subtitle">
          Join over 24,000 buyers and renters using ZITOPY AI to discover,
          verify, and secure their ideal property — faster than ever before.
        </p>
        <div className="cta-actions">
          {/* SHAKE button */}
          <button className="btn-shake" onClick={onBook} id="cta-book-btn">
            📅 Book a Free Tour Today
          </button>
          {/* FILL button */}
          <a href="#properties" className="btn-fill" id="cta-browse-btn">
            Browse All Listings →
          </a>
          {/* NEON button */}
          <a href="#videos" className="btn-neon" id="cta-video-btn">
            ▶ Watch Tours
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 32, height: 32, background: 'linear-gradient(135deg, #2563eb, #fbbf24)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '0.85rem', color: '#fff'
            }}>Z</div>
            <span style={{
              fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #f8fafc, #fbbf24)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>ZITOPY AI</span>
          </div>
          <p className="footer-brand-tagline">
            AI-powered property intelligence — connecting people with their perfect home.
          </p>
          <div className="footer-socials">
            {['𝕏', 'in', '⌥', '◈'].map((icon, i) => (
              <a key={i} href="#" className="footer-social-btn" aria-label={['Twitter','LinkedIn','GitHub','Discord'][i]}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          {
            title: 'Platform',
            links: ['Browse Properties', 'Video Tours', 'Book a Tour', 'AI Verification', 'Pricing'],
          },
          {
            title: 'Company',
            links: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'],
          },
          {
            title: 'Legal',
            links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'],
          },
        ].map(col => (
          <div key={col.title}>
            <h3 className="footer-col-title">{col.title}</h3>
            <ul className="footer-links-list">
              {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© 2026 ZITOPY AI. All rights reserved.</span>
        <div className="footer-bottom-right">
          <span>🇳🇬 Lagos, Nigeria</span>
          <span>Built with ⚡ React</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   APP ROOT
   ============================================ */
export default function App() {
  const [modalOpen, setModalOpen]       = useState(false);
  const [selectedProp, setSelectedProp] = useState(null);

  useGlobalReveal();

  const openModal = (property = null) => {
    setSelectedProp(property);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* Navigation */}
      <Navbar onBookTour={() => openModal()} />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1}>
        <Hero onBookTour={() => openModal()} />
        <PropertyFeed onBook={openModal} />
        <VideoFeed onBook={openModal} />
        <CtaSection onBook={() => openModal()} />
      </main>

      {/* Floating Action Links */}
      <SocialActionLinks />

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={closeModal}
        property={selectedProp}
      />
    </>
  );
}
