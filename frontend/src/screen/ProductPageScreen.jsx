import React from "react";
import { Breadcrumb, Layout } from "antd";
import Sidebar from "../components/product_screen/product_page_screen/Sidebar";
import ProductRow from "../components/shared/productComponent/ProductRow";
import SortingFilter from "../components/product_screen/product_page_screen/SortingFilter";

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
					style={{
						backgroundColor: "white",
						borderRadius: "10px",
						maxWidth: "240px",
					}}
				>
					<Sidebar />
				</Sider>
				<Content className="min-h-[500px] bg-white rounded-[10px] ml-5 mr-1 p-4">
					<SortingFilter />
					<ProductRow />
				</Content>
			</Layout>
		</div>
	);
}
