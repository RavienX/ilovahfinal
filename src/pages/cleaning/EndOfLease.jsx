import SEOMeta from '../../seo/SEOMeta';
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '../../seo/Schema';
import QuoteForm from '../../components/QuoteForm';
import { Link } from 'react-router-dom';
import { AREAS } from '../../data/business';
import '../areas/Area.css';
import './EndOfLease.css';

const EOL_FAQS = [
  {
    question: 'How much does end-of-lease cleaning cost?',
    answer:
      'Bond cleans start from $350 for a 2-bedroom unit and $450 for a 3-bedroom home in Toowoomba. Pricing depends on size, condition, and add-ons like carpet steam or pest treatment. Get a fixed-price quote in 15 minutes.',
  },
  {
    question: 'Do you guarantee bond back?',
    answer:
      'Yes — 100% bond-back guarantee in writing. If your real estate agent flags anything within 7 days of the clean, we come back and fix it at no extra cost. No questions, no fine print.',
  },
  {
    question: 'What is included in a bond clean?',
    answer:
      'Full property: bathrooms, kitchen, bedrooms, living areas, laundry. Includes cobwebs, light fittings, exhaust fans, windows (internal), all skirting, doors, switches, cupboards, oven, stovetop, range hood, dishwasher, sinks, taps, toilets, showers, baths, tiles & grout, and vacuum/mop of all floors. Add-ons: carpet steam, exterior windows, pressure wash, end-of-lease pest treatment.',
  },
  {
    question: 'How fast can you book me in?',
    answer:
      'We reserve capacity each week for urgent end-of-lease moves. Most bond cleans in Toowoomba, Highfields, and Helidon get booked within 5 working days, often sooner. Call 0478 711 829 for same-week availability.',
  },
  {
    question: 'Should I add end-of-lease pest treatment?',
    answer:
      "Most real estate agents in Toowoomba require an end-of-lease pest treatment if you had pets at the property. Because we run our own pest control business (Rest In Pest), we can do both in one booking and save you up to $150. It's the most popular combo we sell.",
  },
];

