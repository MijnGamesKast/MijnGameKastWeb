import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';
import { requireUser } from '$lib/server/auth';

type Game = {
	id: number;
	title: string;
	description: string;
	platforms?: { id: number; platformName: string; }[];
	genres?: { id: number; genreName: string; }[];
}

type Collection = {
	id: number;
	name: string;
	description: string;
}

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
	const gebruiker = await requireUser(cookies, fetch);
	const token = cookies.get('token')
	const gameId = params.id;

	// Controleer of er een token is, zo niet wordt die doorgestuurd naar de inlogpagina
	if (!token) {
		throw redirect(303, '/login');
	}

	const gameResponse = await fetch(`${API_BASE_URL}/api/catalog/${gameId}`);

	if (!gameResponse.ok) {
		error(gameResponse.status, `Game ophalen mislukt: ${gameResponse.status}`);
	}

	const collectionsResponse = await fetch(`${API_BASE_URL}/api/collection`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!collectionsResponse.ok) {
		error(collectionsResponse.status, `Collecties ophalen mislukt: ${collectionsResponse.status}`);
	}

	const game: Game = await gameResponse.json();
	const collections: Collection[] = await collectionsResponse.json();

	return {
		gebruiker,
		game,
		collections
	};
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies, params }) => {
		// Check the user
		const gebruiker = await requireUser(cookies, fetch);
		const token = cookies.get('token');
		if (!token) {
			throw redirect(303, '/login');
		}


		const formData = await request.formData();
		const gameId = params.id;

		const collections = formData
			.getAll('collectionId[]')
			.map((value) => value.toString());

		// controleer of er een collectie is aangeklikt
		if (collections.length === 0) {
			return fail(400, {
				message: "Selecteer een collectie"
			});
		}

		let toegevoegd = 0;
		let alAanwezig = 0;

		// /api/Collection/{collectionId}/games/{gameId}
		for (const collectionId of collections) {
			const response = await fetch(`${API_BASE_URL}/api/collection/${collectionId}/games/${gameId}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.status === 409) {
				alAanwezig++;
				continue;
			}

			if (!response.ok) {
				return fail(500, {
					message: 'Er is een fout opgetreden bij het toevoegen van de game aan de collectie.'
				})
			}

			toegevoegd++;
		}

		if (toegevoegd == 0 && alAanwezig > 0) {
			return fail(409, {
				message: "Deze game staat al in de geselecteerde collectie(s)."
			});
		}

		if (collections.length === 1) {
			throw redirect(303, `/profiel/collecties/${collections[0]}`);
		}

		throw redirect(303, `/profiel/collecties/`);

	}
}