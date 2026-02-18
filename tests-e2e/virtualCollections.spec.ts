import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/* This test suite is a WIP, and currently acts like a proof of concept for playwright*/
test.describe('Accessibility', () => {
    test('Virtual Collections overview should be accessible', async ({ page }) => {
        // Given a user is on the virtual collections page
        await page.goto('/virtual-collections');

        // Then the header should be visible
        await expect(page.locator('header')).toBeVisible();
    
        // When the accessibility runs on the entire page
        const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();

        // Then the results should be logged
        console.log(`Accessibility audit complete. Checked ${accessibilityScanResults.passes.length} rules.`);
        
        if (accessibilityScanResults.violations.length > 0) {
            console.error('Accessibility Violations:', accessibilityScanResults.violations);
        }
        
        // And the violations should be empty
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});

test.describe('Virtual Collections', () => {
    test('should open the content of a virtual collection when clicked on a single virtual collection', async ({ page }) => {
        // Given a user goes to the virtual collections page
        await page.goto('/virtual-collections');

        // When the user clicks on the first available card on the virtual collection overview page
        const firstCardAvailable = page.locator('.gallery-card').first();
        await firstCardAvailable.click();

        // Then the page should redirect to the virtual collection details page
        await expect(page).toHaveURL(/.*virtual-collections\/TEST\/.*/);
    });
});

