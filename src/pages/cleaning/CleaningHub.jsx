import { Link } from 'react-router-dom';
import SEOMeta from '../../seo/SEOMeta';
import { BreadcrumbSchema } from '../../seo/Schema';
import { CLEANING_SERVICES, PROOF } from '../../data/business';
import '../areas/Area.css';

export default function CleaningHub() {
  return (
    <>
      <SEOMeta
        title="Cleaning Services Toowoomba | Bond, House, Carpet, Window, Gutter, Pressure"
        description="Full cleaning services across Toowoomba, Highfields, Helidon. End-of-lease, regular house cleans, carpet steam, window cleaning, gutter cleaning, pressure washing, pram cleaning."
        path="/cleaning"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Cleaning Services', path: '/cleaning' },
      ]} />

      <section className="area-hero cleaning">
        <div className="area-hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '900px' }}>
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">Cleaning Services</span>
            </div>
            <h1>
              All our <span className="accent">cleaning services</span> in one place.
            </h1>
            <p className="lede">
              Bond cleans, regular houses, carpets, windows, gutters, pressure washing, pram and baby gear. Same family-owned team. Same bond-back guarantee on end-of-lease work.
            </p>
            <div className="hero-ctas">
              <Link to="/#quote" className="il-btn il-btn-blue">Get a free quote →</Link>
              <a href="tel:+61478711829" className="il-btn-ghost">📞 0478 711 829</a>
            </div>
          </div>
        </div>
      </section>

      <section className="local-block">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {CLEANING_SERVICES.map((s) => (
            <Link key={s.slug} to={`/cleaning/${s.slug}`} className="area-card-link">
              <div className="side-card cleaning" style={{ height: '100%', cursor: 'pointer' }}>
                <h4>{s.name}</h4>
                <p style={{ marginBottom: '12px' }}>{s.description}</p>
                {s.fromPrice && <p style={{ color: 'var(--blue)', fontWeight: 900 }}>From ${s.fromPrice}</p>}
                <p style={{ marginTop: '12px', fontWeight: 800, color: 'var(--blue)' }}>Learn more →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
