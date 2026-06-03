// Thin wrapper around Brevo's transactional email + SMS endpoints.
// Docs: https://developers.brevo.com/reference/sendtransacemail
//       https://developers.brevo.com/reference/sendtransacsms

import axios from 'axios';

const API = 'https://api.brevo.com/v3';

function getKey() {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error('BREVO_API_KEY is not set');
  return key;
}

function senderEmail() {
  return process.env.BREVO_SENDER_EMAIL || 'noreply@ilovahcleaningservices.com.au';
}
function senderName() {
  return process.env.BREVO_SENDER_NAME || 'iLovah Cleaning Services';
}

export async function sendEmail({ to, subject, htmlContent, textContent }) {
  if (!to || !subject || !htmlContent) throw new Error('sendEmail: missing fields');
  try {
    const res = await axios.post(
      `${API}/smtp/email`,
      {
        sender: { email: senderEmail(), name: senderName() },
        to: Array.isArray(to) ? to : [{ email: to }],
        subject,
        htmlContent,
        textContent: textContent || htmlContent.replace(/<[^>]+>/g, ''),
      },
      { headers: { 'api-key': getKey(), 'content-type': 'application/json' } }
    );
    return { ok: true, id: res.data.messageId };
  } catch (err) {
    console.error('Brevo email error:', err?.response?.data || err.message);
    return { ok: false, error: err?.response?.data || err.message };
  }
}

export async function sendSMS({ recipient, message, sender = 'iLovah' }) {
  if (!recipient || !message) throw new Error('sendSMS: missing fields');
  try {
    const res = await axios.post(
      `${API}/transactionalSMS/sms`,
      {
        sender,                  // alphanumeric, max 11 chars for AU
        recipient,               // international format, e.g. +61478711829
        content: message,
        type: 'transactional',
      },
      { headers: { 'api-key': getKey(), 'content-type': 'application/json' } }
    );
    return { ok: true, id: res.data.messageId };
  } catch (err) {
    console.error('Brevo SMS error:', err?.response?.data || err.message);
    return { ok: false, error: err?.response?.data || err.message };
  }
}
