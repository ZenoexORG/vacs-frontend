import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:9200';

const API = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default API;
