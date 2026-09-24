// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { config } from './config/loadConfig.js';

export default defineConfig({
  testDir: './tests',

  timeout: config.timeout,

  expect: {
    timeout: config.expectTimeout,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: [['html', { open: 'never' }]],
  outputDir: 'test-results/',

  use: {
    baseURL: config.baseURL,
    actionTimeout: 10 * 1000,
    navigationTimeout: 15 * 1000,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
