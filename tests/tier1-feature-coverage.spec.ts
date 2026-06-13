import { test, expect } from '@playwright/test';

// Tier 1: Feature Coverage (>=25 test cases, >=5 per feature)

test.describe('Tier 1: Feature Coverage', () => {

  test.describe('TopNav Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('T1-TopNav-1: Render navigation items list correctly', async ({ page }) => {
      const links = page.locator('.topNav__link');
      await expect(links).toHaveCount(4);
      await expect(links.nth(0)).toHaveText('Platform');
      await expect(links.nth(1)).toHaveText('API');
      await expect(links.nth(2)).toHaveText('Industries');
      await expect(links.nth(3)).toHaveText('Pricing');
    });

    test('T1-TopNav-2: Click brandmark scrolls or navigates to top', async ({ page }) => {
      const brandMark = page.locator('.brandMark');
      await expect(brandMark).toHaveText('Reducto');
      await brandMark.click();
      await expect(page).toHaveURL(/#top/);
    });

    test('T1-TopNav-3: Click Platform goes to workflow anchor', async ({ page }) => {
      const workflowLink = page.locator('.topNav__link', { hasText: 'Platform' });
      await workflowLink.click();
      await expect(page).toHaveURL(/#workflow/);
    });

    test('T1-TopNav-4: Click Contact sales triggers navigation to contact anchor', async ({ page }) => {
      const contactLink = page.locator('.topNav__ghost', { hasText: 'Contact sales' });
      await contactLink.click();
      await expect(page).toHaveURL(/#contact/);
    });

    test('T1-TopNav-5: Click Try your own triggers navigation to use-cases anchor', async ({ page }) => {
      const useCasesLink = page.locator('.topNav__primary', { hasText: 'Try your own' });
      await useCasesLink.click();
      await expect(page).toHaveURL(/#use-cases/);
    });
  });

  test.describe('PhaseRail Workflow Phases', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('T1-PhaseRail-1: Display 5 workflow phases with correct indices and labels', async ({ page }) => {
      const phaseItems = page.locator('.phaseRail__item');
      await expect(phaseItems).toHaveCount(5);
      const labels = ['Parse', 'Split', 'Extract', 'Edit', 'Classify'];
      for (let i = 0; i < 5; i++) {
        await expect(phaseItems.nth(i).locator('.phaseRail__index')).toHaveText(`0${i + 1}`);
        await expect(phaseItems.nth(i).locator('.phaseRail__label')).toHaveText(labels[i]);
      }
    });

    test('T1-PhaseRail-2: Click phase updates the active state index', async ({ page }) => {
      const phase2 = page.locator('.phaseRail__item').nth(1); // Build
      await expect(phase2).not.toHaveClass(/is-active/);
      await phase2.click();
      await expect(phase2).toHaveClass(/is-active/);
    });

    test('T1-PhaseRail-3: Select phase 4 (Edit) updates summaries and descriptions', async ({ page }) => {
      const phase4 = page.locator('.phaseRail__item').nth(3); // Edit
      await phase4.click();
      await expect(phase4).toHaveClass(/is-active/);
      await expect(phase4.locator('.phaseRail__summary')).toHaveText('Fill blanks, tables, and checkboxes without brittle templates.');
    });

    test('T1-PhaseRail-4: Change page URL hash updates active phase', async ({ page }) => {
      await page.waitForTimeout(500);
      await page.evaluate(() => { window.location.hash = 'check'; });
      const phase3 = page.locator('.phaseRail__item').nth(2); // Check
      await expect(phase3).toHaveClass(/is-active/);
    });

    test('T1-PhaseRail-5: Rapidly click different phases updates active state sequentially', async ({ page }) => {
      const phases = page.locator('.phaseRail__item');
      await phases.nth(2).click(); // Check
      await expect(phases.nth(2)).toHaveClass(/is-active/);
      await phases.nth(4).click(); // Expand
      await expect(phases.nth(4)).toHaveClass(/is-active/);
      await phases.nth(0).click(); // Brief
      await expect(phases.nth(0)).toHaveClass(/is-active/);
    });
  });

  test.describe('UseCases Panel', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('T1-UseCases-1: Render list of 5 static use cases', async ({ page }) => {
      const rows = page.locator('.panelCard--useCases .panelList__row');
      await expect(rows).toHaveCount(5);
      await expect(rows.nth(0).locator('strong')).toHaveText('Finance');
      await expect(rows.nth(1).locator('strong')).toHaveText('Healthcare');
      await expect(rows.nth(2).locator('strong')).toHaveText('Insurance');
      await expect(rows.nth(3).locator('strong')).toHaveText('Legal');
      await expect(rows.nth(4).locator('strong')).toHaveText('Operations');
    });

    test('T1-UseCases-2: First use case is selected by default', async ({ page }) => {
      const rows = page.locator('.panelCard--useCases .panelList__row');
      await expect(rows.nth(0)).toHaveClass(/is-active/);
      const codeFrame = page.locator('.codeFrame');
      await expect(codeFrame).toContainText("capability: 'parse'");
    });

    test('T1-UseCases-3: Clicking a use case updates the details panel', async ({ page }) => {
      const rows = page.locator('.panelCard--useCases .panelList__row');
      await rows.nth(1).click(); // Healthcare
      await expect(rows.nth(1)).toHaveClass(/is-active/);
      await expect(rows.nth(0)).not.toHaveClass(/is-active/);
    });

    test('T1-UseCases-4: Selecting a use case updates the API preview', async ({ page }) => {
      const rows = page.locator('.panelCard--useCases .panelList__row');
      await rows.nth(2).click(); // Insurance
      const codeFrame = page.locator('.codeFrame');
      await expect(codeFrame).toContainText("capability: 'split'");
    });

    test('T1-UseCases-5: Verify current focus metadata chip text matches selection', async ({ page }) => {
      const rows = page.locator('.panelCard--useCases .panelList__row');
      await rows.nth(3).click(); // Legal
      const metaChip = page.locator('.panelCard__metaChip');
      await expect(metaChip).toHaveText('Current focus: Legal');
    });
  });

  test.describe('Gap Analysis Panel', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('T1-Gap-1: Render gap list table header and columns', async ({ page }) => {
      const headers = page.locator('.gapTable__head span');
      await expect(headers.nth(0)).toHaveText('Area');
      await expect(headers.nth(1)).toHaveText('Status');
      await expect(headers.nth(2)).toHaveText('Details');
    });

    test('T1-Gap-2: Render 5 gap rows from static data', async ({ page }) => {
      const rows = page.locator('.gapTable__row');
      await expect(rows).toHaveCount(5);
    });

    test('T1-Gap-3: Verify statuses for gap rows match spec values', async ({ page }) => {
      const rows = page.locator('.gapTable__row');
      await expect(rows.nth(0).locator('.gapTable__status')).toHaveText('3B+');
      await expect(rows.nth(1).locator('.gapTable__status')).toHaveText('Unified');
      await expect(rows.nth(2).locator('.gapTable__status')).toHaveText('Agentic');
      await expect(rows.nth(3).locator('.gapTable__status')).toHaveText('Precise');
      await expect(rows.nth(4).locator('.gapTable__status')).toHaveText('Trusted');
    });

    test('T1-Gap-4: Verify gap row area texts are correct', async ({ page }) => {
      const rows = page.locator('.gapTable__row');
      await expect(rows.nth(0).locator('span[role="cell"]').first()).toHaveText('Pages processed');
      await expect(rows.nth(1).locator('span[role="cell"]').first()).toHaveText('Input types');
    });

    test('T1-Gap-5: Verify gap row details texts are correct', async ({ page }) => {
      const rows = page.locator('.gapTable__row');
      await expect(rows.nth(0).locator('span[role="cell"]').nth(2)).toHaveText('Production-scale document volume');
      await expect(rows.nth(1).locator('span[role="cell"]').nth(2)).toHaveText('PDFs, images, spreadsheets, slides');
    });
  });

  test.describe('Frontend API Adapter & Fallback', () => {
    const mockData = {
      navItems: [
        { label: 'Dyn Workflow', href: '#workflow' },
        { label: 'Dyn Integrations', href: '#integrations' },
        { label: 'Dyn Docs', href: '#docs' },
        { label: 'Dyn Pricing', href: '#pricing' }
      ],
      phases: [
        { index: '01', label: 'DynBrief', summary: 'Dyn brief summary.' },
        { index: '02', label: 'DynBuild', summary: 'Dyn build summary.' },
        { index: '03', label: 'DynCheck', summary: 'Dyn check summary.' },
        { index: '04', label: 'DynPatch', summary: 'Dyn patch summary.' },
        { index: '05', label: 'DynExpand', summary: 'Dyn expand summary.' }
      ],
      useCases: [
        {
          id: 'dyn-uc-1',
          title: 'Dyn Use Case 1',
          audience: 'DynAudience 1',
          priority: 'High',
          status: 'Defined',
          slug: 'dyn-slug-1',
          details: 'Dyn details for use case 1.',
          gap: 'Dyn gap for use case 1.'
        },
        {
          id: 'dyn-uc-2',
          title: 'Dyn Use Case 2',
          audience: 'DynAudience 2',
          priority: 'Medium',
          status: 'Draft',
          slug: 'dyn-slug-2',
          details: 'Dyn details for use case 2.',
          gap: 'Dyn gap for use case 2.'
        }
      ],
      gapRows: [
        { area: 'DynArea1', status: 'Open', details: 'DynDetails1' },
        { area: 'DynArea2', status: 'In progress', details: 'DynDetails2' }
      ]
    };

    test('T1-Adapter-1: Falls back to static content when apiUrl is unset', async ({ page }) => {
      await page.goto('/');
      const links = page.locator('.topNav__link');
      await expect(links.first()).toHaveText('Platform');
      const rows = page.locator('.panelCard--useCases .panelList__row');
      await expect(rows.first().locator('strong')).toHaveText('Finance');
    });

    test('T1-Adapter-2: Falls back to static content when api is unreachable (HTTP 500/network error)', async ({ page }) => {
      // Direct routing mock to return a failure status code
      await page.route(url => url.pathname === '/api/broken-content', async (route) => {
        await route.fulfill({ status: 500, contentType: 'application/json', body: 'Error' });
      });

      await page.goto('/?apiUrl=/api/broken-content');
      const links = page.locator('.topNav__link');
      await expect(links.first()).toHaveText('Platform');
      const rows = page.locator('.panelCard--useCases .panelList__row');
      await expect(rows.first().locator('strong')).toHaveText('Finance');
    });

    test('T1-Adapter-3: Successfully fetches content when REDUCTO_CONTENT_API_URL is set and reachable', async ({ page }) => {
      await page.route(url => url.pathname === '/api/mock-content', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockData),
        });
      });

      await page.goto('/?apiUrl=/api/mock-content');

      // Verify dynamic nav items
      const links = page.locator('.topNav__link');
      await expect(links).toHaveCount(4);
      await expect(links.first()).toHaveText('Dyn Workflow');

      // Verify dynamic phases
      const phaseItems = page.locator('.phaseRail__item');
      await expect(phaseItems).toHaveCount(5);
      await expect(phaseItems.first().locator('.phaseRail__label')).toHaveText('DynBrief');

      // Verify dynamic use cases
      const useCaseRows = page.locator('.panelCard--useCases .panelList__row');
      await expect(useCaseRows).toHaveCount(2);
      await expect(useCaseRows.first().locator('strong')).toHaveText('Dyn Use Case 1');
    });

    test('T1-Adapter-4: Dynamic content selects first dynamic use case by default', async ({ page }) => {
      await page.route(url => url.pathname === '/api/mock-content', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockData),
        });
      });

      await page.goto('/?apiUrl=/api/mock-content');
      const useCaseRows = page.locator('.panelCard--useCases .panelList__row');
      await expect(useCaseRows.first()).toHaveClass(/is-active/);
      const codeFrame = page.locator('.codeFrame');
      await expect(codeFrame).toContainText("capability: 'dyn-slug-1'");
    });

    test('T1-Adapter-5: Hash change works normally with loaded dynamic content', async ({ page }) => {
      await page.route(url => url.pathname === '/api/mock-content', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockData),
        });
      });

      await page.goto('/?apiUrl=/api/mock-content#check');
      const phase3 = page.locator('.phaseRail__item').nth(2);
      await expect(phase3).toHaveClass(/is-active/);
      await expect(phase3.locator('.phaseRail__label')).toHaveText('DynCheck');
    });
  });
});
