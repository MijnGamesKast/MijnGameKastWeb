import { expect, type Page } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? 'https://api.mijngamekast.nl'

async function loginAndSetCookie(page: Page, identifier: string, password: string) {
	console.log(`Login in as ${identifier} with password ${password}`)
	console.log(`API URL: ${API_BASE_URL}`)
	const response = await page.request.post(`${API_BASE_URL}/api/auth/login`, {
		data: {
			identifier,
			password
		}
	});
	console.log(`Response: ${response.status()} ${response.statusText()}`)

	expect(response.ok()).toBeTruthy();

	const result = await response.json();

	expect(result.token).toBeTruthy();
	await page.context().addCookies([
		{
			name: 'token',
			value: result.token,
			domain: 'localhost',
			path: '/',
			httpOnly: true,
			sameSite: 'Lax'
		}
	]);
}

export async function loginAsGamer(page: Page) {
	await loginAndSetCookie(
		page,
		process.env.TEST_GAMER_EMAIL ?? 'gamer',
		process.env.TEST_GAMER_PASSWORD ?? 'gamerPassword'
	);
}

export async function loginAsModerator(page: Page) {
	await loginAndSetCookie(
		page,
		process.env.TEST_MODERATOR_EMAIL ?? 'moderator',
		process.env.TEST_MODERATOR_PASSWORD ?? 'moderatorPassword'
	);
}