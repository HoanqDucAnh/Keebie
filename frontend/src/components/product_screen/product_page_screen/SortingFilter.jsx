import React from "react";
import { ConfigProvider } from "antd";
import { Select } from "antd";

export default function SortingFilter() {
	const options = [
		{ value: "1", label: "Tên từ A-Z" },
		{ value: "2", label: "Tên từ Z-A" },
		{ value: "3", label: "Giá tăng dần" },
		{ value: "4", label: "Giá giảm dần" },
	];

	const handleChange = (value) => {};

	return (
		<ConfigProvider
			theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
		>
			<div className="flex mb-3">
				<p className="font-mono m-3 ml-auto mr-1">Sắp xếp theo:</p>
				<Select
					defaultValue="1"
					style={{
						width: 170,
						marginRight: 10,
						marginTop: 8,
					}}
					allowClear
					options={options}
				/>
			</div>
		</ConfigProvider>
	);
}
