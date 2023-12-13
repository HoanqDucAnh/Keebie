import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

const headers = {
	"Content-Type": "application/x-www-form-urlencoded",
};

export const createProductAPI = async (
	product_name,
	product_image,
	category_id,
	content
) => {
	try {
		const res = await api.post(
			`/api/products`,
			{ product_name, product_image, content, category_id },
			{ headers }
		);
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

export const deleteProductAPI = async (id) => {
	try {
		const res = await api.delete(`/api/products/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const updateProductAPI = async (id) => {
	try {
		const res = await api.put(`/api/products/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getProductByCategoryAPI = async (category_id) => {
	try {
		const res = await api.get(`/api/products/by_category/${category_id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getProductByNameAPI = async (product_name) => {
	try {
		const res = await api.get(`/api/products/by_name/${product_name}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const createCategoryAPI = async (category_name, category_detaik) => {
	try {
		const res = await api.post(
			`/api/categories`,
			{ category_name, category_detaik },
			{ headers }
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

export const createProductDetailAPI = async (
	pdetail_name,
	pdetail_image,
	pdetail_price,
	pdetail_instock,
	product_id,
	is_public
) => {
	try {
		const res = await api.post(
			`/api/product_details`,
			{
				pdetail_name,
				pdetail_image,
				pdetail_price,
				pdetail_instock,
				product_id,
				is_public,
			},
			{ headers }
		);
		return res;
	} catch (error) {
		return error.response;
	}
};
