const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });

  // Navigate to the resume page
  await page.goto('http://localhost:8000/resume.html');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  const viewport = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  const even = v => Math.max(2, Math.floor(v / 2) * 2);
  const scale = Math.min(1, 1280 / viewport.width);

  await page.screencast.start({
    path: 'c:/Users/ADMIN/.copilot/session-state/f3a345e2-ab63-46da-a2cb-0142446d6981/portfolio-demo.webm',
    size: { width: even(viewport.width * scale), height: even(viewport.height * scale) },
  });

  try {
    await page.screencast.showActions();
    
    // Show the title section with status
    await page.screencast.showChapter('Portfolio Title & Current Status');
    await page.waitForTimeout(1500);
    
    // Scroll to experience section with colored company names
    await page.screencast.showChapter('Professional Experience with Company Colors');
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(2000);
    
    // Hover over first card to show logo interaction
    await page.screencast.showChapter('Company Logos & Colors');
    const firstCard = page.locator('.section-experience .card').first();
    await firstCard.hover();
    await page.waitForTimeout(1500);
    
    // Scroll down to see more companies
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(1500);
    
    // Show contact form
    await page.screencast.showChapter('Contact Section');
    await page.goto('http://localhost:8000/contact.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
  } finally {
    await page.screencast.stop();
  }

  await browser.close();
})();
