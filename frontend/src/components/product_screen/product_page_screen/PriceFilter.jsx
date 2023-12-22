import React from "react";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { Radio, Space, Input } from "antd";
import useProdOnDisplayStore from "../../../stores/ProdOnDisplay";

export default function PriceFilter() {
	const [value, setValue] = useState(1);
	const filterProdOnPrice = useProdOnDisplayStore(
		(state) => state.filterDisplayProductsOnPrice
	);

	const onChange = (e) => {
		console.log("radio checked", e.target.value);
		setValue(e.target.value);
		filterProdOnPrice(e.target.value);
	};

	return (
		<ConfigProvider
			theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
		>
			<h1 className="mt-8 mb-1 font-mono text-lg text-[#F8C70E]">Giá</h1>

			<Radio.Group onChange={onChange} value={value}>
				<Space direction="vertical">
					<Radio value={1}>Dưới 1.000.000đ</Radio>
					<Radio value={2}>1.000.000đ - 2.000.000đ</Radio>
					<Radio value={3}>2.000.000đ - 3.000.000đ</Radio>
					<Radio value={4}>3.000.000đ - 4.000.000đ</Radio>
					<Radio value={5}>4.000.000đ - 5.000.000đ</Radio>
					<Radio value={6}>Trên 5.000.000đ</Radio>
				</Space>
			</Radio.Group>
		</ConfigProvider>
	);
}
