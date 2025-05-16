import API from "@hooks/config";

const path = '/reports';

const ReportAPI = {
	rangePDF: async (startDate: string, endDate: string) => {
		const response = await API.get(`${path}/range/pdf`, {
			params: {
				startDate,
				endDate
			},
			responseType: 'arraybuffer',
		});

		return response.data;
	},

	datePDF: async (date: string) => {
		const response = await API.get(`${path}/${date}/pdf`, {
			params: {
				date
			},
			responseType: 'arraybuffer',
		});

		return response.data;
	},

	generate: async (date: string) => {
		const response = await API.get(`${path}/${date}/generate`, {
			params: {
				date
			},
		});

		return response.data;
	}
}

export default ReportAPI;
