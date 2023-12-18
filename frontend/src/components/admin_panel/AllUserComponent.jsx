import React from "react";
import { ConfigProvider, Table } from "antd";

export default function AllUsersComponent() {
	const columns = [
		{
			title: "Tên đăng nhập",
			dataIndex: "username",
			key: "name",
			width: "180px",
		},
		{
			title: "Mật khẩu",
			dataIndex: "password",
			width: "140px",
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdDate",
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

	const data = [
		{
			key: "item1",
			name: "Bàn phím cơ AKKO 3084",
			type: "Bàn phím",
			date: "2021-10-10",
			price: 32,
			status: "Đã giao hàng",
		},
		{
			key: "item2",
			name: "Bàn phím cơ Cycle7",
			type: "Bàn phím",
			date: "2022-10-10",
			price: 420,
			status: "Đang giao hàng",
		},
		{
			key: "item3",
			name: "BCP Switches x 70",
			type: "Công tắc bàn phím",
			date: "2023-09-11",
			price: 320,
			status: "Đã hủy",
		},
		{
			key: "item4",
			name: "BCP Switches x 70",
			type: "Công tắc bàn phím",
			date: "2023-09-11",
			price: 320,
			status: "Đã hủy",
		},
		{
			key: "item5",
			name: "BCP Switches x 70",
			type: "Công tắc bàn phím",
			date: "2023-09-11",
			price: 320,
			status: "Đã hủy",
		},
		{
			key: "item6",
			name: "BCP Switches x 70",
			type: "Công tắc bàn phím",
			date: "2023-09-11",
			price: 320,
			status: "Đã hủy",
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
					dataSource={data}
					onChange={onChange}
				/>
			</ConfigProvider>
		</div>
	);
}
