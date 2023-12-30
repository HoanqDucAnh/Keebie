import axios from "axios";

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

export const createProductAPI = async (
	product_name,
	brand,
	price,
	instock,
	content,
	category_id,
	headerImage
) => {
	console.log(headerImage);
	const token = localStorage.getItem("token");
	const headers = {
		"Content-Type": "multipart/form-data",
		Authorization: `Bearer ${token}`,
	};
	const formData = new FormData();

	formData.append("product_name", product_name);
	formData.append("brand", brand);
	formData.append("price", price);
	formData.append("stock", instock);
	formData.append("content", content);
	formData.append("category_id", category_id);
	formData.append("file", headerImage);

	try {
		const res = await api.post("/api/products", formData, { headers: headers });
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

export const getAllProductsByCategoryAPI = async (catID) => {
	try {
		const res = await api.get(`/api/products/category/${catID}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const editProductAPI = async (
	id,
	product_name,
	content,
	price,
	stock,
	category_id,
	brand
) => {
	const formdata = new FormData();
	formdata.append("id", id);
	formdata.append("product_name", product_name);
	formdata.append("content", content);
	formdata.append("price", price);
	formdata.append("stock", stock);
	formdata.append("category_id", category_id);
	formdata.append("brand", brand);
	const token = localStorage.getItem("token");
	const headers = { Authorization: `Bearer ${token}` };
	try {
		const res = await api.put(
			`/api/products/${id}`,
			{
				id: id,
				product_name: product_name,
				content: content,
				price: price,
				stock: stock,
				category_id: category_id,
				brand: brand,
			},
			{
				headers: headers,
			}
		);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getAllCategoriesAPI = async () => {
	const token = localStorage.getItem("token");
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
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
