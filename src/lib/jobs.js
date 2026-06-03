// Jobs CRUD. A job links to a client and moves through the Kanban pipeline.
import {
  collection, query, orderBy, getDocs, doc, addDoc, updateDoc,
  deleteDoc, serverTimestamp, where,
} from 'firebase/firestore';
import { db } from './firebase';

const COL = 'jobs';

export const JOB_STATUSES = ['booked', 'on-the-way', 'in-progress', 'done', 'invoiced'];

export const JOB_STATUS_LABELS = {
  'booked': 'Booked',
  'on-the-way': 'On the way',
  'in-progress': 'In progress',
  'done': 'Done',
  'invoiced': 'Invoiced',
};

export async function listJobs() {
  const q = query(collection(db, COL), orderBy('scheduledFor', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function listJobsByClient(clientId) {
  const q = query(collection(db, COL), where('clientId', '==', clientId), orderBy('scheduledFor', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createJob(data) {
  const payload = {
    clientId: data.clientId || null,
    clientName: data.clientName || '',
    service: data.service || '',
    status: data.status || 'booked',
    scheduledFor: data.scheduledFor || null,
    estimatedValue: Number(data.estimatedValue) || 0,
    address: data.address || '',
    notes: data.notes || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, COL), payload);
  return { id: ref.id, ...payload };
}

export async function updateJob(id, data) {
  const ref = doc(db, COL, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  // If marking done, set completedAt (used by Brevo review request scheduler)
  if (data.status === 'done' || data.status === 'invoiced') {
    await updateDoc(ref, { completedAt: serverTimestamp() });
  }
}

export async function deleteJob(id) {
  await deleteDoc(doc(db, COL, id));
}
