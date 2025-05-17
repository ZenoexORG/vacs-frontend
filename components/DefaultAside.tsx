'use client';

import { useState, useEffect } from "react";
import { Aside } from "@organisms/Aside";
import { footerPageMenu, headerPageMenu, PageMenu } from "../menu";
import { useTheme } from "@contexts/themeContext";
import { usePathname } from "next/navigation";
import { useT } from "../app/i18n/useT";
import { useTranslation } from "react-i18next";

// Permission mapping for menu items
const menuPermissionsMap = {
	// Header menu
	dashboard: "dashboard:view",
	accessLog: "access-logs:view",
	reports: "daily-reports:view",

	// Main menu (PageMenu)
	security: "incidents:view", // If user can view incidents, show the security section
	incident: "incidents:view",

	// Configuration submenu items
	configuration: "users:view", // If user can view at least one config item, show the section
	employee: "employees:view",
	user: "users:view",
	vehicle: "vehicles:view",
	role: "roles:view",
	parameter: "permissions:view",
};

export const DefaultAside = () => {
	const { isDark } = useTheme();
	const path = usePathname();
	const { i18n } = useTranslation();
	const { t } = useT("menu");
	const locale = i18n.language || 'en';
	const segments = path.split("/").filter(Boolean);
	const selected = segments[1] || "dashboard";
	const [selectedId, setSelectedId] = useState(selected);
	const [userPermissions, setUserPermissions] = useState([]);

	// Load user permissions from localStorage
	useEffect(() => {
		try {
			const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
			setUserPermissions(permissions);
		} catch (error) {
			console.error("Failed to parse permissions:", error);
			setUserPermissions([]);
		}
	}, []);

	// Function to check if user has permission for a menu item
	const hasPermission = (menuId) => {
		// Special case: logout is always available
		if (menuId === 'logout') return true;

		// If no permissions mapping exists for this menu item, hide it
		if (!menuPermissionsMap[menuId]) return false;

		// Check if user has the required permission
		return userPermissions.includes(menuPermissionsMap[menuId]);
	};

	// Filter and translate menu items based on permissions
	const filterAndTranslateMenu = (menu) => {
		const newMenu = {};

		Object.entries(menu).forEach(([key, item]) => {
			// Skip if user doesn't have permission
			if (!hasPermission(key)) return;

			const newItem = {
				...item,
				text: t(item.id),
				path: item.path.replace(":locale", locale),
			};

			if (item.subMenu) {
				const newSubMenu = {};
				Object.entries(item.subMenu).forEach(([subKey, subItem]) => {
					// Skip submenu items user doesn't have permission for
					if (!hasPermission(subKey)) return;

					newSubMenu[subKey] = {
						...subItem,
						text: t(subItem.id),
						path: subItem.path.replace(":locale", locale),
					};
				});

				// Only add subMenu if it has at least one permitted item
				if (Object.keys(newSubMenu).length > 0) {
					newItem.subMenu = newSubMenu;
				} else if (!hasPermission(key)) {
					// If no submenu items are permitted and the parent item depends on submenu items,
					// skip the parent item too
					return;
				}
			}

			newMenu[key] = newItem;
		});

		return newMenu;
	};

	// Process menus with permission filtering
	const menuData = {
		header: filterAndTranslateMenu(headerPageMenu),
		main: filterAndTranslateMenu(PageMenu),
		footer: filterAndTranslateMenu(footerPageMenu), // Logout should always be visible
	};

	const handleSelect = (id) => setSelectedId(id);

	return (
		<Aside
			menuData={menuData}
			isDark={isDark}
			selectedId={selectedId}
			onSelect={handleSelect}
		/>
	);
};
