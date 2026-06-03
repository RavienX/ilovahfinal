import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { JOB_STATUSES, JOB_STATUS_LABELS, createJob, updateJob, deleteJob } from '../../lib/jobs';
import { listClients } from '../../lib/clients';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'jobs'), orderBy('updatedAt', 'desc'));
    const unsub = onSnapshot(q,
      (snap) => {
        setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => { console.error(err); setLoading(false); }
    );
    return unsub;
  }, []);

  const handleDragStart = (job) => setDragging(job);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = async (status) => {
    if (!dragging || dragging.status === status) { setDragging(null); return; }
    try {
      await updateJob(dragging.id, { status });
    } catch (err) { console.error(err); alert('Failed to update job status.'); }
    setDragging(null);
  };

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Jobs</h1>
          <p className="admin-page-sub">Drag jobs across the board as they move through the pipeline.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="admin-primary-btn">+ New job</button>
      </div>

      {loading ? (
        <div className="admin-empty">Loading jobs...</div>
      ) : (
        <div className="admin-kanban">
          {JOB_STATUSES.map((status) => {
            const inColumn = jobs.filter((j) => j.status === status);
            return (
              <div
                key={status}
                className="adm-column"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(status)}
              >
                <div className="adm-column-head">
                  <span>{JOB_STATUS_LABELS[status]}</span>
                  <span>{inColumn.length}</span>
                </div>
                {inColumn.length === 0 && (
                  <div style={{ color: 'var(--adm-muted)', fontSize: '0.8rem', textAlign: 'center', padding: 12 }}>
                    Drop jobs here
                  </div>
                )}
                {inColumn.map((j) => (
                  <div
                    key={j.id}
                    className={`adm-job-card ${dragging?.id === j.id ? 'dragging' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(j)}
                    onClick={() => setSelected(j)}
                  >
                    <div className="adm-job-name">{j.clientName || 'Unknown client'}</div>
                    <div style={{ color: 'var(--adm-blue)', fontWeight: 700, fontSize: '0.82rem' }}>{j.service}</div>
                    <div className="adm-job-meta">
                      {j.scheduledFor && new Date(j.scheduledFor.seconds ? j.scheduledFor.seconds * 1000 : j.scheduledFor).toLocaleDateString('en-AU')}
                      {j.estimatedValue ? ` · $${j.estimatedValue}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {selected && <JobDrawer job={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddJob onClose={() => setShowAdd(false)} />}
    </>
  );
}

function JobDrawer({ job, onClose }) {
  const [form, setForm] = useState({ ...job });
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    try {
      await updateJob(job.id, form);
      onClose();
    } finally { setBusy(false); }
  };
  const remove = async () => {
    if (!confirm('Delete this job?')) return;
    setBusy(true);
    try { await deleteJob(job.id); onClose(); } finally { setBusy(false); }
  };

  return (
    <>
      <div className="admin-backdrop" onClick={onClose} />
      <aside className="admin-drawer">
        <button className="admin-drawer-close" onClick={onClose}>×</button>
        <h2>{job.clientName || 'Job'}</h2>
        <div style={{ color: 'var(--adm-muted)', fontSize: '0.85rem' }}>
          {job.scheduledFor ? new Date(job.scheduledFor.seconds ? job.scheduledFor.seconds * 1000 : job.scheduledFor).toLocaleDateString('en-AU') : 'Not scheduled'}
        </div>

        <label className="admin-field">
          <span>Status</span>
          <select value={form.status || 'booked'} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {JOB_STATUSES.map((s) => <option key={s} value={s}>{JOB_STATUS_LABELS[s]}</option>)}
          </select>
        </label>
        <label className="admin-field">
          <span>Service</span>
          <input value={form.service || ''} onChange={(e) => setForm({ ...form, service: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Address</span>
          <input value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Estimated value ($)</span>
          <input type="number" value={form.estimatedValue || 0} onChange={(e) => setForm({ ...form, estimatedValue: Number(e.target.value) })} />
        </label>
        <label className="admin-field">
          <span>Notes</span>
          <textarea rows={3} value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </label>

        <button onClick={save} disabled={busy} className="admin-primary-btn">{busy ? 'Saving...' : 'Save changes'}</button>
        <button onClick={remove} disabled={busy} className="admin-ghost-btn" style={{ color: 'var(--adm-red)', borderColor: '#fecaca' }}>Delete job</button>
      </aside>
    </>
  );
}

function AddJob({ onClose }) {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ clientId: '', clientName: '', service: '', status: 'booked', estimatedValue: 0, address: '', notes: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => { listClients().then(setClients).catch(() => {}); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.service) { alert('Client and service are required.'); return; }
    setBusy(true);
    try { await createJob(form); onClose(); }
    finally { setBusy(false); }
  };

  const pickClient = (id) => {
    const c = clients.find((x) => x.id === id);
    if (!c) { setForm({ ...form, clientId: '', clientName: '' }); return; }
    setForm({ ...form, clientId: c.id, clientName: c.name, address: c.address || '' });
  };

  return (
    <>
      <div className="admin-backdrop" onClick={onClose} />
      <aside className="admin-drawer">
        <button className="admin-drawer-close" onClick={onClose}>×</button>
        <h2>New job</h2>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label className="admin-field">
            <span>Client</span>
            <select value={form.clientId} onChange={(e) => pickClient(e.target.value)}>
              <option value="">— Choose existing client —</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.phone}</option>)}
            </select>
          </label>
          <label className="admin-field">
            <span>Or client name (manual)</span>
            <input value={form.clientName || ''} onChange={(e) => setForm({ ...form, clientName: e.target.value, clientId: '' })} />
          </label>
          <label className="admin-field">
            <span>Service</span>
            <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="e.g. End-of-lease clean, Cockroach treatment" required />
          </label>
          <label className="admin-field">
            <span>Status</span>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {JOB_STATUSES.map((s) => <option key={s} value={s}>{JOB_STATUS_LABELS[s]}</option>)}
            </select>
          </label>
          <label className="admin-field">
            <span>Address</span>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Estimated value ($)</span>
            <input type="number" value={form.estimatedValue} onChange={(e) => setForm({ ...form, estimatedValue: Number(e.target.value) })} />
          </label>
          <label className="admin-field">
            <span>Notes</span>
            <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </label>
          <button type="submit" disabled={busy} className="admin-primary-btn">{busy ? 'Creating...' : 'Create job'}</button>
        </form>
      </aside>
    </>
  );
}
