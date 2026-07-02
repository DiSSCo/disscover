/* Import test helpers */
import { test, expect } from '@playwright/test';
import { setUpMockData } from './test-utils';

/* Virtual Collections flows E2E test suite */
test.describe('Virtual Collections', () => {
    test('should open the content of a virtual collection and route to the digital specimen page of a specific collection', async ({ page }) => {
        await setUpMockData(page);

        // Given a user goes to the virtual collections page
        await page.goto('/virtual-collections');

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
        await setUpMockData(page);

        // Given a user goes to the virtual collections page
        await page.goto('/virtual-collections');

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
        await setUpMockData(page);

        // Given a user goes to the virtual collections page
        await page.goto('/virtual-collections');

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

test.describe('Create a Virtual Collection and everything is successfull', () => {
    test('should go through the \'Create a virtual collection\' flow via the button on the VC page', async ({ page }) => {
        await setUpMockData(page);

        // Given a user goes to the create a virtual collection page
        await page.goto('/virtual-collections/create');

        // When a user fails to fill in anything and clicks on the next
        const nextButton = page.getByRole('button', { name: 'Next' });
        await nextButton.click();

        // Then the validation for the form should be shown
        const titleValidation = page.getByText('Please enter a title.');
        const descriptionValidation = page.getByText('Please describe your virtual collection.');
        await expect(titleValidation).toBeVisible();
        await expect(descriptionValidation).toBeVisible();

        // When a user fills in title and description for a new virtual collection
        await page.getByLabel('Title').fill('Dinosaur Virtual Collection');
        await page.getByLabel('Description').fill('This Virtual Collection contains the coolest dinosaurs ever to walk the earth');

        // Then the user should be able to proceed to the next page by clicking on the next button
        await nextButton.click();

        // When a user fails to fill in DOIs and tries to proceed to the next page
        const specimenInput = page.getByLabel('Specimen DOIs');
        await expect(specimenInput).toBeVisible();
        await nextButton.click();

        // Then the validation for the form should be shown
        const specimenValidation = page.getByText('Please enter the specimen DOIs for this Virtual Collection');
        await expect(specimenValidation).toBeVisible();

        // When the user fills in a few DOIs and proceeds to the next page
        await specimenInput.fill('https://doi.org/TEST/JDE-CGV-GNV, https://doi.org/TEST/W34-SKK-58F');
        await nextButton.click();

        // Then the user should see the confirm page with filled in information
        await expect(page.getByText('Review and confirm')).toBeVisible();

        // Then the request can be confirmed by clicking on the create collection button
        const createCollectionButton = page.getByRole('button', { name: 'Create collection' });
        await createCollectionButton.click();
    });
});
