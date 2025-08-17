import Link from 'next/link';

export default function Home() {
	return (
		<main className="container py-12">
			<h1 className="text-3xl font-semibold">Avada-like Builder</h1>
			<p className="mt-2 text-gray-600">Build pages with drag-and-drop. Login to start creating.</p>
			<div className="mt-6 flex gap-3">
				<Link className="rounded bg-primary px-4 py-2 text-white" href="/login">Login</Link>
				<Link className="rounded border px-4 py-2" href="/admin">Admin</Link>
			</div>
		</main>
	);
}