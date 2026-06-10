import { test, expect } from '@playwright/test';

test.describe('Tier 3: Cross-Feature Combinations', () => {

  test('T3-Cross-1: Navigation link click followed by Use Case switching', async ({ page }) => {
    await page.goto('/');
    const workflowLink = page.locator('.topNav__link', { hasText: 'Use Case Driven Workflow' });
    await workflowLink.click();
    await expect(page).toHaveURL(/#workflow/);

    const useCaseBtn = page.locator('button', { hasText: 'Policy Analysis' });
    await useCaseBtn.click();
    await expect(useCaseBtn).toHaveClass(/is-active/);
    const codeFrame = page.locator('.codeFrame');
    await expect(codeFrame).toContainText("slug: 'policies'");
  });

  test('T3-Cross-2: Phase rail active selection works independently from Use Case selection', async ({ page }) => {
    await page.goto('/');
    // Select phase 3 (Check)
    const phaseCheck = page.locator('.phaseRail__item').nth(2);
    await phaseCheck.click();
    await expect(phaseCheck).toHaveClass(/is-active/);

    // Select use case "Compliance Check"
    const compCheckUseCase = page.locator('button', { hasText: 'Compliance Check' });
    await compCheckUseCase.click();
    await expect(compCheckUseCase).toHaveClass(/is-active/);

    // Verify both are active at the same time
    await expect(phaseCheck).toHaveClass(/is-active/);
    const codeFrame = page.locator('.codeFrame');
    await expect(codeFrame).toContainText("slug: 'audits'");
  });

  test('T3-Cross-3: API content load with initial Hash navigation in URL works correctly', async ({ page }) => {
    const mockData = {
      navItems: [{ label: 'DynNav', href: '#workflow' }],
      phases: [
        { index: '01', label: 'DynBrief', summary: 'Brief' },
        { index: '02', label: 'DynBuild', summary: 'Build' },
        { index: '03', label: 'DynCheck', summary: 'Check' }
      ],
      useCases: [{ id: 'uc1', title: 'DynUse', audience: 'Aud', priority: 'High', status: 'Draft', slug: 'dyn-slug', details: 'Details', gap: 'Gap' }],
      gapRows: [{ area: 'Area', status: 'Open', details: 'Details' }]
    };

    await page.route(url => url.pathname === '/api/cross-hash', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockData) });
    });

    await page.goto('/?apiUrl=/api/cross-hash#check');
    
    // Check that DynCheck phase is active
    const phaseCheck = page.locator('.phaseRail__item').nth(2);
    await expect(phaseCheck).toHaveClass(/is-active/);
    await expect(phaseCheck.locator('.phaseRail__label')).toHaveText('DynCheck');
    
    // Check dynamic usecase is selected
    const ucRow = page.locator('.panelCard--useCases .panelList__row').first();
    await expect(ucRow).toHaveClass(/is-active/);
    await expect(ucRow.locator('strong')).toHaveText('DynUse');
  });

  test('T3-Cross-4: Use case switching updates Payload Model frame header title', async ({ page }) => {
    await page.goto('/');
    const policyUc = page.locator('button', { hasText: 'Policy Analysis' });
    await policyUc.click();
    const modelFrame = page.locator('.panelCard--code');
    await expect(modelFrame.locator('.panelCard__subtitle')).toHaveText('Payload-ready content model aligned to your selected use case.');
    await expect(page.locator('.codeFrame')).toHaveAttribute('aria-label', 'Payload model for Policy Analysis');

    const clauseUc = page.locator('button', { hasText: 'Clause Extraction' });
    await clauseUc.click();
    await expect(page.locator('.codeFrame')).toHaveAttribute('aria-label', 'Payload model for Clause Extraction');
  });

  test('T3-Cross-5: Try for free CTA click, scrolling, then SiteFooter review workflow CTA click', async ({ page }) => {
    await page.goto('/');
    
    // Click Try for Free
    const tryFree = page.locator('.topNav__primary', { hasText: 'Try for free' });
    await tryFree.click();
    await expect(page).toHaveURL(/#use-cases/);

    // Click footer's Review Workflow
    const footerWorkflow = page.locator('.siteFooter__cta button', { hasText: 'Review workflow' });
    await footerWorkflow.click();
    await expect(page).toHaveURL(/#workflow/);
  });
});
