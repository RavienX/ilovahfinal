import SEOMeta from '../seo/SEOMeta';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <SEOMeta title="Page Not Found | iLovah Cleaning & Rest In Pest" noindex={true} />
      <section style={{ padding: '120px 5%', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Black Ops One', fontSize: '5rem', color: '#E8232A', marginBottom: '8px' }}>
          404
        </div>
        <h1 style={{ fontFamily: 'Black Ops One', fontSize: '2rem', color: '#1a1a1a', marginBottom: '16px' }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748b', marginBottom: '32px', maxWidth: '460px', margin: '0 auto 32px' }}>
          The page you're looking for doesn't exist. Maybe try one of these:
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="il-btn">Back to home</Link>
          <Link to="/areas/toowoomba" className="il-btn il-btn-blue">Toowoomba cleaning</Link>
        </div>
      </section>
    </>
  );
}
