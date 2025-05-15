import API from './config';

const createAPI = (path: string) => ({
	list: async (page: number, limit: number) => {
		const response = await API.get(path, {
			params: {
				page,
				limit,
			},
		});

		return response.data;
	},

	get: async (id: string) => {
		const response = await API.get(`${path}/${id}`);
		return response.data;
	},

	edit: async (id: string, data: any) => {
		const response = await API.patch(`${path}/${id}`, data);
		return response.data;
	},

	create: async (data: any) => {
		const response = await API.post(`${path}`, data);
		return response.data;
	},

	delete: async (id: string) => {
		const response = await API.delete(`${path}/${id}`);
		return response.data;
	},
});

export default createAPI;
