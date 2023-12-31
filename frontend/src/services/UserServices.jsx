import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
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

export const verifyCodeAPI = async (email, code) => {
	try {
		const res = await api.post(`/api/verify/verify/${code}`, {
			email: email,
			verify_code: code,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const sendVerifyCodeAPI = async (email) => {
	try {
		const res = await api.post(`/api/verify`, {
			email: email,
		});
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
	address,
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
			address: address,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const changePasswordAPI = async (userId, oldPassword, newPassword) => {
	const token = localStorage.getItem("token");
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	const form = new FormData();
	form.append("old_password", oldPassword);
	form.append("new_password", newPassword);

	try {
		const res = await api.put(`/api/users/update_password/${userId}`, form, {
			headers: headers,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const createOrderAPI = async (
	address,
	phone_number,
	email,
	fullname,
	note,
	user_id,
	status_id,
	total_price,
	payment_image,
	payment_method,
	shipping_method
) => {
	try {
		const form = new FormData();
		form.append("address", address);
		form.append("phone_number", phone_number);
		form.append("email", email);
		form.append("full_name", fullname);
		form.append("note", note);
		form.append("user_id", user_id);
		form.append("status_id", status_id);
		form.append("total_price", total_price);
		form.append("payment_image", payment_image);
		form.append("payment_method", payment_method);
		form.append("shipment_method", shipping_method);

		const res = await api.post(`/api/orders`, form);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const createOrderDetailAPI = async (order_id, product_id, quantity) => {
	try {
		const res = await api.post(`/api/order_details`, {
			order_id: order_id,
			product_id: product_id,
			amount: quantity,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getOrdersByCustomerAPI = async (user_id) => {
	try {
		const res = await api.get(
			`/api/orders/by_customer/${user_id}`
		);
		return res;
	} catch (error) {
		return error.response;
	}
};
