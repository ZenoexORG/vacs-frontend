'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader } from '@mantine/core';
import { useAuth } from '@hooks/auth/useAuth';

export function AuthCheck({ children }: { children: React.ReactNode }) {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		// Si ya terminó de cargar y no hay usuario (no autenticado)
		if (!isLoading) {
			const isAuthPage = pathname.includes('/auth');

			if (!user && !isAuthPage) {
				// Obtener el idioma actual de la URL
				const pathParts = pathname.split('/');
				const currentLang = pathParts[1]; // Asumimos que el primer segmento es el idioma

				router.push(`/${currentLang}/auth?redirectTo=${encodeURIComponent(pathname)}`);
			} else {
				setIsAuthorized(true);
			}
		}
	}, [user, isLoading, pathname, router]);

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader size="xl" />
			</div>
		);
	}

	// La página de auth siempre se muestra sin importar el estado de autenticación
	if (pathname.includes('/auth')) {
		return <>{children}</>;
	}

	// Para otras páginas, solo mostrar si está autorizado
	return isAuthorized ? <>{children}</> : null;
}
