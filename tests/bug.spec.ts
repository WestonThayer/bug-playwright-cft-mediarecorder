import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
  await page.goto('https://playwright.dev/');

  // Start recording
  const recPage = await context.newPage();
  await recPage.goto("http://localhost:3000");
  await recPage.locator("css=#start").click();
  // Focus auto-moves back to initial page, see playwright.config.ts
  // auto-select-tab-capture-source-by-title

  // Generate some user input just to give the recording some length
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab", { delay: 500 });
  }

  // Stop recording
  await recPage.bringToFront();
  await recPage.locator("css=#stop").click();
  // CfT is now crashed
  await new Promise((r) => setTimeout(r, 1000));
  await expect(recPage.locator("css=#stop")).toBeVisible();
});
