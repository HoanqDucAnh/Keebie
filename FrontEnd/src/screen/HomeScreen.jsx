import React from "react";
import NavigationBar from "../components/shared/NavigationBar";
import Carousel from "../components/home_screen/Carousel";
import ProductRow from "../components/shared/productComponent/ProductRow";
import HotSection from "../components/home_screen/HotSection";

export default function HomeScreen() {
	return (
		<div>
			<NavigationBar />
			<Carousel />
			<div className="w-[70%] m-auto font-mono mt-2">
				<HotSection />
				<div className="mt-4">
					<h2>New</h2>
					<ProductRow />
				</div>
			</div>
		</div>
	);
}
