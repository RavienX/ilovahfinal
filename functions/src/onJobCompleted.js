// Triggers when a job is updated and status moves to "done" or "invoiced".
// Marks the job ready for a review request — the scheduled function will pick
// it up 7 days later and send the actual review request email.
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';

if (!getApps().length) initializeApp();

export const onJobCompleted = onDocumentUpdated(
  { document: 'jobs/{jobId}', region: 'australia-southeast1' },
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after) return;

    const wasComplete = before.status === 'done' || before.status === 'invoiced';
    const isComplete = after.status === 'done' || after.status === 'invoiced';

    // Only react when transitioning INTO completed state, not re-saves while there
    if (wasComplete || !isComplete) return;

    const db = getFirestore();
    await db.collection('jobs').doc(event.params.jobId).update({
      reviewRequestPending: true,
      reviewRequestScheduledFor: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
);
