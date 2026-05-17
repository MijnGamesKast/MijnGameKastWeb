import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';
import { requireUser } from '$lib/server/auth';

type CreatedCollection = {
	id: number;
	name: string;
	description: string;
	userId: number;
	createdAt: string;
	isPublic: boolean;
};

type CreateCollectionRequest = {
	name: string;
	description: string;
	isPublic: boolean;
};

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	await requireUser(cookies, fetch);

	return {};
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		await requireUser(cookies, fetch);

		const token = cookies.get('token');

		if (!token) {
			redirect(303, '/login');
		}

		const formData = await request.formData();

		const name = formData.get('name')?.toString().trim() ?? '';
		const description = formData.get('description')?.toString().trim() ?? '';
		const isPublic = formData.get('isPublic')?.toString() === 'true';

		if (!name || !description) {
			return fail(400, {
				message: 'Vul alle verplichte velden in.',
				values: {
					name,
					description,
					isPublic
				},
				fieldErrors: {
					name: !name ? ['Naam is verplicht.'] : [],
					description: !description ? ['Beschrijving is verplicht.'] : []
				}
			});
		}

		const payload: CreateCollectionRequest = {
			name,
			description,
			isPublic
		};

		let response: Response;

		try {
			response = await fetch(`${API_BASE_URL}/api/collection`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
		} catch (error) {
			console.error('Fout bij collectie aanmaken:', error);

			return fail(500, {
				message: 'Kan geen verbinding maken met de API.',
				values: payload,
				fieldErrors: {
					name: [],
					description: []
				}
			});
		}

		if (response.status === 201 || response.ok) {
			const createdCollection: CreatedCollection = await response.json();
			redirect(303, `/profiel/collecties/${createdCollection.id}`);
		}

		return fail(response.status, {
			message: `Collectie aanmaken mislukt. Status: ${response.status}`,
			values: payload,
			fieldErrors: {
				name: [],
				description: []
			}
		});
	}
};