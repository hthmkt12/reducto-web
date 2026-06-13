import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.SMOKE_BASE_URL || 'http://localhost:48329';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.SMOKE_BASE_URL ? undefined : {
    command: 'npm run build && npx --yes wrangler pages dev out --port 48329 --ip 127.0.0.1',
    url: 'http://localhost:48329',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
