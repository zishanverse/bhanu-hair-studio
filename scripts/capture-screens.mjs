import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_DIR = process.argv[2] || 'before';
const OUTPUT_DIR = path.resolve(process.cwd(), 'docs', 'screens', TARGET_DIR);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { width: 375, height: 812, name: '375' },
  { width: 768, height: 1024, name: '768' },
  { width: 1024, height: 768, name: '1024' },
  { width: 1440, height: 900, name: '1440' },
];

const SECTIONS = [
  { id: 'hero_mobile', selector: '#mobile-hero-section' },
  { id: 'hero_desktop', selector: '#cinematic-experience' },
  { id: 'studio', selector: '#studio' },
  { id: 'experience', selector: '#experience' },
  { id: 'services', selector: '#services' },
  { id: 'gallery', selector: '#gallery' },
  { id: 'skincare', selector: '#skincare' },
  { id: 'testimonials', selector: '#testimonials' },
  { id: 'book', selector: '#book' },
];

async function capture() {
  console.log(`Starting capture for ${TARGET_DIR} into ${OUTPUT_DIR}...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\nCapturing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
      // Allow GSAP / R3F to settle
      await new Promise(r => setTimeout(r, 2500));

      // Full page screenshot
      const fullPath = path.join(OUTPUT_DIR, `fullpage_${vp.name}.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      console.log(`  Saved fullpage: ${fullPath}`);

      // Section screenshots
      for (const sec of SECTIONS) {
        try {
          const el = await page.$(sec.selector);
          if (el) {
            await el.scrollIntoView();
            await new Promise(r => setTimeout(r, 500));
            const secPath = path.join(OUTPUT_DIR, `${sec.id}_${vp.name}.png`);
            await el.screenshot({ path: secPath });
            console.log(`  Saved section [${sec.id}]: ${secPath}`);
          } else {
            console.warn(`  Selector not found for ${sec.id} (${sec.selector})`);
          }
        } catch (err) {
          console.warn(`  Failed section ${sec.id} at ${vp.name}: ${err.message}`);
        }
      }

      await page.close();
    }
    console.log(`\nAll screenshots successfully saved to ${OUTPUT_DIR}!`);
  } catch (error) {
    console.error('Capture failed:', error);
  } finally {
    await browser.close();
  }
}

capture();
