import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
function ProdCard({
	title,
	description,
	price,
	imageHref,
	id,
	handleAddToCart,
	className,
}) {
	return (
		<div className={className}>
			<a href="/product">
				<Card
					hoverable
					style={{ width: "100%" }}
					cover={<img className="prod-img" alt="example" src={imageHref} />}
				>
					<Meta title={title} description={price} />
				</Card>
			</a>
		</div>
	);
}

export default ProdCard;
