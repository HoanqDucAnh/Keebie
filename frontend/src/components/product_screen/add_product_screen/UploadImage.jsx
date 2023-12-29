import React, { useState } from "react";
import ProdImage from "./ProdImage";
import { createProdImageAPI } from "../../../services/AdminServices";
import { useImmer } from "use-immer";

const lableStyle =
	"mt-5 text-center mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 cursor-pointer";

export default function UploadImage({ uploadImgList, setUploadImgList }) {
	const handleAddImage = async (e) => {
		let files = e.target.files;
		for (let i = 0; i < files.length; i++) {
			console.log(files[i]);
			setUploadImgList((draft) => {
				draft.push({
					imgFile: files[i],
					imageURL: URL.createObjectURL(files[i]),
					id: i,
				});
			});
		}
	};

	const handleRemoveImage = (imageID) => {
		setUploadImgList((draft) => {
			return draft.filter((image) => image.id !== imageID);
		});
	};

	return (
		<div>
			<p>Ảnh sản phẩm khác</p>
			<div className=" ">
				<div
					className="grid grid-cols-3 mb-3 gap-1 "
					style={{ height: "17rem" }}
				>
					{uploadImgList.slice(0, 5).map((image, index) => {
						return (
							<div className="grid col-span-1 h-32" key={index}>
								<ProdImage
									src={image.imageURL}
									alt={image.name}
									key={image.id}
									handleDeleteImage={() => handleRemoveImage(image.id)}
								/>
							</div>
						);
					})}
					{uploadImgList.length > 5 && (
						<div className="grid col-span-1 h-32 rounded-md border-2 border-black">
							<div className="flex text-2xl flex-col justify-center items-center h-full">
								<p className="text-center">+{uploadImgList.length - 5} ảnh</p>
							</div>
						</div>
					)}
				</div>
				<input
					type="file"
					id="upload-image"
					onChange={handleAddImage}
					multiple
					className="hidden"
				/>
				<label htmlFor="upload-image" className={lableStyle}>
					Thêm ảnh
				</label>
			</div>
		</div>
	);
}
