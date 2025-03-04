import api from "./api";

const headers = {
	"Content-Type": "application/x-www-form-urlencoded",
};

export const getAllProductsAPI = async () => {
	try {
		const res = await api.get("/products");
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getAllCategoriesAPI = async () => {
	try {
		const res = await api.get("/categories");
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getProductByIdAPI = async (id) => {
	try {
		const res = await api.get(`/products/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getProductImgByIdAPI = async (id) => {
	try {
		const res = await api.get(`/product_images/by_product_id/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getCategoryByIdAPI = async (id) => {
	try {
		const res = await api.get(`/categories/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getHeaderImgByProdIdAPI = async (id) => {
	try {
		const res = await api.get(`/products/by_header_image/?id=${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};
