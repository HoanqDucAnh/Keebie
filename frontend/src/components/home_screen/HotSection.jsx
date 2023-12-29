import React from "react";
import ProductRow from "../shared/productComponent/ProductRow";

export default function HotSection() {
	return (
		<div className="my-5">
			<div className="flex items-center mb-5">
				<h1>Hot</h1>
				<img
					loading="lazy"
					src="https://bizweb.dktcdn.net/100/484/752/themes/920128/assets/flashsale-hot.png?1701352705343"
					className="ml-2"
				/>
			</div>
			<ProductRow sectionName={"HotSection"} />
		</div>
	);
}
