import API from "@hooks/config";

const path = '/dashboard';

const DashboardAPI = {
	stats: async (month: number, year: number) => {
		const response = await API.get(`${path}/stats`, {
			params: {
				month,
				year,
			},
		});

		return response;
	},

	vehicleEntries: async (month: number, year: number) => {
		const response = await API.get(`${path}/vehicle-entries`, {
			params: {
				month,
				year,
			},
		});

		return response;
	}
}

export default DashboardAPI;
