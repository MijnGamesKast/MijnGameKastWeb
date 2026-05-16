import { API_BASE_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {

	let response: Response;

	try {
		response = await fetch(`${API_BASE_URL}/api/catalog`);
	} catch (err) {
		error(500, 'API niet bereikbaar');
	}

	if (!response.ok) {
		error(response.status, `Catalogus ophalen mislukt: ${response.status}`);
	}

	const games = await response.json();

	return { games };
};