import createAPI from "../../createAPI";

const path = '/users';

const UserAPI = {
	...createAPI(path),
}

export default UserAPI;
