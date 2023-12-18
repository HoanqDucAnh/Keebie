import React from "react";
import ProdImage from "./ProdImage";
import { converImageToBinary } from "../../../utils";
import { createProdImageAPI } from "../../../services/AdminServices";

const lableStyle =
	"mt-5 text-center mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 cursor-pointer";

export default function UploadImage({ imageList, setImageList }) {
	const [submitFile, setSubmitFile] = React.useState();

	const handleAddImage = (e) => {
		const files = e.target.files;
		if (files) {
			let temp = [];
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				setSubmitFile(file);
				console.log(submitFile);
				var fileURL = URL.createObjectURL(file);
				temp.push({
					uid: file.name,
					name: file.name,
					url: fileURL,
				});
			}
			setImageList([...imageList, ...temp]);
		}
	};

	//TODO: FIX this
	const handleSubmitImage = async (prod_id, image) => {
		let respond = await createProdImageAPI(prod_id, image);
		if (respond) {
			if (respond.status == 200) {
				console.log(respond);
			} else if (respond.status == 500) {
				console.log(respond);
			} else {
				console.log(respond);
			}
		}
	};

	const handleRemoveImage = (uid) => {};

	const handleReplaceImage = (uid, e) => {};

	return (
		<div>
			<p>Ảnh sản phẩm</p>
			<div className=" ">
				<div className="grid grid-cols-3 mb-3  gap-1">
					{imageList.slice(0, 8).map((image) => (
						<div className="col-span-1 h-32" key={image.uid}>
							<ProdImage
								src={image.url}
								alt={image.name}
								handleDeleteImage={handleRemoveImage}
								handleReplaceImage={handleReplaceImage}
								key={image.name}
								uid={image.uid}
							/>
						</div>
					))}
					{imageList.length > 8 && (
						<div className="col-span-1 h-32 rounded-md border-2 border-black my-1 ">
							<div className="flex flex-col justify-center items-center h-full">
								<p className="text-2xl font-mono">+{imageList.length - 8}</p>
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
				<button
					className={lableStyle}
					onClick={async () => handleSubmitImage(2, submitFile)}
				>
					{" "}
					Lưu ảnh{" "}
				</button>
			</div>
		</div>
	);
}
