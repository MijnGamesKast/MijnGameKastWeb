import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';
import { requireModerator } from '$lib/server/auth';

type Platform = {
	id: number;
	platformName: string;
};

type PlatformRequest = {
	platformName: string;
};

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
	await requireModerator(cookies, fetch);

	const token = cookies.get('token');

	if (!token) {
		redirect(303, '/login');
	}

	const platformId = params.platformId;

	const response = await fetch(`${API_BASE_URL}/api/platform/${platformId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (response.status === 204 || response.status === 404) {
		return {
			platform: null
		};
	}

	if (!response.ok) {
		return {
			platfomr: null,
			message: `Platform ophalen mislukt. Status: ${response.status}`
		};
	}

	const platform: Platform = await response.json();

	return {
		platform
	};
};

export const actions: Actions = {
	update: async ({ request, fetch, cookies, params }) => {
			await requireModerator(cookies, fetch);

			const token = cookies.get('token');

			if (!token) {
				redirect(303, '/login');
			}

			const platformId = params.platformId;
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

			const response = await fetch(`${API_BASE_URL}/api/platform/${platformId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				redirect(303, '/moderatie/platform');
			}

			return fail(response.status, {
				message: `Platform wijzigen mislukt. Status: ${response.status}`,
				values: payload,
				fieldErrors: {
					platformName: []
				}
			});
	},

	delete: async ({ fetch, cookies, params }) => {
		await requireModerator(cookies, fetch);

		const token = cookies.get('token');

		if (!token) {
			redirect(303, '/login');
		}

		const platformId = params.platformId;

		const response = await fetch(`${API_BASE_URL}/api/platform/${platformId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			return fail(response.status, {
				message: `Platform verwijderen mislukt. Status: ${response.status}`
			});
		}

		redirect(303, '/moderatie/platform');
	}
};