import API from "@hooks/config";

const RoleAPI = {
	list: async (page: number, limit: number) => {
		const response = await API.get("/roles", {
			params: {
				page,
				limit,
			},
		});

		return response.data;
	},

	edit: async (id: string, data: any) => {
		const response = await API.patch(`/roles/${id}`, data);
		return response.data;
	},

	create: async (data: any) => {
		const response = await API.post("/roles", data);
		return response.data;
	},

	delete: async (id: string) => {
		const response = await API.delete(`/roles/${id}`);
		return response.data;
	},

	managePermissions: async (id: string, data: any) => {
		const response = await API.patch(`/roles/${id}/permissions`, data);
		return response.data;
	},
}

export default RoleAPI;
