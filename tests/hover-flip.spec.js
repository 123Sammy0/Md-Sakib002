const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Hero Card Hover Flip', () => {
  const filePath = `file://${path.resolve(__dirname, '../index.html')}`;

  test('Card should flip on hover using pure CSS wrapper', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(filePath);
    await page.waitForLoadState('networkidle');

    const wrapper = page.locator('.playing-card-wrapper');
    const card = page.locator('.playing-card').first();

    // Take screenshot before hover
    await expect(wrapper).toBeVisible();
    
    // Hover over the wrapper
    await wrapper.hover();

    // Wait for the CSS transition to complete (1.2s transition)
    await page.waitForTimeout(1300);

    // Take a screenshot of the flipped card
    await expect(page).toHaveScreenshot('hero-card-flipped.png', { fullPage: true });

    // Ensure it's transformed
    const transform = await card.evaluate(el => getComputedStyle(el).transform);
    console.log('Flipped transform:', transform);
    
    // Unhover and wait
    await page.mouse.move(0, 0);
    await page.waitForTimeout(1300);
    
    // Ensure it's back
    const transformBack = await card.evaluate(el => getComputedStyle(el).transform);
    console.log('Unflipped transform:', transformBack);
  });
});
