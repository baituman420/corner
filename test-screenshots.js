import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = '/home/anarqorp/.gemini/antigravity/brain/d476c499-b4ec-477a-abdf-f98d81ba7a66';

async function run() {
  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1920,1080'],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  
  let errors = 0;
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('BROWSER ERROR:', msg.text());
      errors++;
    }
  });

  page.on('pageerror', err => {
    console.error('PAGE UNCAUGHT ERROR:', err.toString());
    errors++;
  });

  page.on('requestfailed', req => {
    console.error('REQUEST FAILED:', req.url(), req.failure()?.errorText);
    errors++;
  });

  console.log('Navigating to http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

  await new Promise(r => setTimeout(r, 600));

  // Milestone 0: Horno Completamente Cerrado (Scroll 0)
  console.log('Milestone 0: Horno Cerrado (Scroll 0)...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'full_phase0_closed.png') });

  // Milestone 1: Puerta Abatida, Pala Asomando en la Cámara (Scroll 1200)
  console.log('Milestone 1: Puerta Abatida & Pala Asomando (Scroll 1200)...');
  await page.evaluate(() => window.scrollTo(0, 1200));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'full_phase1_peel_start.png') });

  // Milestone 2: Pala Cruzando la Boca del Horno y Volando sobre la Puerta (Scroll 1800)
  console.log('Milestone 2: Pala Cruzando Boca y Volando sobre Puerta (Scroll 1800)...');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'full_phase2_peel_crossing.png') });

  // Milestone 3: Pizza en Primer Plano Hero con Claim «COMER BIEN. SIN ETIQUETAS.» (Scroll 2800)
  console.log('Milestone 3: Presentación Hero Final con Claim (Scroll 2800)...');
  await page.evaluate(() => window.scrollTo(0, 2800));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'full_phase3_hero_claim.png') });

  // Milestone 4: Reversibilidad Total — Scroll Vuelta a 0 (Cierre Perfecto)
  console.log('Milestone 4: Scroll Vuelta a 0 (Cierre y Reversibilidad Total)...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'full_phase4_reversed.png') });

  // Mobile Viewport Check (390x844 - iPhone 14 Pro style)
  console.log('Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_phase0_closed.png') });

  await page.evaluate(() => window.scrollTo(0, 2800));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_phase3_hero_claim.png') });

  await browser.close();
  console.log(`Validation finished with ${errors} browser errors.`);
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
