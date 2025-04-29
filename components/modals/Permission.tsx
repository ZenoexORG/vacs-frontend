"use client";

import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useT } from "../../app/i18n/useT";

interface PermissionProps {
	isOpen: boolean;
	onClose: () => void;
	permissions: string[];
	togglePermission: (perm: string) => void;
	allPermissions: { id: number; name: string }[];
}

function toTitleCase(str: string): string {
	return str
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function groupPermissions(allPermissions: { id: number; name: string }[]) {
	const grouped: Record<string, string[]> = {};

	allPermissions.forEach((perm) => {
		const [moduleName, action] = perm.name.split(":");

		if (!grouped[moduleName]) {
			grouped[moduleName] = [];
		}

		grouped[moduleName].push(action);
	});

	return grouped;
}

export default function Permission({
	isOpen,
	onClose,
	permissions,
	togglePermission,
	allPermissions,
}: PermissionProps) {
	const { isDark } = useTheme();
	const { t } = useT('role');

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [onClose]);

	const groupedModules = useMemo(() => groupPermissions(allPermissions), [allPermissions]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 bg-black-950/50 z-50 flex items-center justify-center">
			<Card size="large" isDark={isDark} className="w-2/3">
				<Title isDark={isDark} size="3xl">
					{t('permissions_manager')}
				</Title>

				<div className="grid grid-cols-3 gap-10">
					{Object.entries(groupedModules).map(([moduleName, actions]) => (
						<div key={moduleName} className="flex flex-col gap-5">
							<Title isDark={isDark} size="small">
								{toTitleCase(t(`modules.${moduleName}`))}
							</Title>

							<div className="grid grid-cols-2 gap-5">
								{actions.map((action) => {
									const value = `${moduleName}:${action}`;
									return (
										<label key={value} className="flex items-center gap-2 cursor-pointer">
											<Input
												type="checkbox"
												checked={permissions.includes(value)}
												onChange={() => togglePermission(value)}
											/>
											<span className="capitalize">{t(`permission.${action}`)}</span>
										</label>
									);
								})}
							</div>
						</div>
					))}
				</div>

				<div className="flex items-center justify-between *:w-1/3 gap-14 mt-10">
					<Button isCancel label={t('cancel')} isDark={isDark} onClick={onClose} />
					<Button isSubmit label={t('submit')} type="submit" onClick={onClose} />
				</div>
			</Card>
		</div>,
		document.body
	);
}
