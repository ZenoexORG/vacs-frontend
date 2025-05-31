import API from './config';

const numericFields: Record<string, string[]> = {
	'/employees': ['role_id'],
	'/users': ['role_id'],
	'/vehicles': ['type_id'],
};

const createAPI = (path: string) => {
	const fieldsToConvertToNumbers = numericFields[path] || [];

	const processData = (data: any): any => {
		if (!data || typeof data !== 'object') return data;

		const processedData = { ...data };

		fieldsToConvertToNumbers.forEach(field => {
			if (processedData[field] !== undefined && processedData[field] !== null) {
				processedData[field] = Number(processedData[field]);
			}
		});

		return processedData;
	};

	return {
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
			const processedData = processData(data);

			const response = await API.patch(`${path}/${id}`, processedData);
			return response.data;
		},

		create: async (data: any) => {
			const processedData = processData(data);

			const response = await API.post(`${path}`, processedData);
			return response.data;
		},

		delete: async (id: string) => {
			const response = await API.delete(`${path}/${id}`);
			return response.data;
		},
	};
};

export default createAPI;
