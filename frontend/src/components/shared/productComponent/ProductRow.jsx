import React, { useEffect, useState } from "react";
import ProdCard from "./ProdCard";
import useProdOnDisplayStore from "../../../stores/ProdOnDisplay";

export default function ProductRow() {
	const products = useProdOnDisplayStore((state) => state.displayProducts);
	const setDisplayProducts = useProdOnDisplayStore(
		(state) => state.updateAllDisplayProducts
	);

	const mockUpdata = [
		{
			id: 1,
			title: "product 1",
			description: "product 1 description",
			price: "100",
			imageHref: "https://picsum.photos/200",
		},
		{
			id: 2,
			title: "product 2",
			description: "product 2 description",
			price: "200",
			imageHref: "https://picsum.photos/200",
		},
		{
			id: 3,
			title: "product 3",
			description: "product 3 description",
			price: "300",
			imageHref: "https://picsum.photos/200",
		},
		{
			id: 4,
			title: "product 4",
			description: "product 4 description",
			price: "400",
			imageHref: "https://picsum.photos/200",
		},
		{
			id: 4,
			title: "product 4",
			description: "product 4 description",
			price: "400",
			imageHref: "https://picsum.photos/200",
		},
		{
			id: 4,
			title: "product 4",
			description: "product 4 description",
			price: "400",
			imageHref: "https://picsum.photos/200",
		},
		{
			id: 4,
			title: "product 4",
			description: "product 4 description",
			price: "400",
			imageHref: "https://picsum.photos/200",
		},
	];

	useEffect(() => {
		setDisplayProducts(mockUpdata);
	}, []);

	return (
		<div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 ">
			{/* <div className="grid grid-rows-2 gap-5 overflow-y-auto"> */}
			{products.map((product) => (
				<div key={product.id} className="w-full sm:w-auto">
					<ProdCard
						title={product.title}
						description={product.description}
						price={product.price}
						imageHref={product.imageHref}
						id={product.id}
						className={"row-span-1"}
					/>
				</div>
			))}
		</div>
	);
}
