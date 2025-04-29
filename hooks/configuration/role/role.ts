import API from "@hooks/config";
import createAPI from "../../createAPI";

const path = '/roles';

const RoleAPI = {
	...createAPI(path),

	managePermissions: async (id: string, data: any) => {
		const response = await API.patch(`${path}/${id}/permissions`, data);
		return response.data;
	},
}

export default RoleAPI;
