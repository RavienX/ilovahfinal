import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { signIn, onAuthChange } from '../lib/auth';
import './admin.css';

export default function AdminLogin() {
  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => onAuthChange(setUser), []);

  if (user) {
    const from = location.state?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email, password);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch (err) {
      console.error(err);
      setError(
        err?.code === 'auth/invalid-credential' || err?.code === 'auth/wrong-password' || err?.code === 'auth/user-not-found'
          ? 'Wrong email or password.'
          : 'Sign-in failed. Check your connection and try again.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-brand">
          <div className="admin-brand-logo big">iL</div>
          <h1>iLovah CRM</h1>
          <p>Sign in to manage leads, clients, jobs and your blog.</p>
        </div>

        <label className="admin-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        {error && <div className="admin-error">{error}</div>}

        <button type="submit" disabled={busy} className="admin-primary-btn">
          {busy ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="admin-login-help">
          First time? Your developer creates your login in the Firebase Console.
        </p>
      </form>
    </div>
  );
}
