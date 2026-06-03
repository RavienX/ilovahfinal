import { Link } from 'react-router-dom';
import SEOMeta from '../../seo/SEOMeta';
import { CleaningBusinessSchema, PestBusinessSchema, FAQSchema, BreadcrumbSchema } from '../../seo/Schema';
import QuoteForm from '../../components/QuoteForm';
import { AREAS, CONTACT, PROOF } from '../../data/business';
import './Area.css';

const FAQS = [
  { question: 'Do you service Highfields, Cabarlah and Meringandan?', answer: 'Yes — Highfields is one of our three main service areas. We cover all surrounding suburbs including Cabarlah, Meringandan, Meringandan West, Cotswold Hills, Kingsthorpe, Gowrie Junction, Charlton, Wellcamp, Mount Rascal, Vale View, Hodgson Vale, Preston and Birnam. Our home base in Helidon is only 25 minutes away.' },
  { question: 'Do you do acreage properties in Highfields?', answer: 'Yes — most of our Highfields work is acreage. We have the right equipment for larger blocks: industrial pressure washers, extended-reach gear, and time. Driveway pressure washing on a long acreage drive is one of our most-booked services here.' },
  { question: 'Can you do end-of-lease cleaning + pest on a Highfields rental?', answer: 'Absolutely. Bond clean + pest treatment + carpet steam is our most common bundle for Highfields rentals — saves you about $150 vs booking separately, and we provide the real-estate-approved pest report.' },
  { question: 'Travel fees out to the further suburbs?', answer: 'No — flat pricing across all 16 suburbs in our Highfields service cluster. Same rate whether you\'re in Highfields town or Birnam.' },
  { question: 'How quickly can you book me in?', answer: 'Highfields jobs typically within 3-7 days for regular bookings. Urgent end-of-lease cleaning often same-week. Pest control sometimes same-day if we\'re already in the area.' },
];

export default function Highfields() {
  return (
    <>
      <SEOMeta
        title="Cleaning & Pest Control Highfields | Cabarlah, Meringandan, Cotswold Hills"
        description="Family-owned cleaning and pest control across Highfields, Cabarlah, Meringandan, Cotswold Hills, Kingsthorpe and 11 more suburbs. Bond-back guarantee. 12-month pest warranty."
        path="/areas/highfields"
      />
      <CleaningBusinessSchema />
      <PestBusinessSchema />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/areas' },
        { name: 'Highfields', path: '/areas/highfields' },
      ]} />

      <section className="area-hero cleaning">
        <div className="area-hero-grid">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/areas">Service Areas</Link>
              <span className="sep">/</span>
              <span className="current">Highfields</span>
            </div>
            <div className="biz-banner"><span className="biz-dot" />iLovah Cleaning · Rest In Pest · Servicing Highfields region</div>
            <h1>
              Cleaning & pest control across <span className="accent">Highfields</span> and surrounds.
            </h1>
            <p className="lede">
              Family homes, acreage properties, rentals. Bond-back guarantee on cleaning. 12-month warranty on pest control. Same family-owned team. From {CONTACT.address.suburb}, 25 minutes away.
            </p>
            <div className="hero-ctas">
              <a href="#quote" className="il-btn il-btn-blue">Get free quote in 60 sec →</a>
              <a href="tel:+61478711829" className="il-btn-ghost">📞 {CONTACT.phone}</a>
            </div>
            <div className="trust-row">
              <div className="check">Acreage-friendly</div>
              <div className="check">Bond back guaranteed</div>
              <div className="check">Pet & child safe pest products</div>
              <div className="check">No travel fees within cluster</div>
            </div>
          </div>
          <div id="quote">
            <QuoteForm
              variant="cleaning"
              badge="⚡ Free Quote"
              title="Get a free quote — Highfields"
              subtitle="15-minute SMS reply during business hours"
            />
          </div>
        </div>
      </section>

      <div className="area-stats">
        <div className="area-stats-inner">
          <div className="trust-stat"><div className="num">{PROOF.customersServed}</div><div className="label"><b>Happy customers</b><br />across Darling Downs</div></div>
          <div className="trust-stat"><div className="num">{PROOF.googleRating}★</div><div className="label"><b>Google rated</b><br />from {PROOF.reviewCount} reviews</div></div>
          <div className="trust-stat"><div className="num">16</div><div className="label"><b>Suburbs</b><br />Highfields cluster</div></div>
          <div className="trust-stat"><div className="num">25min</div><div className="label"><b>From our base</b><br />in Helidon</div></div>
        </div>
      </div>

      <section className="local-block">
        <div className="local-grid">
          <div className="local-main">
            <h2>The local team Highfields families <em className="blue">actually call back.</em></h2>
            <p>
              Highfields has grown fast over the last decade. Newer estates, family homes, acreage lifestyle blocks. With that growth comes a lot of cleaning and pest control jobs — and a lot of dodgy "tradies" promising the world and delivering a half-effort.
            </p>
            <p>
              We're different. <b>Family-owned</b>, based in Helidon, run by Francis Velasco. When you call, you get him or his team — not a call centre. When a job\'s done, we ask if there\'s anything we missed. If something\'s wrong, we come back.
            </p>
            <p>
              That\'s why we have a steady book of regular clients across Highfields, Cabarlah, Cotswold Hills, Kingsthorpe. We don\'t advertise much. We don\'t need to.
            </p>

            <h3>What we do in Highfields</h3>
            <ul className="simple-list">
              <li><b>End-of-lease cleans</b> with bond-back guarantee — our biggest service here, lots of rentals</li>
              <li><b>Regular house cleans</b> — same cleaner each visit, weekly/fortnightly</li>
              <li><b>Acreage pressure washing</b> — long driveways, big patios, retaining walls</li>
              <li><b>General pest control</b> — cockroaches, ants, spiders, with 12-month warranty</li>
              <li><b>Carpet, gutter, window cleaning</b></li>
              <li><b>Pram and baby gear cleaning</b> — pickup and drop-off</li>
            </ul>

            <h3>Suburbs in the Highfields service area</h3>
            <p>All 16 suburbs serviced at the same flat rate — no extra for distance:</p>
            <div className="nearby-areas blue">
              {AREAS.highfields.suburbs.map((s) => <a key={s}>{s}</a>)}
            </div>
          </div>

          <aside className="local-sidebar">
            <div className="side-card cleaning">
              <h4>Most-booked in Highfields</h4>
              <ul>
                <li><Link to="/cleaning/end-of-lease">End-of-lease cleaning</Link></li>
                <li><Link to="/cleaning/pressure-washing">Driveway pressure wash</Link></li>
                <li><Link to="/cleaning/regular-house-clean">Regular house cleaning</Link></li>
                <li><Link to="/pest/cockroach-control">Cockroach control</Link></li>
                <li><Link to="/pest/spider-control">Spider control</Link></li>
              </ul>
            </div>
            <div className="side-card dark combo">
              <h4>💰 Local Bundle Deal</h4>
              <p>Bond clean + pest treatment + carpet steam = <b>save ~$150</b> for departing Highfields tenants.</p>
              <Link to="/combo" style={{ background: '#fff', color: 'var(--red)', padding: '10px 18px', fontSize: '0.82rem', borderRadius: '8px', display: 'inline-block', fontWeight: 900, fontFamily: 'Nunito' }}>
                See combo savings →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Highfields FAQs</div>
            <h2 className="section-title">Questions from <em className="blue">Highfields locals</em>.</h2>
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
