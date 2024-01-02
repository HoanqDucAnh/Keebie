import React from "react";
import ProductRow from "../shared/productComponent/ProductRow";

export default function GroupBuySection() {
	return (
		<div className="my-10 text-center">
			<h1 className="mb-5">Group Buy</h1>
			<ProductRow sectionName={"GroupbuySection"} />
		</div>
	);
}
