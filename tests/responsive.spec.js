const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Responsive Layout Snapshots', () => {
  // Use file protocol to test the local HTML file
  const filePath = `file://${path.resolve(__dirname, '../index.html')}`;

  test('Desktop layout snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(filePath);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('desktop-layout.png', { fullPage: true });
  });

  test('Tablet layout snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(filePath);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('tablet-layout.png', { fullPage: true });
  });

  test('Mobile layout snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(filePath);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('mobile-layout.png', { fullPage: true });
  });
});
