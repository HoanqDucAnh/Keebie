import React, { useState } from "react";
import ProdImage from "./ProdImage";
import { set } from "react-hook-form";

const lableStyle =
	"mt-5 text-center mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 cursor-pointer";

export default function UploadHeaderImage({
	uploadImgHeader,
	setUploadImgHeader,
}) {
	const handleAddImage = async (e) => {
		let files = e.target.files;
		if (files.length > 0) {
			setUploadImgHeader({
				imgFile: files,
				imageURL: URL.createObjectURL(files[0]),
				id: "header",
			});
		}
	};

	const handleRemoveImage = () => {
		setUploadImgHeader({
			imgFile: null,
			imageURL: null,
			id: null,
		});
	};

	return (
		<div>
			<h3>Ảnh bìa sản phẩm</h3>
			<div className="mb-3">
				<div className="grid grid-cols-3 mb-3 gap-1 h-32 ">
					{uploadImgHeader.imgFile && (
						<div className="grid col-span-1 h-32 ">
							<ProdImage
								src={uploadImgHeader.imageURL}
								alt={uploadImgHeader.name}
								key={uploadImgHeader.id}
								handleDeleteImage={() => handleRemoveImage()}
							/>
						</div>
					)}
				</div>
				<input
					type="file"
					id="upload-header-image"
					onChange={handleAddImage}
					single
					className="hidden"
				/>
				<label htmlFor="upload-header-image" className={lableStyle}>
					Thêm ảnh bìa
				</label>
			</div>
		</div>
	);
}
