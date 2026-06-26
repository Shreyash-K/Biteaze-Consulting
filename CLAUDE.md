# CLAUDE.md — Biteaze-Consulting (biteaze.com marketing website)

Vite 6 + React 19 + TypeScript single-page marketing site (neo-brutalist, dark, orange `#ea580c`) for **Biteaze Solutions LLP**'s F&B consulting & management services. HashRouter SPA. Backend: **Supabase** (Postgres + storage). Hosting: **Vercel** now → **Cloudflare Pages** later.

## Run
- `npm install` → `npm run dev` (port 3000) · `npm run build` → `dist/` · `npm run preview`
- `npm run verify` = build + privacy guard + size budget (run before pushing).
- No `.env` needed: Supabase project URL + **public anon key** live in `utils/supabaseClient.ts`. There are **no secrets** in this repo — never add server keys/service-role keys to client code.

## ⛔ Hard constraints — do NOT break these
These are **promises in the published privacy policy** (`public/website-privacy/index.html`). Breaking them in code without updating the policy is a compliance violation, and **CI will block it**.

- **No analytics, no tracking, no advertising/social pixels, no cookies of our own, no `localStorage`/`sessionStorage` of data.** If you add any of these, (1) update the privacy policy in the SAME change, then (2) add a justified entry to `ALLOWLIST` in `scripts/privacy-guard.mjs`. Enforced by `npm run guard`.
- **Data minimization on the contact form.** It collects name / brand / email / phone / service-interest → Supabase `leads`. Adding/changing a field ⇒ update the policy's "What personal data we collect" table in the same change.
- **Supabase access is RLS-gated.** `leads` holds customer PII: anon may **INSERT only** — NEVER expose anon `SELECT`/`UPDATE`/`DELETE`. `team` / `portfolio` are public-read display content. The anon key is public by design; safety depends **entirely** on Row-Level Security. See `docs/PRIVACY_SECURITY.md`.
- **Standalone legal pages** are static files under `public/<name>/index.html` (NOT React components). `/privacy` = the **Android app** policy (canonical Play-Store URL — do NOT move/rename). `/website-privacy` = this site's policy. Each cross-references the other.
- **Keep it fast.** Gzipped JS+CSS budget is enforced (`scripts/size-budget.mjs`). Prefer self-hosted/optimized assets and lightweight deps; code-split before adding anything heavy.
- **Copyright year auto-updates** — `{new Date().getFullYear()}` in `components/Footer.tsx`, and `<span id="cpy-year">` + a one-line script in the static pages. Never hardcode the year. (Fixed legal "Effective"/"Last updated" dates are intentional — leave them.)
- **Third-party origins** the site already talks to: Google Fonts, the Tailwind CSS CDN, Supabase (API + storage), and any image host referenced by `team`/`portfolio` rows. Adding a NEW external origin (script, font, image host, API) ⇒ disclose it in the policy and reconsider the CSP in `docs/PRIVACY_SECURITY.md`.

## Before you push
`npm run verify` must pass (build + guard + budget); CI additionally runs `npm audit --audit-level=high`. Keep the privacy policy and the code in lockstep — update the policy in the SAME change as any data-flow change.

## Docs
- `docs/PRIVACY_SECURITY.md` — data map, Supabase RLS model + remediation SQL, HTTP security headers & CSP plan, and the full "keep it compliant going forward" guide.
