import React, { useState } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import {
	UserOutlined,
	BarsOutlined,
	CreditCardOutlined,
	PlusSquareOutlined,
} from "@ant-design/icons";
import AddProductComponent from "../components/product_screen/add_product_screen";
import AllProdsComponent from "../components/product_screen/show_all_prods_screen/AllProdsComponent";
import AllUsersComponent from "../components/admin_panel/AllUserComponent";
import AllOrdersComponent from "../components/admin_panel/AllOrdersComponent";

const { Content, Sider } = Layout;

const componentsSwtich = (key) => {
	switch (key) {
		case "account-list":
			return <AllUsersComponent />;
		case "product-list":
			return <AllProdsComponent />;
		case "add-product":
			return <AddProductComponent />;
		case "order-list":
			return <AllOrdersComponent />;
		default:
			break;
	}
};

export default function AdminScreen() {
	const [selectedMenuItem, setSelectedMenuItem] = useState("account-list");

	return (
		<Layout className="m-5">
			<Sider
				width={230}
				style={{ backgroundColor: "white", borderRadius: "10px" }}
			>
				<div className="p-4 text-2xl font-mono text-center font-bold">
					Xin chào
				</div>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: "#F8C70E",
							fontFamily: "monospace",
						},
					}}
				>
					<Menu
						theme="light"
						mode="inline"
						defaultSelectedKeys={["account-list"]}
						selectedKeys={selectedMenuItem}
						onClick={(e) => setSelectedMenuItem(e.key)}
					>
						<Menu.Item key="account-list" icon={<UserOutlined />}>
							Danh sách tài khoản
						</Menu.Item>
						<Menu.Item key="product-list" icon={<BarsOutlined />}>
							Danh sách sản phẩm
						</Menu.Item>
						<Menu.Item key="add-product" icon={<PlusSquareOutlined />}>
							Thêm sản phẩm
						</Menu.Item>
						<Menu.Item key="order-list" icon={<CreditCardOutlined />}>
							Danh sách đơn hàng
						</Menu.Item>
					</Menu>
				</ConfigProvider>
			</Sider>
			<Layout>
				<Content className="min-h-[500px] bg-white rounded-[10px] ml-5 mr-1">
					{componentsSwtich(selectedMenuItem)}
				</Content>
			</Layout>
		</Layout>
	);
}
