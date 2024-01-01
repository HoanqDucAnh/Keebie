import ProductRow from "../shared/productComponent/ProductRow";

export default function InStockSection() {
	return (
		<div className="my-10 text-center">
			<h1>Instock - Hàng có sẵn</h1>

			<ProductRow sectionName={"InstockSection"} />
		</div>
	);
}
