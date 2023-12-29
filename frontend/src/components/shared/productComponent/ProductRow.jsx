import React, { useEffect, useState } from "react";
import ProdCard from "./ProdCard";
import useProdOnDisplayStore from "../../../stores/ProdOnDisplay";
import { useImmer } from "use-immer";

export default function ProductRow({ sectionName }) {
	const products = useProdOnDisplayStore((state) => state.displayProducts);
	const [screenProds, setScreenProds] = useImmer([]);

	useEffect(() => {
		setScreenProds(products);
	}, [products]);

	return (
		<div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 ">
			{screenProds.map((screenProd) => (
				<div key={screenProd.id} className="w-full sm:w-auto">
					<ProdCard
						title={screenProd.product_name}
						description={screenProd.content}
						price={screenProd.price}
						imageHref={screenProd.imageHref}
						id={screenProd.id}
						className={"row-span-1"}
					/>
				</div>
			))}
		</div>
	);
}
