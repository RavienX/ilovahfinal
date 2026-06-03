import { useEffect, useState } from 'react';
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { onAuthChange, signOut } from '../lib/auth';
import './admin.css';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '◆', end: true },
  { to: '/admin/leads', label: 'Leads', icon: '✉' },
  { to: '/admin/clients', label: 'Clients', icon: '☺' },
  { to: '/admin/jobs', label: 'Jobs', icon: '▣' },
  { to: '/admin/blog', label: 'Blog', icon: '✎' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙' },
];

export default function AdminLayout() {
  const [user, setUser] = useState(undefined); // undefined = loading; null = signed out
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => onAuthChange(setUser), []);

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  if (user === undefined) {
    return <div className="admin-loading">Loading...</div>;
  }
  if (user === null) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className={`admin-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-logo">iL</div>
          <div>
            <div className="admin-brand-name">iLovah CRM</div>
            <div className="admin-brand-sub">{user.email}</div>
          </div>
        </div>
        <nav className="admin-nav">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{n.icon}</span>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <button onClick={handleSignOut} className="admin-signout">Sign out →</button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-burger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">☰</button>
          <div className="admin-topbar-title">iLovah & Rest In Pest — Admin</div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
