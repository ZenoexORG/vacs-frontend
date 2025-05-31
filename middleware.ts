import { NextResponse, NextRequest } from 'next/server'; // 👈 agrega NextRequest
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName, headerName } from './app/i18n/config';

acceptLanguage.languages(languages);

const AUTH_COOKIE_NAME = 'token';

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
};

export function middleware(req: NextRequest) { // 👈 tipado explícito aquí
	if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) {
		return NextResponse.next();
	}

	let lng;
	if (req.cookies.has(cookieName)) {
		lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
	}
	if (!lng) {
		lng = acceptLanguage.get(req.headers.get('Accept-Language') || '');
	}
	if (!lng) {
		lng = fallbackLng;
	}

	const lngInPath = languages.find(loc => req.nextUrl.pathname.startsWith(`/${loc}`));
	const pathWithoutLocale = req.nextUrl.pathname.replace(lngInPath ? `/${lngInPath}` : '', '');
	const isAuthPage = pathWithoutLocale === '/auth' || pathWithoutLocale.startsWith('/auth/');

	if (!isAuthPage) {
		const authToken = req.cookies.get(AUTH_COOKIE_NAME);
		if (!authToken) {
			const authUrl = new URL(`/${lng}/auth`, req.url);
			const currentPath = req.nextUrl.pathname + req.nextUrl.search;
			if (currentPath !== '/' && !currentPath.startsWith('/_next')) {
				authUrl.searchParams.set('redirectTo', currentPath);
			}
			return NextResponse.redirect(authUrl);
		}
	}

	const headers = new Headers(req.headers);
	headers.set(headerName, lngInPath || lng);

	if (
		!lngInPath &&
		!req.nextUrl.pathname.startsWith('/_next') &&
		!req.nextUrl.pathname.startsWith('/favicon.ico')
	) {
		return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url));
	}

	if (req.headers.has('referer')) {
		const refererUrl = new URL(req.headers.get('referer') || '');
		const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
		const response = NextResponse.next({ headers });
		if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
		return response;
	}

	return NextResponse.next({ headers });
}
