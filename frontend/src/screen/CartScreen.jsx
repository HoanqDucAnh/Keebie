import React, { useEffect } from "react";
import { Breadcrumb } from "antd";
import ProdCart from "../components/cart_screen/ProdCart";
import useCartStore from "../stores/CartStore";
import { useImmer } from "use-immer";

export default function CartScreen() {
	const cart = useCartStore((state) => state.cart);
	const [price, setPrice] = useImmer(0);
	const [displayCartProducts, setDisplayCartProducts] = useImmer([]);

	useEffect(() => {
		setDisplayCartProducts(cart);
		setPrice(
			cart.reduce((total, item) => {
				return total + item.price * item.quantity;
			}, 0)
		);
	}, [cart]);

	const formatPrice = (price) => {
		return price.toLocaleString("it-IT", {
			style: "currency",
			currency: "VND",
		});
	};

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
						{displayCartProducts.map((displayCartProduct) => (
							<ProdCart
								key={displayCartProduct.id}
								id={displayCartProduct.id}
								name={displayCartProduct.title}
								price={displayCartProduct.price}
								instock={displayCartProduct.inStockValue}
								quantity={displayCartProduct.quantity}
							/>
						))}
					</div>
					<div className="col-span-3 ml-10">
						<div className="border-2 border-gray-200 rounded-lg p-5">
							<div className="flex justify-between">
								<p className="text-xl">Tổng cộng</p>
								<p className="text-xl">{formatPrice(price)}</p>
							</div>
							<button
								className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer rounded-lg p-2 mt-2"
								onClick={() => {
									window.location.href = "/payment";
								}}
							>
								Thanh toán
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
