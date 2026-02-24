import { test, expect } from '@playwright/test';

/* Virtual Collections flow E2E test suite */
test.describe('Virtual Collections', () => {
    test('should open the content of a virtual collection when clicked on a single virtual collection', async ({ page }) => {
        // Given a user goes to the virtual collections page
        await page.goto('/virtual-collections');

        // When the user clicks on the first available card on the virtual collection overview page
        const firstCardAvailable = page.locator('.gallery-card').first();
        await firstCardAvailable.click();

        // Then the page should redirect to the virtual collection details page
        await expect(page).toHaveURL(/\/virtual-collections\/TEST\//);
    });
});
