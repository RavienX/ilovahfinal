// Reusable service page template. Pages provide config data; this renders consistently.
import { Link } from 'react-router-dom';
import SEOMeta from '../seo/SEOMeta';
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '../seo/Schema';
import QuoteForm from '../components/QuoteForm';
import { AREAS, PROOF } from '../data/business';
import './areas/Area.css';

export default function ServicePage({
  variant = 'cleaning',
  seo = {},
  hero = {},
  service = {},
  breadcrumbs = [],
  intro = {},
  faqs = [],
  sidebar = {},
  showAllAreas = true,
  customBlock = null,
}) {
  const isBlue = variant === 'cleaning';

  return (
    <>
      <SEOMeta title={seo.title} description={seo.description} path={seo.path} />
      <ServiceSchema name={service.name} description={service.description} priceFrom={service.priceFrom} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className={`area-hero ${variant}`}>
        <div className="area-hero-grid">
          <div>
            <div className="crumbs">
              {breadcrumbs.map((b, i) => (
                <span key={i}>
                  {i > 0 && <span className="sep">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="current">{b.name}</span>
                  ) : (
                    <Link to={b.path}>{b.name}</Link>
                  )}
                </span>
              ))}
            </div>
            <div className="biz-banner"><span className="biz-dot" />{hero.eyebrow}</div>
            <h1>
              {hero.h1Pre} <span className="accent">{hero.h1Accent}</span>
              {hero.h1Post && <> {hero.h1Post}</>}
            </h1>
            <p className="lede">{hero.lede}</p>
            <div className="hero-ctas">
              <a href="#quote" className={`il-btn ${isBlue ? 'il-btn-blue' : ''}`}>
                Get free quote in 60 sec →
              </a>
              <a href="tel:+61478711829" className="il-btn-ghost">📞 0478 711 829</a>
            </div>
            <div className="trust-row">
              {(hero.trustChecks || []).map((t) => <div key={t} className="check">{t}</div>)}
            </div>
          </div>
          <div id="quote">
            <QuoteForm
              variant={variant}
              defaultService={service.slug || ''}
              badge={`⚡ ${hero.formBadge || 'Free Quote'}`}
              title={hero.formTitle || 'Get a free quote'}
              subtitle={hero.formSubtitle || '15-minute SMS reply during business hours'}
            />
          </div>
        </div>
      </section>

      <div className="area-stats">
        <div className="area-stats-inner">
          <div className="trust-stat"><div className="num">{PROOF.customersServed}</div><div className="label"><b>Happy customers</b><br />across Darling Downs</div></div>
          <div className="trust-stat"><div className="num">{PROOF.googleRating}★</div><div className="label"><b>Google rated</b><br />from {PROOF.reviewCount} reviews</div></div>
          <div className="trust-stat"><div className="num">{PROOF.suburbsServiced}</div><div className="label"><b>Suburbs</b><br />serviced</div></div>
          <div className="trust-stat"><div className="num">15min</div><div className="label"><b>Average reply</b><br />to enquiries</div></div>
        </div>
      </div>

      <section className="local-block">
        <div className="local-grid">
          <div className="local-main">
            <h2>
              {intro.h2Pre}{' '}
              <em className={isBlue ? 'blue' : 'red'}>{intro.h2Em}</em>
              {intro.h2Post && <> {intro.h2Post}</>}
            </h2>
            {(intro.paragraphs || []).map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            {intro.list && (
              <>
                {intro.listHeading && <h3>{intro.listHeading}</h3>}
                <ul className="simple-list">
                  {intro.list.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                </ul>
              </>
            )}
            {showAllAreas && (
              <>
                <h3>Suburbs we service</h3>
                <p><b>Toowoomba City + inner suburbs:</b></p>
                <div className={`nearby-areas ${isBlue ? 'blue' : ''}`}>
                  {AREAS.toowoomba.suburbs.map((s) => <a key={s}>{s}</a>)}
                </div>
                <p style={{ marginTop: '14px' }}><b>Highfields region:</b></p>
                <div className={`nearby-areas ${isBlue ? 'blue' : ''}`}>
                  {AREAS.highfields.suburbs.map((s) => <a key={s}>{s}</a>)}
                </div>
                <p style={{ marginTop: '14px' }}><b>Helidon corridor & Lockyer:</b></p>
                <div className={`nearby-areas ${isBlue ? 'blue' : ''}`}>
                  {AREAS.helidon.suburbs.map((s) => <a key={s}>{s}</a>)}
                </div>
              </>
            )}
          </div>
          <aside className="local-sidebar">
            {sidebar.prices && (
              <div className={`side-card ${variant}`}>
                <h4>{sidebar.priceTitle || 'Pricing'}</h4>
                <ul>{sidebar.prices.map((p, i) => <li key={i}>{p}</li>)}</ul>
                {sidebar.priceFootnote && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '12px', fontWeight: 600 }}>
                    {sidebar.priceFootnote}
                  </p>
                )}
              </div>
            )}
            <div className={`side-card dark ${isBlue ? 'combo' : 'combo-blue'}`}>
              <h4>💰 {sidebar.comboTitle || 'Combo Deal'}</h4>
              <p dangerouslySetInnerHTML={{ __html: sidebar.comboBody || '' }} />
              <Link to={sidebar.comboLink || '/combo'} style={{
                background: '#fff', color: isBlue ? 'var(--red)' : 'var(--blue)',
                padding: '10px 18px', fontSize: '0.82rem', borderRadius: '8px',
                display: 'inline-block', fontWeight: 900, fontFamily: 'Nunito',
              }}>
                {sidebar.comboLinkText || 'See combo savings →'}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {customBlock}

      {faqs.length > 0 && (
        <section className="faq-section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">FAQs</div>
              <h2 className="section-title">Questions <em className={isBlue ? 'blue' : ''}>locals</em> ask.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <details key={i} className="faq-item" open={i === 0}>
                  <summary className="faq-q">{f.question}<span className="plus">+</span></summary>
                  <div className="faq-a">{f.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
