# Handover — Biteaze website, Firebase consolidation, marketing-site rebuild

Paste this into a new session to continue. Read it fully, then confirm priorities with me before any large/production change.

## Repos & environment
- **Marketing site:** `/Users/shreyash/Documents/Biteaze-Consulting` — Vite 6 + React 19 + TS, HashRouter SPA, hosted on **Vercel** (→ Cloudflare Pages later). GitHub `Shreyash-K/Biteaze-Consulting`, branch `main`. `gh` is authed as `Shreyash-K`; push works. **Read `CLAUDE.md`, then `docs/PRIVACY_SECURITY.md` and `docs/MARKETING_SITE_BLUEPRINT.md` first.**
- **Firebase backend** (production POS project `androidbilling-f801b`): `/Users/shreyash/Documents/android-billing/android-billing-admin-web` (`firestore.rules`, `storage.rules`, `functions/` = TS v2 / node20, `.firebaserc` → androidbilling-f801b). `firebase` CLI authed as `karnavatshreyash@gmail.com`. ⚠️ The `android-billing` workspace has **no git — deletions are permanent**; be careful.
- Project memory auto-loads (`MEMORY.md` → `biteaze-consulting-website.md`) with most of this context.

## Already DONE & pushed (Biteaze-Consulting `main`)
- Repo cloned + set up; gh push working.
- Three static legal pages: `/privacy` (Android-app policy — this is the **Play-Store URL, do not move/rename**), `/website-privacy`, `/account-deletion`. Auto-updating copyright year everywhere (`{new Date().getFullYear()}` + `<span id="cpy-year">` + script).
- Footer "Privacy Policy" → `/website-privacy`.
- Security hardening: react-router CVE fixed (`npm audit` = 0), security headers (`vercel.json` + `public/_headers`), contact-form honeypot/required/no-raw-errors, removed dead `recharts` + the Gemini-`define` secret footgun.
- Guardrails: `.github/workflows/ci.yml` (build + audit + privacy-guard + size-budget), `scripts/privacy-guard.mjs`, `scripts/size-budget.mjs`, `CLAUDE.md`, `docs/PRIVACY_SECURITY.md`.
- Tailwind migrated from the runtime CDN → PostCSS build (`tailwind.config.js` / `postcss.config.js` / `index.css`).

## OPEN TASKS (prioritized)

