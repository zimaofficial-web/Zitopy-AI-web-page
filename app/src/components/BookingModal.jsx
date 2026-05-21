import { useState, useEffect, useRef } from 'react';
import './BookingModal.css';

const TOUR_TYPES = [
  { id: 'virtual',  icon: '🖥️', label: 'Virtual Tour' },
  { id: 'inperson', icon: '🏠', label: 'In-Person Tour' },
];

const TIMES = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'];

export default function BookingModal({ isOpen, onClose, property }) {
  const [tourType, setTourType]   = useState('virtual');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const firstInputRef = useRef(null);

  /* Focus trap & keyboard close */
  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    // Focus first field on open
    const timer = setTimeout(() => firstInputRef.current?.focus(), 400);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { clearTimeout(timer); document.removeEventListener('keydown', onKey); };
  }, [isOpen, onClose]);

  /* Prevent background scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Book a verification tour"
      aria-hidden={!isOpen}
    >
      <div className="modal-card">

        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="Close booking modal">
          ✕
        </button>

        {submitted ? (
          /* ---- Success State ---- */
          <div className="modal-success">
            <div className="modal-success-icon">🎉</div>
            <h3>
              Tour <span className="gradient-text">Confirmed!</span>
            </h3>
            <p>
              Your verification tour has been booked. Our agent will contact you
              within 30 minutes to confirm your appointment.
            </p>
            <button className="modal-back-btn" onClick={onClose}>
              Close & Continue Browsing
            </button>
          </div>
        ) : (
          /* ---- Form State ---- */
          <>
            <header className="modal-header">
              <span className="modal-icon" aria-hidden="true">📅</span>
              <h2 className="modal-title">
                Book <span className="gradient-text">Verification Tour</span>
              </h2>
              <p className="modal-subtitle">
                Schedule a free AI-assisted verification tour in minutes.
              </p>
            </header>

            {/* Property Badge */}
            {property && (
              <div className="modal-property-badge" role="note">
                <span className="modal-property-icon" aria-hidden="true">🏡</span>
                <div>
                  <div className="modal-property-name">{property.title || property.name || 'Selected Property'}</div>
                  <div className="modal-property-loc">{property.location}</div>
                </div>
              </div>
            )}

            <form
              className="modal-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Tour booking form"
            >
              {/* Name Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-firstname" className="form-label">First Name</label>
                  <input
                    id="modal-firstname"
                    ref={firstInputRef}
                    type="text"
                    className="form-input"
                    placeholder="John"
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-lastname" className="form-label">Last Name</label>
                  <input
                    id="modal-lastname"
                    type="text"
                    className="form-input"
                    placeholder="Doe"
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-email" className="form-label">Email</label>
                  <input
                    id="modal-email"
                    type="email"
                    className="form-input"
                    placeholder="john@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-phone" className="form-label">Phone</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    className="form-input"
                    placeholder="+234 800 000 0000"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Tour Type */}
              <div className="form-group">
                <label className="form-label" id="tour-type-label">Tour Type</label>
                <div className="tour-type-grid" role="group" aria-labelledby="tour-type-label">
                  {TOUR_TYPES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      className={`tour-type-btn${tourType === t.id ? ' selected' : ''}`}
                      onClick={() => setTourType(t.id)}
                      aria-pressed={tourType === t.id}
                    >
                      <span className="tour-type-icon" aria-hidden="true">{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date + Time */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-date" className="form-label">Preferred Date</label>
                  <input
                    id="modal-date"
                    type="date"
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-time" className="form-label">Preferred Time</label>
                  <select id="modal-time" className="form-select" required>
                    <option value="">Select a time</option>
                    {TIMES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Note */}
              <div className="form-group">
                <label htmlFor="modal-note" className="form-label">Additional Notes (optional)</label>
                <textarea
                  id="modal-note"
                  className="form-textarea"
                  placeholder="Any specific questions or requirements for your tour…"
                  rows={3}
                />
              </div>

              {/* Footer */}
              <div className="modal-footer">
                {/* FLIP BUTTON */}
                <button
                  type="submit"
                  className="modal-submit-btn"
                  id="modal-submit-btn"
                  disabled={loading}
                  aria-live="polite"
                >
                  <span className="btn-flip-front">
                    {loading ? (
                      <span aria-label="Booking in progress…">⏳ Confirming…</span>
                    ) : (
                      <span>📅 Confirm Booking</span>
                    )}
                  </span>
                  <span className="btn-flip-back" aria-hidden="true">
                    ✦ Your Tour is Booked!
                  </span>
                </button>

                {/* SLIDE Button (secondary) */}
                <button
                  type="button"
                  className="btn-slide"
                  style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--radius-md)' }}
                  onClick={onClose}
                  id="modal-cancel-btn"
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
