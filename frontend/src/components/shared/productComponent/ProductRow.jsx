import React, { useEffect, useRef, useState } from "react";
import ProdCard from "./ProdCard";
import useProdOnDisplayStore from "../../../stores/ProdOnDisplay";
import useCategoryStore from "../../../stores/CategoryStore";
import { useImmer } from "use-immer";
import useCartStore from "../../../stores/CartStore";

export default function ProductRow({ sectionName }) {
	//prodOnDisplayStore
	const products = useProdOnDisplayStore((state) => state.displayProducts);
	//categoryStore
	const categories = useCategoryStore((state) => state.categories);
	//cartStore
	const cartItems = useCartStore((state) => state.cart);
	const addProdToCart = useCartStore((state) => state.addProdToCart);

	const [screenProds, setScreenProds] = useImmer([]);
	const screenCategories = useRef([]);

	const filterProds = (prods, catName, categories) => {
		var prodTemp = prods;
		const catId = categories.find((cat) => cat.cat_name === catName)?.id;
		if (catId === null) return prodTemp;
		prodTemp = prodTemp.filter((prod) => {
			return prod.category_id === catId;
		});

		return prodTemp;
	};

	const filterInstockProds = (prods, categories) => {
		var prodTemp = prods;
		const catOrdId = categories.find((cat) => cat.cat_name === "Order")?.id;
		if (catOrdId === null) return prodTemp;
		prodTemp = prodTemp.filter((prod) => {
			return prod.category_id != catOrdId;
		});
		return prodTemp;
	};

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	useEffect(() => {
		setScreenProds(products);
		screenCategories.current = categories;
		if (screenCategories.current.length > 0) {
			switch (sectionName) {
				case "HotSection":
					setScreenProds(
						filterProds(products, "Order", screenCategories.current)
					);
					break;
				case "GroupbuySection":
					setScreenProds(
						filterProds(products, "Order", screenCategories.current)
					);
					break;
				case "InstockSection":
					setScreenProds(
						filterInstockProds(products, screenCategories.current)
					);
					break;
				case "FilterSection":
					var tempProds = products;
					if (tempProds.length > 8) {
						tempProds = tempProds.slice(0, 8);
					}
					setScreenProds(tempProds);
					break;
				default:
					var tempProds = products;
					if (tempProds.length > 8) {
						tempProds = tempProds.slice(0, 8);
					}
					setScreenProds(tempProds);
					break;
			}
		}
		console.log(screenProds);
	}, [products]);

	return (
		<div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 ">
			{screenProds.map((screenProd) => (
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
	);
}
