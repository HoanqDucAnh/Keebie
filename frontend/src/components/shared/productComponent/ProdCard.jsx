import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { ConfigProvider } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import useCartStore from "../../../stores/CartStore";

const { Meta } = Card;
function ProdCard({ title, price, imageBase64, id, className, inStockValue }) {
	const formatPrice = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const AddToCart = useCartStore((state) => state.addProdToCart);

	const handleAddToCart = () => {
		AddToCart({ title, price, id, inStockValue });
	};

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#F8C70E",
					fontFamily: "monospace",
				},
			}}
		>
			<Card
				key={id}
				hoverable
				bordered={false}
				style={{ width: "100%" }}
				cover={
					<img
						className="prod-img"
						alt={`${title}`}
						src={`data:image/png;base64, ${imageBase64}`}
					/>
				}
				actions={[
					<div onClick={() => handleAddToCart(title, price, id, inStockValue)}>
						<PlusOutlined key="addToCart" />
					</div>,
					<Link to={`/product/${id}`}>
						<EyeOutlined key="details" />
					</Link>
				]}
			>
				<Link to={`/product/${id}`} className={className} key={id}>
					<Meta
						className="text-center"
						title={title}
						description={`${formatPrice(price)} VND`}
					/>
				</Link>
			</Card>
		</ConfigProvider>
	);
}

export default ProdCard;
