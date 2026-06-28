# Firebase cutover runbook — Supabase → Firebase (biteaze.com)

Step-by-step, **ordered**, gated cutover. The migration code is built + emulator-tested + reviewed (see `HANDOVER.md`).
Posture: **function-first** (App Check off, flip later). Nothing here is automated — run each phase, verify, then proceed.

> **Ordering is load-bearing.** Backend must be live AND data migrated **before** the website is pushed, or the
> live site breaks (it would call a missing function and read empty collections). Supabase teardown is **last**.

Two repos:
- **BACKEND** = `/Users/shreyash/Documents/android-billing/android-billing-admin-web` (Firebase; **no git** — but Firebase Console keeps a rules version history for rollback).
- **WEBSITE** = `/Users/shreyash/Documents/Biteaze-Consulting` (Vite/React; git → `Shreyash-K/Biteaze-Consulting` `main` → Vercel auto-deploy).

Active project: **androidbilling-f801b**. Firebase CLI must be authed as **karnavatshreyash@gmail.com**.

---

## Phase 0 — Pre-flight (read-only)
```bash
cd /Users/shreyash/Documents/android-billing/android-billing-admin-web
firebase use                       # → androidbilling-f801b
firebase login:list                # confirm karnavatshreyash@gmail.com (can hang in non-interactive shells)
# Re-confirm the additive rules/function still pass on the emulator:
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
firebase emulators:exec --only firestore --project demo-website-rules "npx tsx --test tests/website-rules.test.ts"
firebase emulators:exec --only firestore --project demo-website-lead  "npx tsx --test functions/test/website-lead.test.ts"
```
> ⚠️ `firebase deploy --only firestore:rules` publishes the **entire** `firestore.rules` file (existing
> attendance/subscription rules **+** the new website blocks). The repo is the source of truth and the existing
> rules are already live, so this republishes them unchanged and adds only the 3 website blocks. Eyeball
> `firestore.rules` (the `BITEAZE MARKETING WEBSITE` section at the end) + `storage.rules` (`/website`) before deploying.

## Phase 1 — Deploy the backend (additive, low blast radius)
```bash
cd /Users/shreyash/Documents/android-billing/android-billing-admin-web
firebase deploy --only firestore:rules,storage,functions:submitWebsiteLead
```
- Surgical: deploys ONLY the rules, storage rules, and the one new function — touches no other function or any data.
- `submitWebsiteLead` ships **us-central1**, `enforceAppCheck:false` (function-first).
- **Rollback:** Firebase Console → Firestore/Storage **Rules → version history → revert**; `firebase functions:delete submitWebsiteLead` to remove the function.

## Phase 2 — Migrate data (idempotent; DRY_RUN first)
```bash
cd /Users/shreyash/Documents/android-billing/android-billing-admin-web
export FIREBASE_SERVICE_ACCOUNT="$(cat /path/to/serviceAccount.json)"   # or GOOGLE_APPLICATION_CREDENTIALS / ADC
# Preview (no writes):
DRY_RUN=true npx tsx --conditions=react-server scripts/migrateWebsiteFromSupabase.ts
# Real run — team (6) + portfolio (7) + re-hosts their images to Storage:
npx tsx --conditions=react-server scripts/migrateWebsiteFromSupabase.ts
# OPTIONAL — carry the 7 existing lead PII rows forward (needs the service-role key, since the P0 RLS fix blocks anon read):
SUPABASE_SERVICE_ROLE_KEY="..." MIGRATE_LEADS=true npx tsx --conditions=react-server scripts/migrateWebsiteFromSupabase.ts
```
- Idempotent (deterministic doc ids) — safe to re-run.
- The **logo step will warn** (the asset is corrupted/absent) — see the logo follow-up below.

## Phase 3 — Push the website (cuts the live site over to Firebase)
```bash
cd /Users/shreyash/Documents/Biteaze-Consulting
npm run verify                     # build + privacy-guard + size-budget (101 kB)
git add -A && git commit -m "Migrate website backend Supabase → Firebase (function-first); policy v1.1"
git push                           # → Vercel auto-deploys; policy v1.1 goes live WITH the code (same-change rule)
```
> ⚠️ **Do not push before Phase 1+2 succeed.**

## Phase 4 — Verify live
- Submit the contact form on biteaze.com → a doc appears in **Firestore → websiteLeads** (Console).
- Team "Brigade" + Portfolio render (from `websiteTeam`/`websitePortfolio`).
- Navbar shows the BITEAZE wordmark (logo until a clean file is uploaded).
- `curl -I https://biteaze.com` → security headers present; no console errors calling Firestore/the function.

## Phase 5 — Tear down Supabase (IRREVERSIBLE — last)
- Only after Phase 4 fully verifies.
- **Back up** the Supabase data first (esp. the `leads` rows if you didn't run MIGRATE_LEADS).
- Lock or delete the Supabase project (`rhxxzvhemrzxvndolajg`) → **fully resolves P0** (the exposed rows are gone).

---

## Follow-ups (not blocking)
- **Logo:** supply a clean logo → upload to Storage `website/logo.png` (it auto-appears) or drop into `public/logo.png`.
- **App Check flip:** register a reCAPTCHA v3 key → secret into App Check → set `RECAPTCHA_V3_SITE_KEY` in `utils/firebaseClient.ts` → flip `ENFORCE_APP_CHECK=true` in `functions/src/website.ts` → redeploy. Add the App-Check CSP origins (see `PRIVACY_SECURITY.md` §5).
- **CSP header + self-host fonts:** apply the Firebase CSP from `PRIVACY_SECURITY.md` §5; self-host Google Fonts to drop the fonts.* origins.
