import React, { useEffect } from "react";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { Radio, Space, Input } from "antd";
import useCategoryStore from "../../../stores/CategoryStore";
import useProdOnDisplayStore from "../../../stores/ProdOnDisplay";

export default function CategoryFilter() {
	const allCategories = useCategoryStore((state) => state.categories);
	const [value, setValue] = useState(1);

	// const fetchAllCategories = useCategoryStore(
	// 	(state) => state.fetchAllCategories
	// );
	const filterDisplayProductsOnCategoryID = useProdOnDisplayStore(
		(state) => state.filterDisplayProductsOnCategoryID
	);

	// useEffect(() => {
	// 	fetchAllCategories();
	// }, []);

	useEffect(() => {
		filterDisplayProductsOnCategoryID(value);
	}, [value]);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<ConfigProvider
			theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
		>
			<h1 className="mt-3 mb-1 font-mono text-lg text-[#F8C70E]">Phân loại</h1>

			<Radio.Group onChange={onChange} value={value}>
				<Space direction="vertical">
					{allCategories.map((category) => (
						<Radio value={category.id} key={category.id}>
							{category.cat_name}
						</Radio>
					))}
				</Space>
			</Radio.Group>
		</ConfigProvider>
	);
}
