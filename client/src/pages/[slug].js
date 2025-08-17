import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Renderer } from '../components/Builder/Renderer';

export default function PublicPage() {
	const router = useRouter();
	const { slug } = router.query;
	const [page, setPage] = useState(null);
	const [error, setError] = useState('');
	useEffect(() => {
		if (!slug) return;
		api.getPage(slug)
			.then(setPage)
			.catch(() => setError('Not found'));
	}, [slug]);
	if (error) return <main className="container py-8">Page not found.</main>;
	if (!page) return <main className="container py-8">Loading...</main>;
	return (
		<main className="container py-8">
			{page.title && <h1 className="mb-6 text-3xl font-semibold">{page.title}</h1>}
			<Renderer value={page.blocks || []} />
		</main>
	);
}