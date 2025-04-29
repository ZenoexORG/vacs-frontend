import createAPI from "../../createAPI";

const path = '/employees';

const EmployeeAPI = {
	...createAPI(path),
}

export default EmployeeAPI;
