import { Link, NavLink } from 'react-router-dom';
import { CONTACT, BIZ, PROOF } from '../data/business';
import './Header.css';

export default function Header() {
  return (
    <>
      {/* TOPBAR — contact info strip */}
      <div className="il-topbar">
        <div className="il-topbar-left">
          <a href={`tel:${CONTACT.phoneTel}`} className="il-topbar-item">📞 {CONTACT.phone}</a>
          <span className="il-topbar-divider" />
          <a href={`mailto:${BIZ.cleaning.email}`} className="il-topbar-item">✉️ {BIZ.cleaning.email}</a>
          <span className="il-topbar-divider" />
          <span className="il-topbar-item">📍 Toowoomba · Highfields · Helidon · Darling Downs</span>
        </div>
        <div className="il-topbar-right">
          <span className="il-topbar-item">⭐ {PROOF.googleRating} · {PROOF.reviewCount} reviews</span>
          <span className="il-topbar-divider" />
          <span className="il-topbar-item">🛡 Family-owned & fully insured</span>
        </div>
      </div>

      {/* MAIN NAV — dual brand */}
      <nav className="il-nav">
        <Link to="/" className="il-nav-brand">
          <div className="il-nav-logos">
            <div className="nav-logo-block cleaning">
              <svg className="nav-logo-svg" viewBox="0 0 48 48" fill="none">
                <path d="M24 42s-15-10-15-21a9 9 0 0 1 15-7 9 9 0 0 1 15 7c0 11-15 21-15 21z" stroke="#E8232A" strokeWidth="3.5" fill="none"/>
                <path d="M14 24 L24 16 L34 24 L34 32 L14 32 Z" fill="#2B8FD4"/>
              </svg>
              <div className="nav-logo-text">iLovah<small>Cleaning</small></div>
            </div>
            <div className="nav-logo-block pest">
              <div className="nav-logo-svg pest-mark">
                <svg viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2C7 2 3 6 3 11s4 9 9 9 9-4 9-9-4-9-9-9zm-2 6l4 4-4 4-1-1 3-3-3-3 1-1z"/>
                </svg>
              </div>
              <div className="nav-logo-text">Rest In Pest<small>Control</small></div>
            </div>
          </div>
        </Link>

        <div className="il-nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cleaning/end-of-lease">Cleaning</NavLink>
          <NavLink to="/pest-control">Pest Control</NavLink>
          <NavLink to="/areas/toowoomba">Service Areas</NavLink>
          <NavLink to="/combo">Combo Deals</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="il-nav-right">
          <a href={`tel:${CONTACT.phoneTel}`} className="il-phone">
            <span className="pulse" />
            {CONTACT.phone}
          </a>
          <a href="#quote" className="il-btn">Get Free Quote →</a>
        </div>
      </nav>
    </>
  );
}
