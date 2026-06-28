# Privacy & Security — biteaze.com website

This is the source-of-truth guide for keeping the **biteaze.com marketing website** privacy-compliant, secure, and fast. It pairs with the published policy at `public/website-privacy/index.html` and the invariants in `CLAUDE.md`. Keep this doc and the policy in lockstep with the code.

> Scope: the website + its backend only. The Android app has its own policy at `/privacy` and is out of scope here.

> **⚠️ Backend migration (Jun 2026): Supabase → Firebase.** The backend has been rebuilt onto **Google Firebase** (project `androidbilling-f801b`, display name "Biteaze"): the contact form now posts to the `submitWebsiteLead` **Cloud Function** (the browser never writes the DB), which writes `websiteLeads` in **Cloud Firestore**; team/portfolio are public-read Firestore collections (`websiteTeam`/`websitePortfolio`); the logo + images live in **Firebase Storage** `/website`. The published policy (v1.1) reflects this. **The Supabase sections below remain valid as the interim/teardown guidance** — the P0 RLS fix is still needed until the Supabase project is locked/deleted (its 7 exposed `leads` rows persist there until then). Once the migration is live (rules + function deployed, data migrated, website cut over), **lock/delete Supabase** and these Supabase sections become history.

---

## 1. Compliance verdict (audit, Jun 2026)

**Partly compliant → becomes compliant once the Supabase RLS fix is applied.** The "what we do NOT do" promises (no cookies, no analytics, no tracking, no browser storage, client-side ROI calc, no ISO claim) are all **true in code**. Two gaps were found and addressed:

1. **P0 — `leads` PII was world-readable.** The Supabase `leads` table (contact-form submissions) returned rows to the public anon key (`HTTP 206`, 7 rows). This contradicted the policy's "access-controlled… restricted credentials" claim and is a personal-data exposure. **Fix = run `docs/supabase-rls-remediation.sql` in Supabase (owner action).**
2. **P1 — undisclosed third-party image flow.** `components/Team.tsx` loads fallback photos from `images.unsplash.com`; the policy's then-"exhaustive" third-party list omitted it. **Fixed in the policy** (now discloses third-party image hosts and a processors-table row). Privacy-preferred alternative: self-host those images so no third party sees visitor IP.

---

## 2. Data map (what PII exists, where)

