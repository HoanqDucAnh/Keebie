import React from "react";
import { Card } from "antd";

const { Meta } = Card;
function ProdFrame({ title, description, price, image, id, handleAddToCart }) {
	return (
		<Card
			hoverable
			style={{ width: 240 }}
			cover={<img alt="example" src={img} />}
		>
			<Meta title={title} description={description} />
		</Card>
	);
}

export default ProdFrame;
