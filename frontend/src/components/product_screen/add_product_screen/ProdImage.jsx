import React, { useState } from "react";
import MyButton from "../../shared/MyButton";

export default function ProdImage({
	src,
	alt,
	uid,
	key,
	handleDeleteImage,
	handleReplaceImage,
}) {
	const [hover, setHover] = useState(false);

	const handleMouseEnter = () => {
		setHover(true);
	};

	const handleMouseLeave = () => {
		setHover(false);
	};

	return (
		<div
			className="relative h-32 border-2 border-black rounded-md my-1"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<img
				key={key}
				src={src}
				alt={alt}
				className="rounded-md border-2 object-cover h-full w-full"
			/>
			{hover && (
				<div className="flex flex-col absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
					<MyButton name={"Xóa ảnh"} onClick={() => handleDeleteImage(uid)} />
					<MyButton name={"Đổi ảnh"} onClick={() => handleReplaceImage(uid)} />
				</div>
			)}
		</div>
	);
}
