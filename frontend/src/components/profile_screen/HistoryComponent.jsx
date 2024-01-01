import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";
import { getOrdersByCustomerAPI } from "../../services/UserServices";

export default function HistoryComponent() {
	const userId = useRef(null);
	const [orders, setOrders] = useState([]);

	const orderStatusMap = useRef({
		1: "Chưa thanh toán",
		2: "Đã thanh toán",
		3: "Đã huỷ",
	});

	const mappingOrderStatus = (status) => {
		return orderStatusMap.current[status];
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		const uid = JSON.parse(atob(token.split(".")[1])).user_id;
		userId.current = uid;
		const getOrdersByCustomer = async () => {
			const res = await getOrdersByCustomerAPI(uid);
			if (res.status === 200) {
				setOrders(res.data);
				setOrders((prev) => {
					return prev.map((order) => {
						return {
							...order,
							status_code: mappingOrderStatus(order.status_id),
						};
					});
				});
			}
		};

		getOrdersByCustomer();
	}, []);

	useEffect(() => {}, [orders]);

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone_number",
			key: "phone_number",
		},
		{
			title: "Ngày mua hàng",
			dataIndex: "created_at",
			key: "created_at",
			sorter: (a, b) => a.created_at - b.created_at,
		},
		{
			title: "Giá trị đơn hàng",
			dataIndex: "total_price",
			sorter: (a, b) => a.total_price - b.total_price,
		},
		{
			title: "Trạng thái đơn hàng",
			dataIndex: "status_code",
			filters: [
				{
					text: "Chưa thanh toán",
					value: "Chưa thanh toán",
				},
				{
					text: "Đã thanh toán",
					value: "Đã thanh toán",
				},
				{
					text: "Đã hủy",
					value: "Đã huỷ",
				},
			],
			onFilter: (value, record) => {
				return record.status_code.indexOf(value) === 0;
			},
		},
		{
			title: "Hình thức thanh toán",
			dataIndex: "payment_method",
			filters: [
				{
					text: "Thanh toán khi nhận hàng",
					value: "Thanh toán khi nhận hàng",
				},
				{
					text: "Chuyển khoản qua ngân hàng",
					value: "Chuyển khoản qua ngân hàng",
				},
			],
			onFilter: (value, record) => {
				return record.payment_method.indexOf(value) === 0;
			},
		},
		{
			title: "Vận chuyển",
			dataIndex: "shipment_method",
		},
	];

	const onChange = (pagination, filters, sorter, extra) => {};

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
