import React, { useEffect } from "react";
import Carousel from "../components/home_screen/Carousel";
import HotSection from "../components/home_screen/HotSection";
import GroupBuySection from "../components/home_screen/GroupBuySection";
import InStockSection from "../components/home_screen/InStockSection";
import LastProdSection from "../components/home_screen/LastProdSection";
import {
	getAllProductsAPI,
	getAllCategoriesAPI,
} from "../services/SystemServices";
import useProdOnDisplayStore from "../stores/ProdOnDisplay";
import useCategoryStore from "../stores/CategoryStore";

export default function HomeScreen() {
	const fetchAllCategories = useCategoryStore(
		(state) => state.fetchAllCategories
	);
	const setDisplayProducts = useProdOnDisplayStore(
		(state) => state.updateAllDisplayProducts
	);

	const fetchProducts = async () => {
		const res = await getAllProductsAPI();
		if (res) {
			setDisplayProducts(res.data);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchAllCategories();
		console.log("App.js: useEffect");
	}, []);

	return (
		<div>
			<Carousel />
			<div className="w-[70%] m-auto font-mono mt-2">
				<HotSection />
				<GroupBuySection />
				<InStockSection />
				<LastProdSection />
			</div>
		</div>
	);
}
