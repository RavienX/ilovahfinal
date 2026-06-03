import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listAllPosts, deletePost } from '../../lib/blog';

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const refresh = async () => {
    setLoading(true);
    try { setPosts(await listAllPosts()); }
    finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  const filtered = posts.filter((p) => filter === 'all' || p.status === filter);

  const remove = async (slug, title) => {
    if (!confirm(`Delete "${title}"? This is permanent.`)) return;
    await deletePost(slug);
    await refresh();
  };

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">Blog</h1>
          <p className="admin-page-sub">Write articles for SEO + AI search visibility. Drafts only appear publicly when published.</p>
        </div>
        <Link to="/admin/blog/new" className="admin-primary-btn" style={{ textDecoration: 'none' }}>+ New post</Link>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-row">
          <select className="admin-search" style={{ flex: 'none', minWidth: 160 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All posts</option>
            <option value="draft">Drafts only</option>
            <option value="published">Published only</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="admin-empty">Loading posts...</div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <h3>No posts yet</h3>
          <p>Write your first blog post — great for SEO and AI search visibility.</p>
          <Link to="/admin/blog/new" className="admin-primary-btn" style={{ textDecoration: 'none', marginTop: 12, display: 'inline-block' }}>+ Write your first post</Link>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Last updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.slug}>
                <td>
                  <Link to={`/admin/blog/edit/${p.slug}`} className="admin-link" style={{ fontWeight: 800 }}>{p.title || '(untitled)'}</Link>
                  <div style={{ color: 'var(--adm-muted)', fontSize: '0.82rem' }}>/{p.slug}</div>
                </td>
                <td>{p.category || '—'}</td>
                <td><span className={`adm-badge ${p.status === 'published' ? 'invoiced' : 'new'}`}>{p.status || 'draft'}</span></td>
                <td>{p.updatedAt ? new Date(p.updatedAt.seconds * 1000).toLocaleDateString('en-AU') : '—'}</td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => remove(p.slug, p.title)} className="admin-link" style={{ color: 'var(--adm-red)' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
