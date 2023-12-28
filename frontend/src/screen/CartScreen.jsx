import React from "react";
import { Breadcrumb } from "antd";
import ProdCart from "../components/cart_screen/ProdCart";
import useCartStore from "../stores/CartStore";

export default function CartScreen() {
	const CartItem = useCartStore((state) => state.cart);
	const TotalPrice = useCartStore((state) => state.totalPrice);
	const removeCartItem = useCartStore((state) => state.removeFromCart);

	return (
		<div>
			<Breadcrumb
				className="ml-5 mr-5 mt-5 mb-3 font-mono"
				separator=">"
				items={[
					{
						title: "Trang chủ",
						href: "/",
					},
					{
						title: "Giỏ hàng",
						href: "/cart",
					},
				]}
			/>

			<div className="bg-white p-10 pt-5 font-mono">
				<p className="text-xl">Giỏ hàng của bạn</p>
				<div className="grid grid-cols-9 mt-4">
					<div className="col-span-4 col-start-2">
						<ProdCart />
						<ProdCart />
					</div>
					<div className="col-span-3 ml-10">
						<div className="border-2 border-gray-200 rounded-lg p-5">
							<div className="flex justify-between">
								<p className="text-xl">Tổng cộng</p>
								<p className="text-xl">{TotalPrice} VND</p>
							</div>
							<button className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer rounded-lg p-2 mt-2">
								Thanh toán
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
