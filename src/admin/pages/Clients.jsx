import { useEffect, useState } from 'react';
import { listClients, createClient, updateClient, deleteClient, normalisePhone, findClientByPhone } from '../../lib/clients';
import { listJobsByClient } from '../../lib/jobs';

// Simple CSV parser (no library) — handles quoted values and commas inside quotes
function parseCSV(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n').filter((l) => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };

  function splitLine(line) {
    const out = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuote = !inQuote;
      } else if (c === ',' && !inQuote) {
        out.push(cur.trim());
        cur = '';
      } else cur += c;
    }
    out.push(cur.trim());
    return out;
  }

  const headers = splitLine(lines[0]).map((h) => h.toLowerCase().trim());
  const rows = lines.slice(1).map((line) => {
    const cols = splitLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = cols[i] || ''; });
    return obj;
  });
  return { headers, rows };
}

// Map any reasonable header variants to canonical client fields
function normaliseRow(row) {
  const get = (...keys) => {
    for (const k of keys) if (row[k] !== undefined && row[k] !== '') return row[k];
    return '';
  };
  return {
    name: get('name', 'client', 'customer', 'full name', 'fullname'),
    phone: get('phone', 'mobile', 'phone number', 'contact', 'mobile number'),
    email: get('email', 'e-mail', 'email address'),
    address: get('address', 'street', 'street address'),
    suburb: get('suburb', 'city', 'town', 'location'),
    notes: get('notes', 'comments', 'remarks', 'description'),
    firstJobDate: get('first_job_date', 'firstjobdate', 'first job', 'since', 'client since'),
    totalJobs: get('total_jobs', 'totaljobs', 'jobs', 'job count'),
    totalSpent: get('total_spent', 'totalspent', 'spent', 'revenue', 'value'),
  };
}

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listClients();
      setClients(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  const filtered = clients.filter((c) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      (c.name || '').toLowerCase().includes(s) ||
      (c.phone || '').includes(s) ||
      (c.email || '').toLowerCase().includes(s) ||
      (c.suburb || '').toLowerCase().includes(s)
    );
  });

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Clients</h1>
          <p className="admin-page-sub">Your customer database. Search, filter, and import existing clients via CSV.</p>
        </div>
        <div className="admin-row">
          <button onClick={() => setShowImport(true)} className="admin-blue-btn">📥 Import CSV</button>
          <button onClick={() => setShowAdd(true)} className="admin-primary-btn">+ Add client</button>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <input
          className="admin-search"
          style={{ width: '100%' }}
          placeholder="Search by name, phone, email or suburb..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="admin-empty">Loading clients...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <h3>No clients yet</h3>
          <p>Import your existing list from Excel/Sheets via the <b>Import CSV</b> button above, or add clients manually.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Suburb</th>
              <th>Jobs</th>
              <th>Lifetime spend</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} onClick={() => setSelected(c)}>
                <td><b>{c.name || '—'}</b></td>
                <td>{c.phone || '—'}</td>
                <td>{c.suburb || '—'}</td>
                <td>{c.totalJobs || 0}</td>
                <td>${(c.totalSpent || 0).toLocaleString('en-AU')}</td>
                <td>{c.email || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selected && <ClientDrawer client={selected} onClose={() => setSelected(null)} onUpdated={refresh} />}
      {showAdd && <AddClient onClose={() => setShowAdd(false)} onAdded={refresh} />}
      {showImport && <ImportCSV onClose={() => setShowImport(false)} onImported={refresh} />}
    </>
  );
}

// ============================================================================
// Drawer: view + edit single client
// ============================================================================

