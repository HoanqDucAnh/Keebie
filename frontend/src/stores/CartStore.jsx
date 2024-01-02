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
			const prodIndex = state.cart.findIndex((x) => x.id === product.id);
			if (prodIndex !== -1) {
				if (state.cart[prodIndex].quantity >= product.inStockValue) {
					toast.error("Số lượng sản phẩm không đủ");
					return {
						cart: [...state.cart],
					};
				}
				const newCart = [...state.cart];
				newCart[prodIndex].quantity += 1;
				toast.success("Cập nhật số lượng sản phẩm thành công!");
				return {
					cart: newCart,
				};
			} else {
				if (product.inStockValue <= 0) {
					toast.error("Sản phẩm đã hết hàng");
					return {
						cart: [...state.cart],
					};
				} else {
					toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
					return {
						cart: [...state.cart, { ...product, quantity: 1 }],
					};
				}
			}
		}),

	removeProdFromCart: (productId) =>
		set((state) => {
			const prodIndex = state.cart.findIndex((x) => x.id === productId);
			if (prodIndex !== -1) {
				const newCart = [...state.cart];
				newCart.splice(prodIndex, 1);
				toast.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
				return {
					cart: newCart,
				};
			} else {
				toast.error("Xóa sản phẩm khỏi giỏ hàng thất bại!");
				return {
					cart: [...state.cart],
				};
			}
		}),

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
