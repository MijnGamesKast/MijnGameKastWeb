// Importeert helper functies van SvelteKit
// fail: geeft een fout terug aan de pagina
// redirect: stuurt de gebruiker naar een andere pagina
import { fail, redirect } from '@sveltejs/kit';
import { requireUser } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ cookies, fetch}) => {
	const gebruiker = await requireUser(cookies, fetch);

	return {
		gebruiker
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

// Definieert de form actions voor deze pagina
export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {

		// Haalt de form data op uit de POST request
		const formData = await request.formData();
		const token = cookies.get('token');

		// Leest de waarden uit het formulier en haalt de spaties voor en achter eraf
		const title = formData.get('title')?.toString().trim() ?? '';
		const description = formData.get('description')?.toString().trim() ?? '';

		// Controleert of de velden leeg zijn en geeft direct een fout terug
		if (!title || !description) {
			return fail(400, {
				message: 'Vul zowel titel als beschrijving in.',
				values: { title, description },
				fieldErrors: {
					title: !title ? ['Titel is verplicht.'] : [],
					description: !description ? ['Beschrijving is verplicht.'] : []
				}
			});
		}

		// Variabele om de response van de API in op te slaan
		let response: Response;

		try {
			// Stuurt een POST request naar de API met de ingevulde data
			response = await fetch('https://localhost:7199/api/catalog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					title,
					description
				})
			});
		} catch (error) {
			// Wordt uitgevoerd als de API niet bereikbaar is (bijv. server down)
			console.error('Fout bij API request:', error);

			return fail(500, {
				message: 'Kan geen verbinding maken met de API.',
				values: { title, description },
				fieldErrors: {
					title: [],
					description: []
				}
			});
		}

		// Als de game succesvol is aangemaakt (status 201)
		if (response.status === 201) {

			// Haalt de aangemaakte game op uit de response
			const createdGame: CreatedGame = await response.json();

			// Stuurt de gebruiker door naar de detailpagina van de game
			throw redirect(303, `/catalogus/${createdGame.id}`);
		}

		// Als de API een validatiefout terugstuurt (status 400)
		if (response.status === 400) {

			// Leest de foutinformatie uit de API response
			const errorData: ApiErrorResponse = await response.json();

			// Object om veld-specifieke fouten in op te slaan
			const fieldErrors: Record<string, string[]> = {
				title: [],
				description: []
			};

			// Loopt door alle validatiefouten en koppelt ze aan de juiste velden
			for (const validationError of errorData.validationErrors ?? []) {
				const key = validationError.field.toLowerCase();

				if (key.includes('title')) {
					fieldErrors.title = validationError.errors;
				}

				if (key.includes('description')) {
					fieldErrors.description = validationError.errors;
				}
			}

			// Geeft de fouten terug aan de pagina zodat ze getoond kunnen worden
			return fail(400, {
				message: errorData.message ?? 'De opgegeven game is ongeldig.',
				validationErrors: errorData.validationErrors ?? [],
				fieldErrors,
				values: { title, description }
			});
		}

		// Fallback voor andere onverwachte statuscodes
		return fail(response.status, {
			message: `Onverwachte fout: ${response.status}`,
			values: { title, description },
			fieldErrors: {
				title: [],
				description: []
			}
		});
	}
};