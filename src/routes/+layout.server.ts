import type { LayoutServerLoad } from './$types';
import { getCurrentUser } from '$lib/server/auth';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const gebruiker = await getCurrentUser(cookies, fetch);

	return {
		isIngelogd: gebruiker !== null,
		gebruiker
	};
};