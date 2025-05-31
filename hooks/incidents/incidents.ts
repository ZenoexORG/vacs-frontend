import API from "@hooks/config";
import createAPI from "@hooks/createAPI";

const path = '/incidents';

const IncidentsAPI = {
	advancedList: async (page: number, limit: number, status: string, priority: string) => {
		const response = await API.get(path, {
			params: {
				page,
				limit,
				status,
				priority,
			},
		});

		return response.data;
	},

	addMessage: async (incidentId: number, message: string) => {
		const response = await API.post(`/incident-messages`, {
			incident_id: incidentId,
			message,
		});

		return response.data;
	},

	...createAPI(path),
}

export default IncidentsAPI;
