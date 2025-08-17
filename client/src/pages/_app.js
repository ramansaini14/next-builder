import '../styles/globals.css';
import { useEffect } from 'react';
import { useAuth } from '../stores/useAuth';

export default function App({ Component, pageProps }) {
	const fetchUser = useAuth((s) => s.fetchUser);
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);
	return <Component {...pageProps} />;
}