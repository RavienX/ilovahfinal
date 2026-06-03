import { Link } from 'react-router-dom';
import SEOMeta from '../seo/SEOMeta';
import { BreadcrumbSchema } from '../seo/Schema';
import QuoteForm from '../components/QuoteForm';
import { CONTACT, BIZ } from '../data/business';
import './areas/Area.css';

export default function Contact() {
  return (
    <>
      <SEOMeta
        title="Contact iLovah Cleaning & Rest In Pest | Phone, Email, Quote Form"
        description="Get in touch with iLovah Cleaning Services and Rest In Pest Control. Phone 0478 711 829, email, or use the quote form for a 15-minute SMS reply during business hours."
        path="/contact"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]} />

      <section className="area-hero cleaning">
        <div className="area-hero-grid">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">Contact</span>
            </div>
            <h1>
              <span className="accent">Get in touch</span> — 15-min SMS reply.
            </h1>
            <p className="lede">
              Quote requests get answered within 15 minutes during business hours. Phone calls answered straight to a real person — usually Francis or one of the team.
            </p>
            <div className="hero-ctas">
              <a href={`tel:${CONTACT.phoneTel}`} className="il-btn il-btn-blue">📞 {CONTACT.phone}</a>
              <a href="#quote" className="il-btn-ghost">Use quote form ↓</a>
            </div>
            <div className="trust-row">
              <div className="check">Real local people answering</div>
              <div className="check">15-min reply during hours</div>
              <div className="check">No call centre</div>
              <div className="check">Servicing 49 suburbs</div>
            </div>

            <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="side-card cleaning">
                <h4>For cleaning enquiries</h4>
                <p><b>📞 {CONTACT.phone}</b></p>
                <p>📧 {BIZ.cleaning.email}</p>
              </div>
              <div className="side-card pest">
                <h4>For pest control enquiries</h4>
                <p><b>📞 {CONTACT.phone}</b></p>
                <p>📧 {BIZ.pest.email}</p>
              </div>
              <div className="side-card">
                <h4>Visit our base</h4>
                <p><b>{CONTACT.address.street}</b></p>
                <p>{CONTACT.address.suburb} {CONTACT.address.state} {CONTACT.address.postcode}</p>
                <p>Mon–Sat {CONTACT.hours.opens}–{CONTACT.hours.closes}</p>
              </div>
            </div>
          </div>

          <div id="quote">
            <QuoteForm
              variant="cleaning"
              badge="⚡ Free Quote"
              title="Get a free quote"
              subtitle="15-minute SMS reply during business hours"
            />
          </div>
        </div>
      </section>
    </>
  );
}
