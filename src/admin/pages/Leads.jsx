import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { promoteLeadToClient } from '../../lib/clients';

const STATUSES = ['new', 'contacted', 'quoted', 'booked', 'declined'];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Real-time subscription
  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q,
      (snap) => {
        setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => { console.error(err); setLoading(false); }
    );
    return unsub;
  }, []);

  const filtered = leads.filter((l) => {
    if (filter !== 'all' && l.status !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        (l.name || '').toLowerCase().includes(s) ||
        (l.phone || '').includes(s) ||
        (l.email || '').toLowerCase().includes(s) ||
        (l.suburb || '').toLowerCase().includes(s)
      );
    }
    return true;
  });

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'leads', id), { status });
  };

  const handlePromote = async (lead) => {
    try {
      await promoteLeadToClient(lead);
      await updateStatus(lead.id, 'booked');
      alert(`${lead.name} added to clients.`);
    } catch (err) {
      console.error(err);
      alert('Failed to add client. Check console.');
    }
  };

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Leads</h1>
          <p className="admin-page-sub">Every quote from your website. New ones appear in real-time.</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-row">
          <input
            className="admin-search"
            placeholder="Search by name, phone, email or suburb..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="admin-search"
            style={{ flex: 'none', minWidth: 160 }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="admin-empty">Loading leads...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <h3>No leads yet</h3>
          <p>Once your website is live, every quote form submission will appear here.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Suburb</th>
              <th>Phone</th>
              <th>Status</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} onClick={() => setSelected(l)}>
                <td><b>{l.name || '—'}</b></td>
                <td>{l.service || '—'}</td>
                <td>{l.suburb || '—'}</td>
                <td>{l.phone || '—'}</td>
                <td><span className={`adm-badge ${l.status || 'new'}`}>{l.status || 'new'}</span></td>
                <td>{l.createdAt ? new Date(l.createdAt.seconds * 1000).toLocaleDateString('en-AU') : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selected && (
        <>
          <div className="admin-backdrop" onClick={() => setSelected(null)} />
          <aside className="admin-drawer">
            <button className="admin-drawer-close" onClick={() => setSelected(null)}>×</button>
            <h2>{selected.name || 'Untitled lead'}</h2>
            <div style={{ color: 'var(--adm-muted)', fontSize: '0.85rem' }}>
              {selected.createdAt ? new Date(selected.createdAt.seconds * 1000).toLocaleString('en-AU') : 'No timestamp'}
            </div>

            <div className="admin-drawer-row"><span>Status</span>
              <select
                value={selected.status || 'new'}
                onChange={(e) => {
                  updateStatus(selected.id, e.target.value);
                  setSelected({ ...selected, status: e.target.value });
                }}
                style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--adm-border)' }}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="admin-drawer-row"><span>Service</span><span>{selected.service || '—'}</span></div>
            <div className="admin-drawer-row"><span>Phone</span><span><a href={`tel:${selected.phone}`}>{selected.phone || '—'}</a></span></div>
            <div className="admin-drawer-row"><span>Email</span><span>{selected.email || '—'}</span></div>
            <div className="admin-drawer-row"><span>Suburb</span><span>{selected.suburb || '—'}</span></div>
            <div className="admin-drawer-row"><span>Bedrooms</span><span>{selected.bedrooms || '—'}</span></div>
            <div className="admin-drawer-row"><span>Source</span><span>{selected.source || '—'}</span></div>

            {selected.message && (
              <div className="admin-card" style={{ background: 'var(--adm-bg)' }}>
                <div style={{ color: 'var(--adm-muted)', fontWeight: 700, fontSize: '0.8rem', marginBottom: 6 }}>MESSAGE</div>
                {selected.message}
              </div>
            )}

            <div className="admin-row" style={{ marginTop: 14 }}>
              <a href={`tel:${selected.phone}`} className="admin-primary-btn" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>📞 Call now</a>
              <a href={`sms:${selected.phone}`} className="admin-blue-btn" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>💬 SMS</a>
            </div>
            <button onClick={() => handlePromote(selected)} className="admin-ghost-btn" style={{ marginTop: 8 }}>
              + Add to clients & mark booked
            </button>
          </aside>
        </>
      )}
    </>
  );
}
