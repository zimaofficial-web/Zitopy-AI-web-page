import './Hero.css';

export default function Hero({ onBookTour }) {
  return (
    <section className="hero" id="hero" aria-label="Hero section">

      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <img src="/property_hero.png" alt="" />
        <div className="hero-bg-overlay" />
      </div>

      {/* Grid overlay */}
      <div className="hero-grid-overlay" aria-hidden="true" />

      {/* Ambient Orbs */}
      <div className="bg-orb hero-orb-1" aria-hidden="true" />
      <div className="bg-orb hero-orb-2" aria-hidden="true" />
      <div className="bg-orb hero-orb-3" aria-hidden="true" />

      {/* Main Content */}
      <div className="hero-content">

        {/* Badge */}
        <div className="hero-badge" role="note">
          <span className="hero-badge-dot" />
          AI-Powered Property Intelligence Platform
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          <span className="hero-title-line1">Find Your Perfect</span>
          <span className="hero-title-line2">Property Match</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          ZITOPY AI connects buyers, renters, and agents through intelligent property feeds,
          immersive video tours, and AI-verified listings — all in one seamless platform.
        </p>

        {/* CTA Actions */}
        <div className="hero-actions">
          <button className="btn-slide" onClick={onBookTour} id="hero-book-btn">
            <span>📅</span> Book Verification Tour
          </button>
          <a href="#properties" className="btn-fill" id="hero-browse-btn">
            Browse Properties →
          </a>
          <a href="#videos" className="btn-neon" id="hero-video-btn">
            <span>▶</span> Watch Video Tours
          </a>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats" role="list" aria-label="Platform statistics">
          <div className="hero-stat" role="listitem">
            <span className="hero-stat-num">24K+</span>
            <span className="hero-stat-label">Verified Listings</span>
          </div>
          <div className="hero-stat" role="listitem">
            <span className="hero-stat-num">98%</span>
            <span className="hero-stat-label">Match Accuracy</span>
          </div>
          <div className="hero-stat" role="listitem">
            <span className="hero-stat-num">4.9★</span>
            <span className="hero-stat-label">User Rating</span>
          </div>
          <div className="hero-stat" role="listitem">
            <span className="hero-stat-num">150+</span>
            <span className="hero-stat-label">Cities Covered</span>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-wheel">
          <div className="hero-scroll-dot" />
        </div>
        <span>Scroll</span>
      </div>

    </section>
  );
}
