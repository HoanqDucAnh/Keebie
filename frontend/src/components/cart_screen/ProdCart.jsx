import React, { useEffect, useRef } from "react";
import { InputNumber } from "antd";
import { ConfigProvider } from "antd";
import useCartStore from "../../stores/CartStore";

export default function ProdCart({ key, id, name, price, instock, quantity }) {
	const updateProdQuantity = useCartStore((state) => state.updateProdQuantity);
	const cartItems = useCartStore((state) => state.cart);
	const disbledField = useRef(false);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const handleUpdateQuantity = (id, value) => {
		updateProdQuantity(id, value);
	};

	const checkDisableField = (instock, quantity) => {
		if (instock === 0) {
			disbledField.current = true;
		} else if (instock > 0 && quantity === 0) {
			disbledField.current = false;
		} else if (quantity < instock) {
			disbledField.current = false;
		} else if (quantity === instock) {
			disbledField.current = true;
		}
		return disbledField.current;
	};

	return (
		<ConfigProvider
			theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
		>
			<div className="flex flex-row my-6 flex-wrap" key={key}>
				<img src="https://picsum.photos/200" alt="" className="w-24 h-24" />
				<div className="ml-5 basis-2/5 m-auto">
					<p className="text-xl">{name}</p>
					<p className="text-lg">Giá: {price} VND</p>
					<p className="">Còn lại: {instock} sản phẩm</p>
				</div>
				<div className="mr-5 flex basis-2/5 justify-end m-auto">
					<div>
						<p className="text-xl text-center">Số lượng</p>
						<InputNumber
							min={1}
							max={instock}
							disabled={checkDisableField(instock, quantity)}
							defaultValue={quantity}
							onChange={(value) => handleUpdateQuantity(id, value)}
						/>
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
}
