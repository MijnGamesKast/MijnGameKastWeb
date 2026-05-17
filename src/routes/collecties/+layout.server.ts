import type { LayoutServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';

type Collection = {
	id: number;
	name: string;
	description: string;
	userId: number;
	createdAt: string;
	isPublic: boolean;
};

type CollectionWithUsername = Collection & {
	username: string;
};

export const load: LayoutServerLoad = async ({ fetch }) => {
	let response: Response;

	try {
		response = await fetch(`${API_BASE_URL}/api/public/collection`);
	} catch (error) {
		console.error(`Fout bij het ophalen van de publieke collecties: ${error}`);

		return {
			collecties: [] as CollectionWithUsername[],
			message: 'Kan geen verbinding maken met de API.'
		};
	}

	if (!response.ok) {
		return {
			collecties: [] as CollectionWithUsername[],
			message: `Er ging iets mis bij het ophalen van collecties. Status: ${response.status}`
		};
	}

	const collecties: Collection[] = await response.json();

	const collectiesMetUsername: CollectionWithUsername[] = await Promise.all(
		collecties.map(async (collectie) => {
			try {
				const userResponse = await fetch(`${API_BASE_URL}/api/user/${collectie.userId}`);

				const username = userResponse.ok
					? await userResponse.text()
					: 'Onbekende gebruiker';

				return {
					...collectie,
					username
				};
			} catch (error) {
				console.error(`Fout bij ophalen van gebruiker ${collectie.userId}:`, error);

				return {
					...collectie,
					username: 'Onbekende gebruiker'
				};
			}
		})
	);

	return {
		collecties: collectiesMetUsername,
		message: ''
	};
};