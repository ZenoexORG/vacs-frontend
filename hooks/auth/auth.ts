import API from "@hooks/config";

const AuthAPI = {
	login: async (data: { username: string, password: string }) => {
		try {
			const response = await API.post("/auth/login", data);

			localStorage.setItem("fullname", response.data.sessionInfo.fullname);
			localStorage.setItem("role", response.data.sessionInfo.role);
			localStorage.setItem("permissions", JSON.stringify(response.data.sessionInfo.viewPermissions));

			return response.data;
		} catch (error) {
			console.error("Error during login:", error);
			throw error;
		}
	},

	logout: async () => {
		try {
			// Hacer la petición para invalidar la sesión en el servidor
			await API.post("/auth/logout");

			// Limpiar datos locales
			localStorage.removeItem("fullname");
			localStorage.removeItem("role");
			localStorage.removeItem("permissions");

			return true;
		} catch (error) {
			console.error("Error during logout:", error);
			// Aún así limpiar los datos locales en caso de error
			localStorage.removeItem("fullname");
			localStorage.removeItem("role");
			localStorage.removeItem("permissions");
			throw error;
		}
	}
}

export default AuthAPI;
