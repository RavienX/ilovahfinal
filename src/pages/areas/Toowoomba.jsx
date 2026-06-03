import SEOMeta from '../../seo/SEOMeta';
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '../../seo/Schema';
import QuoteForm from '../../components/QuoteForm';
import { Link } from 'react-router-dom';
import { AREAS, PROOF } from '../../data/business';
import '../areas/Area.css';

const TOOWOOMBA_FAQS = [
  {
    question: 'Do you service all Toowoomba suburbs?',
    answer:
      'Yes — we cover all 23 inner Toowoomba suburbs including CBD, East Toowoomba, North Toowoomba, South Toowoomba, Newtown, Mount Lofty, Rangeville, Centenary Heights, Middle Ridge, Kearneys Spring, Wilsonton, Wilsonton Heights, Harristown, Darling Heights, Glenvale, Rockville, Harlaxton, Mount Kynoch, Prince Henry Heights, Redwood, Top Camp, Cranley, Drayton, Westbrook, and Torrington.',
  },
  {
    question: 'How much does a bond clean cost in Toowoomba?',
    answer:
      'Bond cleans in Toowoomba start from $350 for a 2-bedroom unit. 3-bed homes from $450. We send fixed-price quotes within 15 minutes during business hours — no surprises on invoice day.',
  },
  {
    question: 'How fast can you do an end-of-lease clean in Toowoomba?',
    answer:
      'We reserve capacity each week for urgent end-of-lease cleans. Most Toowoomba bond cleans booked within 5 working days, often sooner. Call 0478 711 829 for same-week availability.',
  },
  {
    question: 'Do you do pest control in Toowoomba too?',
    answer:
      'Yes — we run cleaning and pest control under one roof. Book a cleaning + pest combo and save up to $150. Every pest treatment includes a 12-month written warranty — if they come back, so do we.',
  },
];

