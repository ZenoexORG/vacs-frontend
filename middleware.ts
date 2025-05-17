import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName, headerName } from './app/i18n/config'

acceptLanguage.languages(languages)

// Nombre de la cookie de autenticación (ajusta según lo que use tu API)
const AUTH_COOKIE_NAME = 'token'; // Reemplaza con el nombre real de tu cookie de autenticación

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}

export function middleware(req) {
	// Ignorar rutas de recursos estáticos
	if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) {
		return NextResponse.next();
	}

	// Determinar el idioma
	let lng;
	if (req.cookies.has(cookieName)) {
		lng = acceptLanguage.get(req.cookies.get(cookieName).value);
	}
	if (!lng) {
		lng = acceptLanguage.get(req.headers.get('Accept-Language'));
	}
	if (!lng) {
		lng = fallbackLng;
	}

	const lngInPath = languages.find(loc => req.nextUrl.pathname.startsWith(`/${loc}`));

	// Verificar si la ruta actual es la página de autenticación
	const pathWithoutLocale = req.nextUrl.pathname.replace(lngInPath ? `/${lngInPath}` : '', '');
	const isAuthPage = pathWithoutLocale === '/auth' || pathWithoutLocale.startsWith('/auth/');

	// Comprobar autenticación si NO estamos en la página de auth
	if (!isAuthPage) {
		const authToken = req.cookies.get(AUTH_COOKIE_NAME);
		if (!authToken) {
			// No hay token - redirigir a la página de autenticación
			const authUrl = new URL(`/${lng}/auth`, req.url);
			// Opcionalmente guardar la URL original para redireccionar después del login
			const currentPath = req.nextUrl.pathname + req.nextUrl.search;
			if (currentPath !== '/' && !currentPath.startsWith('/_next')) {
				authUrl.searchParams.set('redirectTo', currentPath);
			}
			return NextResponse.redirect(authUrl);
		}

		// El token existe, pero su validez será verificada por la API en las solicitudes
	}

	// Procesar la lógica de idioma
	const headers = new Headers(req.headers);
	headers.set(headerName, lngInPath || lng);

	// Redirigir si no hay idioma en la ruta
	if (
		!lngInPath &&
		!req.nextUrl.pathname.startsWith('/_next') &&
		!req.nextUrl.pathname.startsWith('/favicon.ico')
	) {
		return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url));
	}

	// Manejar el referrer para mantener el idioma
	if (req.headers.has('referer')) {
		const refererUrl = new URL(req.headers.get('referer'));
		const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
		const response = NextResponse.next({ headers });
		if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
		return response;
	}

	return NextResponse.next({ headers });
}
