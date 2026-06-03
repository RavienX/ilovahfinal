import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Dashboard() {
  const [stats, setStats] = useState({
    leadsToday: 0,
    leadsThisWeek: 0,
    newLeads: 0,
    activeJobs: 0,
    clientsTotal: 0,
    loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);

        const leadsSnap = await getDocs(collection(db, 'leads'));
        const leads = leadsSnap.docs.map((d) => d.data());

        const leadsToday = leads.filter(
          (l) => l.createdAt && l.createdAt.toDate() >= todayStart
        ).length;
        const leadsThisWeek = leads.filter(
          (l) => l.createdAt && l.createdAt.toDate() >= weekStart
        ).length;
        const newLeads = leads.filter((l) => l.status === 'new').length;

        const jobsSnap = await getDocs(
          query(collection(db, 'jobs'), where('status', 'in', ['booked', 'on-the-way', 'in-progress']))
        );
        const clientsSnap = await getDocs(collection(db, 'clients'));

        setStats({
          leadsToday,
          leadsThisWeek,
          newLeads,
          activeJobs: jobsSnap.size,
          clientsTotal: clientsSnap.size,
          loading: false,
        });
      } catch (err) {
        console.error('Dashboard stats error:', err);
        setStats((s) => ({ ...s, loading: false }));
      }
    })();
  }, []);

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">Quick overview of your business activity</p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat-label">New Leads</div>
          <div className="admin-stat-value">{stats.loading ? '...' : stats.newLeads}</div>
          <div className="admin-stat-foot">Awaiting your follow-up</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Leads Today</div>
          <div className="admin-stat-value">{stats.loading ? '...' : stats.leadsToday}</div>
          <div className="admin-stat-foot">Since midnight</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Leads This Week</div>
          <div className="admin-stat-value">{stats.loading ? '...' : stats.leadsThisWeek}</div>
          <div className="admin-stat-foot">Past 7 days</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Active Jobs</div>
          <div className="admin-stat-value">{stats.loading ? '...' : stats.activeJobs}</div>
          <div className="admin-stat-foot">Booked / in progress</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Total Clients</div>
          <div className="admin-stat-value">{stats.loading ? '...' : stats.clientsTotal}</div>
          <div className="admin-stat-foot">In your database</div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: 12 }}>Quick actions</h3>
        <div className="admin-row">
          <Link to="/admin/leads" className="admin-blue-btn">Go to Leads inbox →</Link>
          <Link to="/admin/jobs" className="admin-ghost-btn">View Jobs board →</Link>
          <Link to="/admin/clients" className="admin-ghost-btn">Clients database →</Link>
          <Link to="/admin/blog" className="admin-ghost-btn">Write a blog post →</Link>
        </div>
        <p style={{ marginTop: 16, color: 'var(--adm-muted)', fontSize: '0.9rem' }}>
          Tip: every quote that comes in from your website lands in <b>Leads</b> automatically. From there, move them through to <b>Clients</b> and <b>Jobs</b>.
        </p>
      </div>
    </>
  );
}
