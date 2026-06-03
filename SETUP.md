# iLovah Cleaning & Rest In Pest — Complete Site + CRM

**What you have here:** the entire website + customer database + automation system, all in one. Built for Francis Velasco, family-owned, based in Helidon QLD.

---

## What's in the box

**Marketing site (33 pages)**
- Dual-brand homepage
- 7 cleaning service pages, 6 pest service pages
- 3 area landing pages (Toowoomba, Highfields, Helidon)
- Hub pages (cleaning, pest, areas, combo)
- About, Contact, Blog (public)
- Full SEO infrastructure — schema.org JSON-LD, sitemap, breadcrumbs, FAQs marked up for AI search

**CRM (the `/admin` section)**
- Dashboard with live stats
- Leads inbox (real-time, every quote form auto-appears)
- Clients database with **CSV import** for your existing list
- Jobs Kanban board (Booked → On the way → In progress → Done → Invoiced)
- Blog editor (Markdown with live preview)
- Settings (business hours + message templates)

**Brevo automation (Cloud Functions)**
- New lead → SMS to you + email confirmation to customer (within seconds)
- Job marked done → review request email scheduled for 7 days later
- Daily scheduler sends pending review requests automatically

**Security**
- Login wall on `/admin/*` — only signed-in users can see customer data
- Firestore rules locked down so randoms can't read your data even if they find your project ID
- Public can submit leads (so the quote form works) but can't read them

---

## First-time deployment (≈ 90 minutes for someone who's done it before)

### 1. Local setup (5 mins)
```bash
cd ilovah-build
npm install
```

### 2. Configure Firebase (15 mins)
Go to https://console.firebase.google.com/project/ilovahclean and confirm:
- **Firestore Database** is enabled, region: `australia-southeast1` (Sydney)
- **Authentication** is enabled with Email/Password provider
- **Hosting** is enabled
- **Plan is Blaze** (pay-as-you-go) — required for Cloud Functions. Free tier covers your usage at $0/month but a credit card must be on file.

Then get the web app config:
1. Project Settings → Your apps → Web (`</>`)
2. If no web app, click `</>` to create one
3. Copy the `firebaseConfig` values
4. Paste them into `src/lib/firebase.js` over the `REPLACE_WITH_*` placeholders

### 3. Create Francis's admin login (2 mins)
1. Firebase Console → Authentication → Users → Add User
2. Email: Francis's email · Password: pick a strong one
3. **This is the login Francis uses at /admin**

### 4. Deploy Firestore rules (1 min)
```bash
npm install -g firebase-tools  # if not installed
firebase login
firebase deploy --only firestore:rules
```

### 5. Get a Brevo account (10 mins)
1. Sign up at https://www.brevo.com (free)
2. Verify your sender email (the email confirmations come from this address)
3. For AU SMS: Brevo dashboard → SMS → buy ~$30 of credits to start (around 500 SMS messages at AU pricing)
4. Get API key: Settings → SMTP & API → API Keys → Generate new key

### 6. Wire Brevo into Cloud Functions (5 mins)
```bash
cd functions
# Set your Brevo API key as a Firebase secret (encrypted, not in code)
firebase functions:secrets:set BREVO_API_KEY
# When prompted, paste your Brevo API key
```

Optionally also set:
```bash
firebase functions:config:set runtime.owner_phone="+61478711829" \
  runtime.brevo_sender_email="noreply@ilovahcleaningservices.com.au"
```

### 7. Deploy Cloud Functions (5 mins)
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### 8. Deploy the website (3 mins)
```bash
npm run build
firebase deploy --only hosting
```

### 9. First test (5 mins)
1. Visit your live site
2. Submit a test quote form
3. You should:
   - Get an SMS within seconds at 0478 711 829 ("New lead! ...")
   - The customer should get an email confirmation
   - The lead should appear at `/admin/leads` instantly
4. Log into `/admin` with Francis's credentials
5. Confirm dashboard shows the new lead

---

## Importing your existing clients (CSV)

You have your client list in Excel/Sheets with service history. Here's how to bring it in.

### Step 1 — Export from Excel/Sheets to CSV
- Excel: File → Save As → CSV (Comma delimited)
- Google Sheets: File → Download → CSV

### Step 2 — Check your column headers
The importer recognises any of these column names (case-insensitive):

| What it is | Acceptable column names |
|---|---|
| **Name** *(required)* | `name`, `client`, `customer`, `full name`, `fullname` |
| **Phone** *(required)* | `phone`, `mobile`, `phone number`, `contact`, `mobile number` |
| Email | `email`, `e-mail`, `email address` |
| Address | `address`, `street`, `street address` |
| Suburb | `suburb`, `city`, `town`, `location` |
| Notes | `notes`, `comments`, `remarks`, `description` |
| First job date | `first_job_date`, `firstjobdate`, `first job`, `since`, `client since` |
| Total jobs done | `total_jobs`, `totaljobs`, `jobs`, `job count` |
| Lifetime spend | `total_spent`, `totalspent`, `spent`, `revenue`, `value` |

Your existing spreadsheet probably already uses headers like these — should work as-is.

### Step 3 — Import via the CRM
1. Log into `/admin/clients`
2. Click **"📥 Import CSV"** (top right)
3. Pick your CSV file
4. **Preview shows the first 5 rows** so you can sanity check the mapping
5. Click "Import N rows"
6. Done — you get a summary: `X imported, Y skipped (duplicates), Z errors`

**Duplicate handling:** If a phone number already exists in your client database, that row is skipped (no overwriting). The phone number is normalised (`0478711829`, `+61478711829`, `0478 711 829` all match).

---

## How the day-to-day flow works

