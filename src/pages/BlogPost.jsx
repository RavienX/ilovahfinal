import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SEOMeta from '../seo/SEOMeta';
import { BreadcrumbSchema } from '../seo/Schema';
import { getPostBySlug } from '../lib/blog';
import './areas/Area.css';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getPostBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        if (!data) { setNotFound(true); setLoading(false); return; }
        setPost(data);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) { setNotFound(true); setLoading(false); } });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <section className="local-block">
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading...</p>
      </section>
    );
  }
  if (notFound) return <Navigate to="/blog" replace />;
  if (!post) return null;

  return (
    <>
      <SEOMeta
        title={`${post.title} | iLovah Cleaning & Rest In Pest`}
        description={post.excerpt || post.title}
        path={`/blog/${post.slug}`}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ]} />

      <section className="area-hero cleaning">
        <div className="area-hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '900px' }}>
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/blog">Blog</Link>
              <span className="sep">/</span>
              <span className="current">{post.title}</span>
            </div>
            {post.category && (
              <div className="biz-banner"><span className="biz-dot" />{post.category}</div>
            )}
            <h1>{post.title}</h1>
            <p className="lede">
              {post.publishedAt && new Date(post.publishedAt.seconds * 1000).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
              {post.author && ` · by ${post.author}`}
            </p>
          </div>
        </div>
      </section>

      <section className="local-block">
        <article className="local-main" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div
            className="blog-content"
            style={{ fontSize: '1.05rem', lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: post.body || '' }}
          />
          <div style={{ marginTop: '40px', padding: '24px', background: 'var(--blue-lt)', borderRadius: '14px', textAlign: 'center' }}>
            <h3>Need a hand with this?</h3>
            <p style={{ marginTop: '8px', marginBottom: '16px' }}>We service Toowoomba, Highfields, Helidon & the Lockyer Valley. Get a free quote — 15-minute SMS reply.</p>
            <Link to="/#quote" className="il-btn il-btn-blue">Get a free quote →</Link>
          </div>
        </article>
      </section>
    </>
  );
}
