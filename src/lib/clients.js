// Client database CRUD. Clients are created from leads or imported via CSV.
import {
  collection, query, orderBy, getDocs, doc, getDoc, setDoc, addDoc,
  deleteDoc, updateDoc, serverTimestamp, where, limit,
} from 'firebase/firestore';
import { db } from './firebase';

const COL = 'clients';

// Normalise phone for dedupe matching: strip everything non-numeric, drop leading 0
export function normalisePhone(phone = '') {
  const digits = String(phone).replace(/\D/g, '');
  return digits.startsWith('61') ? digits.slice(2) : digits.replace(/^0/, '');
}

export async function listClients() {
  const q = query(collection(db, COL), orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getClient(id) {
  const ref = doc(db, COL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function findClientByPhone(phone) {
  const phoneKey = normalisePhone(phone);
  if (!phoneKey) return null;
  const q = query(collection(db, COL), where('phoneKey', '==', phoneKey), limit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

export async function createClient(data) {
  const phoneKey = normalisePhone(data.phone);
  const payload = {
    name: data.name || '',
    phone: data.phone || '',
    phoneKey,
    email: data.email || '',
    address: data.address || '',
    suburb: data.suburb || '',
    notes: data.notes || '',
    source: data.source || 'manual',
    firstJobDate: data.firstJobDate || null,
    totalJobs: Number(data.totalJobs) || 0,
    totalSpent: Number(data.totalSpent) || 0,
    tags: data.tags || [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, COL), payload);
  return { id: ref.id, ...payload };
}

export async function updateClient(id, data) {
  const ref = doc(db, COL, id);
  const payload = { ...data, updatedAt: serverTimestamp() };
  if (data.phone) payload.phoneKey = normalisePhone(data.phone);
  await updateDoc(ref, payload);
  return { id, ...payload };
}

export async function deleteClient(id) {
  await deleteDoc(doc(db, COL, id));
}

// Promote a lead to a client. Returns the client ID (existing or new).
export async function promoteLeadToClient(lead) {
  const existing = await findClientByPhone(lead.phone);
  if (existing) {
    // Already a client — just update notes if relevant
    return existing.id;
  }
  const client = await createClient({
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    suburb: lead.suburb,
    notes: lead.message ? `Initial enquiry: ${lead.message}` : '',
    source: 'lead-promotion',
    tags: [lead.service].filter(Boolean),
  });
  return client.id;
}
