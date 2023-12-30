import React, { useState, useEffect } from "react";
import { ConfigProvider, Table } from "antd";
import { getAllCategoriesAPI } from "../../../services/AdminServices";
import { getAllProductsAPI } from "../../../services/SystemServices";

export default function AllProdsComponent() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState({});

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
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const columns = [
		{
			title: "Tên sản phẩm",
			dataIndex: "product_name",
			key: "name",
			width: "180px",
		},
		{
			title: "Loại sản phẩm",
			dataIndex: "category_type",
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
			title: "Số lượng sản phẩm còn lại",
			dataIndex: "stock",
			width: "180px",
			sorter: (a, b) => new Date(a.date) - new Date(b.date),
		},
		{
			title: "Giá trị sản phẩm",
			dataIndex: "price",
			width: "140px",
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: "ID sản phẩm",
			dataIndex: "id",
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
					key={products.id}
					dataSource={products}
					onChange={onChange}
				/>
			</ConfigProvider>
		</div>
	);
}
