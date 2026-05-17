import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_BASE_URL } from '$env/static/private';

type AuthResult = {
	success: boolean;
	message: string;
	token?: string | null;
	expiresAt?: string | null;
	userId?: number | null;
	username?: string | null;
	email?: string | null;
	role?: number | null;
};

type FieldErrors = {
	username: string[];
	email: string[];
	password: string[];
	passwordRepeat: string[];
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const passwordRepeat = formData.get('passwordRepeat')?.toString() ?? '';

		const fieldErrors: FieldErrors = {
			username: [],
			email: [],
			password: [],
			passwordRepeat: []
		};

		if (!username) fieldErrors.username.push('Gebruikersnaam is verplicht.');
		if (!email) fieldErrors.email.push('E-mailadres is verplicht.');
		if (!password) fieldErrors.password.push('Wachtwoord is verplicht.');
		if (!passwordRepeat) fieldErrors.passwordRepeat.push('Herhaal je wachtwoord.');

		if (password && passwordRepeat && password !== passwordRepeat) {
			fieldErrors.passwordRepeat.push('Wachtwoorden komen niet overeen.');
		}

		const hasErrors = Object.values(fieldErrors).some((errors) => errors.length > 0);

		if (hasErrors) {
			return fail(400, {
				message: 'Controleer de ingevulde gegevens.',
				values: { username, email },
				fieldErrors
			});
		}

		let registerResponse: Response;

		try {
			registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					email,
					password
				})
			});
		} catch (error) {
			console.error('Fout bij registratie:', error);

			return fail(500, {
				message: 'Er is een fout opgetreden tijdens het registreren.',
				values: { username, email },
				fieldErrors
			});
		}

		const registerResult: AuthResult = await registerResponse.json();

		if (!registerResponse.ok || !registerResult.success) {
			return fail(registerResponse.status, {
				message: registerResult.message ?? 'Registreren is mislukt.',
				values: { username, email },
				fieldErrors
			});
		}

		let loginResponse: Response;

		try {
			loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					identifier: email,
					password
				})
			});
		} catch (error) {
			console.error('Fout bij automatisch inloggen:', error);
			redirect(303, '/login');
		}

		const loginResult: AuthResult = await loginResponse.json();

		if (!loginResponse.ok || !loginResult.success || !loginResult.token) {
			redirect(303, '/login');
		}

		cookies.set('token', loginResult.token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24
		});

		redirect(303, '/profiel');
	}
};