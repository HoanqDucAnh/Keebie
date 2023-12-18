import React from "react";
import { ConfigProvider, Table } from "antd";

export default function HistoryComponent() {
	const columns = [
		{
			title: "Tên đơn hàng",
			dataIndex: "name",
			key: "name",
			width: "230px",
		},
		{
			title: "Loại sản phẩm",
			dataIndex: "type",
			width: "140px",
			filters: [
				{
					text: "Bàn phím",
					value: "Bàn phím",
				},
				{
					text: "Bộ nút bàn phím",
					value: "Bộ nút bàn phím",
				},
				{
					text: "Công tắc bàn phím",
					value: "Công tắc bàn phím",
				},
				{
					text: "Phụ kiện khác",
					value: "Phụ kiện khác",
				},
			],
			onFilter: (value, record) => record.type.startsWith(value),
		},
		{
			title: "Ngày mua hàng",
			dataIndex: "date",
			width: "150px",
			sorter: (a, b) => new Date(a.date) - new Date(b.date),
		},
		{
			title: "Giá trị đơn hàng",
			dataIndex: "price",
			width: "140px",
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: "Trạng thái đơn hàng",
			dataIndex: "status",
			width: "160px",
			filters: [
				{
					text: "Đã giao hàng",
					value: "Đã giao hàng",
				},
				{
					text: "Đang giao hàng",
					value: "Đang giao hàng",
				},
				{
					text: "Đã hủy",
					value: "Đã hủy",
				},
			],
			onFilter: (value, record) => record.status.startsWith(value),
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
			<h1 className="mb-5 text-2xl font-bold">Lịch sử mua hàng</h1>
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
