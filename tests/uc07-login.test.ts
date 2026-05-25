import { expect, test } from '@playwright/test';

const gamerEmail = process.env.TEST_GAMER_EMAIL ?? 'gamer';
const gamerPassword = process.env.TEST_GAMER_PASSWORD ?? 'gamer123!';

test('UITC-UC07-01 - gebruiker kan inloggen met geldige gegevens', async ({ page }) => {
	await page.goto('/login');

	await page.getByLabel(/gebruikersnaam of e-mailadres/i).fill(gamerEmail);
	await page.getByLabel(/wachtwoord/i).fill(gamerPassword);

	await page.getByRole('button', { name: /inloggen/i }).click();

	await expect(page).toHaveURL(/\/profiel/);
	await expect(page.getByRole('heading', { name: /gamer/i })).toBeVisible();
});

test('UITC-UC07-02 - gebruiker kan niet inloggen met verkeerd wachtwoord', async ({ page }) => {
	await page.goto('/login');

	await page.getByLabel(/gebruikersnaam of e-mailadres/i).fill(gamerEmail);
	await page.getByLabel(/wachtwoord/i).fill('verkeerdWachtwoord123!');

	await page.getByRole('button', { name: /inloggen/i }).click();

	await expect(page).toHaveURL(/\/login/);
	await expect(page.getByText('Ongeldige inloggegevens!')).toBeVisible();

	await page.goto('/profiel');
	await expect(page).toHaveURL(/\/login/);
});

test('UITC-UC07-03 - gebruiker kan niet inloggen met lege verplichte velden', async ({ page }) => {
	await page.goto('/login');

	await page.getByRole('button', { name: /inloggen/i }).click();

	await expect(page).toHaveURL(/\/login/);
	await expect(page.getByText(/vul zowel je gebruikersnaam of e-mailadres als je wachtwoord in/i)).toBeVisible();
	await expect(page.getByText(/gebruikersnaam of e-mailadres is verplicht/i)).toBeVisible();
	await expect(page.getByText(/wachtwoord is verplicht/i)).toBeVisible();

	await page.goto('/profiel');
	await expect(page).toHaveURL(/\/login/);
});