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
	}, []);

	const [amount, setAmount] = useState(1);
	const setIncrease = () => {
		if (amount < product.stock) {
			setAmount(amount + 1);
		} else {
			toast.error("Số lượng sản phẩm không đủ");
			setAmount(product.stock);
		}
	};
	const setDecrease = () => {
		if (amount > 1) {
			setAmount(amount - 1);
		} else {
			setAmount(0);
		}
	};

	const tagColor = product.stock > 0 ? "green" : "red";
	const tagText = product.stock > 0 ? "Còn hàng" : "Hết hàng";

	return (
		<div>
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
								disabled
								onClick={() => {
									toast.success("Thêm vào giỏ hàng thành công");
								}}
							>
								Thêm vào giỏ hàng
							</button>
						</div>

						<p className="mt-2">Còn: {product.stock} sản phẩm</p>
					</ConfigProvider>
				</div>
			</div>
		</div>
	);
}
