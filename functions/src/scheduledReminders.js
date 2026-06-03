// Runs once a day. Finds jobs marked done >= 7 days ago and sends the client
// an email asking for a Google review.
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';
import { sendEmail } from './brevoClient.js';

if (!getApps().length) initializeApp();

const GOOGLE_REVIEW_URL = 'https://g.page/r/ilovahcleaningservices/review'; // adjust to actual link

export const dailyReviewRequests = onSchedule(
  {
    schedule: 'every day 10:00',
    timeZone: 'Australia/Brisbane',
    region: 'australia-southeast1',
    secrets: ['BREVO_API_KEY'],
  },
  async () => {
    const db = getFirestore();
    const now = new Date();

    const pending = await db.collection('jobs')
      .where('reviewRequestPending', '==', true)
      .where('reviewRequestScheduledFor', '<=', now)
      .limit(50)
      .get();

    if (pending.empty) {
      console.log('No review requests due today.');
      return;
    }

    for (const docSnap of pending.docs) {
      const job = docSnap.data();
      if (!job.clientId) {
        await docSnap.ref.update({ reviewRequestPending: false });
        continue;
      }

      const clientDoc = await db.collection('clients').doc(job.clientId).get();
      const client = clientDoc.data();
      if (!client || !client.email) {
        await docSnap.ref.update({ reviewRequestPending: false });
        continue;
      }

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #2B8FD4;">Hi ${client.name || 'there'} — quick favour?</h2>
          <p>Thanks for choosing us for your ${job.service || 'recent job'}. We hope everything went well.</p>
          <p>As a small family business, Google reviews are how we get found by other locals. If you have 30 seconds, we'd be hugely grateful if you could leave us a quick review:</p>
          <p style="text-align: center; margin: 24px 0;">
            <a href="${GOOGLE_REVIEW_URL}" style="background: #E8232A; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold;">⭐ Leave a Google review</a>
          </p>
          <p>If anything wasn't right with the job, just reply to this email — we'd much rather fix it than have you write a so-so review.</p>
          <p>Thanks again,<br/>Francis & the team</p>
          <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
            iLovah Cleaning & Rest In Pest · Helidon QLD · 0478 711 829
          </p>
        </div>
      `;

      const result = await sendEmail({
        to: [{ email: client.email, name: client.name || '' }],
        subject: 'Quick favour — would you leave us a Google review?',
        htmlContent: html,
      });

      await docSnap.ref.update({
        reviewRequestPending: false,
        reviewRequestSentAt: FieldValue.serverTimestamp(),
        reviewRequestSuccess: result.ok,
      });

      console.log(`Review request to ${client.email}: ${result.ok ? 'sent' : 'failed'}`);
    }
  }
);
