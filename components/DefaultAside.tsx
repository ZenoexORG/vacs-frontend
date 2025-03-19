'use client';

import { useState } from "react";
import { Aside } from "@organisms/Aside";
import { footerPageMenu, headerPageMenu, PageMenu } from "../menu";
import { useTheme } from "@contexts/themeContext";

export const DefaultAside = () => {
	const { isDark } = useTheme();
	const [selectedId, setSelectedId] = useState("dashboard"); // Por defecto "dashboard"

	const menuData = {
		header: headerPageMenu,
		main: PageMenu,
		footer: footerPageMenu
	};

	const handleSelect = (id: string) => setSelectedId(id); // Función para cambiar selección

	return (
		<Aside menuData={menuData} isDark={isDark} selectedId={selectedId} onSelect={handleSelect} />
	);
};

