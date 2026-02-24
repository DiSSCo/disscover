/* Import test helpers */
import { test, expect } from '@playwright/test';
import { checkA11y } from './test-utils';

test.describe('Accessibility', () => {
    test('About page components', async ({ page }) => {
        // When the accessibility suite goes to the about page
        await page.goto('/about');

        // Then the navigation and footer should be visible
        await expect(page.locator('nav')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
        
        // And the page should be checked for accessibility violations
        const results = await checkA11y(page, 'About Nav/Footer', { include: ['nav', 'footer'] });

        // And the results should be 0
        expect(results.length).toBe(0);
      });
});

test.describe('Accessibility', () => {
    test('Virtual Collections page', async ({ page }) => {
        // When the accessibility suite goes to the virtual collections page
        await page.goto('/virtual-collections');

        // Then the header should be visible
        await expect(page.locator('header')).toBeVisible();
        
        // Then the page should be checked for accessibility violations
        const results = await checkA11y(page, 'Virtual Collections');

        // And the results should be 0
        expect(results.length).toBe(0);
      });
});