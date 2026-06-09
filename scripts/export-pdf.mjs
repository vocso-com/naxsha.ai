// Export /v2 as a single-page PDF via fullPage screenshot → PDF conversion.
// This avoids the layout stretching caused by Chrome's tall viewport during page.pdf().

import puppeteer from "puppeteer-core";
import { writeFileSync, unlinkSync } from "node:fs";
import { execSync } from "node:child_process";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.PDF_URL ?? "http://localhost:3000/v2";
const OUT = process.env.PDF_OUT ?? "naxsha-v2.pdf";
const TMP_PNG = "/tmp/naxsha-v2-fullpage.png";
const WIDTH = 1440;

console.log(`→ Launching Chrome`);
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: 900, deviceScaleFactor: 1 });

console.log(`→ Navigating ${URL}`);
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });

// Warm up scroll-triggered motion + lazy images
console.log("→ Warming scroll-triggered motion");
await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y <= h; y += 600) {
    window.scrollTo(0, y);
    await sleep(60);
  }
  window.scrollTo(0, 0);
  await sleep(500);
});

// Hide Next.js dev indicator + any sticky overlays from the snapshot
await page.addStyleTag({
  content: `
    [data-nextjs-dev-tools-button], [data-nextjs-toast], #__next-build-watcher { display: none !important; }
  `,
});

console.log(`→ Capturing fullPage PNG → ${TMP_PNG}`);
await page.screenshot({
  path: TMP_PNG,
  fullPage: true,
  type: "png",
});

await browser.close();

// Convert PNG → single-page PDF preserving aspect ratio.
console.log(`→ Converting PNG → PDF: ${OUT}`);
execSync(`magick "${TMP_PNG}" "${OUT}"`, { stdio: "inherit" });
unlinkSync(TMP_PNG);

const sizeBytes = execSync(`stat -f%z "${OUT}"`).toString().trim();
console.log(`✓ Done (${(parseInt(sizeBytes) / 1024 / 1024).toFixed(1)} MB)`);
