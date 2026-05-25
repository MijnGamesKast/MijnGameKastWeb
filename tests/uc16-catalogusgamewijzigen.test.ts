import { expect, test } from '@playwright/test';
import { loginAsGamer, loginAsModerator } from './helpers/auth';

const testGameId = process.env.TEST_UPDATE_GAME_ID ?? '1';

test('UITC-UC16-01 - moderator kan catalogusgame wijzigen', async ({ page }) => {
	await loginAsModerator(page);

	await page.goto(`/catalogus/${testGameId}/wijzigen`);

	await expect(page.getByRole('heading', { name: /catalogusgame wijzigen/i })).toBeVisible();
	await expect(page.getByLabel(/titel/i)).toBeVisible();
	await expect(page.getByLabel(/beschrijving/i)).toBeVisible();
	await expect(page.getByRole('button', { name: /opslaan/i })).toBeVisible();
});

test('UITC-UC16-02 - gamer kan catalogusgame niet wijzigen', async ({ page }) => {
	await loginAsGamer(page);

	await page.goto(`/catalogus/${testGameId}/wijzigen`);

	await expect(page.getByText(/geen toegang|niet toegestaan/i)).toBeVisible();
});

test('UITC-UC16-03 - bezoeker kan catalogusgame niet wijzigen', async ({ page }) => {
	await page.goto(`/catalogus/${testGameId}/wijzigen`);

	await expect(page).toHaveURL(/\/login/);
});