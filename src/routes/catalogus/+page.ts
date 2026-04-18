import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ fetch }) {
	const response = await fetch('https://localhost:7199/api/catalog');

	if (!response.ok) {
		throw error(response.status, `Catalog ophalen mislukt: ${response.status}`);
	}

	const catalog = await response.json();

	return { catalog };
}