import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';
import { requireModerator } from '$lib/server/auth';

type PlatformRequest = {
	platformName: string;
};

type Platform = {
	id: number;
	platformName: string;
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
		const platformName = formData.get('platformName')?.toString().trim() ?? '';

		if (!platformName) {
			return fail(400, {
				message: 'Vul een platformnaam in.',
				values: { platformName },
				fieldErrors: {
					platformName: ['Platformnaam is verplicht.']
				}
			});
		}

		const payload: PlatformRequest = {
			platformName
		};

		let response: Response;

		try {
			response = await fetch(`${API_BASE_URL}/api/platform`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
		} catch (error) {
			console.error('Fout bij platform toevoegen:', error);

			return fail(500, {
				message: 'Kan geen verbinding maken met de API.',
				values: payload,
				fieldErrors: {
					platformName: []
				}
			});
		}

		if (response.status === 201 || response.ok) {
			const createdPlatform: Platform = await response.json();
			redirect(303, `/moderatie/platform/${createdPlatform.id}`);
		}

		return fail(response.status, {
			message: `Platform toevoegen mislukt. Status: ${response.status}`,
			values: payload,
			fieldErrors: {
				platformName: []
			}
		});
	}
};