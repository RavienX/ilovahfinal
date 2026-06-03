import { Link } from 'react-router-dom';
import SEOMeta from '../../seo/SEOMeta';
import { BreadcrumbSchema } from '../../seo/Schema';
import { PEST_SERVICES } from '../../data/business';
import '../areas/Area.css';

export default function PestHub() {
  return (
    <>
      <SEOMeta
        title="Pest Control Toowoomba & Helidon | Cockroaches, Ants, Spiders, Rodents"
        description="Family-owned pest control across Toowoomba, Highfields, Helidon. 12-month warranty on general pest. Pet-safe products. Cockroaches, ants, spiders, rodents, silverfish, end-of-lease."
        path="/pest"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Pest Control', path: '/pest' },
      ]} />

      <section className="area-hero pest">
        <div className="area-hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '900px' }}>
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">Pest Control</span>
            </div>
            <h1>
              <span className="accent">Pest control</span> with a 12-month warranty.
            </h1>
            <p className="lede">
              Family-owned. Pet-safe products. Servicing Toowoomba, Highfields, Helidon and the Lockyer Valley. Cockroaches, ants, spiders, rodents, silverfish, end-of-lease.
            </p>
            <div className="hero-ctas">
              <Link to="/#quote" className="il-btn">Get a free quote →</Link>
              <a href="tel:+61478711829" className="il-btn-ghost">📞 0478 711 829</a>
            </div>
            <div className="trust-row">
              <div className="check">12-month warranty on general pest</div>
              <div className="check">Pet & child safe</div>
              <div className="check">Family-owned</div>
              <div className="check">Same-day available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="local-block">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {PEST_SERVICES.map((s) => (
            <Link key={s.slug} to={`/pest/${s.slug}`} className="area-card-link">
              <div className="side-card pest" style={{ height: '100%', cursor: 'pointer' }}>
                <h4>{s.name}</h4>
                <p style={{ marginBottom: '12px' }}>{s.description}</p>
                {s.fromPrice && <p style={{ color: 'var(--red)', fontWeight: 900 }}>From ${s.fromPrice}</p>}
                <p style={{ marginTop: '12px', fontWeight: 800, color: 'var(--red)' }}>Learn more →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
