import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_BASE_URL } from '$env/static/private';

// Type voor de response van de login API
type AuthResult = {
	success: boolean;
	message: string;
	token?: string | null;
	expiresAt?: string | null;
	userId?: number | null;
	username?: string | null;
	email?: string | null;
};

// Definieert de form actions voor deze pagina
export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		// Haalt de form data op uit de POST request
		const formData = await request.formData();

		// Leest de waarden uit het formulier
		const identifier = formData.get('identifier')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		// Controleert of beide velden zijn ingevuld
		if (!identifier || !password) {
			return fail(400, {
				message: 'Vul zowel je gebruikersnaam of e-mailadres als je wachtwoord in.',
				values: { identifier },
				fieldErrors: {
					identifier: !identifier ? ['Gebruikersnaam of e-mailadres is verplicht.'] : [],
					password: !password ? ['Wachtwoord is verplicht.'] : []
				}
			});
		}

		let response: Response;

		try {
			// Stuurt een POST request naar de login API
			response = await fetch(`${API_BASE_URL}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					identifier,
					password
				})
			});
		} catch (error) {
			// Wordt uitgevoerd als de API niet bereikbaar is
			console.error('Fout bij login request:', error);

			return fail(500, {
				message: 'Kan geen verbinding maken met de API.',
				values: { identifier },
				fieldErrors: {
					identifier: [],
					password: []
				}
			});
		}

		let authResult: AuthResult;

		try {
			// Leest de response van de API uit
			authResult = await response.json();
			console.log('Login response:', authResult);
		} catch (error) {
			console.error('Fout bij het uitlezen van de login response:', error);

			return fail(500, {
				message: 'De response van de API kon niet worden gelezen.',
				values: { identifier },
				fieldErrors: {
					identifier: [],
					password: []
				}
			});
		}

		// Controleert of de login niet gelukt is
		if (!authResult.success) {
			return fail(400, {
				message: authResult.message || 'Inloggen is mislukt.',
				values: { identifier },
				fieldErrors: {
					identifier: [],
					password: []
				}
			});
		}

		// Controleert of er een token is ontvangen
		if (!authResult.token) {
			return fail(500, {
				message: 'Er is geen token ontvangen van de API.',
				values: { identifier },
				fieldErrors: {
					identifier: [],
					password: []
				}
			});
		}

		// Slaat de token op in een cookie voor 2 uur
		cookies.set('token', authResult.token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 2
		});

		// Slaat eventueel extra gebruikersinformatie op in cookies
		if (authResult.username) {
			cookies.set('username', authResult.username, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: false,
				maxAge: 60 * 60 * 2
			});
		}

		if (authResult.email) {
			cookies.set('email', authResult.email, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: false,
				maxAge: 60 * 60 * 2
			});
		}

		if (authResult.userId !== undefined && authResult.userId !== null) {
			cookies.set('userId', authResult.userId.toString(), {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: false,
				maxAge: 60 * 60 * 2
			});
		}

		// Stuurt de gebruiker na succesvol inloggen door naar de homepagina
		throw redirect(303, '/');
	}
};