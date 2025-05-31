"use client";

import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";
import { useEffect, useMemo, useRef } from "react";
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
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		// Using inline styles for body as Tailwind doesn't control this
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("keydown", handleKey);
			document.body.style.overflow = 'auto';
		};
	}, [isOpen, onClose]);

	// Click outside to close
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			onClose();
		}
	};

	const groupedModules = useMemo(() => groupPermissions(allPermissions), [allPermissions]);

	if (!isOpen) return null;

	return createPortal(
		<div
			className="fixed inset-0 bg-black-950/50 z-50 flex items-center justify-center p-4 sm:p-6"
			onClick={handleBackdropClick}
		>
			<Card
				ref={modalRef}
				size="large"
				isDark={isDark}
				className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[70%] max-h-[90vh] flex flex-col"
				onClick={(e) => e.stopPropagation()}
			>
				<Title
					isDark={isDark}
					size="3xl"
					className="text-xl sm:text-2xl md:text-3xl mb-4"
				>
					{t('permissions_manager')}
				</Title>

				{/* Scrollable container with Tailwind-only scrollbar styling */}
				<div className="overflow-y-auto flex-grow pr-2
                    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
                    dark:scrollbar-thumb-gray-600">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-1">
						{Object.entries(groupedModules).map(([moduleName, actions]) => (
							<div key={moduleName} className="flex flex-col gap-3 sm:gap-4">
								<Title
									isDark={isDark}
									size="small"
									className="text-base sm:text-lg whitespace-nowrap overflow-hidden text-ellipsis"
								>
									{toTitleCase(t(`modules.${moduleName}`))}
								</Title>

								<div className="grid grid-cols-1 gap-2 sm:gap-3">
									{actions.map((action) => {
										const value = `${moduleName}:${action}`;
										return (
											<label
												key={value}
												className="flex items-center gap-2 cursor-pointer text-sm sm:text-base"
											>
												<Input
													type="checkbox"
													checked={permissions.includes(value)}
													onChange={() => togglePermission(value)}
													className="flex-shrink-0 h-4 w-4"
												/>
												<span className="capitalize truncate">
													{t(`permission.${action}`)}
												</span>
											</label>
										);
									})}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
					<Button
						isCancel
						label={t('cancel')}
						isDark={isDark}
						onClick={onClose}
						className="w-full sm:w-auto"
					/>
					<Button
						isSubmit
						label={t('submit')}
						type="submit"
						onClick={onClose}
						className="w-full sm:w-auto"
					/>
				</div>
			</Card>
		</div>,
		document.body
	);
}
