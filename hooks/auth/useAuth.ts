import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	// Cargar datos de usuario
	useEffect(() => {
		setIsLoading(true);

		const fullname = localStorage.getItem('fullname');
		const role = localStorage.getItem('role');

		if (fullname && role) {
			setUser({
				fullname,
				role,
			});
		} else {
			setUser(null);
		}

		setIsLoading(false);
	}, []);

	// Función para cerrar sesión
	const logout = useCallback(async () => {
		try {
			// Agregar llamada a API para invalidar el token en el servidor si es necesario
			// await AuthAPI.logout();

			// Limpiar datos locales
			localStorage.removeItem('fullname');
			localStorage.removeItem('role');
			localStorage.removeItem('permissions');

			// Actualizar estado
			setUser(null);

			// Determinar idioma actual desde URL
			const pathname = window.location.pathname;
			const pathParts = pathname.split('/');
			const currentLang = languages.includes(pathParts[1]) ? pathParts[1] : fallbackLng;

			// Redirigir a la página de autenticación
			router.push(`/${currentLang}/auth`);
		} catch (error) {
			console.error('Error during logout:', error);
		}
	}, [router]);

	return {
		user,
		isLoading,
		isAuthenticated: !!user,
		logout
	};
};
