import React from "react";
import ProdImage from "./ProdImage";

const lableStyle =
	"mt-5 text-center mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 cursor-pointer";

export default function UploadImage({ imageList, setImageList }) {
	const handleAddImage = (e) => {
		const files = e.target.files;
		const newImageList = [...imageList];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			newImageList.push({
				uid: file.uid,
				name: file.name,
				status: "done",
				url: URL.createObjectURL(file),
			});
		}
		setImageList(newImageList);
		console.log(imageList);
	};

	const handleRemoveImage = (uid) => {
		const newImageList = imageList.filter((image) => image.uid !== uid);
		setImageList(newImageList);
	};

	const handleReplaceImage = (uid, e) => {
		const file = e.target.files[0];
		const newImageList = imageList.map((image) => {
			if (image.uid === uid) {
				return {
					uid: file.uid,
					name: file.name,
					status: "done",
					url: URL.createObjectURL(file),
				};
			}
			return image;
		});
		setImageList(newImageList);
	};

	return (
		<div>
			<p>Ảnh sản phẩm</p>
			<div className=" ">
				<div className="grid grid-cols-3 mb-3 gap-1">
					{imageList.slice(0, 8).map((image) => (
						<div className="col-span-1" key={image.uid}>
							<ProdImage
								src={image.url}
								alt={image.name}
								handleDeleteImage={handleRemoveImage}
								handleReplaceImage={handleReplaceImage}
								uid={image.uid}
								key={image.uid}
							/>
						</div>
					))}
					<div className="col-span-1 max-w-[100%] rounded-md border-2 border-black my-1 justify-content-center ">
						<p className="text-2xl font-mono ">+1</p>
					</div>
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
