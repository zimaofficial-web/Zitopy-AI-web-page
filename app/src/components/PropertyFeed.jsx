import { useState, useEffect, useRef } from 'react';
import './PropertyFeed.css';

/* ---- Scroll Reveal Hook ---- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ---- Property Data ---- */
const PROPERTIES = [
  {
    id: 1,
    title: 'Skyline Penthouse Suite',
    location: 'Victoria Island, Lagos',
    price: '$4,200',
    period: '/mo',
    beds: 4, baths: 3, sqft: '2,850',
    image: '/prop1.png',
    badge: 'Verified',
    tags: ['Penthouse', 'Smart Home', 'City View'],
    type: 'Rent',
  },
  {
    id: 2,
    title: 'Tropical Garden Villa',
    location: 'Ikoyi, Lagos',
    price: '$1.2M',
    period: '',
    beds: 5, baths: 4, sqft: '4,200',
    image: '/prop2.png',
    badge: 'Featured',
    tags: ['Villa', 'Pool', 'Garden'],
    type: 'Buy',
  },
  {
    id: 3,
    title: 'Industrial Loft Studio',
    location: 'Yaba, Lagos',
    price: '$850',
    period: '/mo',
    beds: 1, baths: 1, sqft: '720',
    image: '/prop3.png',
    badge: 'Verified',
    tags: ['Studio', 'Modern', 'Utilities Inc.'],
    type: 'Rent',
  },
  {
    id: 4,
    title: 'Ocean View Condo',
    location: 'Eko Atlantic, Lagos',
    price: '$6,500',
    period: '/mo',
    beds: 3, baths: 2, sqft: '1,980',
    image: '/prop4.png',
    badge: 'Featured',
    tags: ['Sea View', 'Luxury', 'Concierge'],
    type: 'Rent',
  },
  {
    id: 5,
    title: 'Contemporary Townhouse',
    location: 'Lekki Phase 1, Lagos',
    price: '$780K',
    period: '',
    beds: 4, baths: 3, sqft: '3,100',
    image: '/prop5.png',
    badge: 'Verified',
    tags: ['Townhouse', 'Corner Unit', 'Garden'],
    type: 'Buy',
  },
  {
    id: 6,
    title: 'Executive Apartment',
    location: 'Abuja, FCT',
    price: '$2,100',
    period: '/mo',
    beds: 2, baths: 2, sqft: '1,200',
    image: '/prop1.png',
    badge: 'Verified',
    tags: ['Executive', 'Furnished', 'Gym'],
    type: 'Rent',
  },
];

const FILTERS = ['All', 'Rent', 'Buy', 'Verified', 'Featured'];

/* ---- Property Card ---- */
function PropertyCard({ property, onBook, index }) {
  const { ref, visible } = useReveal();
  const [liked, setLiked] = useState(false);

  const delay = `${(index % 3) * 0.1}s`;

  return (
    <article
      ref={ref}
      className={`property-card reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: delay }}
      aria-label={property.title}
    >
      {/* Image */}
      <div className="property-card-img-wrap">
        <img
          src={property.image}
          alt={property.title}
          className="property-card-img"
          loading="lazy"
        />
        <span className={`property-card-badge ${property.badge.toLowerCase()}`}>
          {property.badge === 'Verified' ? '✓ ' : '★ '}
          {property.badge}
        </span>
        <div className="property-card-price">
          {property.price}
          {property.period && <span>{property.period}</span>}
        </div>
        <button
          className={`property-card-fav${liked ? ' liked' : ''}`}
          onClick={() => setLiked(v => !v)}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={liked}
        >
          {liked ? '♥' : '♡'}
        </button>
      </div>

      {/* Body */}
      <div className="property-card-body">
        <h3 className="property-card-title">{property.title}</h3>
        <p className="property-card-location">
          <span>📍</span> {property.location}
        </p>

        {/* Stats */}
        <div className="property-card-stats" role="list">
          <div className="property-stat" role="listitem">
            <span className="property-stat-val">{property.beds}</span>
            <span className="property-stat-key">Beds</span>
          </div>
          <div className="property-stat" role="listitem">
            <span className="property-stat-val">{property.baths}</span>
            <span className="property-stat-key">Baths</span>
          </div>
          <div className="property-stat" role="listitem">
            <span className="property-stat-val">{property.sqft}</span>
            <span className="property-stat-key">Sq Ft</span>
          </div>
        </div>

        {/* Tags */}
        <div className="property-card-tags" aria-label="Property features">
          {property.tags.map(tag => (
            <span key={tag} className="property-tag">{tag}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="property-card-footer">
          {/* NEON GLOW BUTTON */}
          <button
            className="property-book-btn"
            onClick={() => onBook(property)}
            id={`book-btn-${property.id}`}
            aria-label={`Book verification tour for ${property.title}`}
          >
            📅 Book Verification Tour
          </button>
          <button className="property-card-view-btn" aria-label="View property details">
            →
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---- Property Feed ---- */
export default function PropertyFeed({ onBook }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch]             = useState('');
  const [query, setQuery]               = useState('');
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  /* Header reveal */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = PROPERTIES.filter(p => {
    const matchFilter =
      activeFilter === 'All' ||
      p.type === activeFilter ||
      p.badge === activeFilter;
    const matchSearch =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section className="property-feed" id="properties" aria-label="Property listings">
      <div className="section-container">

        {/* Header */}
        <header
          ref={headerRef}
          className={`section-header reveal${headerVisible ? ' visible' : ''}`}
        >
          <span className="section-tag">AI-Verified Listings</span>
          <h2 className="section-title">
            Discover Your Next <span className="gradient-text">Dream Property</span>
          </h2>
          <p className="section-subtitle">
            Every listing is AI-verified for accuracy. Book a virtual or in-person
            verification tour directly from any card.
          </p>
        </header>

        {/* Search */}
        <form
          className="property-search-bar"
          role="search"
          aria-label="Search properties"
          onSubmit={e => { e.preventDefault(); setQuery(search); }}
        >
          <label htmlFor="property-search" className="sr-only">Search properties</label>
          <input
            id="property-search"
            type="search"
            placeholder="Search by name, location, or keyword…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="property-search-btn" aria-label="Search">
            🔍 Search
          </button>
        </form>

        {/* Filters */}
        <nav className="property-filters" aria-label="Property type filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </nav>

        {/* Grid */}
        <div className="properties-grid" role="list" aria-label="Property cards">
          {filtered.length === 0 ? (
            <div className="properties-empty" role="status">
              <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</p>
              <p>No properties match your search. Try a different filter.</p>
            </div>
          ) : (
            filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} onBook={onBook} index={i} />
            ))
          )}
        </div>

        {/* Load More */}
        <div className="property-load-more-wrap">
          <button className="btn-fill" id="load-more-btn" style={{ margin: '0 auto' }}>
            Load More Properties
          </button>
        </div>

      </div>
    </section>
  );
}
