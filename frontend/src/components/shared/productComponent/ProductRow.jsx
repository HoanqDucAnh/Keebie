import React, { useEffect, useRef, useState } from "react";
import ProdCard from "./ProdCard";
import useProdOnDisplayStore from "../../../stores/ProdOnDisplay";
import useCategoryStore from "../../../stores/CategoryStore";
import { useImmer } from "use-immer";
import useCartStore from "../../../stores/CartStore";
import styled from "styled-components";

const Tab = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	cursor: pointer;
	margin: 0 auto;
	overflow-x: auto;
	white-space: nowrap;
	overflow-y: hidden;
	max-width: 100%;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const currentTabStyle = {
	borderBottom: "2px solid #F8C70E",
	transition: "width 0.2s ease",
};

export default function ProductRow({ sectionName }) {
	//prodOnDisplayStore
	const products = useProdOnDisplayStore((state) => state.displayProducts);
	//categoryStore
	const categories = useCategoryStore((state) => state.categories);
	//cartStore
	const cartItems = useCartStore((state) => state.cart);

	const listFinalTab = ["Bàn phím cơ", "Bộ nút phím cơ", "Công tắc bàn phím"];
	const listInstockTab = ["Sản phẩm hot", "Sản phẩm mới"];
	const [currentTab, setCurrentTab] = useState("");

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
			return prod.category_id !== catOrdId;
		});
		if (prodTemp.length > 8) {
			prodTemp = prodTemp.slice(0, 8);
		}
		return prodTemp;
	};

	const filterHotProduct = (prods) => {
		var prodTemp = filterInstockProds(prods, screenCategories.current);
		prodTemp.sort((a, b) => b.purchase - a.purchase);
		if (prodTemp.length > 4) {
			prodTemp = prodTemp.slice(0, 4);
		}
		return prodTemp;
	};

	const filterNewProduct = (prods) => {
		var prodTemp = filterInstockProds(prods, screenCategories.current);
		prodTemp.sort((a, b) => b.id - a.id);
		if (prodTemp.length > 4) {
			prodTemp = prodTemp.slice(0, 4);
		}
		return prodTemp;
	};

	const setTabnFilter = (tabName) => {
		setCurrentTab(tabName);
		switch (tabName) {
			case "Bàn phím cơ":
				setScreenProds(
					filterProds(products, "Bàn phím cơ", screenCategories.current)
				);
				break;
			case "Sản phẩm hot":
				setScreenProds(filterHotProduct(products));
				break;
			case "Sản phẩm mới":
				setScreenProds(filterNewProduct(products));
				break;
			case "Bộ nút phím cơ":
				setScreenProds(
					filterProds(products, "Bộ nút phím cơ", screenCategories.current)
				);
				break;
			case "Công tắc bàn phím":
				setScreenProds(
					filterProds(products, "Công tắc bàn phím", screenCategories.current)
				);
				break;
			default:
				break;
		}
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
					setScreenProds(filterHotProduct(products));
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
					var temp = products;
					if (temp.length > 4) {
						temp = temp.slice(0, 4);
					}
					setScreenProds(temp);
					break;
				default:
					var temp = products;
					if (temp.length > 4) {
						temp = temp.slice(0, 4);
					}
					setScreenProds(temp);
					break;
			}
		}
	}, [products]);

	return (
		<div>
			{sectionName === "InstockSection" ? (
				<div className="flex my-3 justify-center">
					<Tab>
						{listInstockTab.map((tab, index) => (
							<div
								className="mx-4 hover:text-[#F8C70E]"
								style={currentTab === tab ? currentTabStyle : {}}
								key={index}
								onClick={() => setTabnFilter(tab)}
							>
								{tab}
							</div>
						))}
					</Tab>
				</div>
			) : sectionName === "LastSection" ? (
				<div className="flex my-3 justify-center">
					<Tab>
						{listFinalTab.map((tab, index) => (
							<div
								className="mx-4 hover:text-[#F8C70E]"
								style={currentTab === tab ? currentTabStyle : {}}
								key={index}
								onClick={() => setTabnFilter(tab)}
							>
								{tab}
							</div>
						))}
					</Tab>
				</div>
			) : null}
			<div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 ">
				{screenProds.length === 0
					? null
					: screenProds.map((screenProd) => (
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
		</div>
	);
}
