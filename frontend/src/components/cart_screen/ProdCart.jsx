import React, { useEffect, useRef, useState } from "react";
import { InputNumber } from "antd";
import { ConfigProvider } from "antd";
import useCartStore from "../../stores/CartStore";
import { getHeaderImgByProdIdAPI } from "../../services/SystemServices";

export default function ProdCart({ key, id, name, price, instock, quantity }) {
	const updateProdQuantity = useCartStore((state) => state.updateProdQuantity);
	const removeProdFromCart = useCartStore((state) => state.removeProdFromCart);
	const cartItems = useCartStore((state) => state.cart);
	const disbledField = useRef(false);
	const [headerImg, setHeaderImg] = useState({});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const handleUpdateQuantity = (id, value) => {
		updateProdQuantity(id, value);
	};

	const handleRemoveProd = (id) => {
		removeProdFromCart(id);
	};

	const getHeaderImg = async (id) => {
		const response = await getHeaderImgByProdIdAPI(id);
		if (response.status === 200) {
			setHeaderImg(response.data[0]);
		}
	};

	useEffect(() => {
		getHeaderImg(id);
	}, []);

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
				<button
					className="mx-3 text-red-500 hover:text-black"
					onClick={() => handleRemoveProd(id)}
				>
					Xóa
				</button>
				<img
					src={`data:image/png;base64, ${headerImg.header_image}`}
					alt=""
					className="w-24 h-24 rounded-md"
				/>
				<div className="ml-5 basis-2/5 m-auto">
					<p className="text-xl">{name}</p>
					<p className="text-lg">Giá: {price} VND</p>
					<p className="">Còn lại: {instock} sản phẩm</p>
				</div>
				<div className="mr-5 flex basis-1/5 justify-end m-auto">
					<div>
						<p className="text-xl text-center">Số lượng</p>
						<InputNumber
							min={1}
							max={instock}
							// disabled={checkDisableField(instock, quantity)}
							defaultValue={quantity}
							onChange={(value) => handleUpdateQuantity(id, value)}
						/>
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
}
