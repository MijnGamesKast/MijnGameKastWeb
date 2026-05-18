import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';
import { requireUser } from '$lib/server/auth';

type CreateCollectionRequest = {
	name: string;
	description: string;
	isPublic: boolean;
};

type Collection = {
	id: number;
	name: string;
	description: string;
	isPublic: boolean;
}

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
	await requireUser(cookies, fetch);
	const token = cookies.get('token');

	if (!token) {
		redirect(303, '/login');
	}

	const collectionId = params.collectie;

	let collectionResponse: Response;

	try {
		collectionResponse = await fetch(`${API_BASE_URL}/api/collection/${collectionId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		console.error('Fout bij het ophalen van de collectie:', error);
		return fail(500, {
			message: 'Kan geen verbinding maken met de API.',
			values: {},
			fieldErrors: {}
		});
	}

	if (collectionResponse.status === 401) {
		cookies.delete('token', { path: '/' });
		cookies.delete('username', { path: '/' });
		cookies.delete('email', { path: '/' });
		cookies.delete('userId', { path: '/' });

		throw redirect(303, '/login');
	}

	if (!collectionResponse.ok) {
		return {
			message: "Er is iets misgegaan bij het ophalen van de collectie."
		};
	}

	const collection: Collection = await collectionResponse.json();

	return {
		collection
	};
};

export const actions: Actions = {
	// default: async ({ request, fetch, cookies, params }) => {

	// },

	update: async ({ request, fetch, cookies, params }) => {
			await requireUser(cookies, fetch);

			const token = cookies.get('token');

			if (!token) {
				redirect(303, '/login');
			}

			const formData = await request.formData();

			const name = formData.get('name')?.toString().trim() ?? '';
			const description = formData.get('description')?.toString().trim() ?? '';
			const isPublic = formData.get('isPublic')?.toString() === 'true';
			const collectionId = params.collectie;

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
				response = await fetch(`${API_BASE_URL}/api/collection/${collectionId}`, {
					method: 'PUT',
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
				redirect(303, `/profiel/collecties`);
			}

			return fail(response.status, {
				message: `Collectie aanmaken mislukt. Status: ${response.status}`,
				values: payload,
				fieldErrors: {
					name: [],
					description: []
				}
			});
	},

	delete: async ({ fetch, cookies, params }) => {
		await requireUser(cookies, fetch);

		const token = cookies.get('token');

		if (!token) {
			redirect(303, '/login');
		}

		const collectionId = params.collectie;

		let response: Response;

		try {
			response = await fetch(`${API_BASE_URL}/api/collection/${collectionId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
		} catch (error) {
			console.error('Fout bij collectie verwijderen:', error);
			return fail(500, {
				message: 'Kan geen verbinding maken met de API.',
				values: {},
				fieldErrors: {}
			});
		}

		if (response.status === 401) {
			cookies.delete('token', { path: '/' });
			redirect(303, '/login');
		}

		if (!response.ok) {
			return fail(response.status, {
				message: `Collectie verwijderen mislukt. Status: ${response.status}`,
				});
		}

		redirect(303, '/profiel/collecties');
	}
};