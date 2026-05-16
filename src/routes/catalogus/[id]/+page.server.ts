import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { requireModerator } from '$lib/server/auth';

type Game = {
	id: number;
	title: string;
	description: string;
};

export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch(`https://localhost:7199/api/catalog/${params.id}`);

	if (!response.ok) {
		error(response.status, `Game ophalen mislukt: ${response.status}`);
	}

	const game: Game = await response.json();

	return { game };
};

export const actions: Actions = {
	delete: async ({ cookies, fetch, params }) => {
		await requireModerator(cookies, fetch);

		const token = cookies.get('token');

		if (!token) {
			redirect(303, '/login');
		}

		const response = await fetch(`https://localhost:7199/api/catalog/${params.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			return fail(response.status, {
				message: `Game verwijderen mislukt: ${response.status}`
			});
		}

		redirect(303, '/catalogus');
	}
};