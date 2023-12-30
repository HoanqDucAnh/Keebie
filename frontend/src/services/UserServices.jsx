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
