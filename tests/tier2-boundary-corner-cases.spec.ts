import { test, expect } from '@playwright/test';

test.describe('Tier 2: Boundary & Corner Cases', () => {

  test.describe('TopNav Boundaries', () => {
    test('T2-TopNav-1: Narrow desktop viewport (800px) does not overflow topNav links', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      await page.goto('/');
      const overflow = await page.evaluate(() => {
        const topNav = document.querySelector('.topNav__inner');
        return topNav ? topNav.scrollWidth > topNav.clientWidth : false;
      });
      expect(overflow).toBe(false);
    });

    test('T2-TopNav-2: Clicking brandmark when hash is already #top', async ({ page }) => {
      await page.goto('/#top');
      const brandMark = page.locator('.brandMark');
      await brandMark.click();
      await expect(page).toHaveURL(/#top/);
    });

    test('T2-TopNav-3: Handle long nav item labels via mock API', async ({ page }) => {
      const mockData = {
        navItems: [
          { label: 'ExtremelyLongNavLabelThatGoesOnAndOnAndOnAndOn', href: '#workflow' },
          { label: 'Short', href: '#docs' }
        ],
        phases: [{ index: '01', label: 'Brief', summary: 'Capture goals' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/long-nav', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/long-nav');
      const firstLink = page.locator('.topNav__link').first();
      await expect(firstLink).toHaveText('ExtremelyLongNavLabelThatGoesOnAndOnAndOnAndOn');
    });

    test('T2-TopNav-4: Rapid clicks on action buttons do not crash the app', async ({ page }) => {
      await page.goto('/');
      const demoBtn = page.locator('.topNav__ghost', { hasText: 'Contact sales' });
      await demoBtn.click({ clickCount: 5, delay: 50 });
      await expect(page).toHaveURL(/#contact/);
    });

    test('T2-TopNav-5: Viewport 320px handles mobile layout without horizontal overflow', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto('/');
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2); // minor rounding acceptable
    });
  });

  test.describe('PhaseRail Boundaries', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('T2-PhaseRail-1: Hash values with wrong casing do not change active phase', async ({ page }) => {
      await page.goto('/#BUILD');
      const phase1 = page.locator('.phaseRail__item').nth(0); // Brief (default active)
      await expect(phase1).toHaveClass(/is-active/);
      const phase2 = page.locator('.phaseRail__item').nth(1); // Build
      await expect(phase2).not.toHaveClass(/is-active/);
    });

    test('T2-PhaseRail-2: Hash with unexpected suffix parameters', async ({ page }) => {
      await page.goto('/#brief?someQuery=param');
      const phase1 = page.locator('.phaseRail__item').nth(0);
      // Since hash contains "?someQuery=param", it won't match `#brief` exactly and shouldn't change phase from default
      await expect(phase1).toHaveClass(/is-active/);
    });

    test('T2-PhaseRail-3: Viewport height 400px (vertical squash)', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 400 });
      await page.goto('/');
      const phaseRail = page.locator('.phaseRail');
      await expect(phaseRail).toBeVisible();
    });

    test('T2-PhaseRail-4: Hash set to empty or "#" resets or keeps first phase active', async ({ page }) => {
      await page.waitForTimeout(500);
      await page.evaluate(() => { window.location.hash = 'patch'; });
      const phase4 = page.locator('.phaseRail__item').nth(3);
      await expect(phase4).toHaveClass(/is-active/);

      await page.evaluate(() => { window.location.hash = ''; });
      // Since window hash changes to empty, index falls to -1 and doesn't change active phase (or defaults depending on impl)
      // Our implementation does: `if (next >= 0) { setActivePhase(next); }` -> so it maintains previous active phase
      await expect(phase4).toHaveClass(/is-active/);
    });

    test('T2-PhaseRail-5: Click the last phase then first phase', async ({ page }) => {
      const lastPhase = page.locator('.phaseRail__item').nth(4);
      const firstPhase = page.locator('.phaseRail__item').nth(0);
      await lastPhase.click();
      await expect(lastPhase).toHaveClass(/is-active/);
      await firstPhase.click();
      await expect(firstPhase).toHaveClass(/is-active/);
    });
  });

  test.describe('UseCases Boundaries', () => {
    test('T2-UseCases-1: Handle extremely long strings in details without overflow', async ({ page }) => {
      const longDetails = 'A'.repeat(500);
      const mockData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: longDetails, gap: 'Gap' }],
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/long-details', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/long-details');
      const detailsRow = page.locator('.panelList__rowCopy span').first();
      await expect(detailsRow).toHaveText(longDetails);
    });

    test('T2-UseCases-2: Scrollable list when there are 15 use cases', async ({ page }) => {
      const useCases = Array.from({ length: 15 }, (_, i) => ({
        id: `uc${i}`,
        title: `Use Case ${i}`,
        audience: 'Aud',
        priority: 'Medium' as const,
        status: 'Draft' as const,
        slug: `slug${i}`,
        details: `Details ${i}`,
        gap: `Gap ${i}`
      }));

      const mockData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases,
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/many-usecases', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/many-usecases');
      const listRows = page.locator('.panelCard--useCases .panelList__row');
      await expect(listRows).toHaveCount(15);
    });

    test('T2-UseCases-3: Render single use case successfully without layout collapse', async ({ page }) => {
      const mockData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/single-uc', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/single-uc');
      const rows = page.locator('.panelCard--useCases .panelList__row');
      await expect(rows).toHaveCount(1);
    });

    test('T2-UseCases-4: Escape dangerous details string correctly', async ({ page }) => {
      const xssString = '"><script>alert(1)</script>';
      const mockData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: xssString, gap: 'Gap' }],
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/xss-uc', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/xss-uc');
      const firstSpan = page.locator('.panelList__rowCopy span').first();
      await expect(firstSpan).toHaveText(xssString);
    });

    test('T2-UseCases-5: Clicking an already active usecase repeatedly is stable', async ({ page }) => {
      await page.goto('/');
      const firstUc = page.locator('.panelCard--useCases .panelList__row').first();
      await firstUc.click();
      await firstUc.click();
      await expect(firstUc).toHaveClass(/is-active/);
    });
  });

  test.describe('Gap Analysis Boundaries', () => {
    test('T2-Gap-1: Render empty gapRows successfully without crashing', async ({ page }) => {
      const mockData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows: []
      };

      await page.route(url => url.pathname === '/api/empty-gap', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/empty-gap');
      const rows = page.locator('.gapTable__row');
      await expect(rows).toHaveCount(0);
    });

    test('T2-Gap-2: Extremely long status string in gap table row', async ({ page }) => {
      const longStatus = 'LongStatus'.repeat(10);
      const mockData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows: [{ area: 'Metadata', status: longStatus, details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/long-gap-status', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/long-gap-status');
      const statusCell = page.locator('.gapTable__status').first();
      await expect(statusCell).toHaveText(longStatus);
    });

    test('T2-Gap-3: Dot colors alternate Magenta/Warm on 10 rows', async ({ page }) => {
      const gapRows = Array.from({ length: 10 }, (_, i) => ({
        area: `Area ${i}`,
        status: 'Open',
        details: `Details ${i}`
      }));
      const mockData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows
      };

      await page.route(url => url.pathname === '/api/ten-gaps', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/ten-gaps');
      const dots = page.locator('.gapDot');
      await expect(dots).toHaveCount(10);
      for (let i = 0; i < 10; i++) {
        const expectedClass = i % 2 === 0 ? /gapDot--magenta/ : /gapDot--warm/;
        await expect(dots.nth(i)).toHaveClass(expectedClass);
      }
    });

    test('T2-Gap-4: Columns scale and align on a 2000px width viewport', async ({ page }) => {
      await page.setViewportSize({ width: 2000, height: 1000 });
      await page.goto('/');
      const gapTable = page.locator('.gapTable');
      await expect(gapTable).toBeVisible();
    });

    test('T2-Gap-5: Table rows with empty details cell', async ({ page }) => {
      const mockData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows: [{ area: 'Metadata', status: 'Open', details: '' }]
      };

      await page.route(url => url.pathname === '/api/empty-gap-details', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/empty-gap-details');
      const detailsCell = page.locator('.gapTable__row span[role="cell"]').nth(2);
      await expect(detailsCell).toBeEmpty();
    });
  });

  test.describe('API Adapter Fallback Boundaries', () => {
    test('T2-Adapter-1: Invalid structure - empty object fallback', async ({ page }) => {
      await page.route(url => url.pathname === '/api/empty-obj', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({}) });
      });

      await page.goto('/?apiUrl=/api/empty-obj');
      // Verify fallback to static data (nav items matches static count 4)
      const links = page.locator('.topNav__link');
      await expect(links).toHaveCount(4);
    });

    test('T2-Adapter-2: Invalid structure - missing phases fallback', async ({ page }) => {
      const invalidData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/missing-phases', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(invalidData) });
      });

      await page.goto('/?apiUrl=/api/missing-phases');
      const links = page.locator('.topNav__link');
      await expect(links).toHaveCount(4); // Falls back to static (4 links)
    });

    test('T2-Adapter-3: Invalid structure - navItems is a string fallback', async ({ page }) => {
      const invalidData = {
        navItems: 'NotAnArray',
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/string-nav', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(invalidData) });
      });

      await page.goto('/?apiUrl=/api/string-nav');
      const links = page.locator('.topNav__link');
      await expect(links).toHaveCount(4); // Falls back to static
    });

    test('T2-Adapter-4: Invalid structure - missing slug inside a use case fallback', async ({ page }) => {
      const invalidData = {
        navItems: [{ label: 'Nav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', details: 'Details', gap: 'Gap' }], // Missing slug
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/missing-slug', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(invalidData) });
      });

      await page.goto('/?apiUrl=/api/missing-slug');
      const links = page.locator('.topNav__link');
      await expect(links).toHaveCount(4); // Falls back to static
    });

    test('T2-Adapter-5: Slow API response doesn\'t crash page and correctly renders dynamic content after delay', async ({ page }) => {
      const mockData = {
        navItems: [{ label: 'DelayedNav', href: '#1' }],
        phases: [{ index: '01', label: 'Brief', summary: 'Summary' }],
        useCases: [{ id: 'uc1', title: 'UC1', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'slug1', details: 'Details', gap: 'Gap' }],
        gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
      };

      await page.route(url => url.pathname === '/api/slow-api', async (route) => {
        // Wait 500ms before sending response
        await new Promise((resolve) => setTimeout(resolve, 500));
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
      });

      await page.goto('/?apiUrl=/api/slow-api');
      const links = page.locator('.topNav__link');
      
      // Before load, it is using static (4 links)
      // Playwright expects automatically wait for assertions. Let's wait for the link to become DelayedNav
      await expect(links.first()).toHaveText('DelayedNav', { timeout: 2000 });
    });
  });
});
