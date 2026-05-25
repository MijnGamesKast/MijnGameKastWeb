import { expect, test } from '@playwright/test';
import { loginAsGamer } from './helpers/auth';

// Use case: UC03 - Persoonlijke collectie bekijken

test("UITC-UC03-01 - ingelogde gamer kan zijn persoonlijke collectie bekijken", async ({ page }) => {
	await loginAsGamer(page);

	await page.goto('/profiel/collecties');

	await expect(page).toHaveURL(/\/profiel\/collecties/);
	await expect(page.getByRole('heading', { name: /mijn collecties/i })).toBeVisible();
	await expect(page.getByText(/Kan geen verbinding maken/i)).not.toBeVisible();
});

test('UITC-UC03-02 - bezoeker zonder login wordt doorgestuurd naar login', async ({ page }) => {
	await page.goto('/profiel/collecties');

	await expect(page).toHaveURL(/\/login/);
	await expect(page.getByRole('heading', { name: /inloggen/i })).toBeVisible();
});