'use client';

import { useTheme } from "@contexts/themeContext";
import { Header } from "@organisms/Header";

export const DefaultHeader = () => {
	const { isDark } = useTheme();

	return (
		<Header isDark={isDark} number={20} />
	);
};

