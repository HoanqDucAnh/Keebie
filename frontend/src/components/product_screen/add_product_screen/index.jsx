import React, { useState } from "react";
import dayjs from "dayjs";
import TagSection from "./TagSection";
import UploadImage from "./UploadImage";
import { InputNumber, Input, DatePicker } from "antd";

const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const dateNow = dayjs().format(dateFormatList[0]);

export default function AddProductComponent() {
	const [imageList, setImageList] = useState([]);

	return (
		<div className="grid grid-cols-5 gap-5 font-mono mx-5 ">
			<div className="col-span-2 m-3">
				<h1 className="text-2xl font-semibold mb-5">Thông tin cơ bản</h1>
				<div className="mb-3">
					<p className="mb-2">Tên sản phẩm</p>
					<Input placeholder="Nhập tên sản phẩm" />
				</div>
				<div className="grid grid-cols-2 gap-3 mb-3">
					<div className="col-span-1">
						<div className="inline-block">
							<p className="mb-2">Giá thành</p>
							<InputNumber
								style={{
									width: "100%",
								}}
								addonBefore="+"
								addonAfter="VND"
								formatter={(value) =>
									` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
								}
								parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
							/>
						</div>
					</div>
					<div className="col-span-1">
						<p className="mb-2">Thể loại </p>
						<TagSection />
					</div>
				</div>
				<div className="mb-3">
					<p className="mb-2">Mô tả sản phẩm</p>
					<TextArea showCount maxLength={500} rows={4} />
				</div>
				<div className="grid grid-cols-2 gap-5 mb-3">
					<div className="col-span-1">
						<p className="mb-2">Ngày mở</p>
						<DatePicker
							style={{
								width: "100%",
							}}
							defaultValue={dayjs(dateNow, dateFormatList[0])}
							format={dateFormatList}
						/>
					</div>
					<div className="col-span-1">
						<p className="mb-2">Ngày đóng</p>
						<DatePicker
							style={{
								width: "100%",
							}}
							defaultValue={dayjs(dateNow, dateFormatList[0])}
							format={dateFormatList}
						/>
					</div>
				</div>
				<div className="mb-3">
					<p className="mb-2">Số lượng sản phẩm</p>
					<InputNumber
						style={{
							width: "100%",
						}}
						defaultValue={1}
						formatter={(value) =>
							` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						}
						parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
					/>
				</div>
			</div>
			<div className="col-span-3 m-3 ">
				<h1 className="text-2xl font-semibold mb-5">Ảnh sản phẩm</h1>
				<p>Upload ảnh sản phẩm</p>
				<UploadImage imageList={imageList} setImageList={setImageList} />
			</div>
		</div>
	);
}
