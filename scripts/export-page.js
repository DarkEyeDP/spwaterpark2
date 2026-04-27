/**
 * Export one or more Captain's Log Book spreads as full-resolution PNG images.
 *
 * Prerequisites:
 *   1. Install Chrome once: npx puppeteer browsers install chrome
 *   2. Start the dev server in another terminal: pnpm dev
 *
 * Usage:
 *   node scripts/export-page.js <spread> [spread ...]
 *
 * Spread identifiers:
 *   cover        — closed front cover
 *   1 … 10       — log entry spreads (1 = most recent)
 *   back         — back cover
 *
 * Examples:
 *   node scripts/export-page.js cover
 *   node scripts/export-page.js 1 3 5
 *   node scripts/export-page.js cover 1 2 3 4 5 6 7 8 9 10 back
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ───────────────────────────────────────────────────────────────────
const BASE_URL   = 'http://localhost:5173/updates';
const OUT_DIR    = path.join(__dirname, '..', 'exports');
const ANIM_WAIT  = 700;   // ms — animation is 540ms + buffer
const LOAD_WAIT  = 2000;  // ms — fonts, images, and weather widget settle time

// Update if you add or remove entries in captainsLog.ts
const ENTRY_COUNT = 10;
const MAX_SPREAD  = ENTRY_COUNT + 1;

// ── Injected CSS — hides all site chrome so only the book is captured ────────
const ISOLATION_CSS = `
  /* Hide navbar, footer, page header, nav bar, Stay Connected section */
  header, footer, nav,
  .text-center.py-10,
  .text-center.py-14 { display: none !important; }

  /* Remove the desk section's top/bottom padding so the book sits flush */
  .flex.flex-col.items-center.pt-6 {
    padding-top: 32px !important;
    padding-bottom: 32px !important;
  }

  /* Transparent page background so drop-shadow renders cleanly */
  body, #root, [style*="background: rgb(26, 14, 4)"] {
    background: transparent !important;
  }
`;

// ── Helpers ──────────────────────────────────────────────────────────────────
function parseArgs(args) {
  return args.map((arg) => {
    if (arg === 'cover') return 0;
    if (arg === 'back')  return MAX_SPREAD;
    const n = parseInt(arg, 10);
    if (isNaN(n) || n < 0 || n > MAX_SPREAD) {
      throw new Error(
        `Invalid spread "${arg}". Use "cover", 1–${ENTRY_COUNT}, or "back".`
      );
    }
    return n;
  });
}

function spreadLabel(spread) {
  if (spread === 0)          return 'cover';
  if (spread === MAX_SPREAD) return 'back-cover';
  return `entry-${String(spread).padStart(2, '0')}`;
}

function printUsage() {
  console.log(`
Usage:
  node scripts/export-page.js <spread> [spread ...]

Spreads:
  cover     — closed front cover
  1–${ENTRY_COUNT}       — log entry spreads
  back      — back cover

Examples:
  node scripts/export-page.js cover
  node scripts/export-page.js 1 3 5
  node scripts/export-page.js cover 1 2 back
`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) { printUsage(); process.exit(0); }

  let spreads;
  try {
    spreads = parseArgs(args);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    printUsage();
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('Launching browser…');
  const browser = await puppeteer.launch({ headless: true });
  const page    = await browser.newPage();

  // 2× device pixel ratio = retina-quality output
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });

  console.log(`Loading ${BASE_URL}…`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30_000 });

  // Wait for the book navigation dots to confirm the book has mounted
  await page.waitForSelector('[aria-label="Go to page 0"]', { timeout: 10_000 });

  // Inject CSS to strip out all surrounding site chrome
  await page.addStyleTag({ content: ISOLATION_CSS });

  // Let fonts, the weather widget, and images fully settle
  await new Promise((r) => setTimeout(r, LOAD_WAIT));

  for (const spread of spreads) {
    // Navigate to the requested spread via its dot button
    await page.click(`[aria-label="Go to page ${spread}"]`);
    await new Promise((r) => setTimeout(r, ANIM_WAIT));

    const bookEl = await page.$('#logbook');
    if (!bookEl) {
      console.error('  ✗  Could not find #logbook — is the dev server running?');
      break;
    }

    // Scroll the element into view so Puppeteer can measure it correctly
    await page.evaluate(() =>
      document.querySelector('#logbook')?.scrollIntoView({ block: 'center' })
    );
    await new Promise((r) => setTimeout(r, 80));

    const filename = `${spreadLabel(spread)}.png`;
    const filepath = path.join(OUT_DIR, filename);

    await bookEl.screenshot({
      path: filepath,
      captureBeyondViewport: true,  // captures full element even if it overflows viewport
    });

    console.log(`  ✓  ${filename}`);
  }

  await browser.close();
  console.log(`\nExports saved to: ${OUT_DIR}/`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