```
Website quote form
        ↓ (Firestore trigger)
   New lead saved
        ↓
   ✉️ You get SMS within seconds  
   ✉️ Customer gets confirmation email
        ↓
   You see it in /admin/leads (real-time)
        ↓
   Click "Add to clients & mark booked"
        ↓
   Create a job in /admin/jobs
        ↓
   Drag job through Kanban as work happens:
   Booked → On the way → In progress → Done
        ↓ (when marked Done)
   System schedules review request for 7 days later
        ↓
   Daily scheduler sends review request email
        ↓
   Customer leaves Google review 🎉
```

---

## Updating content

**Editing service prices, copy, or FAQs?**
- All cleaning content lives in `src/data/cleaning-pages.jsx`
- All pest content lives in `src/data/pest-pages.jsx`
- Edit, save, run `npm run build && firebase deploy --only hosting`

**Adding a blog post?**
- Log into `/admin/blog`
- Click "+ New post"
- Write in Markdown with live preview
- Click "Publish" — appears on `/blog` immediately, no rebuild needed

**Updating business info (phone, email, hours, suburbs)?**
- All centralised in `src/data/business.js`
- Edit once, flows through every page

---

## Costs to expect (monthly, all up)

| Service | Free tier covers | Likely cost at your volume |
|---|---|---|
| Firebase Hosting | 10 GB/mo egress | $0 |
| Firestore | 20k writes, 50k reads/day | $0 (you'd need 100+ leads/day to exceed) |
| Cloud Functions | 2M invocations/mo | $0 |
| Brevo email | 300/day free | $0 (or ~$10/mo if you exceed) |
| Brevo SMS (AU) | None | ~$30/mo for ~500 SMS |
| Domain | — | $20/yr (already have) |

**Realistic estimate: $30-50/month**, almost all of it Brevo SMS.

---

## Troubleshooting

**"I deployed but the site is blank"**
Check `src/lib/firebase.js` — the `REPLACE_WITH_*` placeholders need real values from Firebase Console. Without them, the JS bundle crashes silently.

**"I can't log into /admin"**
Create the user in Firebase Console → Authentication → Users → Add User. The Auth provider must be set to Email/Password (Project Settings → Authentication → Sign-in methods).

**"New leads aren't triggering SMS to me"**
1. Check Firebase Console → Functions → Logs — is `onLeadCreated` firing?
2. If it's firing but failing: usually `BREVO_API_KEY` isn't set. Re-run `firebase functions:secrets:set BREVO_API_KEY` and redeploy functions.
3. If it's NOT firing at all: you're probably still on the Spark (free) Firebase plan — Cloud Functions need Blaze.

**"Customer email confirmations going to spam"**
Add SPF + DKIM records for `ilovahcleaningservices.com.au` pointing to Brevo. Brevo dashboard → Senders & IP → Domains → Authenticate. Takes 24-48 hours after adding DNS records.

**"The CSV import says 'X errors — see console'"**
Browser dev tools → Console tab. Each failed row logs why it failed (usually invalid phone format or Firestore permission denied).

---

## What you can build next (no rush)

- Google Reviews widget on the homepage (pulls from Google My Business API)
- WhatsApp Business integration (Brevo supports it — same code shape as SMS)
- SMS reminder day before a job: "Hi {{name}}, we're booked for {{service}} tomorrow at {{time}}"
- Online booking form (skip the quote step — direct to scheduled job)
- Customer portal where they can see their job history

All of this builds on top of what you have — the Firestore data model and Cloud Functions infrastructure are already shaped for it.

---

## File map (where everything lives)

```
ilovah-build/
├── src/
│   ├── App.jsx                  # All routes wired here
│   ├── data/
│   │   ├── business.js          # Single source of truth: phone, email, suburbs
│   │   ├── cleaning-pages.jsx   # 6 cleaning service page contents
│   │   └── pest-pages.jsx       # 6 pest service page contents
│   ├── pages/                   # Public marketing pages
│   ├── admin/                   # /admin CRM
│   ├── components/              # Header, Footer, QuoteForm, etc.
│   ├── lib/
│   │   ├── firebase.js          # ⚠ PASTE YOUR CONFIG HERE
│   │   ├── auth.js              # Sign in/out
│   │   ├── blog.js              # Blog CRUD
│   │   ├── clients.js           # Clients CRUD + CSV helpers
│   │   ├── jobs.js              # Jobs CRUD + Kanban statuses
│   │   └── leads.js             # Lead capture from quote form
│   └── seo/                     # SEO meta + schema.org JSON-LD
├── functions/                   # Brevo Cloud Functions
│   ├── index.js                 # Entry — exports all functions
│   ├── src/
│   │   ├── brevoClient.js       # Brevo API wrapper
│   │   ├── onLeadCreated.js     # Lead → SMS + email
│   │   ├── onJobCompleted.js    # Done job → flag for review request
│   │   └── scheduledReminders.js # Daily review request sender
│   └── .env.example             # Copy to .env, fill in
├── public/
│   ├── sitemap.xml              # Updated with all routes
│   └── robots.txt
├── firebase.json                # Hosting + Functions + Firestore config
├── firestore.rules              # Security rules
└── SETUP.md                     # This file
```

---

## Owner contact reference (auto-pulled by code from business.js)

- Phone: 0478 711 829
- Email: ilovahcleaning@gmail.com · restinpest@gmail.com
- Address: 37 Seventeen Mile Road, Helidon QLD 4344
- Website: ilovahcleaningservices.com.au

If you change these, update `src/data/business.js` — it flows everywhere automatically.

---

**Built with ☕ for Francis & the team.** Questions? The code is well-commented; start with `src/App.jsx` to see how everything connects.
