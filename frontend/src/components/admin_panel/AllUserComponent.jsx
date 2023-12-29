import React, { useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";
import { getAllUsersAPI } from "../../services/AdminServices";

export default function AllUsersComponent() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		var allUsers = getAllUsersAPI();
		allUsers.then((res) => {
			setUsers(res.data);
		});
	}, []);

	const columns = [
		{
			title: "Tên đăng nhập",
			dataIndex: "username",
			key: "name",
			width: "180px",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			width: "140px",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone_number",
			width: "180px",
		},
		{
			title: "Họ và tên",
			dataIndex: "fullname",
			width: "140px",
		},
		{
			title: "ID tài khoản",
			dataIndex: "id",
			width: "160px",
		},
	];

	const onChange = (pagination, filters, sorter, extra) => {
		console.log("params", pagination, filters, sorter, extra);
	};

	return (
		<div className="m-5 font-mono">
			<h1 className="mb-5 text-2xl font-bold">Danh sách sản phẩm</h1>
			<ConfigProvider
				theme={{
					token: { colorPrimary: "#F8C70E", fontFamily: "monospace" },
				}}
			>
				<Table
					pagination={{ pageSize: 5 }}
					columns={columns}
					key={users.id}
					dataSource={users}
					onChange={onChange}
				/>
			</ConfigProvider>
		</div>
	);
}
