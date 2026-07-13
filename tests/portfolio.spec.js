const { test, expect } = require('@playwright/test');

test.describe('Portfolio Page Interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Assuming we serve the folder locally, typically on port 8080 or a file url
    // For this test, we can use a relative file URL if possible, or expect a dev server
    // We'll navigate to the local file for the test
    const path = require('path');
    const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
    await page.goto(filePath);
  });

  test('should load the home page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/MD Sakib — Jack of All Trades/);
  });

  test('hero card should flip on hover', async ({ page }) => {
    const heroCard = page.locator('.interactive-card').first();
    
    // Check initial state (not flipped)
    await expect(heroCard).not.toHaveClass(/flipped/);
    
    // Hover over the card
    await heroCard.hover();
    
    // Check state after hover (should be flipped)
    await expect(heroCard).toHaveClass(/flipped/);
  });
});
