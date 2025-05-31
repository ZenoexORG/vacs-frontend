import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
	fullname: string;
	role: string;
}

const languages = ['en', 'es'];
const fallbackLng = 'es';

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		setIsLoading(true);

		const fullname = localStorage.getItem('fullname');
		const role = localStorage.getItem('role');

		if (fullname && role) {
			setUser({ fullname, role });
		} else {
			setUser(null);
		}

		setIsLoading(false);
	}, []);

	const logout = useCallback(async () => {
		try {
			localStorage.removeItem('fullname');
			localStorage.removeItem('role');
			localStorage.removeItem('permissions');

			setUser(null);

			const pathname = window.location.pathname;
			const pathParts = pathname.split('/');
			const currentLang = languages.includes(pathParts[1]) ? pathParts[1] : fallbackLng;

			router.push(`/${currentLang}/auth`);
		} catch (error) {
			console.error('Error during logout:', error);
		}
	}, [router]);

	return {
		user,
		isLoading,
		isAuthenticated: !!user,
		logout,
	};
};
