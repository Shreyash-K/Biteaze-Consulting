#!/usr/bin/env node
/**
 * Privacy-compliance guard.
 *
 * The published website privacy policy (public/website-privacy/index.html)
 * PROMISES: no cookies of our own, no analytics, no advertising/tracking
 * pixels, no browser storage of data. This script fails CI if code is
 * introduced that would break those promises — so the policy and the code
 * can never silently drift apart.
 *
 * If you add one of these ON PURPOSE: (1) update the privacy policy in the
 * SAME change, then (2) add a justified entry to ALLOWLIST below.
 *
 * No dependencies — runs on plain Node.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
// Scan APP SOURCE only — never public/ (the policy docs legitimately contain
// the words "Google Analytics", "localStorage", "cookies" in "we do NOT use…").
const SCAN_DIRS = ['components', 'utils', 'src'];
const SCAN_FILES = ['index.html', 'index.tsx', 'App.tsx', 'types.ts', 'vite.config.ts'];
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.html']);

const RULES = [
  { name: 'Google Analytics / gtag / GTM', re: /googletagmanager\.com|google-analytics\.com|gtag\s*\(/i },
  { name: 'Meta / Facebook Pixel', re: /connect\.facebook\.net|fbq\s*\(/i },
  { name: 'third-party analytics SDK', re: /\b(hotjar|mixpanel|posthog|amplitude|fullstory|heap)\b|segment\.com|clarity\.ms|plausible|umami/i },
  { name: 'cookie write', re: /document\.cookie\s*=/i },
  { name: 'browser storage (localStorage/sessionStorage)', re: /\b(localStorage|sessionStorage)\b/ },
  { name: 'secret inlined into the client bundle (process.env.*KEY/SECRET/TOKEN)', re: /process\.env\.[A-Za-z_]*(KEY|SECRET|TOKEN|PASSWORD)/ },
];

// { file: 'components/X.tsx', rule: 'cookie write', reason: '... (policy updated YYYY-MM-DD)' }
const ALLOWLIST = [];

function collect() {
  const out = [];
  for (const f of SCAN_FILES) if (existsSync(join(ROOT, f))) out.push(f);
  const walk = (dir) => {
    const abs = join(ROOT, dir);
    if (!existsSync(abs)) return;
    for (const e of readdirSync(abs)) {
      const rel = join(dir, e);
      const st = statSync(join(ROOT, rel));
      if (st.isDirectory()) walk(rel);
      else if (EXTS.has(rel.slice(rel.lastIndexOf('.')))) out.push(rel);
    }
  };
  SCAN_DIRS.forEach(walk);
  return out;
}

const allowed = (file, rule) => ALLOWLIST.some((a) => a.file === file && a.rule === rule);
const violations = [];
for (const file of collect()) {
  const lines = readFileSync(join(ROOT, file), 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (rule.re.test(line) && !allowed(file, rule.name)) {
        violations.push({ file, line: i + 1, rule: rule.name, text: line.trim().slice(0, 120) });
      }
    }
  });
}

if (violations.length) {
  console.error('\n❌ Privacy-compliance guard FAILED — code may contradict the privacy policy:\n');
  for (const v of violations) console.error(`  ${v.file}:${v.line}  [${v.rule}]\n      ${v.text}`);
  console.error('\nThe website privacy policy promises no cookies/analytics/tracking/storage.');
  console.error('If this is intentional: update public/website-privacy/index.html in the SAME');
  console.error('change, then add a justified entry to ALLOWLIST in scripts/privacy-guard.mjs.\n');
  process.exit(1);
}
console.log('✅ Privacy-compliance guard passed — no undisclosed tracking/cookies/storage in source.');
