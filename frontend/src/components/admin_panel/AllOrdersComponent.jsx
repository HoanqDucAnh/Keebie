import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
	getAllOrderAPi,
	updateOrderStatusAPI,
} from "../../services/AdminServices";
import { toast } from "react-toastify";

export default function AllOrdersComponent() {
	const [allOrderList, setAllOrderList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editStatusId, setEditStatusId] = useState(null);
	const editedOrderId = useRef(null);

	const orderStatusMap = useRef({
		1: "Chưa thanh toán",
		2: "Đã thanh toán",
		3: "Đã huỷ",
	});

	const orderStatusOptions = useRef([
		{ value: 1, label: "Chưa thanh toán" },
		{ value: 2, label: "Đã thanh toán" },
		{ value: 3, label: "Đã huỷ" },
	]);

	const mappingOrderStatus = (status) => {
		return orderStatusMap.current[status];
	};

	useEffect(() => {
		const fetchAllOrders = async () => {
			const res = await getAllOrderAPi();
			if (res.status === 200) {
				setAllOrderList(res.data);
				setAllOrderList((prev) => {
					return prev.map((order) => {
						return {
							...order,
							status_code: mappingOrderStatus(order.status_id),
						};
					});
				});
			}
		};

		fetchAllOrders();
	}, []);

	const updateStatusId = async (orderId, statusId) => {
		const response = await updateOrderStatusAPI(orderId, statusId);
		if (response.status === 200) {
			setAllOrderList((prev) => {
				return prev.map((order) => {
					if (order.id === orderId) {
						return {
							...order,
							status_id: statusId,
							status_code: mappingOrderStatus(statusId),
						};
					}
					return order;
				});
			});
			toast.success("Cập nhật trạng thái đơn hàng thành công");
			setIsEditing(false);
			setEditStatusId(null);
		} else {
			toast.error("Cập nhật trạng thái đơn hàng thất bại");
		}
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: "Tên khách hàng",
			dataIndex: "full_name",
			key: "full_name",
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
			title: "Minh chứng thanh toán",
			dataIndex: "payment_image",
			key: "created_at",
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
					value: "Đã hủy",
				},
			],
			onFilter: (value, record) => {
				return record.status_id.indexOf(value) === 0;
			},
		},
		{
			title: "",
			render: (record) => {
				return (
					<>
						<EditOutlined
							onClick={() => {
								setIsEditing(true);
								editedOrderId.current = record.id;
							}}
						/>
						<DeleteOutlined
							onClick={() => {}}
							style={{ color: "red", marginLeft: 12 }}
						/>
					</>
				);
			},
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
				<Modal
					title="Chỉnh sửa trạng thái đơn hàng"
					open={isEditing}
					okText="Lưu"
					okButtonProps={{ style: { backgroundColor: "#F8C70E" } }}
					cancelText="Hủy"
					onCancel={() => {
						// resetEditing();
						setIsEditing(false);
						setEditStatusId(null);
					}}
					onOk={() => {
						updateStatusId(editedOrderId.current, editStatusId);
					}}
				>
					<div>
						<p className="mt-2 mb-1 ml-2">Trạng thái</p>
						<Select
							options={orderStatusOptions.current}
							style={{
								width: "100%",
							}}
							onChange={(value) => {
								setEditStatusId(value);
								console.log(value);
							}}
						/>
					</div>
				</Modal>

				{allOrderList.length > 0 && (
					<Table
						pagination={{ pageSize: allOrderList.length }}
						columns={columns}
						dataSource={allOrderList}
						onChange={onChange}
					/>
				)}
			</ConfigProvider>
		</div>
	);
}
