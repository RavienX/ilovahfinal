import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostBySlug, savePost } from '../../lib/blog';

// Tiny safe Markdown -> HTML. Handles headings, paragraphs, lists, links, bold, italic, code.
function mdToHtml(md = '') {
  let h = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  h = h.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code}</code></pre>`);
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
  h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
  h = h.replace(/((?:^- .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map((l) => `<li>${l.replace(/^- /, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });
  h = h.split(/\n\n+/).map((para) => {
    const trimmed = para.trim();
    if (!trimmed) return '';
    if (/^<(h\d|ul|ol|pre|blockquote)/.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');
  return h;
}

function slugify(t = '') {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
}

export default function BlogEditor() {
  const { slug: routeSlug } = useParams();
  const navigate = useNavigate();
  const isNew = !routeSlug;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('cleaning');
  const [author, setAuthor] = useState('Francis Velasco');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [busy, setBusy] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    if (isNew) return;
    getPostBySlug(routeSlug).then((p) => {
      if (p) {
        setTitle(p.title || '');
        setSlug(p.slug || routeSlug);
        setCategory(p.category || 'cleaning');
        setAuthor(p.author || 'Francis Velasco');
        setExcerpt(p.excerpt || '');
        setBody(p.bodyMarkdown || p.body || '');
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [isNew, routeSlug]);

  useEffect(() => {
    if (isNew && title && !slug) setSlug(slugify(title));
  }, [title, isNew, slug]);

  const preview = useMemo(() => mdToHtml(body), [body]);

  const save = async (status) => {
    if (!title || !slug) { alert('Title and slug are required.'); return; }
    setBusy(true);
    try {
      const finalSlug = slug || slugify(title);
      await savePost(finalSlug, {
        title, category, author, excerpt,
        bodyMarkdown: body,
        body: preview,
        status,
      });
      setSavedAt(new Date());
      if (isNew) navigate(`/admin/blog/edit/${finalSlug}`, { replace: true });
    } catch (err) {
      console.error(err);
      alert('Save failed. Check console.');
    } finally { setBusy(false); }
  };

  if (loading) return <div className="admin-empty">Loading...</div>;

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">{isNew ? 'New post' : 'Edit post'}</h1>
          <p className="admin-page-sub">Write in Markdown on the left. Live preview on the right.</p>
        </div>
        <div className="admin-row">
          {savedAt && <span style={{ color: 'var(--adm-muted)', fontSize: '0.85rem' }}>Saved {savedAt.toLocaleTimeString('en-AU')}</span>}
          <button onClick={() => save('draft')} disabled={busy} className="admin-ghost-btn">Save draft</button>
          <button onClick={() => save('published')} disabled={busy} className="admin-primary-btn">{busy ? 'Saving...' : 'Publish'}</button>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 16 }}>
        <div className="admin-grid-2">
          <label className="admin-field">
            <span>Title *</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. How to pass a bond inspection in Toowoomba" />
          </label>
          <label className="admin-field">
            <span>URL slug *</span>
            <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="how-to-pass-bond-inspection" />
          </label>
          <label className="admin-field">
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="cleaning">Cleaning</option>
              <option value="pest">Pest Control</option>
              <option value="local">Local & Community</option>
              <option value="how-to">How-To</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Author</span>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </label>
        </div>
        <label className="admin-field" style={{ marginTop: 12 }}>
          <span>Excerpt (shown in blog list & meta description)</span>
          <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A one-paragraph summary that appears in the blog list and Google search results." />
        </label>
      </div>

      <div className="admin-editor">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="# Write your post in Markdown&#10;&#10;Use **bold**, *italic*, and [links](https://example.com).&#10;&#10;## Subheadings&#10;&#10;- Bullet lists&#10;- Like this"
        />
        <div className="admin-editor-preview" dangerouslySetInnerHTML={{ __html: preview }} />
      </div>
    </>
  );
}
