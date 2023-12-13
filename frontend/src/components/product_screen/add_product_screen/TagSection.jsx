import React from "react";
import { Select } from "antd";

export default function TagSection() {
	const options = [];

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	return (
		<div>
			<Select
				mode="tags"
				style={{
					width: "100%",
				}}
				onChange={handleChange}
				options={options}
			/>
		</div>
	);
}
