import React, { useState } from "react";
import ProdImage from "./ProdImage";
import { createProdImageAPI } from "../../../services/AdminServices";

const lableStyle =
	"mt-5 text-center mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 cursor-pointer";

export default function UploadImage({ uploadImg, setUploadImg }) {
	const [imageURL, setImageURL] = useState("");

	const handleAddImage = async (e) => {
		let files = e.target.files;
		let imageURL = URL.createObjectURL(files[0]);
		setImageURL(imageURL);
		setUploadImg(files[0]);
	};

	const handleRemoveImage = () => {
		setUploadImg({});
		setImageURL("");
	};

	return (
		<div>
			<p>Ảnh sản phẩm</p>
			<div className=" ">
				<ProdImage
					src={imageURL}
					alt={uploadImg.name}
					handleDeleteImage={handleRemoveImage}
				/>

				<input
					type="file"
					id="upload-image"
					onChange={handleAddImage}
					className="hidden"
				/>
				<label htmlFor="upload-image" className={lableStyle}>
					Thêm ảnh
				</label>
			</div>
		</div>
	);
}
