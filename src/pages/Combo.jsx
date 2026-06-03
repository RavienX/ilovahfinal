import { Link } from 'react-router-dom';
import SEOMeta from '../seo/SEOMeta';
import { FAQSchema, BreadcrumbSchema } from '../seo/Schema';
import QuoteForm from '../components/QuoteForm';
import { CONTACT, PROOF } from '../data/business';
import './areas/Area.css';

const COMBOS = [
  {
    name: 'End-of-Lease Bundle',
    tagline: 'The complete move-out package',
    services: ['Bond clean (bond-back guaranteed)', 'Carpet steam clean', 'End-of-lease pest treatment + report'],
    saving: 150,
    bestFor: 'Anyone moving out of a rental in Toowoomba, Highfields or Lockyer',
    color: 'blue',
  },
  {
    name: 'Pre-Summer Reset',
    tagline: 'Get your home ready for storm season',
    services: ['Gutter cleaning + downpipe flush', 'Driveway & patio pressure wash', 'General pest treatment (cockroaches/ants/spiders)'],
    saving: 120,
    bestFor: 'Homeowners across the Darling Downs — best done Sept/Oct',
    color: 'red',
  },
  {
    name: 'New Home Welcome',
    tagline: 'Move into a properly clean home',
    services: ['Full deep clean of empty property', 'Carpet steam clean', 'General pest treatment'],
    saving: 130,
    bestFor: 'New homeowners or anyone moving into a new rental',
    color: 'blue',
  },
  {
    name: 'Regular Clean + Pest',
    tagline: 'Annual peace of mind',
    services: ['Fortnightly regular house clean', 'Annual general pest treatment', '12-month pest warranty'],
    saving: 80,
    bestFor: 'Busy families who want their home looked after, full stop',
    color: 'red',
  },
  {
    name: 'Acreage Special',
    tagline: 'Built for Lockyer & Highfields blocks',
    services: ['Long driveway pressure wash', 'Gutter clean (acreage scale)', 'Spider + rodent treatment'],
    saving: 100,
    bestFor: 'Acreage properties in Helidon corridor, Highfields region',
    color: 'red',
  },
  {
    name: 'Pre-Sale Polish',
    tagline: 'Sell faster, sell higher',
    services: ['Deep house clean', 'Window cleaning (inside + out)', 'Driveway pressure wash', 'Carpet steam'],
    saving: 180,
    bestFor: 'Anyone selling a home — first impressions matter most',
    color: 'blue',
  },
];

const FAQS = [
  { question: 'Why are combos cheaper?', answer: 'One visit, one team, one invoice — that\'s where the saving comes from. We\'re already at your property, so adding the second service costs us less than two separate trips. We pass that saving back.' },
  { question: 'Can I customise a combo?', answer: 'Yes. The combos above are our most-booked, but mix and match anything you need. Call us and we\'ll quote it.' },
  { question: 'Same warranty when bundled?', answer: 'Yes — the 12-month pest warranty applies whether you book pest on its own or in a combo. Same for bond-back on end-of-lease cleaning.' },
  { question: 'Do I pay upfront?', answer: 'No — pay on completion. We invoice you after the job. Bank transfer, card, or cash all accepted.' },
];

export default function Combo() {
  return (
    <>
      <SEOMeta
        title="Cleaning + Pest Combo Deals | Save up to $180 | iLovah & Rest In Pest"
        description="Bundle cleaning and pest control services to save up to $180. End-of-lease, pre-summer reset, new home welcome, regular + pest, acreage, pre-sale polish bundles."
        path="/combo"
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Combo Deals', path: '/combo' },
      ]} />

      <section className="area-hero pest">
        <div className="area-hero-grid">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">Combo Deals</span>
            </div>
            <div className="biz-banner"><span className="biz-dot" />Bundle cleaning + pest · One team · One invoice</div>
            <h1>
              Cleaning + pest. <span className="accent">Save up to $180.</span>
            </h1>
            <p className="lede">
              We\'re the only family-owned team in the area doing both cleaning AND pest control. That means one visit, one invoice, one team you trust — and meaningful savings versus booking two separate businesses.
            </p>
            <div className="hero-ctas">
              <a href="#quote" className="il-btn">Get combo quote →</a>
              <a href={`tel:${CONTACT.phoneTel}`} className="il-btn-ghost">📞 {CONTACT.phone}</a>
            </div>
            <div className="trust-row">
              <div className="check">One team, one visit</div>
              <div className="check">Same warranties apply</div>
              <div className="check">Save up to $180</div>
              <div className="check">Pay on completion</div>
            </div>
          </div>
          <div id="quote">
            <QuoteForm
              variant="pest"
              badge="⚡ Free Combo Quote"
              title="Get a combo quote"
              subtitle="Tell us what you need — we\'ll bundle and price it"
            />
          </div>
        </div>
      </section>

      <section className="local-block">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-head" style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="eyebrow">Most-booked bundles</div>
            <h2 className="section-title">Our 6 most popular <em className="red">combo deals</em>.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {COMBOS.map((combo) => (
              <div key={combo.name} className={`side-card ${combo.color === 'red' ? 'pest' : 'cleaning'}`} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', right: '14px', background: combo.color === 'red' ? 'var(--red)' : 'var(--blue)', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 900 }}>
                  Save ${combo.saving}
                </div>
                <h4>{combo.name}</h4>
                <p style={{ fontStyle: 'italic', color: 'var(--muted)', marginBottom: '12px' }}>{combo.tagline}</p>
                <ul>
                  {combo.services.map((s) => <li key={s}>{s}</li>)}
                </ul>
                <p style={{ marginTop: '12px', fontSize: '0.85rem' }}><b>Best for:</b> {combo.bestFor}</p>
                <a href="#quote" className="il-btn" style={{ marginTop: '12px', display: 'inline-block', padding: '10px 18px', fontSize: '0.85rem' }}>
                  Get this combo →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Combo FAQs</div>
            <h2 className="section-title">How <em className="red">bundling works</em>.</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details key={i} className="faq-item" open={i === 0}>
                <summary className="faq-q">{f.question}<span className="plus">+</span></summary>
                <div className="faq-a">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
