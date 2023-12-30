import React from "react";
import { useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";
import { getOrdersByCustomerAPI } from "../../services/UserServices";
import { useParams } from "react-router-dom";

export default function HistoryComponent() {
	const userId = useParams();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const getOrdersByCustomer = async () => {
			const res = await getOrdersByCustomerAPI(userId.id);
			setOrders(res.data);
		};
		getOrdersByCustomer();
	}, []);

	const columns = [
		{
			title: "Mã đơn hàng",
			dataIndex: "id",
			key: "id",
			width: "200px",
		},
		{
			title: "Ngày mua hàng",
			dataIndex: "created_at",
			key: "created_at",
			width: "150px",
			sorter: (a, b) => new Date(a.date) - new Date(b.date),
		},
		{
			title: "Giá trị đơn hàng",
			dataIndex: "total_price",
			key: "total_price",
			width: "140px",
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: "Trạng thái đơn hàng",
			dataIndex: "status_id",
			key: "status_id",
			width: "160px",
			filters: [
				{
					text: "Chưa thanh toán",
					value: "1",
				},
				{
					text: "Đã thanh toán",
					value: "2",
				},
				{
					text: "Đã hủy",
					value: "3",
				},
			],
			onFilter: (value, record) => record.status.startsWith(value),
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
					dataSource={orders.length > 0 ? orders : []}
					onChange={onChange}
				/>
			</ConfigProvider>
		</div>
	);
}
