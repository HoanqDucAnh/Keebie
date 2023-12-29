import { create } from "zustand";

const useCartStore = create((set) => ({
	cart: [],
	totalPrice: 0,

	//general functions
	updateCart: (data) => set(() => ({ cart: data })),
	updateTotalPrice: (data) => set(() => ({ totalPrice: data })),
	removeAllCart: () => set(() => ({ cart: [] })),
	removeAllTotalPrice: () => set(() => ({ totalPrice: 0 })),

	//add/remove product to cart
	addToCart: (product, quantity) =>
		set((state) => ({
			cart: [...state.cart, { ...product, quantity }],
		})),
	removeFromCart: (product) =>
		set((state) => ({
			cart: state.cart.filter((x) => x.id !== product.id),
		})),

	//update quantity
	updateQuantity: (product, quantity) =>
		set((state) => ({
			cart: state.cart.map((x) =>
				x.id === product.id ? { ...product, quantity } : x
			),
		})),
}));

export default useCartStore;
