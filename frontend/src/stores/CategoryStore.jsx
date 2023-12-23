import { create } from "zustand";
import { getAllCategoriesAPI } from "../services/AdminServices";

const useCategoryStore = create((set) => ({
	categories: [],
	updateCategories: (data) => set(() => ({ categories: data })),
	removeAllCategories: () => set(() => ({ categories: [] })),

	//fetch categories
	fetchAllCategories: async () => {
		const response = await getAllCategoriesAPI();
		if (response.status === 200) {
			set(() => ({ categories: response.data }));
		}
	},
}));

export default useCategoryStore;
