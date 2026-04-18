import { error } from '@sveltejs/kit';
import logo from '$lib/images/GameCoverPlaceholder.jpg';
export const ssr = false;

export async function load({ fetch, params }) {
	const id = params.id;

	const response = await fetch(`https://localhost:7199/api/catalog/${id}`);

	if (!response.ok) {
		throw error(response.status, `Game ophalen mislukt: ${response.status}`);
	}

	const game = await response.json();

	return { game };
}