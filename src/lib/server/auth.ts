import { redirect, type Cookies } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

type AuthMeResponse = {
	success: boolean;
	message: string;
	userId?: number | null;
	username?: string | null;
	email?: string | null;
	role?: number | null;
	expiresAt?: string | null;
};

export async function getCurrentUser(cookies: Cookies, fetch: typeof globalThis.fetch) {
	// Get token from cookies
	const token = cookies.get('token');

	if (!token) {
		return null; // No token found in the cookies
	}

	let response: Response;

	try {
		response = await fetch(`${API_BASE_URL}/api/auth/me`, { // Check the token at the back-end
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		console.error('Fout bij controleren van loginstatus:', error);
		return null;
	}

	if (response.status !== 200) {
		cookies.delete('token', { path: '/' }); // Remove the token from cookies if not valid anymore
		return null;
	}

	const authMeResult: AuthMeResponse = await response.json();

	return {
		userId: authMeResult.userId ?? null,
		username: authMeResult.username ?? null,
		email: authMeResult.email ?? null,
		role: authMeResult.role ?? null,
		expiresAt: authMeResult.expiresAt ?? null
	};
}

export async function requireUser(cookies: Cookies, fetch: typeof globalThis.fetch) {
	const gebruiker = await getCurrentUser(cookies, fetch);

	if (!gebruiker) {
		redirect(303, '/login');
	}

	return gebruiker;
}

export async function requireModerator(cookies: Cookies, fetch: typeof globalThis.fetch) {
	const gebruiker = await requireUser(cookies, fetch);

	if (gebruiker.role !== 1) {
		redirect(303, '/catalogus');
	}

	return gebruiker;
}