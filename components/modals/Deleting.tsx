import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Text } from "@atoms/Text";

interface DeletingProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
	itemName: string;
}

export default function Deleting({ isOpen, onClose, onDelete, itemName }: DeletingProps) {
	const { isDark } = useTheme();

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 bg-black-950/50 z-50 flex items-center justify-center">
			<Card size="large" isDark={isDark}>
				<Title size="2xl" isDark={isDark}>
					Confirm Deletion
				</Title>

				<div>
					<Text isDark={isDark}>
						Are you sure you want to delete <strong>{itemName}</strong>? This action is irreversible.
					</Text>

					<Text isDark={isDark}>
						Please type <strong>{itemName}</strong> to confirm.
					</Text>
				</div>

				<div className="flex justify-between mt-6 gap-4 *:w-1/2">
					<Button label="Cancel" onClick={onClose} isCancel isDark={isDark} />
					<Button
						label="Delete"
						onClick={onDelete}
						isSubmit
						isDark={isDark}
					/>
				</div>
			</Card>
		</div>,
		document.body
	);
}
