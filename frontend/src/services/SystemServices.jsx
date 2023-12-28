import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

const headers = {
	"Content-Type": "application/x-www-form-urlencoded",
};

export const getAllProductsAPI = async () => {
	try {
		const res = await api.get("/api/products");
		return res;
	} catch (error) {
		return error.response;
	}
};
