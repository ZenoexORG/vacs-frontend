import API from "@hooks/config";

const PermissionAPI = {
	list: async (page: number, limit: number) => {
		const response = await API.get("/permissions", {
			params: {
				page,
				limit,
			},
		});

		return response.data;
	},

	edit: async (id: string, data: any) => {
		const response = await API.patch(`/permissions/${id}`, data);
		return response.data;
	},

	create: async (data: any) => {
		const response = await API.post("/permissions", data);
		return response.data;
	},

	delete: async (id: string) => {
		const response = await API.delete(`/permissions/${id}`);
		return response.data;
	},
}

export default PermissionAPI;
