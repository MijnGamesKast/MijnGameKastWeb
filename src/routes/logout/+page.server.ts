import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_BASE_URL } from '$env/static/private';

export const actions: Actions = {
	default: async ({ cookies, fetch }) => {
		const token = cookies.get('token');

		// Alleen logout request sturen als er een token is
		if (token) {
			try {
				await fetch(`${API_BASE_URL}/api/auth/logout`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
			} catch (error) {
				console.error('Fout bij uitloggen:', error);
			}
		}

		// Lokale cookies verwijderen
		cookies.delete('token', { path: '/' });

		// Doorsturen naar homepagina
		redirect(303, '/');
	}
};