import { Link } from 'react-router-dom';
import SEOMeta from '../../seo/SEOMeta';
import { BreadcrumbSchema } from '../../seo/Schema';
import { AREAS, PROOF } from '../../data/business';
import './Area.css';

export default function AreasHub() {
  return (
    <>
      <SEOMeta
        title="Service Areas — Toowoomba, Highfields, Helidon & Lockyer Valley"
        description="iLovah Cleaning and Rest In Pest Control service 49 suburbs across the Darling Downs: Toowoomba City, Highfields region, and the Helidon/Lockyer corridor."
        path="/areas"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/areas' },
      ]} />

      <section className="area-hero cleaning">
        <div className="area-hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '900px' }}>
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">Service Areas</span>
            </div>
            <h1>
              <span className="accent">49 suburbs</span> across the Darling Downs.
            </h1>
            <p className="lede">
              Family-owned cleaning and pest control covering three main clusters: Toowoomba City, the Highfields region, and the Helidon-Lockyer corridor where we\'re based.
            </p>
          </div>
        </div>
      </section>

      <div className="area-stats">
        <div className="area-stats-inner">
          <div className="trust-stat"><div className="num">49</div><div className="label"><b>Suburbs</b><br />total coverage</div></div>
          <div className="trust-stat"><div className="num">3</div><div className="label"><b>Main clusters</b><br />Darling Downs</div></div>
          <div className="trust-stat"><div className="num">{PROOF.customersServed}</div><div className="label"><b>Happy customers</b><br />across the region</div></div>
          <div className="trust-stat"><div className="num">{PROOF.googleRating}★</div><div className="label"><b>Google rated</b><br />{PROOF.reviewCount} reviews</div></div>
        </div>
      </div>

      <section className="local-block">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {Object.entries(AREAS).map(([key, area]) => (
            <Link key={key} to={`/areas/${key}`} className="area-card-link">
              <div className="side-card" style={{ height: '100%', cursor: 'pointer' }}>
                <h4>{area.name}</h4>
                <p style={{ marginBottom: '12px' }}><b>{area.suburbs.length} suburbs</b> · {area.description}</p>
                <div className="nearby-areas">
                  {area.suburbs.slice(0, 8).map((s) => <a key={s}>{s}</a>)}
                  {area.suburbs.length > 8 && <a>+{area.suburbs.length - 8} more</a>}
                </div>
                <p style={{ marginTop: '12px', fontWeight: 800, color: 'var(--red)' }}>See {area.name} →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
