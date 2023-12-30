import { create } from "zustand";

const useProdOnDisplayStore = create((set) => ({
	products: [],
	displayProducts: [],

	//general functions
	updateAllDisplayProducts: (data) =>
		set(() => ({ products: data, displayProducts: data })),
	removeAllDisplayProducts: () => set(() => ({ displayProducts: [] })),

	//filter functions
	filterDisplayProductsOnCategoryID: (categoryID) =>
		set((state) => ({
			displayProducts: state.products.filter(
				(product) => product.category_id === categoryID
			),
		})),
	filterDisplayProductsOnSearch: (searchString) =>
		set((state) => ({
			displayProducts: state.products.filter((product) =>
				product.product_name.includes(searchString)
			),
		})),
	filterDisplayProductsOnPrice: (priceRange) =>
		set((state) => ({
			displayProducts: state.products.filter((product) => {
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
	filterDisplayProductsOnStatus: (status) =>
		set((state) => ({
			displayProducts: state.products.filter((product) => {
				switch (status) {
					case 1:
						return product.stock > 0;
					case 2:
						return product.stock === 0;
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
			products: state.products.map((product) => ({
				...product,
				category_id: categories[product.category_id],
			})),
		})),

	//filter image base on page number 8 products per page
	filterDisplayProductsOnPageNumber: (pageNumber) =>
		set((state) => ({
			displayProducts: state.products.slice(
				(pageNumber - 1) * 8,
				pageNumber * 8
			),
		})),
}));

export default useProdOnDisplayStore;
