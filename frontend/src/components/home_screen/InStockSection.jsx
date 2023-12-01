import React, { useState } from "react";
import styled from "styled-components";
import ProductRow from "../shared/productComponent/ProductRow";

const Tab = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	cursor: pointer;
	margin: 0 auto;
	overflow-x: auto;
	white-space: nowrap;
	overflow-y: hidden;
	max-width: 100%;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const currentTabStyle = {
	borderBottom: "2px solid #F8C70E",
	transition: "width 0.2s ease",
};

export default function InStockSection() {
	const listGBTab = ["Bàn phím cơ", "Sản phẩm hot", "Sản phẩm mới"];
	const [currentTab, setCurrentTab] = useState("");

	return (
		<div className="my-5 text-center">
			<h1>Instock - Hàng có sẵn</h1>
			<div className="flex my-3 justify-center">
				<Tab className="">
					{listGBTab.map((tab, index) => (
						<div
							className="mx-4 hover:text-[#F8C70E]"
							style={currentTab === tab ? currentTabStyle : {}}
							key={index}
							onClick={() => setCurrentTab(tab)}
						>
							{tab}
						</div>
					))}
				</Tab>
			</div>
			<ProductRow />
		</div>
	);
}
