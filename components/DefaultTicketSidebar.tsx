import { useTheme } from "@contexts/themeContext";
import { TicketSidebar } from "@molecules/TicketSidebar";

const statusList = [
	"open",
	"closed"
];

const priorityList = [
	"low",
	"medium",
	"high"
];

export const DefaultTicketSidebar = ({
	open,
	closed,
	status,
	setStatus,
	priority,
	setPriority,
	loading
}: {
	open: number;
	closed: number;
	status: string;
	setStatus: (status: string) => void;
	priority: string;
	setPriority: (priority: string) => void;
	loading: boolean;
}) => {
	const { isDark } = useTheme();

	return (
		<TicketSidebar
			isDark={isDark}
			open={open}
			closed={closed}
			status={status}
			setStatus={setStatus}
			priority={priority}
			setPriority={setPriority}
			statusList={statusList}
			priorityList={priorityList}
			loading={loading}
		/>
	);
};
