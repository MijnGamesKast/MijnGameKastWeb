import { expect, test } from '@playwright/test';
import { loginAsGamer, loginAsModerator } from './helpers/auth';

const testGameId = process.env.TEST_DELETE_GAME_ID ?? '1';

test('UITC-UC08-01 - moderator ziet verwijderoptie bij catalogusgame', async ({ page }) => {
	await loginAsModerator(page);

	await page.goto(`/catalogus/${testGameId}`);

	await expect(page.getByRole('button', { name: /delete/i })).toBeVisible();
});

test('UITC-UC08-02 - gamer ziet geen verwijderoptie bij catalogusgame', async ({ page }) => {
	await loginAsGamer(page);

	await page.goto(`/catalogus/${testGameId}`);

	await expect(page.getByRole('button', { name: /delete/i })).not.toBeVisible();
	await expect(page.getByRole('heading', { name: /grand theft auto v/i })).toBeVisible();
});

test('UITC-UC08-03 - bezoeker ziet geen verwijderoptie bij catalogusgame', async ({ page }) => {
	await page.goto(`/catalogus/${testGameId}`);

	await expect(page.getByRole('button', { name: /delete/i })).not.toBeVisible();
	await expect(page.getByRole('heading', { name: /grand theft auto v/i })).toBeVisible();
});