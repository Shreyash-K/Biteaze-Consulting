// Firebase client for the biteaze.com marketing site (replaces the old Supabase client).
//
// Backend: the production project androidbilling-f801b (display name "Biteaze"). This site is ANONYMOUS — it never
// signs a user in, and does exactly three things:
//   • WRITE the contact form → the callable Cloud Function submitWebsiteLead (the ONLY write path; the browser
//     never writes the leads collection directly). Uses the firebase/functions SDK so it stays App-Check-flip-ready
//     (httpsCallable auto-attaches an App Check token once App Check is initialized).
//   • READ two PUBLIC collections (websiteTeam, websitePortfolio) → via the Firestore REST API + a plain fetch.
//     We deliberately do NOT pull in the firebase/firestore SDK (~100 kB gzip) just for two read-only public lists —
//     that would blow the site's performance budget. The reads respect the same Security Rules (public read).
//   • READ public Storage assets (logo + images) → plain media URLs (objects are world-readable per storage.rules).
//
// SECRETS: a Firebase Web "apiKey" is a PUBLIC project identifier, not a secret — it ships in every Firebase web
// app and is safe in client code (access is controlled by Security Rules + App Check, never by hiding this key).
// There are NO server secrets here. (The privacy-guard's secret rule targets process.env.*KEY, not this.)
import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCx4O0PH_HqdO_tRxNy4uALZ2UK3bpER_c',
  authDomain: 'androidbilling-f801b.firebaseapp.com',
  projectId: 'androidbilling-f801b',
  storageBucket: 'androidbilling-f801b.firebasestorage.app',
  messagingSenderId: '267764222044',
  appId: '1:267764222044:web:4f9e09a3fc60b914ab7e99',
};

export const app = initializeApp(firebaseConfig);

// App Check — FLIP-READY. Empty site key = function-first launch (no client App Check; submitWebsiteLead ships
// enforceAppCheck:false). To turn it on: register a reCAPTCHA v3 key pair (domains biteaze.com / www / localhost),
// paste the SECRET into Firebase Console → App Check for androidbilling-f801b, set the (public) site key below,
// and flip ENFORCE_APP_CHECK in functions/src/website.ts to true + redeploy. httpsCallable then attaches the token
// automatically — the form code is unchanged. The SDK is lazy-imported so it adds ZERO bytes until enabled.
// reCAPTCHA v3 loads from google.com and may set its own cookies — disclose it in the policy + CSP at that point.
const RECAPTCHA_V3_SITE_KEY = '';
if (RECAPTCHA_V3_SITE_KEY) {
  void import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(RECAPTCHA_V3_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  });
}

// Cloud Functions live in us-central1 (matches the rest of the backend deployment).
export const functions = getFunctions(app, 'us-central1');

// Public download URL for an object under the Storage /website path (objects are world-readable per storage.rules,
// so the ?alt=media media endpoint serves them with no token). Used for the logo + content images.
export const websiteAssetUrl = (path: string): string =>
  `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${encodeURIComponent(path)}?alt=media`;

export const LOGO_URL = websiteAssetUrl('website/logo.png');

// ── Firestore REST read for the two PUBLIC display collections (no SDK) ──────────────────────────────────────────
// The REST documents.list endpoint returns each field wrapped in a type descriptor (e.g. {stringValue}); unwrap to
// plain JS. Public read is allowed by the rules, so the request is unauthenticated (the apiKey just routes it).
type FsValue = {
  stringValue?: string; integerValue?: string; doubleValue?: number; booleanValue?: boolean;
  nullValue?: null; arrayValue?: { values?: FsValue[] }; mapValue?: { fields?: Record<string, FsValue> };
};
function unwrap(v: FsValue): unknown {
  if (v == null) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue?.values ?? []).map(unwrap);
  if ('mapValue' in v) {
    const o: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v.mapValue?.fields ?? {})) o[k] = unwrap(val);
    return o;
  }
  return null;
}

/**
 * Fetch a PUBLIC Firestore collection over REST and return plain objects (each with `id`). Optionally sort ascending
 * by a numeric field. Throws on a non-OK response so callers fall back to their built-in defaults.
 */
export async function fetchPublicCollection<T = Record<string, unknown>>(
  name: string,
  orderByField?: string,
): Promise<T[]> {
  const url =
    `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}` +
    `/databases/(default)/documents/${name}?key=${firebaseConfig.apiKey}&pageSize=300`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Firestore REST ${res.status}`);
  const json = (await res.json()) as { documents?: Array<{ name: string; fields?: Record<string, FsValue> }> };
  const rows = (json.documents ?? []).map((d) => {
    const obj: Record<string, unknown> = { id: d.name.split('/').pop() };
    for (const [k, val] of Object.entries(d.fields ?? {})) obj[k] = unwrap(val);
    return obj as T;
  });
  if (orderByField) {
    rows.sort((a, b) => (Number((a as Record<string, unknown>)[orderByField]) || 0)
      - (Number((b as Record<string, unknown>)[orderByField]) || 0));
  }
  return rows;
}
