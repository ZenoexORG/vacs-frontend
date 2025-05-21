'use client';

import { useTheme } from "@contexts/themeContext";
import { Header } from "@organisms/Header";
import { useAuth } from "@hooks/auth/useAuth";
import { getCookie } from "cookies-next";

export const DefaultHeader = ({ onMenuClick }) => {
	const { isDark } = useTheme();
	const { user, isLoading } = useAuth();

	// Si está cargando, puedes mostrar un placeholder o un skeleton
	if (isLoading) {
		return <div className="h-16 w-full bg-gray-200 animate-pulse"></div>;
	}

	const token = getCookie('token');
	console.log('Token:', token);

	return (
		<Header
			isDark={isDark}
			number={20}
			fullname={user?.fullname || 'Guest'}
			role={user?.role || 'User'}
			onMenuClick={onMenuClick}
		/>
	);
};
