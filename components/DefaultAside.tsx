'use client';

import { useState } from "react";
import { Aside } from "@organisms/Aside";
import { footerPageMenu, headerPageMenu, PageMenu } from "../menu";
import { useTheme } from "@contexts/themeContext";
import { usePathname } from "next/navigation";
import { useT } from "../app/i18n/useT";
import { useTranslation } from "react-i18next";

export const DefaultAside = () => {
	const { isDark } = useTheme();
	const path = usePathname();
	const { i18n } = useTranslation();
	const { t } = useT("menu");

	const locale = i18n.language || 'en'; // Idioma actual

	// Segmentar la ruta para detectar correctamente el ítem seleccionado
	const segments = path.split("/").filter(Boolean); // elimina strings vacíos
	const selected = segments[1] || "dashboard"; // [0] = locale, [1] = main route

	const [selectedId, setSelectedId] = useState(selected);

	// Función para traducir y reemplazar :locale en el menú
	const replaceLocaleInMenu = (menu: Record<string, any>) => {
		const newMenu: Record<string, any> = {};

		Object.entries(menu).forEach(([key, item]) => {
			const newItem = {
				...item,
				text: t(item.id),
				path: item.path.replace(":locale", locale),
			};

			if (item.subMenu) {
				const newSubMenu: Record<string, any> = {};
				Object.entries(item.subMenu).forEach(([subKey, subItem]) => {
					newSubMenu[subKey] = {
						...subItem,
						text: t(subItem.id),
						path: subItem.path.replace(":locale", locale),
					};
				});
				newItem.subMenu = newSubMenu;
			}

			newMenu[key] = newItem;
		});

		return newMenu;
	};

	// Procesamos los menús
	const menuData = {
		header: replaceLocaleInMenu(headerPageMenu),
		main: replaceLocaleInMenu(PageMenu),
		footer: replaceLocaleInMenu(footerPageMenu),
	};

	const handleSelect = (id: string) => setSelectedId(id);

	return (
		<Aside
			menuData={menuData}
			isDark={isDark}
			selectedId={selectedId}
			onSelect={handleSelect}
		/>
	);
};
