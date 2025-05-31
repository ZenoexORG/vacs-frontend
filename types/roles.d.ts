interface Permission {
	category: string;
	actions: string[];
}

export interface Role {
	id: string;
	name: string;
	color: string;
	type: string;
	permissions: Permission[];
}
