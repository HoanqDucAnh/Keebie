import ProductRow from "../shared/productComponent/ProductRow";

export default function LastProdSection() {
	return (
		<div className="my-10 text-center">
			<h1>Danh mục sản phẩm</h1>
			<ProductRow sectionName={"LastSection"} />
		</div>
	);
}
