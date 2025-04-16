import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useT } from "../../app/i18n/useT";

interface PermissionProps {
	isOpen: boolean;
	onClose: () => void;
	permissions: string[];
	togglePermission: (perm: string) => void;
}

const modules = [
	{ name: "dashboard", perms: ["view"] },
	{ name: "employees", perms: ["view", "edit", "create", "delete"] },
	{ name: "users", perms: ["view", "edit", "create", "delete"] },
	{ name: "access-log", perms: ["view"] },
	{ name: "vehicles", perms: ["view", "edit", "create", "delete"] },
	{ name: "roles", perms: ["view", "edit", "create", "delete"] },
	{ name: "incidents", perms: ["view", "edit"] },
];

function toTitleCase(str: string): string {
	return str
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Permission({
	isOpen,
	onClose,
	permissions,
	togglePermission,
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

	const compactModules = ["dashboard", "access-log", "incidents"];
	const groupedModules = modules.filter((m) => compactModules.includes(m.name));
	const regularModules = modules.filter((m) => !compactModules.includes(m.name));

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 bg-black-950/50 z-50 flex items-center justify-center">
			<Card size="large" isDark={isDark} className="w-2/3">
				<Title isDark={isDark} size="3xl">
					{t('permissions_manager')}
				</Title>

				<div className="grid grid-cols-3 gap-10">
					<div className="flex flex-col justify-between">
						{groupedModules.map((module) => (
							<div key={module.name} className="flex flex-col gap-5">
								<Title isDark={isDark} size="small">
									{toTitleCase(t(`modules.${module.name}`))}
								</Title>

								<div className="grid grid-cols-2 gap-5">
									{module.perms.map((perm) => {
										const value = `${module.name}:${perm}`;

										return (
											<label key={value} className="flex items-center gap-2 cursor-pointer">
												<Input
													type="checkbox"
													checked={permissions.includes(value)}
													onChange={() => togglePermission(value)}
												/>
												<span className="capitalize">{t(`permission.${perm}`)}</span>
											</label>
										);
									})}
								</div>
							</div>
						))}
					</div>

					<div className="grid grid-cols-2 gap-10 col-span-2">
						{regularModules.map((module) => (
							<div key={module.name} className="flex flex-col gap-5">
								<Title isDark={isDark} size="small">
									{toTitleCase(t(`modules.${module.name}`))}
								</Title>

								<div className="grid grid-cols-2 gap-5">
									{module.perms.map((perm) => {
										const value = `${module.name.toLowerCase()}:${perm}`;
										return (
											<label key={value} className="flex items-center gap-2 cursor-pointer">
												<Input
													type="checkbox"
													checked={permissions.includes(value)}
													onChange={() => togglePermission(value)}
												/>
												<span className="capitalize">{t(`permission.${perm}`)}</span>
											</label>
										);
									})}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="flex items-center justify-between *:w-1/3 gap-14">
					<Button isCancel label={t('cancel')} isDark={isDark} onClick={onClose} />
					<Button isSubmit label={t('submit')} type="submit" onClick={onClose} />
				</div>
			</Card>
		</div>,
		document.body
	);
}
