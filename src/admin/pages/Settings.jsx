import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const DEFAULT_TEMPLATES = {
  leadConfirm: "Hi {{name}}, thanks for getting in touch with iLovah Cleaning & Rest In Pest. I'll be back to you within 15 minutes during business hours with a quote. - Francis",
  reviewRequest: "Hi {{name}}, hope you're happy with the {{service}}! If you have 30 seconds, would you mind leaving us a quick Google review? It really helps a small family business: {{reviewLink}} - Francis",
  warrantyReminder: "Hi {{name}}, this is your reminder that your 12-month pest warranty is expiring soon. Want us to come back and re-treat? Reply YES to book in. - Francis",
};

export default function Settings() {
  const [hours, setHours] = useState({
    monday: '07:00-18:00', tuesday: '07:00-18:00', wednesday: '07:00-18:00',
    thursday: '07:00-18:00', friday: '07:00-18:00', saturday: '07:00-18:00', sunday: 'Closed',
  });
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'business'));
        if (snap.exists()) {
          const data = snap.data();
          if (data.hours) setHours(data.hours);
          if (data.templates) setTemplates({ ...DEFAULT_TEMPLATES, ...data.templates });
        }
      } finally { setLoading(false); }
    })();
  }, []);

  const save = async () => {
    setBusy(true);
    try {
      await setDoc(doc(db, 'settings', 'business'), {
        hours, templates,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setSavedAt(new Date());
    } finally { setBusy(false); }
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-sub">Business hours and message templates used by automated emails/SMS.</p>
        </div>
        <div className="admin-row">
          {savedAt && <span style={{ color: 'var(--adm-muted)', fontSize: '0.85rem' }}>Saved {savedAt.toLocaleTimeString('en-AU')}</span>}
          <button onClick={save} disabled={busy} className="admin-primary-btn">{busy ? 'Saving...' : 'Save settings'}</button>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 12 }}>Business hours</h3>
        <div className="admin-grid-2">
          {Object.keys(hours).map((day) => (
            <label key={day} className="admin-field">
              <span style={{ textTransform: 'capitalize' }}>{day}</span>
              <input value={hours[day]} onChange={(e) => setHours({ ...hours, [day]: e.target.value })} />
            </label>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: 4 }}>Message templates</h3>
        <p style={{ color: 'var(--adm-muted)', fontSize: '0.85rem', marginBottom: 12 }}>
          Used by the automation system. Variables like <code>{'{{name}}'}</code> are filled in automatically.
        </p>

        <label className="admin-field" style={{ marginBottom: 12 }}>
          <span>Lead confirmation SMS - sent after a quote form submission</span>
          <textarea rows={3} value={templates.leadConfirm} onChange={(e) => setTemplates({ ...templates, leadConfirm: e.target.value })} />
        </label>

        <label className="admin-field" style={{ marginBottom: 12 }}>
          <span>Review request - sent 7 days after a job is marked done</span>
          <textarea rows={3} value={templates.reviewRequest} onChange={(e) => setTemplates({ ...templates, reviewRequest: e.target.value })} />
        </label>

        <label className="admin-field">
          <span>Warranty reminder - sent at 11 months for pest treatments</span>
          <textarea rows={3} value={templates.warrantyReminder} onChange={(e) => setTemplates({ ...templates, warrantyReminder: e.target.value })} />
        </label>
      </div>
    </>
  );
}
