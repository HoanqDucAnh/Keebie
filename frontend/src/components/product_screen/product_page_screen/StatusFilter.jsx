import React from "react";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { Radio, Space, Input } from "antd";
import useProdOnDisplayStore from "../../../stores/ProdOnDisplay";

export default function StatusFilter() {
	const [value, setValue] = useState(1);
	const filterProdOnStatus = useProdOnDisplayStore(
		(state) => state.filterDisplayProductsOnStatus
	);

	const onChange = (e) => {
		setValue(e.target.value);
		filterProdOnStatus(e.target.value);
	};

	return (
		<ConfigProvider
			theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
		>
			<h1 className="mt-8 mb-1 font-mono text-lg text-[#F8C70E]">Tình trạng</h1>

			<Radio.Group onChange={onChange} value={value}>
				<Space direction="vertical">
					<Radio value={1}>Còn hàng</Radio>
					<Radio value={2}>Hết hàng</Radio>
				</Space>
			</Radio.Group>
		</ConfigProvider>
	);
}
