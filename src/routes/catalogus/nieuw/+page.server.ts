import { fail, redirect } from '@sveltejs/kit';
import { requireUser } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';

type Platform = {
	id: number;
	platformName: string;
}

type Genre = {
	id: number;
	genreName: string;
}

export const load: PageServerLoad = async ({ cookies, fetch}) => {
	const gebruiker = await requireUser(cookies, fetch);

	const platformResponse = await fetch(`${API_BASE_URL}/api/platform`);
	if (!platformResponse.ok) {
		throw new Error('Platformen ophalen mislukt');
	}

	const genresResponse = await fetch(`${API_BASE_URL}/api/genre`);
	if (!genresResponse.ok) {
		throw new Error('Genres ophalen mislukt');
	}

	const platforms: Platform[] = await platformResponse.json();
	const genres: Genre[] = await genresResponse.json();

	return {
		gebruiker,
		platforms,
		genres
	};
}

// Type voor validatiefouten per veld vanuit de API
type ValidationError = {
	field: string;
	errors: string[];
};

// Type voor de error response van de API
type ApiErrorResponse = {
	message?: string;
	validationErrors?: ValidationError[];
};

// Type voor een succesvol aangemaakte game
type CreatedGame = {
	id: number | string;
	title: string;
	description: string;
};

type CreateGameRequest = {
	title: string;
	description: string;
	platformIds: number[];
	genreIds: number[];
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies}) => {
		await requireUser(cookies, fetch);
		const token = cookies.get('token');

		if (!token) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();

		// Get all data from the form
		const title = formData.get('title')?.toString().trim() ?? '';
		const description = formData.get('description')?.toString().trim() ?? '';

		const platformIds = formData
			.getAll('platformIds[]')
			.map((value) => Number(value))
			.filter((value) => !Number.isNaN(value));

		const genreIds = formData
			.getAll('genreIds[]')
			.map((value) => Number(value))
			.filter((value) => !Number.isNaN(value));

		// Check if the required fields are filled in
		if (!title || !description) {
			return fail(400, {
				message: "Vul alle verplichte velden in.",
				values: {
					title,
					description,
					platformIds,
					genreIds
				},
				fieldErrors: {
					title: !title ? ['Titlel is verplicht'] : [],
					description: !description ? ['Beschrijving is verplicht'] : [],
				}
			});
		}

		const payload: CreateGameRequest = {
			title,
			description,
			platformIds,
			genreIds,
		};

		let response: Response;

		try {
			response = await fetch(`${API_BASE_URL}/api/catalog`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(payload),
			});
		} catch (error) {
			console.error(`Fout bij (game toevoegen) API Request: ${error}`)

			return fail(500, {
				message: "Kan geen verbinding maken met de API.",
				values: payload,
				fieldErrors: {
					title: [],
					description: [],
					platformIds: [],
					genreIds: [],
				}
			});
		}

		if (response.status === 201) {
			const createdGame: CreatedGame = await response.json();
			redirect(303, `/catalogus/${createdGame.id}`);
		}

		if (response.status === 400) {
			const errorData: ApiErrorResponse = await response.json();

			const fieldErrors: Record<string, string[]> = {
				title: [],
				description: [],
				platformIds: [],
				genreIds: [],
			};

			for (const validationError of errorData.validationErrors ?? []) {
				const key = validationError.field.toLowerCase();

				if (key.includes('title')) {
					fieldErrors.title = validationError.errors;
				}

				if (key.includes('description')) {
					fieldErrors.description = validationError.errors;
				}

				if (key.includes('platformids')) {
					fieldErrors.platformIds = validationError.errors;
				}

				if (key.includes('genreids')) {
					fieldErrors.genreIds = validationError.errors;
				}
			}

			return fail(400, {
				message: errorData.message ?? "De opgegeven game is ongeldig.",
				validationErrors: errorData.validationErrors ?? [],
				fieldErrors,
				values: payload
			});
		}

		if (response.status === 401) {
			cookies.delete('token', { path: '/' });
			redirect(303, '/login');
		}

		return fail(response.status, {
			message: `Onverwachte fout: ${response.status}`,
			values: payload,
			fieldErrors: {
				title: [],
				description: [],
				platformIds: [],
				genreIds: [],
			}
		});
	}
}
