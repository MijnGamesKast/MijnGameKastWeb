import type { PageServerLoad } from './$types';
import { requireUser } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	await requireUser(cookies, fetch);
}