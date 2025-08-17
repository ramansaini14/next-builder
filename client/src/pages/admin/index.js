import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../stores/useAuth';
import { api } from '../../lib/api';

export default function Admin() {
	const user = useAuth((s) => s.user);
	const logout = useAuth((s) => s.logout);
	const router = useRouter();
	const [pages, setPages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState('New Page');

	useEffect(() => {
		if (user === null) router.replace('/login');
	}, [user, router]);

	useEffect(() => {
		async function load() {
			try {
				const data = await api.listPages();
				setPages(data);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);

	async function createPage() {
		const payload = { title, blocks: [], meta: {} };
		const page = await api.createPage(payload);
		router.push(`/admin/builder/${page.id}`);
	}

	return (
		<main className="container py-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Admin</h1>
				<div className="flex items-center gap-3">
					{user && <span className="text-sm text-gray-600">{user.email}</span>}
					<button className="rounded border px-3 py-1" onClick={() => logout().then(() => router.push('/'))}>Logout</button>
				</div>
			</div>
			<div className="mt-6 flex items-end gap-3">
				<div>
					<label className="block text-sm text-gray-600">Title</label>
					<input className="mt-1 rounded border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<button className="rounded bg-primary px-4 py-2 text-white" onClick={createPage}>Create Page</button>
			</div>
			<div className="mt-8">
				<h2 className="mb-3 text-lg font-medium">Pages</h2>
				{loading ? (
					<p>Loading...</p>
				) : (
					<ul className="space-y-2">
						{pages.map((p) => (
							<li key={p.id} className="flex items-center justify-between rounded border p-3">
								<div>
									<p className="font-medium">{p.title}</p>
									<p className="text-xs text-gray-500">/{p.slug}</p>
								</div>
								<div className="flex gap-2">
									<Link className="rounded border px-3 py-1" href={`/admin/builder/${p.id}`}>Edit</Link>
									<Link className="rounded border px-3 py-1" href={`/${p.slug}`} target="_blank">View</Link>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</main>
	);
}