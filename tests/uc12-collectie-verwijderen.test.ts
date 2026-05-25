import { expect, test } from '@playwright/test';
import { loginAsGamer } from './helpers/auth';

const ownCollectionId = process.env.TEST_OWN_COLLECTION_ID ?? '5';
const otherUserCollectionId = process.env.TEST_OTHER_USER_COLLECTION_ID ?? '999';

test('UITC-UC12-01 - gamer ziet verwijderoptie bij eigen persoonlijke collectie', async ({ page }) => {
	await loginAsGamer(page);

	await page.goto(`/profiel/collecties/${ownCollectionId}/wijzigen`);

	await expect(page.getByRole('heading', { name: /collectie wijzigen/i })).toBeVisible();
	await expect(page.getByRole('button', { name: /collectie verwijderen/i })).toBeVisible();
});

test('UITC-UC12-02 - bezoeker zonder login kan verwijderpagina niet openen', async ({ page }) => {
	await page.goto(`/profiel/collecties/${ownCollectionId}/wijzigen`);

	await expect(page).toHaveURL(/\/login/);
	await expect(page.getByRole('heading', { name: /inloggen/i })).toBeVisible();
});

test('UITC-UC12-03 - gamer kan collectie van andere gebruiker niet verwijderen', async ({ page }) => {
	await loginAsGamer(page);

	await page.goto(`/profiel/collecties/${otherUserCollectionId}/wijzigen`);

	await expect(page.getByRole('button', { name: /collectie verwijderen/i })).not.toBeVisible();
	await expect(page.getByText(/geen collectie gevonden|misgegaan|geen toegang|niet gevonden/i)).toBeVisible();
});