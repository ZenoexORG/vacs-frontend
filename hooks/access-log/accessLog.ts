import API from "@hooks/config";
import createAPI from "@hooks/createAPI";

const path = '/access-logs';

const AccessLogAPI = {
	...createAPI(path),
}

export default AccessLogAPI;
