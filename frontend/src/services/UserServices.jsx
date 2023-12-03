import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

export const loginAPI = async (username, password) => {
	try {
		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
		};

		const res = await api.post(`/api/auth/login`, { username, password }, { headers });
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
