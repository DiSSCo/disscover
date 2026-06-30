/* Import test helpers */
import { test, expect } from '@playwright/test';
import { checkA11y, testUrls } from './test-utils';

/* Import mock data */
import { mockGetSelectedVirtualCollection, mockGetVirtualCollectionDetails, mockGetVirtualCollections } from './mocks/routes/routeMocks';

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
        await mockGetVirtualCollections(page);
        await mockGetSelectedVirtualCollection(page);
        await mockGetVirtualCollectionDetails(page);

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
		await mockGetVirtualCollections(page);
		await mockGetSelectedVirtualCollection(page);
		await mockGetVirtualCollectionDetails(page);

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

test.describe('Accessibility', () => {
    test('Create a Virtual Collection form flow', async ({ page }) => {
        await mockGetVirtualCollections(page);
		await mockGetSelectedVirtualCollection(page);
		await mockGetVirtualCollectionDetails(page);

		// When the accessibility suite goes to the create virtual collections page
		await page.goto(testUrls.createVirtualCollection);

		// Then the header should be visible
		await expect(page.getByRole('heading', { name: 'Create Virtual Collection' })).toBeVisible();

        // Then the first page should be checked for accessibility violations
		const resultsViewOne = await checkA11y(page, 'Create Virtual Collection flow view 1');

		// And the results should be 0
		expect(resultsViewOne).toHaveLength(0);

        // When a user fills in title and description for a new virtual collection and clicks next
        const nextButton = page.getByRole('button', { name: 'Next' });
        await page.getByLabel('Title').fill('Dinosaur Virtual Collection');
        await page.getByLabel('Description').fill('This Virtual Collection contains the coolest dinosaurs ever to walk the earth');
        await nextButton.click();

        // Then the second page should be checked for accessibility violations
		const resultsViewTwo = await checkA11y(page, 'Create Virtual Collection flow view 2');

		// And the results should be 0
		expect(resultsViewTwo).toHaveLength(0);
        
        // When the user fills in a few DOIs and proceeds to the next page
        const specimenInput = page.getByLabel('Specimen DOIs');
        await specimenInput.fill('https://doi.org/TEST/JDE-CGV-GNV, https://doi.org/TEST/W34-SKK-58F');
        await nextButton.click();

        // Then the third page should be checked for accessibility violations
		const resultsViewThree = await checkA11y(page, 'Create Virtual Collection flow view 3');

		// And the results should be 0
		expect(resultsViewThree).toHaveLength(0);
    });
});