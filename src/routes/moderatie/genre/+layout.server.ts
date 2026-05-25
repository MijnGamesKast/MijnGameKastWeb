import type { LayoutServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';
import { requireModerator } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

type Genre = {
	id: number,
	genreName: string
};

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	await requireModerator(cookies, fetch);
	let response: Response;

	// Haalt de token op uit de cookie
	const token = cookies.get('token');

	// Als er geen token is, wordt de gebruiker doorgestuurd naar de inlogpagina
	if (!token) {
		throw redirect(303, '/login');
	}

	try {
		response = await fetch(`${API_BASE_URL}/api/genre`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		// Als de API niet bereikbaar is, geven we een lege lijst en foutmelding terug
		console.error('Fout bij het ophalen van de genres:', error);

		return {
			genres: [] as Genre[],
			message: 'Kan geen verbinding maken met de API.'
		};
	}

	if (!response.ok) {
		return {
			genres: [] as Genre[],
			message: `Er ging iets mis bij het ophalen van de genres. Status: ${response.status}`
		};
	}

	// Leest de collecties uit de response
	const genres: Genre[] = await response.json();

	// Geeft de collecties terug aan de pagina
	return {
		genres,
		message: ''
	};

};