import React from "react";

export default function MyButton({ name, onClick }) {
	return (
		<div
			className=" text-center bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer font-semibold rounded-md py-2 px-4"
			onClick={onClick}
		>
			{name}
		</div>
	);
}
