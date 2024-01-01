import React, { useState, useEffect, useRef } from "react";
import {
	ConfigProvider,
	Table,
	Modal,
	Input,
	InputNumber,
	TextArea,
} from "antd";
import { getAllCategoriesAPI } from "../../../services/AdminServices";
import { getAllProductsAPI } from "../../../services/SystemServices";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { deleteProductAPI } from "../../../services/AdminServices";
import { useImmer } from "use-immer";
import { editProductAPI } from "../../../services/AdminServices";
import TagSection from "../add_product_screen/TagSection";

export default function AllProdsComponent() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState({});

	const [openEditModal, setOpenEditModal] = useState(false);
	const [editProdFieldValue, setEditProdFieldValue] = useImmer({
		product_name: "",
		content: "",
		category_id: "",
		price: "",
		instock: "",
		brand: "",
	});
	const targetEditedProd = useRef({});

	const handleChangeCategory = (category_id) => {
		setEditProdFieldValue((draft) => {
			draft.category_id = category_id;
		});
	};

	const handleExitEditModal = () => {
		setOpenEditModal(false);
		setEditProdFieldValue({
			product_name: "",
			content: "",
			category_id: "",
			price: "",
			instock: "",
			brand: "",
		});
	};

	const handleSubmitModal = async () => {
		const res = await editProductAPI(
			targetEditedProd.current,
			editProdFieldValue.product_name,
			editProdFieldValue.content,
			editProdFieldValue.price,
			editProdFieldValue.instock,
			editProdFieldValue.category_id,
			editProdFieldValue.brand
		);
		if (res.status === 200) {
			toast.success("Sửa sản phẩm thành công");
			handleExitEditModal();
			window.location.reload();
		} else {
			toast.error(`Sửa sản phẩm thất bại, ${res.data.message}`);
		}
	};

	const handleDeleteProd = async (prodID) => {
		try {
			const res = await deleteProductAPI(prodID);
			if (res.status === 200) {
				const newProducts = products.filter((prod) => prod.id !== prodID);
				setProducts(newProducts);
				toast.success("Xoá sản phẩm thành công");
			}
		} catch (error) {
			toast.error(`Xoá sản phẩm thất bại, ${error.response.data.message}`);
		}
	};

	const onDeleteInformation = (prodId) => {
		Modal.confirm({
			title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
			okText: "Xóa",
			cancelText: "Hủy",
			okType: "danger",
			onOk: () => {
				handleDeleteProd(prodId);
			},
		});
	};

	useEffect(() => {
		const productsTemp = [];
		const fetchData = async () => {
			try {
				//fetch categories
				const allCategories = await getAllCategoriesAPI();
				const transformedCategories = {};
				if (allCategories.data.length == 0) return;
				allCategories.data.forEach((categories) => {
					transformedCategories[categories.id] = categories.cat_name;
				});
				setCategories(transformedCategories);

				//fetch products
				const allProducts = await getAllProductsAPI();
				if (allProducts.data.length == 0) return;
				allProducts.data.forEach((product) => {
					var prodType = product.category_id;
					productsTemp.push({
						product_name: product.product_name,
						category_type: transformedCategories[prodType],
						stock: product.stock,
						price: product.price,
						id: product.id,
						brand: product.brand,
						content: product.content,
					});
				});

				setProducts(productsTemp);
			} catch (error) {}
		};

		fetchData();
	}, []);

	const columns = [
		{
			title: "Tên sản phẩm",
			dataIndex: "product_name",
			key: "name",
		},
		{
			title: "Loại sản phẩm",
			dataIndex: "category_type",
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
			title: "Số lượng còn lại",
			dataIndex: "stock",
			sorter: (a, b) => new Date(a.date) - new Date(b.date),
		},
		{
			title: "Giá trị sản phẩm",
			dataIndex: "price",
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: "ID sản phẩm",
			dataIndex: "id",
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
		{
			title: "Sửa/Xoá",
			render: (record) => {
				return (
					<>
						<EditOutlined
							onClick={() => {
								setOpenEditModal(true);
								targetEditedProd.current = record.id;
							}}
						/>
						<DeleteOutlined
							style={{ color: "red", marginLeft: "10px" }}
							onClick={() => {
								onDeleteInformation(record.id);
							}}
						/>
					</>
				);
			},
		},
	];

	const onChange = (pagination, filters, sorter, extra) => {};

	return (
		<div className="m-5 font-mono">
			<h1 className="mb-5 text-2xl font-bold">Danh sách sản phẩm</h1>
			<ConfigProvider
				theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
			>
				<Modal
					title="Chỉnh sửa sản phẩm"
					open={openEditModal}
					okButtonProps={{ style: { backgroundColor: "#F8C70E" } }}
					okText="Lưu"
					onCancel={() => {
						handleExitEditModal();
					}}
					cancelText="Hủy"
					onOk={() => {
						handleSubmitModal();
					}}
				>
					<div>
						<p className="mt-2 mb-1 ml-2 text-xl font-semibold">Tên sản phẩm</p>
						<Input
							className="mb-4 mr-2 text-base w-full bg-transparent "
							value={editProdFieldValue.product_name}
							type="text"
							onChange={(e) => {
								setEditProdFieldValue((draft) => {
									draft.product_name = e.target.value;
								});
							}}
							onPaste={(e) => {
								const pastedValue = e.clipboardData.getData("text");
								setEditProdFieldValue((draft) => {
									draft.product_name = pastedValue;
								});
							}}
						/>
						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-1">
								<p className="mt-2 mb-2 text-xl font-semibold">
									Số lượng sản phẩm
								</p>
								<InputNumber
									style={{
										width: "100%",
									}}
									value={editProdFieldValue.instock}
									onChange={(e) => {
										setEditProdFieldValue((draft) => {
											draft.instock = e;
										});
									}}
									formatter={(value) =>
										` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}
									parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
								/>
							</div>
							<div className="col-span-1">
								<p className="mt-2 mb-2 text-xl font-semibold">
									Giá của sản phẩm
								</p>
								<InputNumber
									addonBefore="+"
									value={editProdFieldValue.price}
									onChange={(e) => {
										setEditProdFieldValue((draft) => {
											draft.price = e;
										});
									}}
									addonAfter="VND"
									formatter={(value) =>
										` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}
									parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-1">
								<p className="mt-2 mb-2 text-xl font-semibold">
									Thương hiệu sản phẩm
								</p>
								<Input
									className="mb-4 mr-2 text-base w-full bg-transparent "
									type="text"
									value={editProdFieldValue.brand}
									onChange={(e) => {
										setEditProdFieldValue((draft) => {
											draft.brand = e.target.value;
										});
									}}
									onPaste={(e) => {
										const pastedValue = e.clipboardData.getData("text");
										setEditProdFieldValue((draft) => {
											draft.brand = pastedValue;
										});
									}}
								/>
							</div>
							<div className="col-span-1">
								<p className="mt-2 mb-2 text-xl font-semibold">Loại sản phẩm</p>
								<TagSection onChange={handleChangeCategory} />
							</div>
						</div>
						<div>
							<p className="mt-2 mb-2 text-xl font-semibold">
								Miêu tả sản phẩm
							</p>
							<Input.TextArea
								showCount
								maxLength={500}
								rows={4}
								value={editProdFieldValue.content}
								className="mb-4 mr-2 text-base w-full bg-transparent "
								onChange={(e) => {
									setEditProdFieldValue((draft) => {
										draft.content = e.target.value;
									});
								}}
								onPaste={(e) => {
									const pastedValue = e.clipboardData.getData("text");
									setEditProdFieldValue((draft) => {
										draft.content = pastedValue;
									});
								}}
							/>
						</div>
					</div>
				</Modal>
			</ConfigProvider>
			<ConfigProvider
				theme={{
					token: { colorPrimary: "#F8C70E", fontFamily: "monospace" },
				}}
			>
				<Table
					pagination={{ pageSize: 5 }}
					columns={columns}
					key={products.id}
					dataSource={products}
					onChange={onChange}
				/>
			</ConfigProvider>
		</div>
	);
}
