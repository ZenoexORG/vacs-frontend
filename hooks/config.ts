import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:9200';

const API = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

API.interceptors.response.use(
	(response) => response,
	(error) => {
		// Manejar errores 401 (Unauthorized) o 403 (Forbidden)
		if (error.response && (error.response.statusCode === 401)) {
			console.log('Sesión expirada o no autorizada');

			// Limpiar datos de usuario
			localStorage.removeItem('fullname');
			localStorage.removeItem('role');
			localStorage.removeItem('permissions');

			// Redirigir a la página de autenticación
			if (typeof window !== 'undefined') {
				// Determinar el idioma actual desde la URL
				const pathParts = window.location.pathname.split('/');
				const currentLang = pathParts[1];

				// Redirigir manteniendo el idioma si está en la URL
				if (languages.includes(currentLang)) {
					window.location.href = `/${currentLang}/auth`;
				} else {
					// Si no hay idioma en la URL (poco probable con tu middleware), usar el idioma por defecto
					window.location.href = `/${fallbackLng}/auth`;
				}
			}
		}

		return Promise.reject(error);
	}
);

export default API;
