import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../stores/useAuth';

export default function Login() {
	const [email, setEmail] = useState('admin@local');
	const [password, setPassword] = useState('admin123');
	const [error, setError] = useState('');
	const login = useAuth((s) => s.login);
	const router = useRouter();

	async function onSubmit(e) {
		e.preventDefault();
		setError('');
		const ok = await login(email, password);
		if (ok) router.push('/admin');
		else setError('Invalid credentials');
	}

	return (
		<main className="container py-12">
			<h1 className="text-2xl font-semibold">Login</h1>
			<form onSubmit={onSubmit} className="mt-6 max-w-sm space-y-4">
				<div>
					<label className="block text-sm text-gray-600">Email</label>
					<input className="mt-1 w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label className="block text-sm text-gray-600">Password</label>
					<input type="password" className="mt-1 w-full rounded border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				{error && <p className="text-sm text-red-600">{error}</p>}
				<button className="rounded bg-primary px-4 py-2 text-white" type="submit">Login</button>
			</form>
		</main>
	);
}