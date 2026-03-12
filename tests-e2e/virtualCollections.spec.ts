/* Import test helpers */
import { test, expect } from '@playwright/test';
import { testUrls } from './test-utils';

/* Virtual Collections flow E2E test suite */
test.describe('Virtual Collections', () => {
    test('should open the content of a virtual collection and route to the digital specimen page of a specific collection', async ({ page }) => {
        // Given a user goes to the virtual collections page
        await page.goto(testUrls.virtualCollections);

        // When the user clicks on the first available card on the virtual collection overview page
        const firstCard = page.getByRole('link', { name: 'Reference Collection Type'});
        await firstCard.click();

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
        await page.goto(testUrls.virtualCollections);

        // When the user clicks on the first available card on the virtual collection overview page
        const firstCard = page.getByRole('link', { name: 'Reference Collection Type'});
        await firstCard.click();

        // Then the page should redirect to the virtual collection details page
        await expect(page).toHaveURL(/\/virtual-collections\/TEST\//);

        // When the user clicks on the Virtual Collections button
        const backToVirtualCollections = page.getByRole('button', { name: 'Virtual Collections' }).nth(1);
        await backToVirtualCollections.click();

        // Then the page should redirect back to the virtual collections page
        await expect(page).toHaveURL(/\/virtual-collections/);
    });
    test('should use paginator to go through virtual collections', async ({ page }) => {
        // Given a user goes to the virtual collections page
        await page.goto(testUrls.virtualCollections);

        // When the user clicks on the first available card on the virtual collection overview page
        const firstCardAvailable = page.locator('.gallery-card').first();
        await firstCardAvailable.click();

        const firstPagePaginator = page.getByText('Page 1 of');
        await expect(firstPagePaginator).toBeVisible();

        const nextButtonPaginator = page.getByRole('button', { name: 'Next' });
        await nextButtonPaginator.click();

        const secondPagePaginator = page.getByText('Page 2 of');
        await expect(secondPagePaginator).toBeVisible();
    });
});
