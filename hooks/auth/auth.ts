import API from "@hooks/config";

const AuthAPI = {
	login: async (data: { username: string, password: string }) => {
		const response = await API.post("/auth/login", data);
		return response.data;
	}
}

export default AuthAPI;
