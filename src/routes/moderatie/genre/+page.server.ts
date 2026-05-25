import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';
import { requireModerator } from '$lib/server/auth';

type GenreRequest = {
	genreName: string;
};

type Genre = {
	id: number;
	genreName: string;
};

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	await requireModerator(cookies, fetch);
	return {};
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		await requireModerator(cookies, fetch);

		const token = cookies.get('token');

		if (!token) {
			redirect(303, '/login');
		}

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

		let response: Response;

		try {
			response = await fetch(`${API_BASE_URL}/api/genre`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
		} catch (error) {
			console.error('Fout bij genre toevoegen:', error);

			return fail(500, {
				message: 'Kan geen verbinding maken met de API.',
				values: payload,
				fieldErrors: {
					genreName: []
				}
			});
		}

		if (response.status === 201 || response.ok) {
			const createdGenre: Genre = await response.json();
			redirect(303, `/moderatie/genre/${createdGenre.id}`);
		}

		return fail(response.status, {
			message: `Genre toevoegen mislukt. Status: ${response.status}`,
			values: payload,
			fieldErrors: {
				genreName: []
			}
		});
	}
};