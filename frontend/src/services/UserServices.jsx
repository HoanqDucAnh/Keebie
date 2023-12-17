import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

const headers = {
	"Content-Type": "application/x-www-form-urlencoded",
};

export const loginAPI = async (username, password) => {
	try {
		const res = await api.post(
			`/api/auth/login`,
			{ username, password },
			{ headers }
		);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const signupAPI = async (
	password,
	username,
	email,
	profile_pic,
	activated,
	phone_number,
	fullname
) => {
	try {
		const res = await api.post(`/api/users`, {
			password: password,
			username: username,
			email: email,
			profile_pic: profile_pic,
			activated: activated,
			phone_number: phone_number,
			fullname: fullname,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};
