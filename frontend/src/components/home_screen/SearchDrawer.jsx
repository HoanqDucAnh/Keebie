import React, { useRef, useState } from "react";
import { ConfigProvider } from "antd";
import { Input } from "antd";
import useProdOnDisplayStore from "../../stores/ProdOnDisplay";
import { useEffect } from "react";

const { Search } = Input;

export default function SearchDrawer() {
	const [visible, setVisible] = useState(false);

	const allProd = useProdOnDisplayStore((state) => state.displayProducts);
	const searchProd = useRef([]);
	const [searchProdReturn, setSearchProdReturn] = useState([]);

	useEffect(() => {
		searchProd.current = allProd;
	}, [allProd]);

	const onSearchProduct = (value) => {
		// search base on prod name using regex
		const regex = new RegExp(value, "i");
		const searchResult = searchProd.current.filter((prod) =>
			prod.product_name.match(regex)
		);
		setSearchProdReturn(searchResult);
	};

	const formatPrice = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	return (
		<ConfigProvider
			theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
		>
			<a className="hover:text-[#FFF5D6] font-bold text-3xl font-mono" href="/">
				Keebi3.
			</a>
			<Search
				placeholder="Nhập từ khóa tìm kiếm"
				onChange={(e) => {
					setVisible(true);
					onSearchProduct(e.target.value);
				}}
				style={{
					width: 1000,
					paddingLeft: 200,
				}}
				size="large"
			/>
			<div className="flex mt-5 justify-center">
				{visible ? (
					<div className="absolute z-10 w-full bg-white">
						<div className="grid grid-cols-3 gap-4 mx-10 m-auto">
							{searchProdReturn.map((prod) => (
								<div className="col-span-1">
									<div className="flex ">
										<img
											src={`data:image/png;base64, ${prod.header_image}`}
											alt="product"
											className="w-[100px] h-[100px] object-contain rounded-lg"
										/>
										<div className="flex flex-col justify-center ml-5">
											<a
												className="hover:text-[#FFF5D6] font-bold text-xl font-mono"
												href={`/product/${prod.id}`}
											>
												{prod.product_name}
											</a>
											<p className="text-red">{formatPrice(prod.price)} VND</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</ConfigProvider>
	);
}
