import React, { useEffect, useRef, useState } from "react";
import ProdCard from "./ProdCard";
import useProdOnDisplayStore from "../../../stores/ProdOnDisplay";
import useCategoryStore from "../../../stores/CategoryStore";
import { useImmer } from "use-immer";
import { getAllProductsAPI } from "../../../services/SystemServices";
import { Pagination, ConfigProvider } from "antd";

export default function ProductDisplayFilter() {
	//prodOnDisplayStore
	const products = useProdOnDisplayStore((state) => state.displayProducts);
	const setProducts = useProdOnDisplayStore(
		(state) => state.updateAllDisplayProducts
	);
	//categoryStore
	const categories = useCategoryStore((state) => state.categories);
	const [screenProds, setScreenProds] = useImmer([]);
	const screenCategories = useRef([]);

	const onChangePage = (page, pageSize) => {
		setScreenProds(products.slice((page - 1) * 8, page * 8));
	};

	useEffect(() => {
		const response = getAllProductsAPI();
		response.then((res) => {
			setProducts(res.data);
		});
	}, []);

	useEffect(() => {
		setScreenProds(products);
	}, [products]);

	return (
		<div>
			<div
				className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5"
				style={{ height: "43.1rem" }}
			>
				{screenProds.slice(0, 8).map((screenProd) => (
					<div key={screenProd.id} className="w-full sm:w-auto">
						<ProdCard
							title={screenProd.product_name}
							price={screenProd.price}
							imageBase64={screenProd.header_image}
							id={screenProd.id}
							className={"row-span-1"}
							inStockValue={screenProd.stock}
						/>
					</div>
				))}
			</div>
			<div className="w-full text-right my-5 px-3">
				<ConfigProvider
					theme={{
						token: { colorPrimary: "#F8C70E", fontFamily: "monospace" },
					}}
				>
					<Pagination
						pageSize={8}
						defaultCurrent={1}
						total={products.length}
						onChange={onChangePage}
					/>
				</ConfigProvider>
			</div>
		</div>
	);
}
