import { useState } from 'react';
import './VideoFeed.css';

const VIDEO_TOURS = [
  {
    id: 1,
    title: 'Skyline Penthouse Tour',
    location: 'Victoria Island, Lagos',
    price: '$4,200/mo',
    poster: '/prop1.png',
    agent: 'Sarah O.',
    agentInitial: 'SO',
    desc: 'Step inside this breathtaking penthouse. Floor-to-ceiling windows reveal a panoramic city skyline. Smart home enabled throughout.',
    tags: ['4 Beds', '3 Baths', 'Smart Home'],
    views: '12.4K',
  },
  {
    id: 2,
    title: 'Tropical Villa Walkthrough',
    location: 'Ikoyi, Lagos',
    price: '$1.2M',
    poster: '/prop2.png',
    agent: 'James A.',
    agentInitial: 'JA',
    desc: 'Experience the resort lifestyle. This 5-bed villa features an infinity pool, tropical garden, and state-of-the-art kitchen.',
    tags: ['5 Beds', 'Pool', 'Tropical Garden'],
    views: '8.7K',
  },
  {
    id: 3,
    title: 'Loft Studio Showcase',
    location: 'Yaba, Lagos',
    price: '$850/mo',
    poster: '/prop3.png',
    agent: 'Amara L.',
    agentInitial: 'AL',
    desc: 'An artisan loft blending exposed brick with modern finishes. Perfect for creatives. High-speed fibre and all utilities included.',
    tags: ['Studio', 'Utilities Inc.', 'Fibre'],
    views: '5.1K',
  },
  {
    id: 4,
    title: 'Ocean Condo Tour',
    location: 'Eko Atlantic, Lagos',
    price: '$6,500/mo',
    poster: '/prop4.png',
    agent: 'Mike F.',
    agentInitial: 'MF',
    desc: 'Wake up to ocean waves every morning. This 3-bed oceanfront condo has a private terrace and 24/7 concierge service.',
    tags: ['Sea View', 'Concierge', 'Terrace'],
    views: '19.3K',
  },
];

/* ---- Single Video Card ---- */
function VideoCard({ tour, index, total, onBook }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="video-card" aria-label={tour.title}>
      {/* Poster Image acts as video placeholder */}
      <img
        src={tour.poster}
        alt={`${tour.title} video tour preview`}
        className="video-card-media"
      />
      <div className="video-card-gradient" aria-hidden="true" />

      {/* Counter */}
      <div className="video-counter" aria-label={`Video ${index + 1} of ${total}`}>
        {index + 1} / {total}
      </div>

      {/* Scroll Hint */}
      {index < total - 1 && (
        <div className="video-scroll-hint" aria-hidden="true">
          ↓ Swipe
        </div>
      )}

      {/* Play Button */}
      <div className="video-play-overlay" aria-hidden="true">
        <button
          className={`video-play-btn${playing ? ' playing' : ''}`}
          onClick={() => setPlaying(v => !v)}
          aria-label={playing ? 'Pause tour' : 'Play tour'}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>

      {/* Glass Info Overlay */}
      <div className="video-card-info">
        <div className="video-card-property">
          <div className="video-card-avatar" aria-hidden="true">
            {tour.agentInitial}
          </div>
          <div className="video-card-meta">
            <h3>{tour.title}</h3>
            <p>📍 {tour.location} · {tour.price}</p>
          </div>
        </div>

        <p className="video-card-description">{tour.desc}</p>

        <div className="video-card-tags" aria-label="Property features">
          {tour.tags.map(t => <span key={t} className="video-tag">{t}</span>)}
        </div>

        <div className="video-card-actions">
          {/* SHAKE button */}
          <button
            className="video-action-btn video-action-book"
            onClick={() => onBook({ title: tour.title, location: tour.location })}
            id={`video-book-${tour.id}`}
            aria-label={`Book verification tour for ${tour.title}`}
          >
            📅 Book Tour
          </button>
          <button
            className="video-action-btn video-action-share"
            aria-label="Share this tour"
          >
            ↗ Share
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---- Video Feed Section ---- */
export default function VideoFeed({ onBook }) {
  return (
    <section className="video-feed" id="videos" aria-label="Video property tours">
      <div className="section-container">

        <header className="section-header reveal">
          <span className="section-tag">Immersive Tours</span>
          <h2 className="section-title">
            Watch Before You <span className="gradient-text">Visit</span>
          </h2>
          <p className="section-subtitle">
            Swipe through AI-curated video tours. Save time by experiencing
            every room before booking an in-person visit.
          </p>
        </header>

        <div className="video-feed-layout">

          {/* Side Panel — visible on desktop */}
          <div className="video-side-panel">
            <h3>
              Why Video <span className="gradient-text-blue">Tours?</span>
            </h3>
            <p>
              Save hours of site visits. Our AI-narrated tours cover every corner
              of each property so you can shortlist confidently.
            </p>

            <ul className="video-side-features" role="list">
              {[
                { icon: '🎥', title: 'HD 4K Tours',      desc: 'Crystal-clear video on any device' },
                { icon: '🤖', title: 'AI Narration',     desc: 'Smart highlights for key features' },
                { icon: '📍', title: 'Neighbourhood Map', desc: 'Nearby schools, transit & amenities' },
                { icon: '📅', title: 'Instant Booking',  desc: 'Book from the video in one tap' },
              ].map(f => (
                <li key={f.title} className="video-side-feature" role="listitem">
                  <div className="video-side-feature-icon" aria-hidden="true">{f.icon}</div>
                  <div className="video-side-feature-text">
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll Video Feed */}
          <div
            className="video-scroll-wrapper"
            role="feed"
            aria-label="Property video tours"
            aria-live="polite"
          >
            {VIDEO_TOURS.map((tour, i) => (
              <VideoCard
                key={tour.id}
                tour={tour}
                index={i}
                total={VIDEO_TOURS.length}
                onBook={onBook}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
