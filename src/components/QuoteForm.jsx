// ============================================================================
// QuoteForm — reusable lead capture form, drops into any page
// ============================================================================
// Usage:
//   <QuoteForm
//     defaultService="end-of-lease"
//     defaultSuburb="Toowoomba"
//     variant="cleaning"  // or "pest"
//     compact={true}      // optional smaller layout
//   />
// ============================================================================

import { useState } from 'react';
import { saveLeadDev as saveLead } from '../lib/leads';
import { CLEANING_SERVICES, PEST_SERVICES, ALL_SUBURBS } from '../data/business';
import './QuoteForm.css';

export default function QuoteForm({
  variant = 'cleaning',
  defaultService = '',
  defaultSuburb = '',
  compact = false,
  badge,
  title,
  subtitle,
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    suburb: defaultSuburb,
    bedrooms: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const services = variant === 'pest' ? PEST_SERVICES : CLEANING_SERVICES;
  const isBlue = variant === 'cleaning';

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.phone || !form.service) {
      setError('Please fill in your name, phone and service.');
      return;
    }
    setSubmitting(true);
    const result = await saveLead({
      ...form,
      businessType: variant,
      submittedAt: new Date().toISOString(),
    });
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError('Something went wrong. Please call us on 0478 711 829.');
    }
  }

  if (submitted) {
    return (
      <div className={`qf-card qf-${variant}`}>
        <div className="qf-success">
          <div className="qf-tick">✓</div>
          <h3>Thanks {form.name}!</h3>
          <p>
            We've got your quote request. {form.phone && `Francis will SMS you on ${form.phone}`}
            {' '}within 15 minutes during business hours.
          </p>
          <p className="qf-success-meta">
            Need us sooner? Call <a href="tel:+61478711829">0478 711 829</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={`qf-card qf-${variant} ${compact ? 'qf-compact' : ''}`}
      onSubmit={handleSubmit}
    >
      {badge && <div className={`qf-badge ${isBlue ? 'qf-badge-blue' : 'qf-badge-red'}`}>{badge}</div>}
      <div className="qf-inner">
        {title && <h3 className="qf-title">{title}</h3>}
        {subtitle && <p className="qf-subtitle">{subtitle}</p>}

        <div className="qf-row">
          <div className="qf-group">
            <label className="qf-label">Your name</label>
            <input
              type="text"
              className="qf-input"
              placeholder="Sarah"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
            />
          </div>
          <div className="qf-group">
            <label className="qf-label">Phone</label>
            <input
              type="tel"
              className="qf-input"
              placeholder="0412 345 678"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="qf-group">
          <label className="qf-label">Service needed</label>
          <select
            className="qf-select"
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
            required
          >
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            {variant === 'cleaning' && <option value="combo">Combo (clean + pest)</option>}
          </select>
        </div>

        <div className="qf-row">
          {variant === 'cleaning' && (
            <div className="qf-group">
              <label className="qf-label">Bedrooms</label>
              <select
                className="qf-select"
                value={form.bedrooms}
                onChange={(e) => update('bedrooms', e.target.value)}
              >
                <option value="">Select...</option>
                <option>1 bed</option>
                <option>2 bed</option>
                <option>3 bed</option>
                <option>4+ bed</option>
              </select>
            </div>
          )}
          <div className="qf-group">
            <label className="qf-label">Suburb</label>
            <input
              type="text"
              className="qf-input"
              placeholder="Toowoomba, Helidon..."
              value={form.suburb}
              list="qf-suburbs"
              onChange={(e) => update('suburb', e.target.value)}
            />
            <datalist id="qf-suburbs">
              {ALL_SUBURBS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>
        </div>

        {error && <div className="qf-error">⚠ {error}</div>}

        <button
          type="submit"
          className={`qf-submit ${isBlue ? 'qf-submit-blue' : 'qf-submit-red'}`}
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Get my free quote →'}
        </button>

        <p className="qf-fineprint">
          No spam. SMS reply within 15 minutes during business hours.
        </p>
      </div>
    </form>
  );
}
