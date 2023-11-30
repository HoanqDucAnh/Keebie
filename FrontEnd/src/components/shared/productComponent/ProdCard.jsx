import React from "react";
import { Card } from "antd";

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
			<Card
				hoverable
				style={{ width: "100%" }}
				cover={<img className="prod-img" alt="example" src={imageHref} />}
			>
				<Meta title={title} description={price} />
			</Card>
		</div>
	);
}

export default ProdCard;