export default function ToowoombaArea() {
  const area = AREAS.toowoomba;

  return (
    <>
      <SEOMeta
        title="Cleaning & Pest Control Toowoomba | Bond-Back Guarantee | iLovah & Rest In Pest"
        description="Professional cleaning & pest control across 23 Toowoomba suburbs. End-of-lease, carpet, windows, gutters, pest. Bond-back & 12-month warranty. Call 0478 711 829."
        path="/areas/toowoomba"
      />
      <ServiceSchema
        name="House Cleaning & Pest Control in Toowoomba"
        description="End-of-lease cleaning, carpet, windows, gutters, pressure washing, and pest control across Toowoomba City and 22 inner suburbs."
        priceFrom={150}
        area="Toowoomba"
      />
      <FAQSchema faqs={TOOWOOMBA_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/areas' },
          { name: 'Toowoomba', path: '/areas/toowoomba' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="area-hero cleaning">
        <div className="area-hero-grid">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/areas">Service Areas</Link>
              <span className="sep">/</span>
              <span className="current">Toowoomba</span>
            </div>

            <div className="biz-banner">
              <span className="biz-dot" />
              iLovah Cleaning & Rest In Pest — Toowoomba
            </div>

            <h1>
              Cleaning & pest control across <span className="accent">Toowoomba</span>.
            </h1>

            <p className="lede">
              23 Toowoomba inner suburbs serviced. Bond-back cleaning, regular home cleans, carpet,
              windows, gutters, plus pest control with 12-month warranty — by your local family-owned team.
            </p>

            <div className="hero-ctas">
              <a href="#quote" className="il-btn il-btn-blue">
                Get free quote in 60 sec →
              </a>
              <a href="tel:+61478711829" className="il-btn-ghost">
                📞 0478 711 829
              </a>
            </div>

            <div className="trust-row">
              <div className="check">100% bond-back guarantee</div>
              <div className="check">Same-week booking</div>
              <div className="check">12-month pest warranty</div>
              <div className="check">450+ Toowoomba jobs done</div>
            </div>
          </div>

          <div id="quote">
            <QuoteForm
              variant="cleaning"
              defaultSuburb="Toowoomba"
              badge="⚡ Toowoomba Quote"
              title="Toowoomba quote"
              subtitle="15-minute SMS reply during business hours"
            />
          </div>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <div className="area-stats">
        <div className="area-stats-inner">
          <div className="trust-stat">
            <div className="num">450+</div>
            <div className="label">
              <b>Toowoomba jobs</b>
              <br />
              completed
            </div>
          </div>
          <div className="trust-stat">
            <div className="num">23</div>
            <div className="label">
              <b>Inner suburbs</b>
              <br />
              covered
            </div>
          </div>
          <div className="trust-stat">
            <div className="num">15min</div>
            <div className="label">
              <b>Average reply</b>
              <br />
              to enquiries
            </div>
          </div>
          <div className="trust-stat">
            <div className="num">{PROOF.googleRating}★</div>
            <div className="label">
              <b>Google rated</b>
              <br />
              by Toowoomba locals
            </div>
          </div>
        </div>
      </div>

      {/* ============ LOCAL CONTENT BLOCK ============ */}
      <section className="local-block">
        <div className="local-grid">
          <div className="local-main">
            <h2>
              Cleaning & pest control built for <em className="blue">Toowoomba homes</em>.
            </h2>

            <p>
              Toowoomba's mix of older Queenslanders, modern estates, and high-rotation rentals
              means cleaning and pest needs vary suburb to suburb. We've done{' '}
              <b>450+ jobs across Toowoomba</b> — from East Toowoomba weatherboards to brand-new
              Glenvale builds — and we know exactly what each real estate agent looks for.
            </p>

            <p>
              For renters: most Toowoomba real estate agents have a standard inspection checklist.
              Our <b>end-of-lease team works to that exact checklist</b>, with our 100% bond-back
              guarantee in writing. If your agent flags anything within 7 days, we come back and
              fix it. Free.
            </p>

            <h3>Toowoomba suburbs we service</h3>
            <div className="nearby-areas blue">
              {area.suburbs.map((s) => (
                <a key={s}>{s}</a>
              ))}
            </div>

            <h3>What our Toowoomba team handles</h3>
            <ul className="simple-list">
              <li>
                <b>End-of-lease & bond cleans:</b> from $350, real-estate approved checklist,
                bond-back guaranteed
              </li>
              <li>
                <b>Regular home cleans:</b> weekly, fortnightly, monthly — Toowoomba locals love
                the consistency
              </li>
              <li>
                <b>Carpet, windows, gutters, pressure washing:</b> standalone or bolted onto a
                bond clean
              </li>
              <li>
                <b>Pest control:</b> cockroaches, ants, spiders, rodents — 12-month warranty
              </li>
              <li>
                <b>Combo deals:</b> clean + pest together saves you up to $150
              </li>
            </ul>

            <p style={{ marginTop: '22px' }}>
              Outside Toowoomba? See our{' '}
              <Link to="/areas/highfields" style={{ color: 'var(--blue)', fontWeight: 800 }}>
                Highfields
              </Link>{' '}
              or{' '}
              <Link to="/areas/helidon" style={{ color: 'var(--red)', fontWeight: 800 }}>
                Helidon
              </Link>{' '}
              service pages.
            </p>
          </div>

          <aside className="local-sidebar">
            <div className="side-card cleaning">
              <h4>Toowoomba pricing</h4>
              <ul>
                <li>2-bed bond clean from $350</li>
                <li>3-bed bond clean from $450</li>
                <li>Pest treatment from $220</li>
                <li>Carpet steam from $150</li>
              </ul>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '12px', fontWeight: 600 }}>
                Fixed-price quotes only. No surprises on invoice day.
              </p>
            </div>

            <div className="side-card dark combo">
              <h4>💰 Combo Deal</h4>
              <p>
                Add an <b>end-of-lease pest treatment</b> to your Toowoomba bond clean — save up to
                $150 because we're the only team doing both.
              </p>
              <Link
                to="/combo"
                className="il-btn"
                style={{
                  background: '#fff',
                  color: 'var(--red)',
                  padding: '10px 18px',
                  fontSize: '0.82rem',
                  boxShadow: 'none',
                }}
              >
                See combo savings →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Toowoomba FAQs</div>
            <h2 className="section-title">
              Questions <em className="blue">Toowoomba locals</em> ask.
            </h2>
          </div>
          <div className="faq-list">
            {TOOWOOMBA_FAQS.map((f, i) => (
              <details key={i} className="faq-item" open={i === 0}>
                <summary className="faq-q">
                  {f.question}
                  <span className="plus">+</span>
                </summary>
                <div className="faq-a">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
