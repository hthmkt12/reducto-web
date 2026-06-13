import { test, expect } from '@playwright/test';

test.describe('Tier 4: Real-world Workloads', () => {

  test('T4-Workload-1: Simulated new user onboarding walkthrough', async ({ page }) => {
    await page.goto('/');
    
    // 1. User arrives at landing page
    await expect(page).toHaveTitle('Reducto');
    await expect(page.locator('h1').first()).toHaveText('Free your data from documents.');
    
    // 2. User clicks "Explore platform" in hero
    const heroWorkflowBtn = page.locator('.heroBand .heroBand__button--primary', { hasText: 'Explore platform' });
    await heroWorkflowBtn.click();
    await expect(page).toHaveURL(/#workflow/);
    
    // 3. User clicks through all phases on the PhaseRail
    const phases = page.locator('.phaseRail__item');
    for (let i = 0; i < 5; i++) {
      await phases.nth(i).click();
      await expect(phases.nth(i)).toHaveClass(/is-active/);
    }
    
    // 4. User clicks through each usecase to examine details
    const useCases = page.locator('.panelCard--useCases .panelList__row');
    const expectedCapabilities = ['parse', 'extract', 'split', 'classify', 'edit'];
    for (let i = 0; i < 5; i++) {
      await useCases.nth(i).click();
      await expect(useCases.nth(i)).toHaveClass(/is-active/);
      await expect(page.locator('.codeFrame')).toContainText(`capability: '${expectedCapabilities[i]}'`);
    }

    // 5. User inspects gap table
    const gapRows = page.locator('.gapTable__row');
    await expect(gapRows).toHaveCount(5);

    // 6. User decides to try their own document
    const tryFreeBtn = page.locator('.topNav__primary', { hasText: 'Try your own' });
    await tryFreeBtn.click();
    await expect(page).toHaveURL(/#use-cases/);
  });

  test('T4-Workload-2: Hash-driven entry and deep-dive', async ({ page }) => {
    // User lands on specific hash `#patch`
    await page.goto('/#patch');
    
    // Verify edit phase is active
    const phase4 = page.locator('.phaseRail__item').nth(3);
    await expect(phase4).toHaveClass(/is-active/);
    await expect(phase4.locator('.phaseRail__label')).toHaveText('Edit');

    // Select "Legal"
    const clauseUc = page.locator('strong', { hasText: 'Legal' });
    await clauseUc.click();
    await expect(page.locator('.codeFrame')).toContainText("capability: 'classify'");

    // Click contact sales
    const demoBtn = page.locator('.topNav__ghost', { hasText: 'Contact sales' });
    await demoBtn.click();
    await expect(page).toHaveURL(/#contact/);
  });

  test('T4-Workload-3: Dynamic Backend Sync and Hot Swap Simulation', async ({ page }) => {
    const mockData = {
      navItems: [
        { label: 'DynHome', href: '#top' },
        { label: 'DynFeatures', href: '#workflow' }
      ],
      phases: [
        { index: '01', label: 'Briefing', summary: 'Gather info' },
        { index: '02', label: 'Development', summary: 'Write code' },
        { index: '03', label: 'Testing', summary: 'Verify specs' }
      ],
      useCases: [
        { id: 'u1', title: 'Dynamic API Test', audience: 'QA', priority: 'High', status: 'Defined', slug: 'api-test-slug', details: 'Testing dynamic API adapter.', gap: 'None' },
        { id: 'u2', title: 'Secondary Test', audience: 'Dev', priority: 'Medium', status: 'Draft', slug: 'sec-slug', details: 'Another dynamic uc.', gap: 'Small gap' }
      ],
      gapRows: [
        { area: 'TestArea', status: 'Complete', details: 'No gaps remaining' }
      ]
    };

    await page.route(url => url.pathname === '/api/sync-data', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
    });

    // Load page with dynamic api
    await page.goto('/?apiUrl=/api/sync-data');

    // Verify dynamic nav item is visible
    const links = page.locator('.topNav__link');
    await expect(links.first()).toHaveText('DynHome');

    // Select phase 2 (Development)
    const phases = page.locator('.phaseRail__item');
    await expect(phases).toHaveCount(3);
    await phases.nth(1).click();
    await expect(phases.nth(1)).toHaveClass(/is-active/);

    // Verify usecases and select second one
    const ucRows = page.locator('.panelCard--useCases .panelList__row');
    await expect(ucRows).toHaveCount(2);
    await ucRows.nth(1).click();
    await expect(ucRows.nth(1)).toHaveClass(/is-active/);
    await expect(page.locator('.codeFrame')).toContainText("capability: 'sec-slug'");

    // Check gap analysis table
    const gapRows = page.locator('.gapTable__row');
    await expect(gapRows).toHaveCount(1);
    await expect(gapRows.first().locator('span[role="cell"]').first()).toHaveText('TestArea');
  });

  test('T4-Workload-4: High Interaction and Stress Test', async ({ page }) => {
    await page.goto('/');

    const phases = page.locator('.phaseRail__item');
    const useCases = page.locator('.panelCard--useCases .panelList__row');

    // Rapidly alternate clicks between phase 2 and use case 3
    await phases.nth(1).click();
    await useCases.nth(2).click();
    await phases.nth(3).click();
    await useCases.nth(0).click();
    await phases.nth(0).click();
    await useCases.nth(4).click();

    // Verify final consistent state
    await expect(phases.nth(0)).toHaveClass(/is-active/);
    await expect(useCases.nth(4)).toHaveClass(/is-active/);
    await expect(page.locator('.codeFrame')).toContainText("capability: 'edit'");
  });

  test('T4-Workload-5: API Failure Recovery Flow', async ({ page }) => {
    // 1. API endpoint is down
    await page.route(url => url.pathname === '/api/down-endpoint', async (route) => {
      await route.abort('failed');
    });

    // 2. Load page with down api
    await page.goto('/?apiUrl=/api/down-endpoint');

    // 3. Page must fall back gracefully to static content
    const links = page.locator('.topNav__link');
    await expect(links.first()).toHaveText('Platform');
    const firstUc = page.locator('.panelCard--useCases .panelList__row').first();
    await expect(firstUc.locator('strong')).toHaveText('Finance');

    // 4. Interaction should work perfectly with static fallback content
    const secondUc = page.locator('button', { hasText: 'Healthcare' });
    await secondUc.click();
    await expect(secondUc).toHaveClass(/is-active/);
    await expect(page.locator('.codeFrame')).toContainText("capability: 'extract'");
  });
});
