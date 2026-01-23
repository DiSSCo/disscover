import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/* WIP: This test suite is a WIP, and currently acts like a proof of concept for playwright*/
test.describe('Accessibility', () => {
  	test('Header and footer should be accessible', async ({ page }) => {
		// Given a user is on the homepage
		await page.goto('/');

		// Then the header and footer should be visible
		await expect(page.locator('nav')).toBeVisible();
		await expect(page.locator('footer')).toBeVisible();
	
		// When the accessibility runs on the nav and footer
		const accessibilityScanResults = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
		.include(['nav', 'footer'])
		.analyze();

		// Then the results should be logged
		console.log(`Accessibility audit complete. Checked ${accessibilityScanResults.passes.length} rules.`);
		
		if (accessibilityScanResults.violations.length > 0) {
			console.error('Accessibility Violations:', accessibilityScanResults.violations);
		}
		
		// And the violations should be empty
		expect(accessibilityScanResults.violations).toEqual([]);
  	});

  	test('About page should be accessible', async ({ page }) => {
		// Given a user is on the about page
		await page.goto('/about');

		// Then the title should be visible
		await expect(page.getByRole('heading', { name: 'About DiSSCover' })).toBeVisible();
	
		// When the accessibility analyzes the entire page
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

test.describe('Header Navigation', () => {
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

test.describe('Footer Navigation', () => {
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
