interface Permission {
	category: string;
	actions: string[];
}

export interface Role {
	_id: string;
	name: string;
	color: string;
	type: string;
	permissions: Permission[];
}
