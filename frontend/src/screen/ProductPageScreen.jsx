import React from "react";
import { Breadcrumb, Layout } from "antd";
import Sidebar from "../components/product_screen/product_page_screen/Sidebar";
import SortingFilter from "../components/product_screen/product_page_screen/SortingFilter";
import ProductDisplayFilter from "../components/shared/productComponent/ProductDisplayFilter";

const { Content, Sider } = Layout;

export default function ProductPageScreen() {
	return (
		<div className="m-5">
			<Breadcrumb
				className="mb-3 font-mono"
				separator=">"
				items={[
					{
						title: "Trang chủ",
						href: "/",
					},
					{
						title: "Danh mục sản phẩm",
						href: "/product_page",
					},
				]}
			/>

			<Layout>
				<Sider
					width={240}
					style={{
						backgroundColor: "white",
						borderRadius: "10px",
					}}
				>
					<Sidebar />
				</Sider>
				<Content className="min-h-[500px] bg-white rounded-[10px] ml-5 mr-1 p-4">
					<SortingFilter />
					<ProductDisplayFilter />
				</Content>
			</Layout>
		</div>
	);
}
