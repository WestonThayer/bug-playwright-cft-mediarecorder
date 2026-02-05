import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  use: {
    ...devices["Desktop Chrome"],
    launchOptions: {
      args: [
        "--allow-http-screen-capture",
        "--auto-select-tab-capture-source-by-title=Fast and reliable end-to-end testing for modern web apps | Playwright",
        "--autoplay-policy=no-user-gesture-required",
      ],
    },
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'node server.mjs',
    url: 'http://localhost:3000',
  },
});
