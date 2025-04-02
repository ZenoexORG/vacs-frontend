'use client';

import { useState } from "react";
import { Aside } from "@organisms/Aside";
import { footerPageMenu, headerPageMenu, PageMenu } from "../menu";
import { useTheme } from "@contexts/themeContext";
import { usePathname } from "next/navigation";

export const DefaultAside = () => {
	const { isDark } = useTheme();
	const path = usePathname();

	const selected = path.split("/")[2]
		? path.split("/")[2]
		: path.split("/")[1] === ""
			? "dashboard"
			: path.split("/")[1];

	const [selectedId, setSelectedId] = useState(selected);

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

