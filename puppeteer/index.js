const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.time('Launch browser');
    // Launch browser
    const browser = await puppeteer.launch(
      {
        // headless: false,
      }
    );
    console.timeEnd('Launch browser');

    console.time('New page');
    const page = await browser.newPage();
    console.timeEnd('New page');

    console.time('Set viewport size');
    // Set viewport size
    await page.setViewport({ width: 794, height: 1075 });
    console.timeEnd('Set viewport size');

    console.time('Load local HTML file');
    // Load local HTML file
    const filePath = path.resolve(__dirname, '3.html');
    await page.goto(`file://${filePath}`, { waitUntil: 'load' });
    console.timeEnd('Load local HTML file');

    console.time('Wait for page to stabilize');
    // Wait for page to stabilize for 300  2000ms
     await new Promise(resolve => setTimeout(resolve, 2000));
    console.timeEnd('Wait for page to stabilize');

    console.time('Generate PDF');
    // Generate PDF
    await page.pdf({ path: `output-${Date.now()}.pdf`, width: '794px', height: '1075px' });
    console.timeEnd('Generate PDF');

    console.time('Close browser');
    // Close browser
    await browser.close();
    console.timeEnd('Close browser');
})();