function ClientDrawer({ client, onClose, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...client });
  const [jobs, setJobs] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    listJobsByClient(client.id).then(setJobs).catch(() => {});
  }, [client.id]);

  const save = async () => {
    setBusy(true);
    try {
      await updateClient(client.id, form);
      await onUpdated();
      setEditing(false);
    } finally { setBusy(false); }
  };

  const remove = async () => {
    if (!confirm(`Delete ${client.name}? This can't be undone.`)) return;
    setBusy(true);
    try {
      await deleteClient(client.id);
      await onUpdated();
      onClose();
    } finally { setBusy(false); }
  };

  return (
    <>
      <div className="admin-backdrop" onClick={onClose} />
      <aside className="admin-drawer">
        <button className="admin-drawer-close" onClick={onClose}>×</button>
        <h2>{client.name || 'Client'}</h2>
        <div style={{ color: 'var(--adm-muted)', fontSize: '0.85rem' }}>
          Client since {client.createdAt ? new Date(client.createdAt.seconds * 1000).toLocaleDateString('en-AU') : '—'}
        </div>

        {!editing ? (
          <>
            <div className="admin-drawer-row"><span>Phone</span><span><a href={`tel:${client.phone}`}>{client.phone || '—'}</a></span></div>
            <div className="admin-drawer-row"><span>Email</span><span>{client.email || '—'}</span></div>
            <div className="admin-drawer-row"><span>Address</span><span>{client.address || '—'}</span></div>
            <div className="admin-drawer-row"><span>Suburb</span><span>{client.suburb || '—'}</span></div>
            <div className="admin-drawer-row"><span>Total jobs</span><span>{client.totalJobs || 0}</span></div>
            <div className="admin-drawer-row"><span>Lifetime spend</span><span>${(client.totalSpent || 0).toLocaleString('en-AU')}</span></div>
            {client.notes && (
              <div className="admin-card" style={{ background: 'var(--adm-bg)' }}>
                <div style={{ color: 'var(--adm-muted)', fontWeight: 700, fontSize: '0.8rem', marginBottom: 6 }}>NOTES</div>
                {client.notes}
              </div>
            )}

            <h3 style={{ marginTop: 16, fontSize: '0.95rem' }}>Job history ({jobs.length})</h3>
            {jobs.length === 0 ? (
              <p style={{ color: 'var(--adm-muted)', fontSize: '0.85rem' }}>No jobs recorded yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {jobs.map((j) => (
                  <div key={j.id} className="admin-card" style={{ padding: 12 }}>
                    <div style={{ fontWeight: 800 }}>{j.service}</div>
                    <div style={{ color: 'var(--adm-muted)', fontSize: '0.8rem' }}>
                      {j.scheduledFor ? new Date(j.scheduledFor.seconds ? j.scheduledFor.seconds * 1000 : j.scheduledFor).toLocaleDateString('en-AU') : 'No date'}
                      {' · '}<span className={`adm-badge ${j.status}`}>{j.status}</span>
                      {j.estimatedValue ? ` · $${j.estimatedValue}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="admin-row" style={{ marginTop: 14 }}>
              <a href={`tel:${client.phone}`} className="admin-primary-btn" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>📞 Call</a>
              <a href={`sms:${client.phone}`} className="admin-blue-btn" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>💬 SMS</a>
            </div>
            <button onClick={() => setEditing(true)} className="admin-ghost-btn">Edit</button>
            <button onClick={remove} className="admin-ghost-btn" style={{ color: 'var(--adm-red)', borderColor: '#fecaca' }} disabled={busy}>Delete client</button>
          </>
        ) : (
          <>
            {['name', 'phone', 'email', 'address', 'suburb'].map((k) => (
              <label key={k} className="admin-field">
                <span style={{ textTransform: 'capitalize' }}>{k}</span>
                <input value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </label>
            ))}
            <label className="admin-field">
              <span>Notes</span>
              <textarea rows={3} value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </label>
            <div className="admin-row">
              <button onClick={save} disabled={busy} className="admin-primary-btn" style={{ flex: 1 }}>{busy ? 'Saving...' : 'Save changes'}</button>
              <button onClick={() => { setEditing(false); setForm(client); }} className="admin-ghost-btn">Cancel</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

// ============================================================================
// Add new client
// ============================================================================

function AddClient({ onClose, onAdded }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', suburb: '' });
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { alert('Name and phone are required.'); return; }
    setBusy(true);
    try {
      await createClient(form);
      await onAdded();
      onClose();
    } finally { setBusy(false); }
  };

  return (
    <>
      <div className="admin-backdrop" onClick={onClose} />
      <aside className="admin-drawer">
        <button className="admin-drawer-close" onClick={onClose}>×</button>
        <h2>Add client</h2>
        <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['name', 'phone', 'email', 'address', 'suburb'].map((k) => (
            <label key={k} className="admin-field">
              <span style={{ textTransform: 'capitalize' }}>{k}{(k === 'name' || k === 'phone') && ' *'}</span>
              <input value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required={k === 'name' || k === 'phone'} />
            </label>
          ))}
          <label className="admin-field">
            <span>Notes</span>
            <textarea rows={3} value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </label>
          <button type="submit" disabled={busy} className="admin-primary-btn">{busy ? 'Saving...' : 'Add client'}</button>
        </form>
      </aside>
    </>
  );
}

// ============================================================================
// CSV Import — flexible, with preview & duplicate detection
// ============================================================================

function ImportCSV({ onClose, onImported }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFile = (f) => {
    setError('');
    setFile(f);
    if (!f) { setPreview(null); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const { headers, rows } = parseCSV(e.target.result);
        if (rows.length === 0) { setError('CSV is empty.'); setPreview(null); return; }
        const mapped = rows.map(normaliseRow);
        const missingRequired = mapped.filter((r) => !r.name || !r.phone).length;
        setPreview({ headers, totalRows: rows.length, mapped: mapped.slice(0, 5), allMapped: mapped, missingRequired });
      } catch (err) {
        console.error(err);
        setError('Could not parse the CSV. Check it is comma-separated with a header row.');
      }
    };
    reader.readAsText(f);
  };

  const runImport = async () => {
    if (!preview) return;
    setBusy(true);
    let imported = 0, skipped = 0, errors = 0;
    for (const row of preview.allMapped) {
      if (!row.name || !row.phone) { skipped++; continue; }
      try {
        const existing = await findClientByPhone(row.phone);
        if (existing) { skipped++; continue; }
        await createClient({ ...row, source: 'csv-import' });
        imported++;
      } catch (err) {
        console.error('Row failed:', row, err);
        errors++;
      }
    }
    setResult({ imported, skipped, errors });
    setBusy(false);
    await onImported();
  };

  return (
    <>
      <div className="admin-backdrop" onClick={busy ? null : onClose} />
      <aside className="admin-drawer" style={{ maxWidth: 600 }}>
        <button className="admin-drawer-close" onClick={busy ? null : onClose}>×</button>
        <h2>Import clients from CSV</h2>
        <p style={{ color: 'var(--adm-muted)', fontSize: '0.9rem' }}>
          Required columns: <b>name</b> and <b>phone</b>. Also recognised: <code>email, address, suburb, notes, first_job_date, total_jobs, total_spent</code>.
        </p>

        {!result && (
          <div className={`admin-import-box ${file ? 'has-file' : ''}`}>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => handleFile(e.target.files[0])}
              style={{ display: 'block', margin: '0 auto' }}
            />
            {file && <p style={{ marginTop: 8, fontSize: '0.85rem' }}><b>{file.name}</b> · {(file.size / 1024).toFixed(1)} KB</p>}
          </div>
        )}

        {error && <div className="admin-error">{error}</div>}

        {preview && !result && (
          <>
            <div className="admin-card" style={{ background: 'var(--adm-bg)' }}>
              <div><b>{preview.totalRows}</b> rows found</div>
              {preview.missingRequired > 0 && (
                <div style={{ color: 'var(--adm-amber)', fontSize: '0.85rem', marginTop: 4 }}>
                  ⚠ {preview.missingRequired} row{preview.missingRequired > 1 ? 's' : ''} missing name or phone — these will be skipped
                </div>
              )}
              <div style={{ color: 'var(--adm-muted)', fontSize: '0.8rem', marginTop: 4 }}>
                Duplicates (matching phone) will also be skipped automatically.
              </div>
            </div>

            <h4 style={{ marginTop: 8, fontSize: '0.9rem' }}>Preview (first 5 rows):</h4>
            <div className="admin-preview">
              <table className="admin-table" style={{ borderRadius: 0, border: 'none' }}>
                <thead>
                  <tr><th>Name</th><th>Phone</th><th>Email</th><th>Suburb</th></tr>
                </thead>
                <tbody>
                  {preview.mapped.map((r, i) => (
                    <tr key={i} style={{ cursor: 'default' }}>
                      <td>{r.name || <i style={{ color: 'var(--adm-red)' }}>missing</i>}</td>
                      <td>{r.phone || <i style={{ color: 'var(--adm-red)' }}>missing</i>}</td>
                      <td>{r.email || '—'}</td>
                      <td>{r.suburb || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={runImport} disabled={busy} className="admin-primary-btn" style={{ marginTop: 12 }}>
              {busy ? `Importing... please wait` : `Import ${preview.totalRows} rows`}
            </button>
          </>
        )}

        {result && (
          <div className="admin-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <h3 style={{ color: 'var(--adm-green)' }}>✓ Import complete</h3>
            <ul style={{ marginTop: 8, fontSize: '0.92rem' }}>
              <li><b>{result.imported}</b> clients imported successfully</li>
              <li><b>{result.skipped}</b> skipped (duplicates or missing required fields)</li>
              {result.errors > 0 && <li style={{ color: 'var(--adm-red)' }}><b>{result.errors}</b> errors (see browser console)</li>}
            </ul>
            <button onClick={onClose} className="admin-primary-btn" style={{ marginTop: 12 }}>Done</button>
          </div>
        )}
      </aside>
    </>
  );
}
