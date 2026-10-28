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

  // 1. Hero Horno Cerrado
  console.log('Capturing: 01 Hero Horno Cerrado (Scroll 0)...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step01_hero_closed.png') });

  // 2. Hero Extracción Pizza y Claim
  console.log('Capturing: 02 Hero Extracción Pizza y Claim (Scroll 2800)...');
  await page.evaluate(() => window.scrollTo(0, 2800));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step02_hero_pizza_claim.png') });

  // 3. Recorrido Gastronómico: Tres Pilares
  console.log('Capturing: 03 Recorrido Gastronómico (Tres Pilares)...');
  await page.evaluate(() => {
    const el = document.getElementById('gastronomia');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step03_gastro_journey_pillars.png') });

  // 4. Carta Completa Interactiva
  console.log('Capturing: 04 Carta Completa Interactiva...');
  await page.evaluate(() => {
    const el = document.getElementById('carta');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step04_carta_verificada.png') });

  // 5. Filtrado Interactivo de la Carta: Click en Pizzas Artesanas
  console.log('Capturing: 05 Filtrado Interactivo (Pizzas Artesanas)...');
  await page.evaluate(() => {
    const pizzaTab = document.querySelector('.filter-btn[data-filter="pizzas"]');
    if (pizzaTab) pizzaTab.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step05_carta_filter_pizzas.png') });

  // 6. El Local (Cara A del Giro 3D: progress = 0.0)
  console.log('Capturing: 06 El Local (Cara A del Giro 3D)...');
  await page.evaluate(() => {
    const allTab = document.querySelector('.filter-btn[data-filter="all"]');
    if (allTab) allTab.click();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    const corner = document.getElementById('cornerStage');
    if (corner) {
      const cornerST = window.ScrollTrigger.getAll().find(st => st.trigger === corner);
      const startY = cornerST ? cornerST.start : corner.offsetTop;
      window.scrollTo(0, Math.round(startY));
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step06_el_local_cara_a.png') });

  // 7. Giro de Esquina 3D a Mitad de Rotación (progress = 0.5, 45°)
  console.log('Capturing: 07 Giro de Esquina 3D a Mitad de Rotación (45°)...');
  await page.evaluate(() => {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    const corner = document.getElementById('cornerStage');
    if (corner) {
      const cornerST = window.ScrollTrigger.getAll().find(st => st.trigger === corner);
      if (cornerST) {
        window.scrollTo(0, Math.round(cornerST.start + (cornerST.end - cornerST.start) * 0.5));
      }
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step07_corner_turn_mid_3d.png') });

  // 8. Cara B: Dobla la Esquina — Ubicación & Contacto (progress = 0.98, 90°)
  console.log('Capturing: 08 Cara B: Dobla la Esquina — Ubicación & Contacto (90°)...');
  await page.evaluate(() => {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    const corner = document.getElementById('cornerStage');
    if (corner) {
      const cornerST = window.ScrollTrigger.getAll().find(st => st.trigger === corner);
      if (cornerST) {
        window.scrollTo(0, Math.round(cornerST.start + (cornerST.end - cornerST.start) * 0.98));
      }
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'step08_corner_turn_cara_b_contacto.png') });

  // Mobile Viewport (390x844)
  console.log('Capturing: Mobile Viewport tests...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844 });
  await mobilePage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // 09. Mobile Hero
  console.log('Capturing: 09 Mobile Hero (Scroll 0)...');
  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'step09_mobile_hero.png') });

  // 10. Mobile Carta
  console.log('Capturing: 10 Mobile Carta...');
  await mobilePage.evaluate(() => {
    const el = document.getElementById('carta');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'step10_mobile_carta.png') });

  // 11. Mobile Corner Turn / Contacto
  console.log('Capturing: 11 Mobile Corner Turn (Contacto)...');
  await mobilePage.evaluate(() => {
    const corner = document.getElementById('cornerStage');
    const st = window.ScrollTrigger.getAll().find(s => s.trigger === corner);
    if (st) {
      window.scrollTo(0, Math.round(st.start + (st.end - st.start) * 0.98));
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'step11_mobile_corner_contact.png') });
  await mobilePage.close();

  await browser.close();
  console.log(`Validation finished successfully with ${errors} browser errors.`);
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
