/* Import test helpers */
import { test, expect } from '@playwright/test';
import { checkA11y, testUrls } from './test-utils';

/* Virtual Collections flow E2E test suite */
test.describe('Accessibility', () => {
    test('About page components', async ({ page }) => {
        // When the accessibility suite goes to the about page
        await page.goto(testUrls.about);

        // Then the navigation and footer should be visible
        await expect(page.getByRole('button', { name: 'Login / Sign-up'})).toBeVisible();
        await expect(page.getByRole('listitem').filter({ hasText: 'About DiSSCover'})).toBeVisible();
        
        // And the page should be checked for accessibility violations
        const results = await checkA11y(page, 'About Nav/Footer', { include: ['nav', 'footer'] });

        // And the results should be 0
        expect(results.length).toBe(0);
      });
});

test.describe('Accessibility', () => {
    test('Virtual Collections page', async ({ page }) => {
        // When the accessibility suite goes to the virtual collections page
        await page.goto(testUrls.virtualCollections);

        // Then the header should be visible
        await expect(page.getByRole('heading', { name: 'Virtual Collections' })).toBeVisible();
        
        // Then the page should be checked for accessibility violations
        const results = await checkA11y(page, 'Virtual Collections');

        // And the results should be 0
        expect(results.length).toBe(0);
      });
});

test.describe('Accessibility', () => {
  test('Virtual Collection Details page', async ({ page }) => {
      // When the accessibility suite goes to the virtual collections page
      await page.goto(testUrls.virtualCollections);

      // Then the header should be visible
      await expect(page.getByRole('heading', { name: 'Virtual Collections' })).toBeVisible();

      // When the user clicks on the first available card on the virtual collection overview page
      const firstCard = page.getByRole('link', { name: 'Reference Collection Type'});
      await firstCard.click();

      // Then the page should redirect to the virtual collection details page and show the heading 1
      await expect(page).toHaveURL(/\/virtual-collections\/TEST\//);
      await expect(page.getByRole('heading')).not.toBeEmpty();

      await expect(page.getByRole('columnheader', { name: 'Scientific Name'})).toBeVisible();
      
      // Then the page should be checked for accessibility violations
      const results = await checkA11y(page, 'Virtual Collections details page');

      // And the results should be 0
      expect(results.length).toBe(0);
    });
});