| Data | Where collected | Where stored (post-migration) | Lawful basis | Retention |
|---|---|---|---|---|
| Name, Brand, Email, Phone (+91), Service Interest | Contact form (`components/Footer.tsx`) → `submitWebsiteLead` Cloud Function | Firestore `websiteLeads` (CF-only write; browser can't read) | DPDP s.7(a) voluntary provision (enquiry) | Until enquiry served + relationship; **choose a window** (see §6) |
| IP + User-Agent | Inherent to any request / asset load | Hosting + 3rd-party logs (Vercel/Cloudflare, Google Fonts, Tailwind CDN, Firebase: Firestore/Functions/Storage, image hosts) | Inherent to delivery | Provider log policies |
| Team / Portfolio content | `websiteTeam` / `websitePortfolio` (Firestore, public-read) + images in Firebase Storage `/website` | Firebase | Our own content (not visitor PII) | n/a |

The ROI calculator is **client-side only** — nothing is sent or stored. No cookies, no `localStorage`/`sessionStorage`, no analytics, no tracking.

---

## 3. Backend access model

### 3.1 Firebase (live, post-migration)

The Firebase Web `apiKey` is a **public identifier**, not a secret — safety depends entirely on **Security Rules + the Cloud Function**. This mirrors and hardens the old Supabase "anon can't read PII" posture:
- **`websiteLeads` = Cloud-Function-only.** `firestore.rules` denies ALL client read/write; the `submitWebsiteLead` Cloud Function (Admin SDK, App-Check-flip-ready, honeypot + strict validation) is the sole writer. The browser never reads or writes lead PII — stricter than the old anon-INSERT-only Supabase policy.
- **`websiteTeam` / `websitePortfolio` = public read, no client write** (display content, no PII). Read by the site over the Firestore REST API (no Firestore SDK — keeps the bundle small).
- **Storage `/website` = public read, no client write** (logo + images; Admin-SDK / console / migration-script uploads only).
- Rules + function live in `android-billing-admin-web` (`firestore.rules`, `storage.rules`, `functions/src/website.ts`), emulator-tested (`tests/website-rules.test.ts`, `functions/test/website-lead.test.ts`). New collections get rules with minimal access **before** any client touches them.

### 3.2 Supabase (interim — until teardown)

**The anon key is public by design** (it ships in the browser bundle). Safety depends entirely on Row-Level Security. Rules:

- **`leads` = INSERT-only for `anon`.** Never create an anon `SELECT`/`UPDATE`/`DELETE` policy — it holds customer PII. Read leads from the Supabase dashboard or a `service_role` server only.
- **`team` / `portfolio` = public `SELECT`, no anon writes.**
- Every new table is **RLS-enabled with explicit minimal policies before any client code touches it.** Enable the Supabase **Security Advisor** and review it on every release.

**Remediation SQL:** `docs/supabase-rls-remediation.sql` (paste-ready, idempotent; drops any permissive policy, enables+forces RLS, grants anon `INSERT` only, confirms team/portfolio read-only). Verify after running:

```sql
-- as anon (should return 0 rows / permission denied):
select * from public.leads limit 1;
-- the contact form (anon INSERT) must still succeed.
```

> ⚠️ Before running: confirm the `leads` column names (`name, email, brand_name, service_interest, phone`) match, and eyeball `select * from pg_policies where tablename='leads';`.

---

## 4. Contact-form abuse controls

- **Done:** honeypot field + silent drop (`Footer.tsx`), `required` email, generic error message (no raw error objects shown to visitors).
- **Recommended (owner/infra):** route the write through a **Supabase Edge Function / Cloudflare Worker** using `service_role` (with rate-limiting + Cloudflare Turnstile), then **`REVOKE INSERT` from anon** so the browser never writes to the table directly. Add DB `CHECK` constraints (length caps, `NOT NULL`) as a last line of defence.

---

## 5. HTTP security headers & CSP

**Done** (in `vercel.json`, mirrored in `public/_headers` for the Cloudflare migration): `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo/topics off).

**CSP — not yet applied** because it requires removing the runtime Tailwind CDN first. Target policy:

**Function-first (no App Check yet):**
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://firebasestorage.googleapis.com https://images.unsplash.com; connect-src 'self' https://firestore.googleapis.com https://us-central1-androidbilling-f801b.cloudfunctions.net; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests
```

Blockers / notes, in order:
1. **Tailwind CDN already removed** — it's now a PostCSS build step (the prior biggest blocker + perf win is done), so `script-src` needs neither `cdn.tailwindcss.com` nor `'unsafe-eval'`.
2. **Firebase origins** (replaced the Supabase origin): `connect-src` needs `firestore.googleapis.com` (public team/portfolio reads via REST) + the callable Function host `us-central1-androidbilling-f801b.cloudfunctions.net` (contact form). `img-src` needs `firebasestorage.googleapis.com` (logo + migrated images).
3. **When App Check (reCAPTCHA v3) is flipped on**, ADD: `script-src https://www.google.com https://www.gstatic.com`; `connect-src https://firebaseappcheck.googleapis.com`; `frame-src https://www.google.com` (the reCAPTCHA challenge iframe). reCAPTCHA also sets its own google.com cookies — disclose in the policy at that point.
4. `'unsafe-inline'` stays in `style-src` only because of the current inline `<style>` + React inline styles; move CSS into the build to drop it later.
5. **Unsplash** stays in `img-src` only as the team-fallback host (the live images are now on Firebase Storage). Replacing the hardcoded Unsplash fallbacks in `Team.tsx` would let you drop it.
6. Self-hosting Google Fonts at build time lets you drop `fonts.googleapis.com`/`fonts.gstatic.com` entirely (removes a third-party IP disclosure).

Deliver CSP as a **header** (not a `<meta>`), so `frame-ancestors` works.

---

## 6. Durable systems (keep it compliant going forward)

**Already wired:**
- **CI** (`.github/workflows/ci.yml`): `npm ci` → `npm audit --audit-level=high` → build → size budget; plus a separate privacy-guard job.
- **Privacy guard** (`scripts/privacy-guard.mjs`, `npm run guard`): fails if tracking/analytics/cookie/storage code or a secret-in-`define` is added to source. Update the policy + the guard `ALLOWLIST` together if you ever add one on purpose.
- **Performance budget** (`scripts/size-budget.mjs`, `npm run budget`): caps gzipped JS+CSS (220 kB).
- **Headers** committed in `vercel.json` + `public/_headers`.
- **`CLAUDE.md`** codifies the invariants for AI/dev work.

**Recommended next (owner/infra):**
- Make CI a **required status check** on a protected `main` branch.
- Add **`gitleaks`** (secret scan) and **`knip`/`depcheck`** (dead deps) to CI.
- Add **Lighthouse-CI** (perf ≥ 0.9) and an image-size check (fail on any image > ~300 kB).
- A single **`ALLOWED_ORIGINS`** file feeding the CSP, the policy's host table, and source validation, so they can never drift.
- A **post-deploy header smoke check** (`curl -I` / securityheaders.com).
- Set **SPF/DKIM/DMARC** for `support@biteaze.com` (deliverability + anti-spoofing).

---

## 7. Owner-action checklist (cannot be done from the repo)

- [ ] **Run `docs/supabase-rls-remediation.sql`** in the Supabase SQL editor, then verify anon `SELECT` on `leads` is denied and the form still submits. **(P0 — do first.)**
- [ ] Decide whether the **7 already-exposed `leads` rows** trigger the policy's own Section 13 breach-notification duty (notify those people / the Data Protection Board) — a legal/owner call.
- [ ] Choose the **retention window** for `leads` and make the policy text + any `pg_cron` cleanup match.
- [ ] Confirm the **production redeploy** picks up the `react-router-dom@6.30.4` rebuild (served JS must not contain `6.22.3`) and the new headers (`curl -I https://biteaze.com`).
- [ ] (Optional, recommended) Move the contact-form write behind an **Edge Function + Turnstile** and `REVOKE` anon `INSERT`.
- [ ] (Optional) Migrate Tailwind to a build step → unlocks the strict **CSP** and the biggest perf win.

---

## 8. Checklist when adding/changing a feature

1. New data field or integration? → update the **policy** (`public/website-privacy/index.html`) in the SAME PR (data table, processors, third-party origins).
2. New external origin (script/font/image/API)? → add it to the policy **and** the planned CSP; reconsider self-hosting.
3. New Supabase table? → RLS on with minimal policies **before** client code; never expose PII via anon `SELECT`.
4. No analytics/cookies/storage/trackers without a same-PR policy update + guard allowlist entry.
5. Run `npm run verify` (build + guard + budget) before pushing; keep secrets out of the client bundle.
