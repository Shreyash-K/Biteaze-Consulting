#!/usr/bin/env node
/**
 * Performance budget guard. Keeps the site fast to load by failing CI if the
 * shipped JS+CSS (gzipped) grows past a budget. Run AFTER `npm run build`.
 * Current baseline (Jun 2026): ~140 kB gzip JS. Budget gives ~50% headroom;
 * raise it deliberately (with a note) if a real feature needs it.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIR = join(process.cwd(), 'dist', 'assets');
const BUDGET_KB = 220; // total gzipped JS + CSS

if (!existsSync(DIR)) {
  console.error('❌ dist/assets not found — run `npm run build` first.');
  process.exit(1);
}

let total = 0;
const rows = [];
for (const f of readdirSync(DIR)) {
  if (!/\.(js|css)$/.test(f)) continue;
  const buf = readFileSync(join(DIR, f));
  const gz = gzipSync(buf).length;
  total += gz;
  rows.push([f, (statSync(join(DIR, f)).size / 1024).toFixed(1), (gz / 1024).toFixed(1)]);
}

console.log('asset                                   raw kB   gzip kB');
for (const [f, raw, gz] of rows) console.log(`${f.padEnd(40)} ${raw.padStart(7)} ${gz.padStart(8)}`);
const totalKb = (total / 1024).toFixed(1);
console.log(`\nTotal gzipped JS+CSS: ${totalKb} kB  (budget ${BUDGET_KB} kB)`);

if (total / 1024 > BUDGET_KB) {
  console.error(`\n❌ Bundle over budget by ${(total / 1024 - BUDGET_KB).toFixed(1)} kB.`);
  console.error('Trim deps / code-split, or raise BUDGET_KB in scripts/size-budget.mjs deliberately.');
  process.exit(1);
}
console.log('✅ Within performance budget.');
