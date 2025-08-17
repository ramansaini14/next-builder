const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: 'include',
		headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
		...options,
	});
	if (!res.ok) {
		let message = `Request failed: ${res.status}`;
		try {
			const data = await res.json();
			message = data.error || message;
		} catch {}
		throw new Error(message);
	}
	try {
		return await res.json();
	} catch {
		return null;
	}
}

export const api = {
	login: (email, password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
	logout: () => request('/api/auth/logout', { method: 'POST' }),
	me: () => request('/api/auth/me'),
	listPages: () => request('/api/pages'),
	getPage: (slug) => request(`/api/pages/${slug}`),
	createPage: (payload) => request('/api/pages', { method: 'POST', body: JSON.stringify(payload) }),
	updatePage: (id, payload) => request(`/api/pages/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
	deletePage: (id) => request(`/api/pages/${id}`, { method: 'DELETE' }),
};