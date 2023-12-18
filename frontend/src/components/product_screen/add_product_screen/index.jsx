import React, { useState } from "react";
import dayjs from "dayjs";
import TagSection from "./TagSection";
import UploadImage from "./UploadImage";
import {
	InputNumber,
	Input,
	DatePicker,
	ConfigProvider,
	Modal,
	Form,
} from "antd";
import { toast } from "react-toastify";
import { createCategoryAPI } from "../../../services/AdminServices";

const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

export default function AddProductComponent() {
	const [imageList, setImageList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState("Content of the modal");

	const [form] = Form.useForm();

	const [options, setOptions] = useState([]);
	const [productFieldValue, setProductFieldValue] = useState({
		product_name: "",
		product_image: "",
		content: "",
		category_id: "",
		price: "",
		instock: "",
		isPublic: "",
	});

	const cateSubmit = {
		cat_name: "",
		cat_detail: "",
	};

	const onEditInformation = () => {
		setIsEditing(true);
	};

	const resetEditing = () => {
		setIsEditing(false);
		cateSubmit.cat_name = "";
		cateSubmit.cat_detail = "";
	};

	const handleOk = async () => {
		setModalText("Đang thêm thể loại mới ..");
		setConfirmLoading(true);

		let respond = await createCategoryAPI(
			cateSubmit.cat_name,
			cateSubmit.cat_detail
		);
		if (respond) {
			if (respond.status === 200) {
				toast.success("Thêm thể loại thành công");
			} else {
				toast.error(`Thêm thể loại thất bại, ${respond.data.message}`);
			}
		}
		setConfirmLoading(false);
		resetEditing();
	};

	const handleFinishAddingProduct = (values) => {
		console.log(values);
	};

	return (
		<div className="grid grid-cols-5 gap-5 font-mono mx-5 ">
			{/* <div className="col-span-2 m-3">
				<h1 className="text-2xl font-semibold mb-5">Thông tin cơ bản</h1>
				<div className="mb-3">
					<p className="mb-2">Tên sản phẩm</p>
					<div className="flex flex-row">
						<Input
							placeholder="Nhập tên sản phẩm"
							className="mr-2"
							onChange={(e) => {
								setProductFieldValue({
									...productFieldValue,
									product_name: e.target.value,
								});
							}}
						/>
						<MyButton name={"+"} onClick={onEditInformation}></MyButton>
					</div>
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
								onChange={(e) => {
									setProductFieldValue({ ...productFieldValue, price: e });
								}}
							/>
						</div>
					</div>
					<div className="col-span-1">
						<p className="mb-2">Thể loại </p>
						<TagSection onChange={onChangeTagInput} />
					</div>
				</div>
				<div className="mb-3">
					<p className="mb-2">Mô tả sản phẩm</p>
					<TextArea
						showCount
						maxLength={500}
						rows={4}
						onChange={(e) => {
							setProductFieldValue({
								...productFieldValue,
								content: e.target.value,
							});
						}}
						onPaste={(e) => {
							const pastedValue = e.clipboardData.getData("text");
							setProductFieldValue({
								...productFieldValue,
								content: pastedValue,
							});
						}}
					/>
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
						onChange={(e) => {
							setProductFieldValue({ ...productFieldValue, instock: e });
						}}
					/>
				</div>
				<div className="mt-7">
					<MyButton
						name={"Thêm sản phẩm"}
						onClick={handleOnAddingProducts()}
					></MyButton>
				</div>
			</div>
			<div className="col-span-3 m-3 ">
				<h1 className="text-2xl font-semibold mb-5">Ảnh sản phẩm</h1>
				<p>Upload ảnh sản phẩm</p>
				<UploadImage imageList={imageList} setImageList={setImageList} />
			</div> */}
			<ConfigProvider
				theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
			>
				<Modal
					title="Thêm thể loại"
					open={isEditing}
					okButtonProps={{ style: { backgroundColor: "#F8C70E" } }}
					okText="Lưu"
					confirmLoading={confirmLoading}
					onCancel={() => {
						resetEditing();
					}}
					cancelText="Hủy"
					onOk={async () => {
						handleOk();
					}}
				>
					<div>
						<p className="mt-2 mb-1 ml-2 text-xl font-semibold">
							Tên thể loại mới
						</p>
						<Input
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
							type="text"
							onChange={(e) => {
								cateSubmit.cat_name = e.target.value;
							}}
							onPaste={(e) => {
								const pastedValue = e.clipboardData.getData("text");
								cateSubmit.cat_name = pastedValue;
							}}
						/>
						<p className="mt-2 mb-2 text-xl font-semibold">
							Miêu tả thể loại mới
						</p>
						<TextArea
							showCount
							maxLength={500}
							rows={4}
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
							onChange={(e) => {
								cateSubmit.cat_detail = e.target.value;
							}}
							onPaste={(e) => {
								const pastedValue = e.clipboardData.getData("text");
								cateSubmit.cat_detail = pastedValue;
							}}
						/>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="col-span-2 m-3">
				<h1 className="text-2xl font-semibold mb-5">Thông tin cơ bản</h1>
				<Form
					form={form}
					onFinish={handleFinishAddingProduct}
					name="addProductForm"
					layout="vertical"
					colon={false}
				>
					<Form.Item
						name="product_name"
						label="Tên sản phẩm"
						rules={[{ required: true }]}
					>
						<Input placeholder="Nhập tên sản phẩm" />
					</Form.Item>
					{/* <MyButton name={"+"} onClick={onEditInformation}></MyButton> */}

					<div className="grid grid-cols-2 gap-3 mb-3">
						<div className="col-span-1">
							<Form.Item
								name="price"
								label="Giá thành"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập giá thành",
									},
								]}
							>
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
							</Form.Item>
						</div>
						<div className="col-span-1">
							<Form.Item
								name="category_id"
								label="Thể loại"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập thể loại",
									},
								]}
							>
								<TagSection />
							</Form.Item>
						</div>
					</div>
					<Form.Item name="content" label="Mô tả sản phẩm">
						<TextArea showCount maxLength={500} rows={4} />
					</Form.Item>
					<div className="grid grid-cols-2 gap-5 mb-3">
						<div className="col-span-1">
							<Form.Item name="open_date" label="Ngày mở">
								<DatePicker
									style={{
										width: "100%",
									}}
									placeholder="Chọn ngày mở"
									format={dateFormatList}
								/>
							</Form.Item>
						</div>
						<div className="col-span-1">
							<Form.Item name="close_date" label="Ngày đóng">
								<DatePicker
									style={{
										width: "100%",
									}}
									placeholder="Chọn ngày đóng"
									format={dateFormatList}
								/>
							</Form.Item>
						</div>
					</div>
					<Form.Item
						name="instock"
						label="Số lượng sản phẩm"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập số lượng sản phẩm",
							},
						]}
						initialValue={1}
					>
						<InputNumber
							style={{
								width: "100%",
							}}
							formatter={(value) =>
								` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							}
							parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
						/>
					</Form.Item>
					<Form.Item>
						<button
							className="mt-4 text-center bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer font-semibold rounded-md py-2 px-4"
							type="submit"
						>
							Thêm sản phẩm
						</button>
					</Form.Item>
				</Form>
			</div>
			<div className="col-span-3 m-3 ">
				<h1 className="text-2xl font-semibold mb-5">Ảnh sản phẩm</h1>
				<p>Upload ảnh sản phẩm</p>
				<UploadImage imageList={imageList} setImageList={setImageList} />
			</div>
		</div>
	);
}
