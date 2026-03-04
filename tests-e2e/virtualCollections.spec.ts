import { test, expect } from '@playwright/test';

/* Virtual Collections flow E2E test suite */
test.describe('Virtual Collections', () => {
    test('should open the content of a virtual collection and route to the digital specimen page of a specific collection', async ({ page }) => {
        // Given a user goes to the virtual collections page
        await page.goto('/virtual-collections');

        // When the user clicks on the first available card on the virtual collection overview page
        const firstCardAvailable = page.locator('.gallery-card').first();
        await firstCardAvailable.click();

        // Then the page should redirect to the virtual collection details page
        await expect(page).toHaveURL(/\/virtual-collections\/TEST\//);

        // When a user clicks on the first available item in the table
        const firstItemAvailable = page.locator('.header-cell-link').first();
        await firstItemAvailable.click();

        // Then the page should redirect to the digital specimen page
        await expect(page).toHaveURL(/\/ds\/TEST\//);
    });
    test('should route to the virtual collection details page and back', async ({ page }) => {
        // Given a user goes to the virtual collections page
        await page.goto('/virtual-collections');

        // When the user clicks on the first available card on the virtual collection overview page
        const firstCardAvailable = page.locator('.gallery-card').first();
        await firstCardAvailable.click();

        // Then the page should redirect to the virtual collection details page
        await expect(page).toHaveURL(/\/virtual-collections\/TEST\//);

        // When the user clicks on the Virtual Collections button
        const backToVirtualCollections = page.locator('.navigation-link', { hasText: 'Virtual Collections' });
        await backToVirtualCollections.click();

        // Then the page should redirect back to the virtual collections page
        await expect(page).toHaveURL(/\/virtual-collections/);
    });
    test('should use paginator to go through virtual collections', async ({ page }) => {
        // Given a user goes to the virtual collections page
        await page.goto('/virtual-collections');

        // When the user clicks on the first available card on the virtual collection overview page
        const firstCardAvailable = page.locator('.gallery-card').first();
        await firstCardAvailable.click();

        const firstPagePaginator = page.locator('.pagination-info', { hasText: 'Page 1' });
        await expect(firstPagePaginator).toBeVisible();

        const nextButtonPaginator = page.getByRole('button', { name: 'Next' });
        await nextButtonPaginator.click();

        const secondPagePaginator = page.locator('.pagination-info', { hasText: 'Page 2' });
        await expect(secondPagePaginator).toBeVisible();
    });
});
