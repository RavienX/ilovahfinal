// Triggers when a new lead document is created in Firestore.
// 1. SMS owner so they can call back fast (within the 15-min reply promise).
// 2. Email the customer a confirmation so they know the form worked.
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { sendEmail, sendSMS } from './brevoClient.js';

export const onLeadCreated = onDocumentCreated(
  { document: 'leads/{leadId}', region: 'australia-southeast1', secrets: ['BREVO_API_KEY'] },
  async (event) => {
    const lead = event.data?.data();
    if (!lead) return;

    const ownerPhone = process.env.OWNER_PHONE || '+61478711829';

    // --- 1. SMS the owner ---
    const ownerMsg = [
      'New lead!',
      `${lead.name || 'Unknown'} - ${lead.phone || 'no phone'}`,
      lead.service ? `Service: ${lead.service}` : '',
      lead.suburb ? `Suburb: ${lead.suburb}` : '',
      'Reply within 15 mins.',
    ].filter(Boolean).join('\n');

    await sendSMS({
      recipient: ownerPhone,
      message: ownerMsg,
      sender: 'iLovah',
    }).catch((e) => console.error('Owner SMS failed:', e));

    // --- 2. Email the customer (if they gave an email) ---
    if (lead.email) {
      const isPest = lead.service && lead.service.toLowerCase().includes('pest');
      const brandName = isPest ? 'Rest In Pest Control Service' : 'iLovah Cleaning Services';
      const brandColour = isPest ? '#E8232A' : '#2B8FD4';

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: ${brandColour};">Thanks ${lead.name || 'there'} — we've got your enquiry.</h2>
          <p>This is a quick auto-confirmation that we received your request. Francis or someone on the team will reply within 15 minutes during business hours (Mon–Sat, 7am–6pm).</p>
          <p><b>Your enquiry:</b></p>
          <ul>
            ${lead.service ? `<li>Service: ${lead.service}</li>` : ''}
            ${lead.suburb ? `<li>Suburb: ${lead.suburb}</li>` : ''}
            ${lead.bedrooms ? `<li>Bedrooms: ${lead.bedrooms}</li>` : ''}
            ${lead.message ? `<li>Message: ${lead.message}</li>` : ''}
          </ul>
          <p>Need to reach us sooner? Call or text <b>0478 711 829</b>.</p>
          <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
            ${brandName} · Helidon QLD · ilovahcleaningservices.com.au
          </p>
        </div>
      `;

      await sendEmail({
        to: [{ email: lead.email, name: lead.name || '' }],
        subject: `We got your enquiry — ${brandName}`,
        htmlContent: html,
      }).catch((e) => console.error('Customer email failed:', e));
    }
  }
);
