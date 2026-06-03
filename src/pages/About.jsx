import { Link } from 'react-router-dom';
import SEOMeta from '../seo/SEOMeta';
import { BreadcrumbSchema } from '../seo/Schema';
import { CONTACT, PROOF, BIZ } from '../data/business';
import './areas/Area.css';

export default function About() {
  return (
    <>
      <SEOMeta
        title="About iLovah Cleaning & Rest In Pest Control | Family-Owned in Helidon"
        description="Family-owned cleaning and pest control business based in Helidon QLD. Run by Francis Velasco, serving Toowoomba, Highfields & the Lockyer Valley since 2019."
        path="/about"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]} />

      <section className="area-hero cleaning">
        <div className="area-hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '900px' }}>
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">About</span>
            </div>
            <h1>
              We\'re a <span className="accent">family-owned</span> Helidon business.
            </h1>
            <p className="lede">
              Run by Francis Velasco and his team. Two businesses under one roof: iLovah Cleaning Services and Rest In Pest Control Service. Same family, same trusted name across the Darling Downs.
            </p>
          </div>
        </div>
      </section>

      <section className="local-block">
        <div className="local-grid">
          <div className="local-main">
            <h2>Why <em className="blue">family-owned</em> matters.</h2>
            <p>
              When you call us, you get Francis or someone on his team — not a call centre, not a national franchise, not someone reading off a script in another city. We pick up. We know your suburb. We\'ve probably worked in your street.
            </p>
            <p>
              Cleaning and pest control are services where <b>trust is the whole product</b>. You\'re letting us into your home. You\'re trusting us with your bond money or your kid\'s nursery. The big-company model doesn\'t suit it — too much turnover, too little accountability, too far removed from the actual work.
            </p>
            <p>
              We built the opposite. Small. Local. Family. You see the same faces every visit. If something\'s wrong, you call us and we sort it. That\'s the whole business.
            </p>

            <h2 style={{ marginTop: '40px' }}>The story so far.</h2>
            <p>
              <b>iLovah Cleaning Services</b> started with cleaning rentals and end-of-lease work — Francis saw too many tenants losing bonds over half-effort cleans by other operators. We built a service around the bond-back guarantee: if the agent isn\'t satisfied, we come back free.
            </p>
            <p>
              <b>Rest In Pest Control Service</b> grew from clients asking for pest treatment alongside their cleaning — particularly end-of-lease, where rentals with pets need a pest treatment to get the bond back. Rather than refer it out, Francis got fully qualified, fully insured, and added it as a second offering. Now we\'re the only family-owned team in the area doing both.
            </p>
            <p>
              We\'re proudly based in <b>{CONTACT.address.suburb}</b> at {CONTACT.address.street}, and service 49 suburbs across the Darling Downs.
            </p>

            <h2 style={{ marginTop: '40px' }}>The <em className="red">guarantees</em> we stand on.</h2>
            <ul className="simple-list">
              <li><b>Bond-back guarantee</b> on all end-of-lease cleans. If the agent isn\'t satisfied, we come back and fix it free.</li>
              <li><b>12-month warranty</b> on general pest treatments (cockroaches, ants, spiders, silverfish). If they come back, so do we.</li>
              <li><b>30-day follow-up</b> on rodent treatments — included in the price, not an add-on.</li>
              <li><b>Same-cleaner</b> guarantee on regular cleans. Different person? Tell us — we\'ll fix it.</li>
              <li><b>Pet & child safe</b> on all pest products. Australian-approved chemistry, applied at label rates.</li>
              <li><b>No lock-in contracts</b> on regular cleans. Stop, pause, change any time.</li>
            </ul>
          </div>

          <aside className="local-sidebar">
            <div className="side-card cleaning">
              <h4>Quick facts</h4>
              <ul>
                <li><b>Founded:</b> 2019</li>
                <li><b>Based in:</b> {CONTACT.address.suburb} QLD</li>
                <li><b>Owner:</b> {BIZ.pest.technician}</li>
                <li><b>Customers served:</b> {PROOF.customersServed}</li>
                <li><b>Google rating:</b> {PROOF.googleRating}★ ({PROOF.reviewCount} reviews)</li>
                <li><b>Service area:</b> {PROOF.suburbsServiced} suburbs</li>
                <li><b>Insured:</b> Yes, fully</li>
              </ul>
            </div>
            <div className="side-card pest">
              <h4>Get in touch</h4>
              <p><b>📞 {CONTACT.phone}</b></p>
              <p><b>📧</b> {BIZ.cleaning.email}</p>
              <p><b>📧</b> {BIZ.pest.email}</p>
              <p><b>📍</b> {CONTACT.address.street}, {CONTACT.address.suburb} {CONTACT.address.state} {CONTACT.address.postcode}</p>
              <p><b>⏰</b> Mon–Sat {CONTACT.hours.opens}–{CONTACT.hours.closes}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
