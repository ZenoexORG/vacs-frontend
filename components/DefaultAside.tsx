'use client';

import { useState, useEffect } from "react";
import { Aside } from "@organisms/Aside";
import { footerPageMenu, headerPageMenu, PageMenu } from "../menu";
import { useTheme } from "@contexts/themeContext";
import { usePathname } from "next/navigation";
import { useT } from "../app/i18n/useT";
import { useTranslation } from "react-i18next";

type DefaultAsideProps = {
	isOpen?: boolean;
	onClose: () => void;
	className?: string;
};

// Define la estructura de cada item de menú
type MenuItem = {
	id: string;
	path: string;
	subMenu?: Record<string, MenuItem>;
	text?: string;
	// Otros campos que existan en tus items, como iconos, etc.
};

export const DefaultAside = ({
	isOpen = true,
	onClose,
	className = ''
}: DefaultAsideProps) => {
	const { isDark } = useTheme();
	const path = usePathname();
	const { i18n } = useTranslation();
	const { t } = useT("menu");
	const locale = i18n.language || 'en';
	const segments = path.split("/").filter(Boolean);
	const selected = segments[1] || "dashboard";
	const [selectedId, setSelectedId] = useState(selected);
	const [userPermissions, setUserPermissions] = useState<string[]>([]);

	const menuPermissionsMap = {
		dashboard: "dashboard:view",
		accessLog: "access-logs:view",
		reports: "daily-reports:view",
		security: "incidents:view",
		incident: "incidents:view",
		configuration: "users:view",
		employee: "employees:view",
		user: "users:view",
		vehicle: "vehicles:view",
		role: "roles:view",
		parameter: "permissions:view",
	};

	useEffect(() => {
		try {
			const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
			setUserPermissions(permissions);
		} catch (error) {
			console.error("Failed to parse permissions:", error);
			setUserPermissions([]);
		}
	}, []);

	const hasPermission = (menuId: string): boolean => {
		if (menuId === 'logout') return true;
		const permissionKey = menuPermissionsMap[menuId as keyof typeof menuPermissionsMap];
		return permissionKey ? userPermissions.includes(permissionKey) : false;
	};

	// Ahora el menu tiene tipo conocido, para que TS sepa que subItem es objeto
	const filterAndTranslateMenu = (menu: Record<string, MenuItem>) => {
		const newMenu: Record<string, MenuItem> = {};

		Object.entries(menu).forEach(([key, item]) => {
			if (!hasPermission(key)) return;

			const newItem: MenuItem = {
				...item,
				text: t(item.id),
				path: item.path.replace(":locale", locale),
			};

			if (item.subMenu) {
				const newSubMenu: Record<string, MenuItem> = {};
				Object.entries(item.subMenu).forEach(([subKey, subItem]) => {
					if (!hasPermission(subKey)) return;

					// Aquí nos aseguramos que subItem es objeto para usar spread
					if (typeof subItem === 'object' && subItem !== null) {
						newSubMenu[subKey] = {
							...subItem,
							text: t(subItem.id),
							path: subItem.path.replace(":locale", locale),
						};
					}
				});

				if (Object.keys(newSubMenu).length > 0) {
					newItem.subMenu = newSubMenu;
				} else if (!hasPermission(key)) {
					return;
				}
			}

			newMenu[key] = newItem;
		});

		return newMenu;
	};

	const menuData = {
		header: filterAndTranslateMenu(headerPageMenu),
		main: filterAndTranslateMenu(PageMenu),
		footer: filterAndTranslateMenu(footerPageMenu),
	};

	const handleSelect = (id: string) => {
		setSelectedId(id);
		if (window.innerWidth < 768) {
			onClose();
		}
	};

	return (
		<Aside
			menuData={menuData}
			isDark={isDark}
			selectedId={selectedId}
			onSelect={handleSelect}
			isOpen={isOpen}
			onClose={onClose}
			className={className}
		/>
	);
};

