import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const slides = [
	"https://cdn.store-assets.com/s/402514/f/11242244.png",
	"https://keebsforall.com/cdn/shop/products/Zoom65_1.webp?v=1674710934&width=2048",
	"https://nextrift.com/wp-content/uploads/2020/11/kbdfans-kbd67-lite-10.jpg",
];

export default function MyCarousel() {
	let [current, setCurrent] = useState(0);

	useEffect(() => {
		let slider = setInterval(() => {
			if (current === slides.length - 1) setCurrent(0);
			else setCurrent(current + 1);
		}, 3000);
		return () => clearInterval(slider);
	}, [current]);

	let previousSlide = () => {
		if (current === 0) setCurrent(slides.length - 1);
		else setCurrent(current - 1);
	};
	let nextSlide = () => {
		if (current === slides.length - 1) setCurrent(0);
		else setCurrent(current + 1);
	};

	return (
		<div className="w-[70%] m-auto pt-10 overflow-hidden relative group">
			{/* Image for slider */}
			<div
				className="flex transition ease-out duration-700"
				style={{ transform: `translateX(-${current * 100}%)` }}
			>
				{slides.map((s) => {
					return <img src={s} alt="slide" />;
				})}
			</div>

			{/* Arrows for slider */}
			<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] rounded-full left-5 text-2xl text-[#F8C70E] cursor-pointer">
				<AiOutlineLeft onClick={previousSlide} />
			</div>
			<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] rounded-full right-5 text-2xl text-[#F8C70E] cursor-pointer">
				<AiOutlineRight onClick={nextSlide} />
			</div>

			{/* Tabs for slider */}
			<div className="absolute bottom-0 p-2 flex justify-center gap-3 w-full">
				{slides.map((s, i) => {
					return (
						<div
							onClick={() => setCurrent(i)}
							key={"circle" + i}
							className={`rounded-full w-3 h-1 cursor-pointer
	                                    ${
																				i === current
																					? "bg-[#F8C70E]"
																					: "bg-white"
																			}`}
						/>
					);
				})}
			</div>
		</div>
	);
}