> **STATUS (27 Jun 2026): the Supabase→Firebase migration is BUILT & emulator-tested in code, function-first / App-Check-flip-ready — NOT yet deployed.** Done this session:
> - **Backend** (`android-billing-admin-web`, additive, zero blast radius): `firestore.rules` adds `websiteLeads` (CF-only) + `websiteTeam`/`websitePortfolio` (public-read); `storage.rules` adds `/website` (public-read); `functions/src/website.ts` = `submitWebsiteLead` onCall (testable core, honeypot + strict validation, `enforceAppCheck:false` flip-ready) re-exported from `index.ts`. **Emulator-tested 21/21** (`tests/website-rules.test.ts` 11 + `functions/test/website-lead.test.ts` 10).
> - **Website client** (this repo): `utils/firebaseClient.ts` (App-Check lazy/flip-ready; reads via Firestore **REST**, no SDK → bundle 235kB→**101kB**, under budget); `Footer` calls the function; `Team`/`Portfolio` read the public collections; `Navbar`+`index.html` logo from Storage w/ graceful fallback; dropped `@supabase/supabase-js`, added `firebase`; removed `utils/supabaseClient.ts`. **`npm run verify` + `tsc` clean.**
> - **Migration script**: `android-billing-admin-web/scripts/migrateWebsiteFromSupabase.ts` (idempotent, DRY_RUN, emulator-aware, re-hosts Supabase-hosted images to Firebase Storage). **DRY_RUN-validated against live Supabase: 6 team + 7 portfolio rows, all images Supabase-hosted.**
> - **Policy + docs**: `website-privacy` policy → **v1.1** (Supabase→Firebase, fully de-Supabased); `PRIVACY_SECURITY.md` (Firebase access model + Firebase CSP), `CLAUDE.md` updated.
>
> **⚠️ Two findings surfaced:** (1) the **logo is unrecoverable** — repo `logo.png` is UTF-8-corrupted (714k replacement bytes) and no logo exists in the Supabase bucket; navbar now degrades to the wordmark — **supply a clean logo** to upload to Storage `website/logo.png`. (2) The Supabase **logo URL was already 400ing** (pre-existing).
>
> **Reviewed:** a 5-lens adversarial review (rules-security / function / client / policy-sync / migration) ran — **security lenses CLEAN** (no way to read lead PII or forge content); 8 data-quality/doc findings confirmed & **all FIXED**: phone blank→null contract (Footer no longer sends "+91 " for an empty field), Team image graceful fallback (no "undefined?v=" + onError), portfolio `order` deterministic tiebreaker, leads doc-id keyed on Supabase row id (no hash collision), stale Tailwind-CDN flow removed from the policy (4 spots — it's a build step now), CLAUDE.md line-14 Supabase→Firebase. Re-verified green (tsc + verify 101 kB; migration DRY_RUN; backend 21/21 unchanged).
>
> **GATED on you (nothing deployed/pushed):** (a) **App Check** decision — keep function-first, or register a reCAPTCHA v3 site key to flip enforcement on; (b) **approval to deploy** the additive rules+function+storage to prod `androidbilling-f801b`; (c) cutover order = deploy backend → run migration → push website (policy rides along) → verify → lock/delete Supabase.

### P0 — close the leads PII exposure (owner action, or moot after Firebase)
Supabase `leads` is world-readable by the public anon key (7 real rows). Either run `Biteaze-Consulting/docs/supabase-rls-remediation.sql` in Supabase now, **or** finish the Firebase migration then **lock/delete the Supabase project** (the exposed rows persist there until you do). Also decide if the past exposure triggers a DPDP breach notification.

### 1 — Supabase → Firebase migration (decided: consolidate onto androidbilling-f801b)
Decisions locked: project = **androidbilling-f801b**; form security = **Cloud Function + App Check**; **migrate** existing rows + logo.
Done already: created Web app "Biteaze Consulting Website" in androidbilling-f801b. Config:
```
apiKey: AIzaSyCx4O0PH_HqdO_tRxNy4uALZ2UK3bpER_c
authDomain: androidbilling-f801b.firebaseapp.com
projectId: androidbilling-f801b
storageBucket: androidbilling-f801b.firebasestorage.app
messagingSenderId: 267764222044
appId: 1:267764222044:web:4f9e09a3fc60b914ab7e99
```
Plan (additive + isolated — zero blast radius on POS/`users/{uid}` data):
- `firestore.rules` (in android-billing-admin-web): add 3 TOP-LEVEL collections — `websiteLeads` (`read,write: if false` → CF-only), `websiteTeam` + `websitePortfolio` (`read: if true; write: if false`).
- `storage.rules`: add `match /website/{allPaths=**} { allow read: if true; allow write: if false; }`.
- `functions/` (TS v2): add `submitWebsiteLead` `onCall` with `enforceAppCheck: true`, validate input, write via Admin SDK.
- Website repo: new `utils/firebaseClient.ts` (+ App Check init); rewrite `Footer` (call the function), `Team`/`Portfolio` (read collections), `Navbar` (logo from Firebase Storage); drop `@supabase/supabase-js`; update `index.html` Supabase preload.
- Data-migration script: read 7 leads / 6 team / 7 portfolio + logo from Supabase → Firestore + Firebase Storage.
- Then: self-host fonts; finalize the strict **CSP** (recommended CSP is in `docs/PRIVACY_SECURITY.md` — swap Supabase origin for `firestore.googleapis.com` / `firebasestorage.googleapis.com`, drop Google Fonts + Tailwind CDN); rewrite policy + docs (Supabase → Firebase/Google); update `CLAUDE.md`.
- Finally lock/delete the Supabase project.
**BLOCKERS (need user):** (a) **App Check reCAPTCHA v3 site key** for the web app — register a v3 key pair at `google.com/recaptcha/admin` (domains biteaze.com / www / localhost), paste the **secret** into Firebase Console → App Check **in androidbilling-f801b** (NOT the gen-lang-client project), and provide the **site key** for the client. *Or* the user says "function-first" → ship the CF without App Check enforcement (flip on later, the attendance "flip-ready" pattern). (b) **Explicit approval to deploy** the additive rules + function + storage to the production androidbilling-f801b backend — emulator-test and show the diff first.

### 2 — Firebase topology (decided: one project)
Rename androidbilling-f801b **display name → "Biteaze"** (the project ID is permanent and stays `androidbilling-f801b`). Rule going forward: a new module = a new **named Firestore database** in the same project if it shares users/billing; a new **project** only for a truly independent product or a separate environment. Later: **move the marketplace DB** from the "biteaze modules" / `gen-lang-client-0908083691` project into androidbilling-f801b (no one-click — `gcloud firestore export`/`import` into a named `marketplace` DB + Storage `gsutil` + Firebase Auth `auth:export`/`auth:import`). Its own careful migration.

### 3 — Marketing-site rebuild per the blueprint (`docs/MARKETING_SITE_BLUEPRINT.md`)
Grow into a multi-product F&B platform site. Highest-leverage: a **config-driven product-page template** (a new product = one TS config object) + a central **product registry** feeding nav/footer/cross-sell; **hybrid conversion** (public pricing + Play-Store self-serve for Billing; demo/waitlist for Payroll/Marketplace/enterprise); a **content/SEO engine** (blog, glossary, templates, ungated calculator farm). **CRITICAL prerequisite:** the site is a client-side Vite SPA shipping an empty HTML shell — the marketing/resources surface must move to **SSG/SSR (Next.js on Vercel, or an Astro resources subdomain)** for SEO, with per-route meta + JSON-LD. Use the `premium-web-design` skill for the build and `biteaze-design` for the shell (dark, `#ea580c`, Archivo Black / Montserrat / Space Mono).

## Working norms
- Keep code ↔ privacy policy in sync (the guard enforces it); run `npm run verify` before pushing.
- Confirm before production / outward-facing / irreversible steps (deploying to androidbilling-f801b, locking/deleting Supabase, sending anything).
- Optional: re-run the Petpooja teardown's failed `multiproduct-ia` lens if you want that raw analysis.

**Start by telling me which task to tackle first.**
