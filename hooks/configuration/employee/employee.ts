import API from "@hooks/config";

const EmployeeAPI = {
	list: async (page: number, limit: number) => {
		const response = await API.get("/employees", {
			params: {
				page,
				limit,
			},
		});

		return response.data;
	},

	edit: async (id: string, data: any) => {
		const response = await API.patch(`/employees/${id}`, data);
		return response.data;
	},

	create: async (data: any) => {
		const response = await API.post("/employees", data);
		return response.data;
	},

	delete: async (id: string) => {
		const response = await API.delete(`/employees/${id}`);
		return response.data;
	},
}

export default EmployeeAPI;
