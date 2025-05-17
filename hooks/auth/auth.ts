import API from "@hooks/config";

const AuthAPI = {
	login: async (data: { username: string, password: string }) => {
		const response = await API.post("/auth/login", data);

		localStorage.setItem("fullname", response.data.sessionInfo.fullname);
		localStorage.setItem("role", response.data.sessionInfo.role);

		localStorage.setItem("permissions", JSON.stringify(response.data.sessionInfo.viewPermissions));

		return response.data;
	}
}

export default AuthAPI;
