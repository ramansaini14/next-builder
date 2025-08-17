const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function uploadFiles(files) {
	const form = new FormData();
	for (const file of files) form.append('files', file);
	const res = await fetch(`${API_URL}/api/uploads`, { method: 'POST', body: form, credentials: 'include' });
	if (!res.ok) throw new Error('Upload failed');
	const data = await res.json();
	return data.files || [];
}