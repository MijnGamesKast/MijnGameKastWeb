import type { PageServerLoad} from '../../../.svelte-kit/types/src/routes';
import { API_BASE_URL} from '$env/static/private';

type Collection = {
	id: number;
	name: string;
	description: string;
	userId: number;
	createdAt: string;
	isPublic: boolean;
};

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	let response: Response;

	try {
		response = await fetch(`${API_BASE_URL}/api/public/collection`);
	} catch (error) {
		console.error(`Fout bij het ophalen van de publieke collecties: ${error}`);

		return {
			collecties: [] as Collection[],
			message: "Kan geen verbinding maken met de API."
		};
	}

	// Als de response niet goed is, geven we een lege lijst en foutmelding terug
	if (!response.ok) {
		return {
			collecties: [] as Collection[],
			message: `Er ging iets mis bij het ophalen van collecties. Status: ${response.status}`
		};
	}

	// Leest de collecties uit de response
	const collecties: Collection[] = await response.json();

	// Geeft de collecties terug aan de pagina
	return {
		collecties,
		message: ''
	};
}