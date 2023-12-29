import React, { useState } from "react";
import dayjs from "dayjs";
import TagSection from "./TagSection";
import UploadImage from "./UploadImage";
import MyButton from "../../shared/MyButton";
import {
	InputNumber,
	Input,
	DatePicker,
	ConfigProvider,
	Modal,
	Form,
	message,
	Upload,
} from "antd";
import { toast } from "react-toastify";
import {
	createCategoryAPI,
	createProdImageAPI,
	createProductAPI,
} from "../../../services/AdminServices";
import { useImmer } from "use-immer";
import UploadHeaderImage from "./UploadHeaderImage";
import { set } from "react-hook-form";

const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

export default function AddProductComponent() {
	const [uploadImgList, setUploadImgList] = useImmer([]);
	const [uploadImgHeader, setUploadImgHeader] = useImmer([]);
	const [isEditing, setIsEditing] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState("Content of the modal");
	const [form] = Form.useForm();
	const productFieldValue = {
		product_name: "",
		content: "",
		category_id: "",
		price: "",
		instock: "",
		brand: "",
		headerImage: "",
	};

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

	const handleSubmitImage = async (prodID) => {
		let imageList = uploadImgList;
		let respond = await createProdImageAPI(imageList, prodID);
		if (respond) {
			if (respond.status == 200) {
				toast.success("Thêm ảnh thành công");
				return respond;
			} else if (respond.status == 500) {
				toast.error("Lỗi server, xin thử lại sau");
			} else {
				toast.error("Lỗi ảnh, xin thử lại sau");
			}
		}
	};

	const setProductFieldValue = (value, imgHeader) => {
		productFieldValue.product_name = value.product_name;
		productFieldValue.brand = value.brand;
		productFieldValue.price = value.price;
		productFieldValue.instock = value.instock;
		productFieldValue.content = value.content;
		productFieldValue.category_id = value.category_id;
		productFieldValue.headerImage = imgHeader;
	};

	const handleFinishAddingProduct = async (values) => {
		let headerImage = uploadImgHeader.imgFile[0];
		setProductFieldValue(values, headerImage);
		console.log(productFieldValue);
		let respond = await createProductAPI(
			productFieldValue.product_name,
			productFieldValue.brand,
			productFieldValue.price,
			productFieldValue.instock,
			productFieldValue.content,
			productFieldValue.category_id,
			productFieldValue.headerImage
		);
		if (respond) {
			if (respond.status === 200) {
				let respondImage = await handleSubmitImage(respond.data.id);
				if (respondImage) {
					toast.success("Thêm sản phẩm thành công");
					form.resetFields();
					setUploadImgList([]);
					setUploadImgHeader([]);
				}
			} else {
				toast.error(`Thêm sản phẩm thất bại, ${respond.data.message}`);
			}
		}
	};

	return (
		<div className="grid grid-cols-5 gap-5 font-mono mx-5 ">
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
						rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
					>
						<Input placeholder="Nhập tên sản phẩm" />
					</Form.Item>

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
					<div className="grid grid-cols-2 gap-3 mb-3">
						<div className="col-span-1">
							<Form.Item
								name="brand"
								label="Thương hiệu"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập thương hiệu",
									},
								]}
							>
								<Input placeholder="Nhập thương hiệu" />
							</Form.Item>
						</div>
						<div className="col-span-1">
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
						</div>
					</div>
					<Form.Item
						name="content"
						label="Mô tả sản phẩm"
						rules={[
							{ required: true, message: "Vui lòng nhập mô tả sản phẩm" },
						]}
					>
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

					<Form.Item>
						<button
							className="mt-4 text-center bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer font-semibold rounded-md py-2 px-4"
							type="submit"
						>
							Thêm sản phẩm
						</button>
						<button
							className="mt-4 ml-3 text-center bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer font-semibold rounded-md py-2 px-4"
							onClick={onEditInformation}
						>
							Thêm thể loại
						</button>
					</Form.Item>
				</Form>
			</div>
			<div className="col-span-3 m-3 ">
				<h1 className="text-2xl font-semibold mb-3">Ảnh sản phẩm</h1>
				<UploadHeaderImage
					uploadImgHeader={uploadImgHeader}
					setUploadImgHeader={setUploadImgHeader}
				/>
				<UploadImage
					uploadImgList={uploadImgList}
					setUploadImgList={setUploadImgList}
				/>
			</div>
		</div>
	);
}
