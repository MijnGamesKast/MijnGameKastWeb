// Importeert de redirect helper van SvelteKit
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad  } from './$types';
import { API_BASE_URL } from '$env/static/private';

// Type voor één collectie
type Collection = {
	id: number;
	name: string;
	description: string;
	userId: number;
	createdAt: string;
	isPublic: boolean;
};

// Laadt de gegevens voor de collectiespagina
export const load: LayoutServerLoad  = async ({ cookies, fetch }) => {
	// Haalt de token op uit de cookie
	const token = cookies.get('token');

	// Als er geen token is, wordt de gebruiker doorgestuurd naar de inlogpagina
	if (!token) {
		throw redirect(303, '/login');
	}

	let response: Response;

	try {
		// Vraagt de collecties van de ingelogde gebruiker op
		response = await fetch(`${API_BASE_URL}/api/collection`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		// Als de API niet bereikbaar is, geven we een lege lijst en foutmelding terug
		console.error('Fout bij het ophalen van collecties:', error);

		return {
			collecties: [] as Collection[],
			message: 'Kan geen verbinding maken met de API.'
		};
	}

	// Als de token niet geldig is, verwijderen we de cookie en sturen we door naar inloggen
	if (response.status === 401) {
		cookies.delete('token', { path: '/' });
		cookies.delete('username', { path: '/' });
		cookies.delete('email', { path: '/' });
		cookies.delete('userId', { path: '/' });

		throw redirect(303, '/login');
	}

	// Als de response niet goed is, geven we een lege lijst en foutmelding terug
	if (!response.ok) {
		return {
			collecties: [] as Collection[],
			message: `Er ging iets mis bij het ophalen van collecties. Status: ${response.status}`
		};
	}

	// Leest de collecties uit de response
	const collecties: Collection[] = await response.json();

	// Geeft de collecties terug aan de pagina
	return {
		collecties,
		message: ''
	};
};