import axios from "axios";
import useCurrUserStore from "../stores/CurrUserStore";

const api = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

const headers = {
	"Content-Type": "application/x-www-form-urlencoded",
};

export const getAllUsersAPI = async () => {
	const token = localStorage.getItem("token");
	const headers = { Authorization: `Bearer ${token}` };
	try {
		console.log(headers);
		const res = await api.get("/api/users", { headers });
		return res;
	} catch (error) {
		return error.response;
	}
};

export const updateUserAPI = async (
	user_id,
	username,
	password,
	fullname,
	phone
) => {
	try {
		const res = await api.put(`/api/users/${user_id}`, {
			username: username,
			password: password,
			fullname: fullname,
			phone_number: phone,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getAllProductsAPI = async () => {
	const token = localStorage.getItem("token");
	const headers = { Authorization: `Bearer ${token}` };
	try {
		console.log(headers);
		const res = await api.get("/api/products", { headers });
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getProductByIdAPI = async (id) => {
	try {
		const res = await api.get(`/api/products/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const createProductAPI = async (
	product_name,
	brand,
	price,
	instock,
	content,
	category_id
) => {
	const token = localStorage.getItem("token");
	const headers = { Authorization: `Bearer ${token}` };
	try {
		const res = await api.post(
			"/api/products",
			{
				product_name: product_name,
				brand: brand,
				content: content,
				price: price,
				stock: instock,
				category_id: category_id,
			},
			{ headers: headers }
		);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const deleteProductAPI = async (id) => {
	try {
		const res = await api.delete(`/api/products/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const updateProductAPI = async ({
	product_name,
	content,
	category_id,
	price,
	instock,
}) => {
	try {
		const res = await api.put("/api/products", {
			product_name: product_name,
			content: content,
			price: price,
			stock: instock,
			category_id: category_id,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getAllProductsByCategoryAPI = async (catID) => {
	try {
		const res = await api.get(`/api/products/category/${catID}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getAllCategoriesAPI = async () => {
	const token = localStorage.getItem("token");
	const headers = { Authorization: `Bearer ${token}` };
	try {
		const res = await api.get("/api/categories", { headers: headers });
		return res;
	} catch (error) {
		return error.response;
	}
};

export const createCategoryAPI = async (cat_name, cat_detail) => {
	const token = localStorage.getItem("token");
	const headers = { Authorization: `Bearer ${token}` };
	try {
		if (cat_name.length == 0 || cat_detail.length == 0)
			return new Error("Empty field");
		const res = await api.post(
			`/api/categories`,
			{
				cat_name: cat_name,
				cat_detail: cat_detail,
			},
			{ headers: headers }
		);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getCategoryByIdAPI = async (id) => {
	try {
		const res = await api.get(`/api/categories/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const deleteCategoryAPI = async (id) => {
	try {
		const res = await api.delete(`/api/categories/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const createProdImageAPI = async (imageList, prodID) => {
	const formData = new FormData();
	const token = localStorage.getItem("token");
	imageList.forEach((image) => {
		formData.append("files", image.imgFile);
	});
	formData.append("product_id", prodID);
	const headers = {
		"Content-Type": "multipart/form-data",
		Authorization: `Bearer ${token}`,
	};
	try {
		console.log(headers);
		const res = await api.post(`/api/product_images/`, formData, {
			headers: headers,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getProdImgByIdAPI = async (id) => {
	try {
		const res = await api.get(`/api/product_images/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const deleteProdImgAPI = async (id) => {
	try {
		const res = await api.delete(`/api/product_images/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getProdImgByProdIdAPI = async (product_id) => {
	try {
		const res = await api.get(
			`/api/product_images/by_product_id/${product_id}`
		);
		return res;
	} catch (error) {
		return error.response;
	}
};
