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
	const setDisplayProducts = useProdOnDisplayStore(
		(state) => state.updateAllDisplayProducts
	);
	const setAllCategories = useCategoryStore((state) => state.updateCategories);

	const fetchProducts = async () => {
		const res = await getAllProductsAPI();
		if (res) {
			setDisplayProducts(res.data);
		}
	};

	const fetchAllCategories = async () => {
		const response = await getAllCategoriesAPI();
		if (response) {
			if (response.status === 200) {
				setAllCategories(response.data);
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetchAllCategories();
			await fetchProducts();
		};

		fetchData();
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
