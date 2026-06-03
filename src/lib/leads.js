// ============================================================================
// Lead capture — saves to Firestore and (later) triggers Brevo email/SMS
// ============================================================================

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function saveLead(data) {
  try {
    // 1. Save to Firestore — this is your client database
    const docRef = await addDoc(collection(db, 'leads'), {
      ...data,
      status: 'new',
      source: data.source || 'website-form',
      createdAt: serverTimestamp(),
    });

    // 2. (Phase 2) Trigger Brevo notification via Cloud Function
    // This is added later — for now leads just save to Firestore + we'll set up
    // a Firestore trigger that emails/SMSes Francis when a new lead appears.

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Failed to save lead:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// For dev/testing without Firebase — fallback to console.log
// ============================================================================
export async function saveLeadDev(data) {
  console.log('🔔 LEAD CAPTURED (dev mode):', data);
  await new Promise((r) => setTimeout(r, 800)); // simulate network
  return { success: true, id: 'dev-' + Date.now() };
}
