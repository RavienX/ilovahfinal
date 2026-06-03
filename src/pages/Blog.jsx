import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SEOMeta from '../seo/SEOMeta';
import { BreadcrumbSchema } from '../seo/Schema';
import { listPublishedPosts } from '../lib/blog';
import './areas/Area.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    listPublishedPosts()
      .then((data) => { if (!cancelled) { setPosts(data); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <SEOMeta
        title="Blog — iLovah Cleaning & Rest In Pest Control Tips"
        description="Local cleaning and pest control tips from your Helidon-based family team. Bond-back guides, pest control advice, storm season checklists, and more."
        path="/blog"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]} />

      <section className="area-hero cleaning">
        <div className="area-hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '900px' }}>
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span className="current">Blog</span>
            </div>
            <h1>
              Tips & advice from your <span className="accent">local team</span>.
            </h1>
            <p className="lede">
              Bond-back guides. Pest seasonality across the Darling Downs. Storm season checklists. What to ask before hiring a cleaner. Written by us, for our local community.
            </p>
          </div>
        </div>
      </section>

      <section className="local-block">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading posts...</p>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h3>No posts yet — but they\'re coming.</h3>
              <p style={{ color: 'var(--muted)', marginTop: '10px' }}>
                We\'re writing local cleaning & pest control guides. Check back soon, or{' '}
                <Link to="/contact" style={{ color: 'var(--red)', fontWeight: 800 }}>get in touch</Link>{' '}
                if you have a question we can answer.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '24px' }}>
              {posts.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="area-card-link">
                  <article className="side-card" style={{ cursor: 'pointer' }}>
                    {p.category && (
                      <div className="eyebrow" style={{ color: p.category === 'pest' ? 'var(--red)' : 'var(--blue)' }}>
                        {p.category}
                      </div>
                    )}
                    <h4 style={{ fontSize: '1.3rem', marginTop: '4px' }}>{p.title}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                      {p.publishedAt && new Date(p.publishedAt.seconds * 1000).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {p.author && ` · by ${p.author}`}
                    </p>
                    <p style={{ marginTop: '12px' }}>{p.excerpt}</p>
                    <p style={{ marginTop: '12px', fontWeight: 800, color: 'var(--red)' }}>Read more →</p>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
