import React from "react";
import Carousel from "../components/home_screen/Carousel";
import HotSection from "../components/home_screen/HotSection";
import GroupBuySection from "../components/home_screen/GroupBuySection";
import InStockSection from "../components/home_screen/InStockSection";
import LastProdSection from "../components/home_screen/LastProdSection";

export default function HomeScreen() {
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
