import type { PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';

// Type voor één collectie
type Collection = {
	id: number;
	name: string;
	description: string;
	userId: number;
	createdAt: string;
	isPublic: boolean;
};

// Type voor één game in een collectie
type Game = {
	id: number;
	title: string;
	description: string;
};

// Laadt de gegevens voor de detailpagina van een collectie
export const load: PageServerLoad = async ({ cookies, fetch, params }) => {

	// Haalt het collectie id op uit de URL
	const collectieId = Number(params.collectie);

	let collectieResponse: Response;
	let gamesResponse: Response;

	try {
		// Vraagt alle collecties van de ingelogde gebruiker op
		collectieResponse = await fetch(`${API_BASE_URL}/api/public/collection`);

		// Vraagt de games op die in deze collectie zitten
		gamesResponse = await fetch(`${API_BASE_URL}/api/public/collection/${collectieId}/games`);
	} catch (error) {
		// Als de API niet bereikbaar is, geven we lege gegevens en een foutmelding terug
		console.error('Fout bij het ophalen van de collectiegegevens:', error);

		return {
			collectie: null as Collection | null,
			games: [] as Game[],
			message: 'Kan geen verbinding maken met de API.'
		};
	}

	// Als één van de responses niet goed is, geven we een foutmelding terug
	if (!collectieResponse.ok || !gamesResponse.ok) {
		return {
			collectie: null as Collection | null,
			games: [] as Game[],
			message: 'Er ging iets mis bij het ophalen van de collectie.'
		};
	}

	// Leest alle collecties uit de response
	const collecties: Collection[] = await collectieResponse.json();

	// Zoekt de juiste collectie op basis van het collectie id uit de URL
	const collectie = collecties.find((item) => item.id === collectieId) ?? null;

	// Leest de games uit de response
	const games: Game[] = await gamesResponse.json();

	// Geeft de collectie en games terug aan de pagina
	return {
		collectie,
		games,
		message: ''
	};
};