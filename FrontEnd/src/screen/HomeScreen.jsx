import React from "react";
import NavigationBar from "../components/shared/NavigationBar";
import Carousel from "../components/home_screen/Carousel";

export default function HomeScreen() {
	return (
		<div>
			<NavigationBar />
			<Carousel />
			<div className="w-[70%] m-auto font-mono mt-2">
				<div>
					<h2>Hot</h2>
				</div>
			</div>
		</div>
	);
}
