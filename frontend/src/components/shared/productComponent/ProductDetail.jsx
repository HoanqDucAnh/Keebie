import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Breadcrumb, Tag, ConfigProvider } from "antd";
import { Button, Statistic } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { getProductByIdAPI } from "../../../services/SystemServices";
import { getProductImgByIdAPI } from "../../../services/SystemServices";
import { Modal, Input, InputNumber } from "antd";
import TagSection from "../../../components/product_screen/add_product_screen/TagSection";
import { useImmer } from "use-immer";
import { editProductAPI } from "../../../services/AdminServices";

export default function ProductDetailScreen() {
	const productId = useParams();
	const [product, setProduct] = useState({});
	const [productImages, setProductImages] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [editProdFieldValue, setEditProdFieldValue] = useImmer({
		id: productId.id,
		product_name: "",
		content: "",
		category_id: "",
		price: "",
		instock: "",
		brand: "",
	});

	useEffect(() => {
		const admin = localStorage.getItem("isAdmin");
		if (admin === "true") {
			setIsAdmin(true);
		}
		const getProductById = async () => {
			const res = await getProductByIdAPI(productId.id);
			if (res.status === 200) {
				setProduct(res.data);
			}
		};
		const getProductImgById = async () => {
			const res = await getProductImgByIdAPI(productId.id);
			if (res.status === 200) {
				setProductImages(res.data);
			}
		};

		getProductById();
		getProductImgById();

		// const getCategoryById = async () => {
		// 	const res = await getCategoryByIdAPI(productId.id);
		// 	if (res.status === 200) {
		// 		setProduct({...product, category: res.data.name});
		// 	}
		// }
		// getCategoryById();
	}, []);

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
			editProdFieldValue.id,
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

	const [amount, setAmount] = useState(1);
	const setIncrease = () => {
		if (amount < product.stock) {
			setAmount(amount + 1);
		} else {
			setAmount(product.stock);
		}
	};
	const setDecrease = () => {
		if (amount > 1) {
			setAmount(amount - 1);
		} else {
			setAmount(1);
		}
	};

	const tagColor = product.stock > 0 ? "green" : "red";
	const tagText = product.stock > 0 ? "Còn hàng" : "Hết hàng";

	return (
		<div>
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
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
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
									className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
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
								className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
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
			<Breadcrumb
				className="mt-5 ml-5 mb-3 font-mono"
				separator=">"
				items={[
					{
						title: "Trang chủ",
						href: "/",
					},
					{
						title: "Danh mục sản phẩm",
						href: "/product_page",
					},
					{
						title: "Sản phẩm",
						href: "/product",
					},
				]}
			/>
			<div className="flex mt-5 mb-5 pt-5 pb-5 bg-white">
				<Carousel
					dotPosition="left"
					className="ml-[100px] w-[500px]"
					autoplay
					autoplaySpeed={3000}
				>
					{productImages.map((image, index) => (
						<div key={index}>
							<img
								src={`data:image/png;base64, ${image.image}`}
								alt="product"
								className="w-full h-[500px] object-contain rounded-lg"
							/>
						</div>
					))}
				</Carousel>

				<div className="ml-7 font-mono w-[600px]">
					<ConfigProvider
						theme={{
							token: { colorPrimary: "#F8C70E", fontFamily: "monospace" },
						}}
					>
						<h2 className="mb-2">{product.product_name}</h2>
						<p className="mb-1 text-base">
							<strong>Phân loại:</strong> {product.category}
						</p>
						<p className="mb-1 text-base">
							<strong>Thương hiệu:</strong> {product.brand}
						</p>

						<Tag className="text-large mb-5" color={tagColor}>
							{tagText}
						</Tag>
						<p className="mb-4 text-justify">
							<strong>Mô tả:</strong> {product.content}
						</p>
						<Statistic className="mb-10" value={product.price} suffix="VNĐ" />

						<div className="flex">
							<Button icon={<MinusOutlined />} onClick={() => setDecrease()} />
							<h3 className="mr-5 ml-5 text-center size-xl text-medium]">
								{amount}
							</h3>
							<Button icon={<PlusOutlined />} onClick={() => setIncrease()} />
							<button
								className="ml-5 text-center bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer font-semibold rounded-md px-4"
								type="default"
								onClick={() => {
									toast.success("Thêm vào giỏ hàng thành công");
								}}
							>
								Thêm vào giỏ hàng
							</button>
							{isAdmin && (
								<button
									className="ml-5 text-center bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer font-semibold rounded-md px-4"
									type="default"
									onClick={() => {
										setOpenEditModal(true);
									}}
								>
									Sửa sản phẩm
								</button>
							)}
						</div>

						<p className="mt-2">Còn: {product.stock} sản phẩm</p>
					</ConfigProvider>
				</div>
			</div>
		</div>
	);
}
