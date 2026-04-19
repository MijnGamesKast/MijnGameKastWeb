// Type voor de server load functie van de layout
import type { LayoutServerLoad } from './$types';

// Type voor de response van /api/auth/me bij succes
type AuthMeResponse = {
	success: boolean;
	message: string;
	token?: string | null;
	expiresAt?: string | null;
	userId?: number | null;
	username?: string | null;
	email?: string | null;
};

// Laadt gegevens voor de hele layout en alle onderliggende pagina's
export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	// Haalt de token op uit de cookie
	const token = cookies.get('token');

	// Als er geen token is, is de gebruiker niet ingelogd
	if (!token) {
		return {
			isIngelogd: false,
			gebruiker: null
		};
	}

	let response: Response;

	try {
		// Controleert via de API of de token nog geldig is
		response = await fetch('https://localhost:7199/api/auth/me', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		// Als de API niet bereikbaar is, behandelen we de gebruiker als niet ingelogd
		console.error('Fout bij controleren van de loginstatus:', error);

		return {
			isIngelogd: false,
			gebruiker: null
		};
	}

	// Als de token geldig is, halen we de gebruikersinformatie op
	if (response.status === 200) {
		const authMeResult: AuthMeResponse = await response.json();

		return {
			isIngelogd: true,
			gebruiker: {
				userId: authMeResult.userId ?? null,
				username: authMeResult.username ?? null,
				email: authMeResult.email ?? null,
				expiresAt: authMeResult.expiresAt ?? null
			}
		};
	}

	// Als de token ongeldig is, verwijderen we de cookies
	if (response.status === 401) {
		cookies.delete('token', { path: '/' });
		cookies.delete('username', { path: '/' });
		cookies.delete('email', { path: '/' });
		cookies.delete('userId', { path: '/' });

		return {
			isIngelogd: false,
			gebruiker: null
		};
	}

	// Fallback voor andere onverwachte responses
	return {
		isIngelogd: false,
		gebruiker: null
	};
};