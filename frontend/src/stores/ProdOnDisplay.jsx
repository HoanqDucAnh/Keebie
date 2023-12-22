import { create } from "zustand";

const useProdOnDisplayStore = create((set) => ({
	displayProducts: [],

	//general functions
	updateAllDisplayProducts: (data) => set(() => ({ displayProducts: data })),
	removeAllDisplayProducts: () => set(() => ({ displayProducts: [] })),

	//filter functions
	filterDisplayProductsOnCategoryID: (categoryID) =>
		set((state) => ({
			displayProducts: state.displayProducts.filter(
				(product) => product.category_id === categoryID
			),
		})),
	filterDisplayProductsOnSearch: (searchString) =>
		set((state) => ({
			displayProducts: state.displayProducts.filter((product) =>
				product.product_name.includes(searchString)
			),
		})),
	filterDisplayProductsOnPrice: (priceRange) =>
		set((state) => ({
			displayProducts: state.displayProducts.filter((product) => {
				switch (priceRange) {
					case 1:
						return product.price < 1000000;
					case 2:
						return product.price >= 1000000 && product.price < 2000000;
					case 3:
						return product.price >= 2000000 && product.price < 3000000;
					case 4:
						return product.price >= 3000000 && product.price < 4000000;
					case 5:
						return product.price >= 4000000 && product.price < 5000000;
					case 6:
						return product.price >= 5000000;
					default:
						return true;
				}
			}),
		})),

	//transform functions
	transformDisplayProductsCategoryIDToCategoryName: (categories) =>
		set((state) => ({
			displayProducts: state.displayProducts.map((product) => ({
				...product,
				category_id: categories[product.category_id],
			})),
		})),
}));

export default useProdOnDisplayStore;
