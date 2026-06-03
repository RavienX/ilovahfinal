import { Link } from 'react-router-dom';
import { BIZ, CONTACT, AREAS, CLEANING_SERVICES, PEST_SERVICES } from '../data/business';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="il-footer">
      <div className="il-footer-grid">
        <div className="il-footer-col il-footer-brand">
          <div className="footer-logo">iLovah & Rest In Pest</div>
          <p>
            Family-owned cleaning and pest control. Helidon-based, serving Toowoomba,
            Highfields, and the Darling Downs.
          </p>
          <a href={`tel:${CONTACT.phoneTel}`} className="il-footer-contact">📞 {CONTACT.phone}</a>
          <a href={`mailto:${BIZ.cleaning.email}`} className="il-footer-contact">
            ✉️ {BIZ.cleaning.email}
          </a>
          <div className="il-footer-contact">📍 Helidon, QLD 4344</div>
        </div>

        <div className="il-footer-col">
          <h4>Cleaning</h4>
          <ul>
            {CLEANING_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/cleaning/${s.slug}`}>{s.short}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="il-footer-col">
          <h4>Pest Control</h4>
          <ul>
            {PEST_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/pest-control/${s.slug}`}>{s.short}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="il-footer-col">
          <h4>Service Areas</h4>
          <ul>
            {Object.values(AREAS).map((a) => (
              <li key={a.slug}>
                <Link to={`/areas/${a.slug}`}>{a.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/areas">All 49 suburbs →</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="il-footer-bottom">
        <div>
          © {new Date().getFullYear()} iLovah Cleaning Services & Rest In Pest Control · Family-owned · Fully insured
        </div>
        <div>Designed with ♥ for the Darling Downs</div>
      </div>
    </footer>
  );
}
