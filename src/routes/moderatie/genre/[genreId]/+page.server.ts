import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';
import { requireModerator } from '$lib/server/auth';

type Genre = {
	id: number;
	genreName: string;
};

type GenreRequest = {
	genreName: string;
};

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
	await requireModerator(cookies, fetch);

	const token = cookies.get('token');

	if (!token) {
		redirect(303, '/login');
	}

	const genreId = params.genreId;

	const response = await fetch(`${API_BASE_URL}/api/genre/${genreId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (response.status === 204 || response.status === 404) {
		return {
			genre: null
		};
	}

	if (!response.ok) {
		return {
			genre: null,
			message: `Genre ophalen mislukt. Status: ${response.status}`
		};
	}

	const genre: Genre = await response.json();

	return {
		genre
	};
};

export const actions: Actions = {
	update: async ({ request, fetch, cookies, params }) => {
			await requireModerator(cookies, fetch);

			const token = cookies.get('token');

			if (!token) {
				redirect(303, '/login');
			}

			const genreId = params.genreId;
			const formData = await request.formData();
			const genreName = formData.get('genreName')?.toString().trim() ?? '';

			if (!genreName) {
				return fail(400, {
					message: 'Vul een genrenaam in.',
					values: { genreName },
					fieldErrors: {
						genreName: ['Genrenaam is verplicht.']
					}
				});
			}

			const payload: GenreRequest = {
				genreName
			};

			const response = await fetch(`${API_BASE_URL}/api/genre/${genreId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				redirect(303, '/moderatie/genre');
			}

			return fail(response.status, {
				message: `Genre wijzigen mislukt. Status: ${response.status}`,
				values: payload,
				fieldErrors: {
					genreName: []
				}
			});
	},

	delete: async ({ fetch, cookies, params }) => {
		await requireModerator(cookies, fetch);

		const token = cookies.get('token');

		if (!token) {
			redirect(303, '/login');
		}

		const genreId = params.genreId;

		const response = await fetch(`${API_BASE_URL}/api/genre/${genreId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			return fail(response.status, {
				message: `Genre verwijderen mislukt. Status: ${response.status}`
			});
		}

		redirect(303, '/moderatie/genre');
	}
};