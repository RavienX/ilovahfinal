import { Link } from 'react-router-dom';
import SEOMeta from '../../seo/SEOMeta';
import { CleaningBusinessSchema, PestBusinessSchema, FAQSchema, BreadcrumbSchema } from '../../seo/Schema';
import QuoteForm from '../../components/QuoteForm';
import { AREAS, CONTACT, PROOF } from '../../data/business';
import './Area.css';

const FAQS = [
  { question: 'You\'re based in Helidon, right?', answer: 'Yes — Helidon is home. Our base is at 37 Seventeen Mile Road. We\'re Helidon locals, we know the area, and we cover the surrounding Lockyer Valley properly because it\'s our backyard.' },
  { question: 'Which Lockyer suburbs do you cover?', answer: 'Helidon, Helidon Spa, Murphys Creek, Postmans Ridge, Withcott, Gatton, Forest Hill, Laidley, Plainland, Grantham and Cambooya. Anything further out, give us a call — we may still help.' },
  { question: 'Acreage and rural properties?', answer: 'Yes — most Helidon-corridor work is acreage. We have industrial-grade pressure washers, extended-reach gear, and the time to do a proper job on bigger properties. Long gravel drives, big sheds, retaining walls — all routine for us.' },
  { question: 'Pest control on rural properties — spiders, rodents?', answer: 'These are our most-booked rural pest jobs. Spiders thrive in sheds and around outdoor lights. Rodents move inside through winter. We treat both with 12-month warranties (spiders) and 30-day follow-up (rodents).' },
  { question: 'Do you do bond cleans for Gatton and Laidley rentals?', answer: 'Often. End-of-lease cleaning + pest treatment is one of our biggest service combinations for the Lockyer rental market. Bond-back guarantee on the cleaning, professional report on the pest.' },
  { question: 'Travel charges to Cambooya or Grantham?', answer: 'No travel charges within the 11-suburb cluster. Same flat pricing whether you\'re in Helidon or Cambooya.' },
];

export default function Helidon() {
  return (
    <>
      <SEOMeta
        title="Cleaning & Pest Control Helidon, Withcott, Gatton & Lockyer Valley"
        description="Helidon-based family business. Cleaning and pest control across Helidon, Helidon Spa, Murphys Creek, Withcott, Gatton, Forest Hill, Laidley, Plainland, Grantham, Cambooya. Bond-back guarantee."
        path="/areas/helidon"
      />
      <CleaningBusinessSchema />
      <PestBusinessSchema />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/areas' },
        { name: 'Helidon & Lockyer', path: '/areas/helidon' },
      ]} />

      <section className="area-hero pest">
        <div className="area-hero-grid">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/areas">Service Areas</Link>
              <span className="sep">/</span>
              <span className="current">Helidon & Lockyer</span>
            </div>
            <div className="biz-banner"><span className="biz-dot" />iLovah Cleaning · Rest In Pest · Based right here in Helidon</div>
            <h1>
              The <span className="accent">Helidon-local</span> team for cleaning and pest control.
            </h1>
            <p className="lede">
              This is home. We\'re at 37 Seventeen Mile Road, and we\'ve been looking after homes and acreage from Murphys Creek to Plainland for years. Family-owned. Bond-back guarantee. 12-month pest warranty.
            </p>
            <div className="hero-ctas">
              <a href="#quote" className="il-btn">Get free quote in 60 sec →</a>
              <a href="tel:+61478711829" className="il-btn-ghost">📞 {CONTACT.phone}</a>
            </div>
            <div className="trust-row">
              <div className="check">Helidon-based, local team</div>
              <div className="check">Acreage specialists</div>
              <div className="check">Same-week bookings</div>
              <div className="check">No travel fees in cluster</div>
            </div>
          </div>
          <div id="quote">
            <QuoteForm
              variant="pest"
              badge="⚡ Free Quote"
              title="Get a free quote — Helidon area"
              subtitle="15-minute SMS reply during business hours"
            />
          </div>
        </div>
      </section>

      <div className="area-stats">
        <div className="area-stats-inner">
          <div className="trust-stat"><div className="num">{PROOF.customersServed}</div><div className="label"><b>Happy customers</b><br />across Darling Downs</div></div>
          <div className="trust-stat"><div className="num">{PROOF.googleRating}★</div><div className="label"><b>Google rated</b><br />from {PROOF.reviewCount} reviews</div></div>
          <div className="trust-stat"><div className="num">11</div><div className="label"><b>Lockyer suburbs</b><br />serviced</div></div>
          <div className="trust-stat"><div className="num">Local</div><div className="label"><b>Right here</b><br />in Helidon</div></div>
        </div>
      </div>

      <section className="local-block">
        <div className="local-grid">
          <div className="local-main">
            <h2>Helidon, Lockyer, all the way out to <em className="red">Cambooya.</em></h2>
            <p>
              The Lockyer Valley is its own kind of place. Acreage. Rural lots. Older Queenslanders. Big gardens that breed big spiders. Long driveways that get dirty. Sheds full of redbacks. Mice that move in through winter.
            </p>
            <p>
              The thing about rural pest and cleaning work is — most Brisbane or Toowoomba operators won\'t come out here properly. They\'ll charge a travel fee, rush the job, and disappear. <b>We live here.</b> We\'re your neighbours. Word travels fast in small communities, and we couldn\'t survive doing dodgy work even if we wanted to.
            </p>
            <p>
              That\'s why we have steady regulars from Murphys Creek to Cambooya. Same family team, same trusted name.
            </p>

            <h3>What we\'re most often called for</h3>
            <ul className="simple-list">
              <li><b>Spider treatments</b> — webbing spiders along eaves, redbacks in sheds. Standard rural problem.</li>
              <li><b>Rodent control</b> — winter mice and rats moving in from paddocks. Tamper-proof baiting.</li>
              <li><b>Driveway pressure washing</b> — long gravel/concrete drives that look terrible after a wet season</li>
              <li><b>End-of-lease cleaning + pest</b> — for Gatton, Laidley, Plainland rentals</li>
              <li><b>Acreage gutter cleaning</b> — before storm season hits the Downs</li>
              <li><b>Carpet steam cleaning</b> — homes with red-soil dust everywhere</li>
            </ul>

            <h3>Suburbs in the Helidon-Lockyer cluster</h3>
            <p>11 suburbs, flat rate, no travel charges:</p>
            <div className="nearby-areas">
              {AREAS.helidon.suburbs.map((s) => <a key={s}>{s}</a>)}
            </div>
          </div>

          <aside className="local-sidebar">
            <div className="side-card pest">
              <h4>Most-booked locally</h4>
              <ul>
                <li><Link to="/pest/spider-control">Spider treatment</Link></li>
                <li><Link to="/pest/rodent-control">Rodent control</Link></li>
                <li><Link to="/cleaning/pressure-washing">Acreage pressure wash</Link></li>
                <li><Link to="/cleaning/gutter-cleaning">Gutter cleaning</Link></li>
                <li><Link to="/cleaning/end-of-lease">End-of-lease (Gatton/Laidley)</Link></li>
              </ul>
            </div>
            <div className="side-card dark combo">
              <h4>💰 Pre-Storm Bundle</h4>
              <p>Gutter clean + pressure wash + general pest = your full pre-summer reset. <b>Save ~$120</b>.</p>
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
            <div className="eyebrow">Helidon & Lockyer FAQs</div>
            <h2 className="section-title">Questions from <em className="red">locals like you</em>.</h2>
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
