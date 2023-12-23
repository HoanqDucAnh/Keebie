import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import StatusFilter from "./StatusFilter";

export default function Sidebar() {
	return (
		<div className="ml-3 mt-5 mb-5">
			<div className="flex text-[#F8C70E]">
				<MenuOutlined className="ml-3" />
				<h4 className="ml-4 font-mono text-base">Bộ lọc sản phẩm</h4>
			</div>
			<CategoryFilter />
			<PriceFilter />
			<StatusFilter />
		</div>
	);
}
