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
	content,
	category_id,
	price,
	instock
) => {
	try {
		const res = await api.post("/api/products", {
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
	try {
		const res = await api.get("/api/categories");
		return res;
	} catch (error) {
		return error.response;
	}
};

export const createCategoryAPI = async (cat_name, cat_detail) => {
	try {
		const res = await api.post(`/api/categories`, {
			cat_name: cat_name,
			cat_detail: cat_detail,
		});
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

export const createProdImageAPI = async (prod_id, image) => {
	console.log(prod_id, image);
	try {
		const res = await api.post(`/api/product_images/`, {
			image: image,
			product_id: prod_id,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};
