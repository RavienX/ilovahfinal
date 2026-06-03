import SEOMeta from '../seo/SEOMeta';
import {
  CleaningBusinessSchema,
  PestBusinessSchema,
  FAQSchema,
} from '../seo/Schema';
import QuoteForm from '../components/QuoteForm';
import { Link } from 'react-router-dom';
import { PROOF, AREAS } from '../data/business';
import './Home.css';

const HOME_FAQS = [
  {
    question: 'Do you do both cleaning and pest control?',
    answer:
      'Yes — we run two licensed businesses under one roof. iLovah Cleaning Services handles all your cleaning needs (end-of-lease, regular, carpet, windows, gutters, pressure washing). Rest In Pest Control Service handles pest control with our 12-month warranty. Book both together and save up to $150.',
  },
  {
    question: 'What suburbs do you service?',
    answer:
      'We service 49 suburbs across three clusters: Toowoomba City and inner suburbs (23 suburbs including Rangeville, East Toowoomba, Centenary Heights), Highfields region (15 suburbs including Cabarlah, Meringandan, Cotswold Hills), and the Helidon corridor including Gatton, Withcott, and Forest Hill.',
  },
  {
    question: 'Is your pest control treatment safe for pets and kids?',
    answer:
      'Yes — we use approved products applied to manufacturer label rates. Pets and kids can return to treated rooms as soon as surfaces are dry (usually 1-2 hours). Every pest treatment is backed by our 12-month written warranty — if they come back inside the year, so do we, free.',
  },
  {
    question: 'How fast can you book us in?',
    answer:
      'Most cleaning and pest jobs we can book within the same week. We reserve capacity each week for urgent end-of-lease moves and severe pest infestations.',
  },
];

export default function Home() {
  return (
    <>
      <SEOMeta
        title="iLovah Cleaning & Rest In Pest Control — Toowoomba, Highfields, Helidon"
        description="Family-owned cleaning & pest control across Toowoomba, Highfields, Helidon & Darling Downs. Bond-back guarantee, 12-month pest warranty. Call 0478 711 829."
        path="/"
      />
      <CleaningBusinessSchema />
      <PestBusinessSchema />
      <FAQSchema faqs={HOME_FAQS} />

      {/* ============ DUAL HERO ============ */}
      <section className="dual-hero">
        <div className="hero-side cleaning">
          <div className="hero-inner">
            <div className="side-eyebrow blue">
              <span className="dot" />
              iLovah Cleaning Services
            </div>
            <h1>
              Bond-back <span className="accent-blue">cleaning</span> across Toowoomba.
            </h1>
            <p className="lede">
              Real-estate approved end-of-lease cleans, regular home cleans, carpet, windows,
              gutters, pressure washing. 1,000+ happy customers across the Darling Downs.
            </p>
            <ul className="feats">
              <li>100% bond-back guarantee in writing</li>
              <li>Same-week booking available</li>
              <li>5-star Google rated across {PROOF.reviewCount} reviews</li>
            </ul>
            <div className="hero-ctas">
              <Link to="/cleaning/end-of-lease" className="il-btn il-btn-blue">
                Get Cleaning Quote →
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-or">OR</div>

        <div className="hero-side pest">
          <div className="hero-inner right">
            <div className="side-eyebrow red">
              <span className="dot" />
              Rest In Pest Control Service
            </div>
            <h1>
              Pest control <span className="accent-red">guaranteed for 12 months</span>.
            </h1>
            <p className="lede">
              Cockroaches, ants, spiders, rodents — gone. Pet-safe products, local Helidon family team, 12-month written warranty on every treatment. If they come back, so do we.
            </p>
            <ul className="feats">
              <li>12-month written warranty</li>
              <li>Pet & kid-safe products</li>
              <li>Local Helidon family business</li>
            </ul>
            <div className="hero-ctas">
              <Link to="/pest-control" className="il-btn">
                Get Pest Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMBO BANNER ============ */}
      <div className="combo-banner">
        <span className="save-tag">💰 Save up to $150</span>
        <p>
          Book your <strong>bond clean + end-of-lease pest treatment together</strong>
        </p>
        <Link to="/combo">See combo deals →</Link>
      </div>

      {/* ============ TRUST STRIP ============ */}
      <div className="trust-strip">
        <div className="trust-strip-inner">
          <div className="trust-stat">
            <div className="num">{PROOF.customersServed}</div>
            <div className="label">
              <b>Happy customers</b>
              <br />
              across Toowoomba
            </div>
          </div>
          <div className="trust-stat">
            <div className="num">{PROOF.googleRating}★</div>
            <div className="label">
              <b>Google rated</b>
              <br />
              from {PROOF.reviewCount}+ reviews
            </div>
          </div>
          <div className="trust-stat">
            <div className="num">{PROOF.suburbsServiced}</div>
            <div className="label">
              <b>Suburbs serviced</b>
              <br />
              across Darling Downs
            </div>
          </div>
          <div className="trust-stat">
            <div className="num">{PROOF.pestWarrantyMonths}mo</div>
            <div className="label">
              <b>Pest warranty</b>
              <br />
              on every treatment
            </div>
          </div>
        </div>
      </div>

      {/* ============ AREAS / GEO ============ */}
      <section className="page-section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Service Areas</div>
            <h2 className="section-title">
              49 suburbs across <em>Toowoomba</em>, <em className="blue">Highfields</em> & the
              Darling Downs
            </h2>
            <p className="section-sub">
              Click your cluster to see services, pricing, and recent jobs done in your area.
            </p>
          </div>

          <div className="areas-clusters">
            {Object.values(AREAS).map((area) => (
              <Link key={area.slug} to={`/areas/${area.slug}`} className="cluster-card">
                <div className="cluster-head">
                  <div className="cluster-icon">
                    {area.slug === 'toowoomba' ? '🏙️' : area.slug === 'highfields' ? '🌳' : '🏡'}
                  </div>
                  <h3>
                    {area.headline}
                    <small>{area.suburbs.length} suburbs</small>
                  </h3>
                </div>
                <p>{area.description}</p>
                <div className="suburb-tags">
                  {area.suburbs.slice(0, 5).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                {area.suburbs.length > 5 && (
                  <div className="more">+ {area.suburbs.length - 5} more suburbs</div>
                )}
                <div className="link">View {area.name} services →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUOTE FORM (#quote anchor target) ============ */}
      <section id="quote" className="quote-section">
        <div className="container quote-wrap">
          <div>
            <div className="eyebrow" style={{ color: 'var(--red)' }}>Get a Free Quote</div>
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 16px' }}>
              Tell us what you need.
              <br />
              We reply in <em>15 minutes</em>.
            </h2>
            <p className="section-sub" style={{ textAlign: 'left', margin: '0 0 24px' }}>
              No spam, no obligation. Most quotes sent the same day during business hours.
            </p>
            <ul className="quote-bullets">
              <li>Fixed-price quotes — no surprises on invoice day</li>
              <li>Same-week booking available across most suburbs</li>
              <li>One team for cleaning AND pest — save with combo deals</li>
            </ul>
          </div>
          <QuoteForm
            variant="cleaning"
            badge="⚡ Free Quote"
            title="Free quote in 60 seconds"
            subtitle="We'll SMS you back within 15 minutes."
          />
        </div>
      </section>
    </>
  );
}