export default function EndOfLease() {
  return (
    <>
      <SEOMeta
        title="End of Lease Cleaning Toowoomba & Highfields | Bond-Back Guarantee | iLovah"
        description="Real-estate approved bond cleaning across Toowoomba, Highfields & Helidon. 100% bond-back guaranteed. From $350. Same-week booking. Call 0478 711 829."
        path="/cleaning/end-of-lease"
      />
      <ServiceSchema
        name="End-of-Lease Cleaning"
        description="Real-estate approved bond cleaning with 100% bond-back guarantee, across Toowoomba, Highfields, Helidon and the Darling Downs."
        priceFrom={350}
      />
      <FAQSchema faqs={EOL_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Cleaning', path: '/cleaning' },
          { name: 'End of Lease Cleaning', path: '/cleaning/end-of-lease' },
        ]}
      />

      {/* ============ HERO ============ */}
      <section className="area-hero cleaning">
        <div className="area-hero-grid">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span>Cleaning</span>
              <span className="sep">/</span>
              <span className="current">End of Lease</span>
            </div>

            <div className="biz-banner">
              <span className="biz-dot" />
              iLovah Cleaning Services
            </div>

            <h1>
              End-of-lease cleaning. <span className="accent">Bond back guaranteed.</span>
            </h1>

            <p className="lede">
              Real-estate approved bond cleans across Toowoomba, Highfields, and the Darling Downs.
              We work to the agent's checklist. If they flag anything, we come back and fix it. No
              extra charge. In writing.
            </p>

            <div className="hero-ctas">
              <a href="#quote" className="il-btn il-btn-blue">
                Get bond clean quote →
              </a>
              <a href="tel:+61478711829" className="il-btn-ghost">
                📞 0478 711 829
              </a>
            </div>

            <div className="trust-row">
              <div className="check">100% bond-back guarantee</div>
              <div className="check">From $350</div>
              <div className="check">Real-estate approved</div>
              <div className="check">Same-week booking</div>
            </div>
          </div>

          <div id="quote">
            <QuoteForm
              variant="cleaning"
              defaultService="end-of-lease"
              badge="⚡ Bond Clean Quote"
              title="Bond clean quote"
              subtitle="Fixed price, in your inbox in 15 minutes"
            />
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED ============ */}
      <section className="page-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What's Included</div>
            <h2 className="section-title">
              Every <em className="blue">bond clean</em> covers these.
            </h2>
            <p className="section-sub">
              Built to the standard Toowoomba real-estate inspection checklist.
            </p>
          </div>

          <div className="checklist-grid">
            <div className="checklist-area">
              <h3>🛁 Bathroom, Toilets & Laundry</h3>
              <ul className="checklist">
                <li>All visible ceiling cobwebs removed</li>
                <li>Lights & lampshade bugs cleared</li>
                <li>Exhaust fans & vents cleaned</li>
                <li>Mirrors & internal windows (tracks + glass)</li>
                <li>Power switches, doors, frames, handles</li>
                <li>Toilets, shower screens, shower heads</li>
                <li>Bathtubs, vanities, sinks, taps</li>
                <li>Tiled areas & grout scrubbed</li>
              </ul>
            </div>

            <div className="checklist-area">
              <h3>🍳 Kitchen</h3>
              <ul className="checklist">
                <li>All visible ceiling cobwebs</li>
                <li>Dust fans, lights, lampshade bugs</li>
                <li>Range hood, splash back, cooktop degreased</li>
                <li>Oven, stove top & dishwasher cleaned</li>
                <li>All cupboards, drawers & pantry</li>
                <li>Sinks, faucets, benchtops, switches</li>
                <li>Skirting boards & power sockets</li>
                <li>Vacuum & dust all floors</li>
              </ul>
            </div>

            <div className="checklist-area">
              <h3>🛏️ Living Areas & Bedrooms</h3>
              <ul className="checklist">
                <li>All visible ceiling cobwebs</li>
                <li>Dust fans, lights, lampshades</li>
                <li>Internal window frames, tracks, glass</li>
                <li>Mirrors & glass surfaces</li>
                <li>Dust removal from blinds</li>
                <li>Power switches, doors, skirting</li>
                <li>Cupboards, wardrobes, drawers</li>
                <li>Vacuum & dust all floors</li>
              </ul>
            </div>

            <div className="checklist-area">
              <h3>🪟 Other Areas</h3>
              <ul className="checklist">
                <li>Hard floor mopping (tile, hardwood, laminate)</li>
                <li>Balcony & garage swept</li>
                <li>Wall wash where needed</li>
                <li>
                  <b>Add-on:</b> Carpet steam cleaning
                </li>
                <li>
                  <b>Add-on:</b> Window externals
                </li>
                <li>
                  <b>Add-on:</b> Pressure wash exterior
                </li>
                <li>
                  <b>Add-on:</b> End-of-lease pest treatment
                </li>
              </ul>
            </div>
          </div>

          <div className="guarantee-banner">
            <span className="big">✓</span>
            <div>
              <b>Our 100% Bond-Back Guarantee</b>
              <p>
                If your agent flags anything within 7 days of the clean, we come back and fix it —
                no extra cost, no questions, in writing on your booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICE AREAS ============ */}
      <section className="local-block">
        <div className="local-grid">
          <div className="local-main">
            <h2>
              Bond cleaning in <em className="blue">Toowoomba, Highfields & Helidon</em>.
            </h2>

            <p>
              We service <b>49 suburbs</b> across three clusters — Toowoomba City and inner
              suburbs, the Highfields region, and the Helidon corridor through to Gatton and
              Forest Hill.
            </p>

            <h3>Cleaning suburbs we cover</h3>
            <p>
              <b>Toowoomba City (23 suburbs):</b>
            </p>
            <div className="nearby-areas blue">
              {AREAS.toowoomba.suburbs.map((s) => (
                <a key={s}>{s}</a>
              ))}
            </div>

            <p style={{ marginTop: '16px' }}>
              <b>Highfields region (16 suburbs):</b>
            </p>
            <div className="nearby-areas blue">
              {AREAS.highfields.suburbs.map((s) => (
                <a key={s}>{s}</a>
              ))}
            </div>

            <p style={{ marginTop: '16px' }}>
              <b>Helidon corridor & Lockyer Valley:</b>
            </p>
            <div className="nearby-areas blue">
              {AREAS.helidon.suburbs.map((s) => (
                <a key={s}>{s}</a>
              ))}
            </div>
          </div>

          <aside className="local-sidebar">
            <div className="side-card cleaning">
              <h4>Bond clean pricing</h4>
              <ul>
                <li>1-bed unit from $280</li>
                <li>2-bed unit from $350</li>
                <li>3-bed home from $450</li>
                <li>4+ bed home from $550</li>
              </ul>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '12px', fontWeight: 600 }}>
                Fixed-price quotes. Add carpet steam from $150.
              </p>
            </div>

            <div className="side-card dark combo">
              <h4>💰 Most popular: Combo</h4>
              <p>
                Add an <b>end-of-lease pest treatment</b> and save up to $150. The combo is what
                most Toowoomba renters book — agents love it, bonds always come back.
              </p>
              <Link
                to="/combo"
                style={{
                  background: '#fff',
                  color: 'var(--red)',
                  padding: '10px 18px',
                  fontSize: '0.82rem',
                  borderRadius: '8px',
                  display: 'inline-block',
                  fontWeight: 900,
                  fontFamily: 'Nunito',
                }}
              >
                See combo deals →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Bond Clean FAQs</div>
            <h2 className="section-title">
              Questions <em className="blue">renters & agents</em> ask.
            </h2>
          </div>
          <div className="faq-list">
            {EOL_FAQS.map((f, i) => (
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
