import React from "react";
import { useState } from "react";
import { UserOutlined, BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, ConfigProvider } from "antd";
import UserComponent from "../components/profile_screen/UserComponent";
import HistoryComponent from "../components/profile_screen/HistoryComponent";
import AddressComponent from "../components/profile_screen/AddressComponent";

const { Content, Sider } = Layout;

const componentsSwtich = (key) => {
	switch (key) {
		case "info":
			return <UserComponent />;
		case "history":
			return <HistoryComponent />;
		case "address":
			return <AddressComponent />;
		default:
			break;
	}
};

const ProfileScreen = () => {
	useState(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/login";
		}
	});

	const [selectedMenuItem, setSelectedMenuItem] = useState("info");

	return (
		<Layout className="m-5">
			<Sider
				width={230}
				style={{ backgroundColor: "white", borderRadius: "10px" }}
			>
				<div className="p-4 text-xl font-mono text-center">Xin chào</div>
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
						defaultSelectedKeys={["info"]}
						selectedKeys={selectedMenuItem}
						onClick={(e) => setSelectedMenuItem(e.key)}
					>
						<Menu.Item key="info" icon={<UserOutlined />}>
							Thông tin cá nhân
						</Menu.Item>
						<Menu.Item key="history" icon={<BarsOutlined />}>
							Lịch sử mua hàng
						</Menu.Item>
						<Menu.Item key="address" icon={<HomeOutlined />}>
							Địa chỉ
						</Menu.Item>
					</Menu>
				</ConfigProvider>
			</Sider>
			<Layout>
				<Content className="min-h-[500px] bg-white rounded-[10px] ml-5 mr-1">
					<div>{componentsSwtich(selectedMenuItem)}</div>
				</Content>
			</Layout>
		</Layout>
	);
};
export default ProfileScreen;
