# CLAUDE.md — Biteaze-Consulting (biteaze.com marketing website)

Vite 6 + React 19 + TypeScript single-page marketing site (neo-brutalist, dark, orange `#ea580c`) for **Biteaze Solutions LLP**'s F&B consulting & management services. HashRouter SPA. Backend: **Google Firebase** (Cloud Firestore + Cloud Functions + Cloud Storage, project `androidbilling-f801b` / "Biteaze"). Hosting: **Vercel** now → **Cloudflare Pages** later.

## Run
- `npm install` → `npm run dev` (port 3000) · `npm run build` → `dist/` · `npm run preview`
- `npm run verify` = build + privacy guard + size budget (run before pushing).
- No `.env` needed: the **public Firebase web config** lives in `utils/firebaseClient.ts` (a Firebase `apiKey` is a public project identifier, not a secret). There are **no secrets** in this repo — never add server keys/service-account keys to client code.

## ⛔ Hard constraints — do NOT break these
These are **promises in the published privacy policy** (`public/website-privacy/index.html`). Breaking them in code without updating the policy is a compliance violation, and **CI will block it**.

- **No analytics, no tracking, no advertising/social pixels, no cookies of our own, no `localStorage`/`sessionStorage` of data.** If you add any of these, (1) update the privacy policy in the SAME change, then (2) add a justified entry to `ALLOWLIST` in `scripts/privacy-guard.mjs`. Enforced by `npm run guard`.
- **Data minimization on the contact form.** It collects name / brand / email / phone / service-interest → the `submitWebsiteLead` Cloud Function, which writes the `websiteLeads` Firestore collection. Adding/changing a field ⇒ update the policy's "What personal data we collect" table in the same change.
- **Backend access is Firebase-rules-gated.** Lead PII (`websiteLeads`) is **Cloud-Function-only** — the browser never reads or writes it; the App-Check-flip-ready `submitWebsiteLead` Cloud Function (in `android-billing-admin-web/functions`) is the sole writer. `websiteTeam` / `websitePortfolio` are public-read display content (read via the Firestore REST API; no Firestore SDK, to keep the bundle small). The Firebase `apiKey` is public by design; safety depends **entirely** on Security Rules + the function. See `docs/PRIVACY_SECURITY.md`. (Supabase is being torn down — its RLS P0 fix still applies until the project is locked/deleted.)
- **Standalone legal pages** are static files under `public/<name>/index.html` (NOT React components). `/privacy` = the **Android app** policy (canonical Play-Store URL — do NOT move/rename). `/website-privacy` = this site's policy. Each cross-references the other.
- **Keep it fast.** Gzipped JS+CSS budget is enforced (`scripts/size-budget.mjs`). Prefer self-hosted/optimized assets and lightweight deps; code-split before adding anything heavy.
- **Copyright year auto-updates** — `{new Date().getFullYear()}` in `components/Footer.tsx`, and `<span id="cpy-year">` + a one-line script in the static pages. Never hardcode the year. (Fixed legal "Effective"/"Last updated" dates are intentional — leave them.)
- **Third-party origins** the site talks to: Google Fonts, Firebase (`firestore.googleapis.com` reads, `us-central1-…cloudfunctions.net` form, `firebasestorage.googleapis.com` images), and the Unsplash team-fallback image host. (The Tailwind CDN is gone — Tailwind is now a PostCSS build step.) Adding a NEW external origin (script, font, image host, API) ⇒ disclose it in the policy and reconsider the CSP in `docs/PRIVACY_SECURITY.md`.

## Before you push
`npm run verify` must pass (build + guard + budget); CI additionally runs `npm audit --audit-level=high`. Keep the privacy policy and the code in lockstep — update the policy in the SAME change as any data-flow change.

## Docs
- `docs/PRIVACY_SECURITY.md` — data map, Supabase RLS model + remediation SQL, HTTP security headers & CSP plan, and the full "keep it compliant going forward" guide.
