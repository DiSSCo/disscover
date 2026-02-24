import { test, expect } from '@playwright/test';

/* Navigation and footer test suite */
test.describe('Navigation', () => {
	test('should navigate to the Specimens page', async ({ page }) => {
		// Given a user goes to the homepage
		await page.goto('/');

		// When a user clicks on the Specimens button link in the navigation
		await page.getByRole('button', { name: /specimens/i }).click();

		// Then the url should change to the Specimens url
		await expect(page).toHaveURL(/\/search/);
	});

	test('should navigate to the About page from the Specimens page', async ({ page }) => {
		// Given a user goes to the search page
		await page.goto('/search');

		// When the user clicks on the about button in the navigation
		await page.getByRole('button', { name: /about/i }).click();

		// Then the page should redirect to the about page
		await expect(page).toHaveURL(/\/about/);
	});

	test('should show the login redirect when clicking login', async ({ page }) => {
		// Given a user is on the homepage
		await page.goto('/');
		
		// When the user clicks on the login button
		await page.getByRole('button', { name: /login\s*\/\s*sign-up/i }).click();

		// Then the page loaded should be the Keycloak login screen
		await expect(page).toHaveURL(/.*keycloak.iam.naturalis.io*/);
	});
});

test.describe('Footer', () => {
	test('should navigate to the about page', async ({ page }) => {
		// Given a user is on the homepage
		await page.goto('/');

		// When the user clicks on the about button in the navigation
		await page.getByRole('link', { name: /about disscover/i }).click();

		// Then the page should redirect to the about page
		await expect(page).toHaveURL(/\/about/);
	});
	test('should navigate to the privacy page', async ({ page }) => {
		// Given a user is on the homepage
		await page.goto('/');

		// When the user clicks on the about button in the navigation
		await page.getByRole('link', { name: /privacy/i }).click();

		// Then the page should redirect to the privacy page
		await expect(page).toHaveURL(/\/privacy/);
	})
});
