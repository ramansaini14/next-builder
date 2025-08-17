import { create } from 'zustand';
import { api } from '../lib/api';

export const useAuth = create((set, get) => ({
	user: null,
	loading: false,
	async fetchUser() {
		set({ loading: true });
		try {
			const me = await api.me();
			set({ user: me, loading: false });
		} catch (e) {
			set({ user: null, loading: false });
		}
	},
	async login(email, password) {
		set({ loading: true });
		try {
			const user = await api.login(email, password);
			set({ user, loading: false });
			return true;
		} catch (e) {
			set({ loading: false });
			return false;
		}
	},
	async logout() {
		await api.logout();
		set({ user: null });
	},
}));