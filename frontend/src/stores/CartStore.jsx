import { toast } from "react-toastify";
import { create } from "zustand";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

const useCartStore = create((set) => ({
	cart: cartFromLocalStorage,

	//general functions
	updateCart: (data) => set(() => ({ cart: data })),
	updateTotalPrice: (data) => set(() => ({ totalPrice: data })),
	removeAllCart: () => set(() => ({ cart: [] })),
	removeAllTotalPrice: () => set(() => ({ totalPrice: 0 })),

	//add/remove product to cart
	addProdToCart: (product) =>
		set((state) => {
			console.log(product);
			const prodIndex = state.cart.findIndex((x) => x.id === product.id);
			if (prodIndex !== -1) {
				const newCart = [...state.cart];
				newCart[prodIndex].quantity += 1;
				toast.success("Cập nhật số lượng sản phẩm thành công!");
				return {
					cart: newCart,
				};
			} else {
				toast.success("Thêm vào giỏ hàng thành công!");
				return {
					cart: [...state.cart, { ...product, quantity: 1 }],
				};
			}
		}),

	removeProdFromCart: (product) =>
		set((state) => ({
			cart: state.cart.filter((x) => x.id !== product.id),
		})),

	updateProdsFromLocalStorage: (products) =>
		set(() => ({
			cart: products,
		})),

	//update quantity
	updateProdQuantity: (prodID, quantity) =>
		set((state) => {
			const prodIndex = state.cart.findIndex((x) => x.id === prodID);
			if (prodIndex !== -1) {
				const newCart = [...state.cart];
				newCart[prodIndex].quantity = quantity;
				toast.success("Cập nhật số lượng sản phẩm thành công!");
				return {
					cart: newCart,
				};
			} else {
				toast.error("Cập nhật số lượng sản phẩm thất bại!");
				return {
					cart: [...state.cart],
				};
			}
		}),
}));

export default useCartStore;
