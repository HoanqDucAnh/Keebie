import React, { useEffect } from "react";
import { Card } from "antd";
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
		<div className={className} key={id}>
			<Card
				key={id}
				hoverable
				style={{ width: "100%" }}
				cover={
					<img
						className="prod-img"
						alt="example"
						src={`data:image/png;base64, ${imageBase64}`}
					/>
				}
				actions={[
					<div onClick={() => handleAddToCart(title, price, id, inStockValue)}>
						<PlusOutlined key="addToCart" />
					</div>,
					<a href={`/product/${id}`}>
						<EyeOutlined key="details" />,
					</a>,
				]}
			>
				<Meta
					className="text-center"
					title={title}
					description={`${formatPrice(price)} VND`}
				/>
			</Card>
		</div>
	);
}

export default ProdCard;
