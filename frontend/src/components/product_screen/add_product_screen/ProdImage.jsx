import React, { useState } from "react";
import MyButton from "../../shared/MyButton";

export default function ProdImage({ src, alt, handleDeleteImage }) {
	const [hover, setHover] = useState(false);

	const handleMouseEnter = () => {
		setHover(true);
	};

	const handleMouseLeave = () => {
		setHover(false);
	};

	return (
		<div>
			{src.length > 0 ? (
				<div
					className="relative border-2 border-black rounded-md mb-5 "
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div>
						<img
							className="w-full h-32 object-cover rounded-md "
							src={src}
							alt={alt}
						/>
					</div>
					{hover && (
						<div className="flex flex-col absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
							<MyButton name={"Xóa ảnh"} onClick={() => handleDeleteImage()} />
						</div>
					)}
				</div>
			) : (
				<div className="mb-5 "></div>
			)}
		</div>
	);
}
