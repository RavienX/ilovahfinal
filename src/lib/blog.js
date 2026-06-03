// Blog post CRUD against Firestore. Used by both public Blog pages and admin BlogEditor.
import { collection, query, where, orderBy, getDocs, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const COL = 'blog';

export async function listPublishedPosts() {
  const q = query(collection(db, COL), where('status', '==', 'published'), orderBy('publishedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ slug: d.id, ...d.data() }));
}

export async function listAllPosts() {
  const q = query(collection(db, COL), orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ slug: d.id, ...d.data() }));
}

export async function getPostBySlug(slug) {
  const ref = doc(db, COL, slug);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { slug: snap.id, ...snap.data() };
}

export async function savePost(slug, data) {
  const ref = doc(db, COL, slug);
  const existing = await getDoc(ref);
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  if (!existing.exists()) payload.createdAt = serverTimestamp();
  if (data.status === 'published' && (!existing.exists() || existing.data().status !== 'published')) {
    payload.publishedAt = serverTimestamp();
  }
  await setDoc(ref, payload, { merge: true });
  return { slug, ...payload };
}

export async function deletePost(slug) {
  await deleteDoc(doc(db, COL, slug));
}
