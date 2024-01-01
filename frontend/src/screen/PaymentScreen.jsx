import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { Form, Input, Radio, Space } from "antd";
import { Collapse } from "antd";
import { Breadcrumb } from "antd";
import ProdCart from "../components/cart_screen/ProdCart";
import useCartStore from "../stores/CartStore";
import { toast } from "react-toastify";
import { useImmer } from "use-immer";
import { createOrderAPI, createOrderDetailAPI } from "../services/UserServices";

export default function PaymentScreen() {
	const cart = useCartStore((state) => state.cart);

	const [price, setPrice] = useImmer(0);
	const [displayCartProducts, setDisplayCartProducts] = useImmer([]);
	const inputFieldValue = useRef({
		fullname: "",
		email: "",
		phone_number: "",
		address: "",
		note: "",
		payment_method: "",
		shipping_method: "",
		payment_image: "none",
		total_price: "",
		user_id: "",
		status_id: "1",
	});
	const cartItems = useRef([]);

	const [form] = Form.useForm();

	const [shipping, setShipping] = useState(1);
	const onChangeShipping = (e) => {
		setShipping(e.target.value);
		inputFieldValue.current.shipping_method = e.target.value;
	};

	const [payment, setPayment] = useState(1);
	const onChangePayment = (e) => {
		setPayment(e.target.value);
		inputFieldValue.current.payment_method = e.target.value;
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		var decodeToken = {};
		if (token) {
			decodeToken = JSON.parse(atob(token?.split(".")[1]));
		}
		const user_id = decodeToken?.user_id;
		inputFieldValue.current.user_id = user_id;
	}, []);

	useEffect(() => {
		setDisplayCartProducts(cart);
		cartItems.current = cart;
		setPrice(
			cart.reduce((total, item) => {
				return total + item.price * item.quantity;
			}, 0)
		);
	}, [cart]);

	const formatPrice = (price) => {
		inputFieldValue.current.total_price = price;
		return price.toLocaleString("it-IT", {
			style: "currency",
			currency: "VND",
		});
	};

	const handleOrder = async () => {
		const response = await createOrderAPI(
			inputFieldValue.current.address,
			inputFieldValue.current.phone_number,
			inputFieldValue.current.email,
			inputFieldValue.current.fullname,
			inputFieldValue.current.note,
			inputFieldValue.current.user_id,
			inputFieldValue.current.status_id,
			inputFieldValue.current.total_price,
			inputFieldValue.current.payment_image,
			inputFieldValue.current.payment_method,
			inputFieldValue.current.shipping_method
		);
		if (response) {
			if (response.status === 200) {
				const order_id = response.data.id;
				var flag = true;
				for (let i = 0; i < cartItems.current.length; i++) {
					const response = await createOrderDetailAPI(
						order_id,
						cartItems.current[i].id,
						cartItems.current[i].quantity
					);
					if (response.status === 200) {
					} else {
						flag = false;
					}
				}
				if (flag) {
					toast.success("Đặt hàng thành công");
					localStorage.removeItem("cart");
					setTimeout(() => {
						window.location.href = "/";
					}, 1000);
				} else {
					toast.error("Đặt hàng thất bại, xin hãy thử lại");
				}
			} else {
				toast.error("Đặt hàng thất bại, xin hãy thử lại");
			}
		}
	};

	return (
		<ConfigProvider
			theme={{
				token: { colorPrimary: "#F8C70E", fontFamily: "monospace" },
				components: {
					Collapse: {
						headerPadding: "5px 5px 0px 5px",
						contentPadding: "5px 5px 0px 5px",
					},
				},
			}}
		>
			<Breadcrumb
				className="mt-5 ml-5 mb-2 font-mono"
				separator=">"
				items={[
					{
						title: "Trang chủ",
						href: "/",
					},
					{
						title: "Giỏ hàng",
						href: "/cart",
					},
					{
						title: "Thanh toán",
						href: "/payment",
					},
				]}
			/>

			<div className="flex font-mono p-5 gap-x-[80px] justify-center bg-white">
				<div className="">
					<p className="text-xl mb-4 font-bold">Thông tin mua hàng</p>
					<Form form={form} layout="vertical" className="mx-4">
						<Form.Item
							label="Họ và tên người nhận"
							required
							tooltip="Thông tin bắt buộc"
							style={{ marginBottom: "5px" }}
						>
							<Input
								placeholder="Họ và tên"
								style={{ width: "350px" }}
								onChange={(e) =>
									(inputFieldValue.current.fullname = e.target.value)
								}
							/>
						</Form.Item>
						<Form.Item
							label="Email"
							required
							tooltip="Thông tin bắt buộc"
							style={{ marginBottom: "5px" }}
						>
							<Input
								placeholder="Email"
								onChange={(e) =>
									(inputFieldValue.current.email = e.target.value)
								}
							/>
						</Form.Item>
						<Form.Item
							label="Số điện thoại"
							required
							tooltip="Thông tin bắt buộc"
							style={{ marginBottom: "5px" }}
						>
							<Input
								placeholder="Số điện thoại"
								onChange={(e) =>
									(inputFieldValue.current.phone_number = e.target.value)
								}
							/>
						</Form.Item>
						<Form.Item
							label="Địa chỉ nhận hàng"
							required
							tooltip="Thông tin bắt buộc"
							style={{ marginBottom: "5px" }}
						>
							<Input
								placeholder="Địa chỉ nhận hàng"
								onChange={(e) =>
									(inputFieldValue.current.address = e.target.value)
								}
							/>
						</Form.Item>
						<Form.Item label="Ghi chú">
							<Input.TextArea
								rows={4}
								onChange={(e) =>
									(inputFieldValue.current.note = e.target.value)
								}
							/>
						</Form.Item>
					</Form>
				</div>

				<div>
					<p className="text-xl mb-2 font-bold">Vận chuyển</p>
					<Radio.Group
						onChange={onChangeShipping}
						value={shipping}
						className="w-[350px] border-2 p-2 rounded-lg"
					>
						<Space direction="vertical">
							<Collapse
								accordion
								bordered={false}
								ghost
								items={[
									{
										key: "1",
										label: (
											<Radio value={"Nhận tại cửa hàng"}>
												Nhận tại cửa hàng
											</Radio>
										),
										children: (
											<p className="w-[330px]">
												Địa chỉ nhận hàng trực tiếp: 144 Xuân Thủy, Dịch Vọng
												Hậu, Cầu Giấy, Hà Nội
											</p>
										),
										showArrow: false,
									},
									{
										key: "2",
										label: (
											<Radio value={"Vận chuyển thường"}>
												Vận chuyển thường
											</Radio>
										),
										children: (
											<p className="w-[330px]">
												Thời gian dự kiến: 2 ngày (Hà Nội) và 3-4 ngày (các tỉnh
												khác)
											</p>
										),
										showArrow: false,
									},
									{
										key: "3",
										label: (
											<Radio value={"Vận chuyển nhanh"}>Vận chuyển nhanh</Radio>
										),
										children: (
											<p className="w-[330px]">
												Thời gian dự kiến: 1 ngày (Hà Nội) và 2-3 ngày (các tỉnh
												khác)
											</p>
										),
										showArrow: false,
									},
								]}
							/>
						</Space>
					</Radio.Group>

					<p className="text-xl mt-4 mb-2 font-bold">Hình thức thanh toán</p>
					<Radio.Group
						onChange={onChangePayment}
						value={payment}
						className="w-[350px] border-2 p-2 rounded-lg"
					>
						<Space direction="vertical">
							<Collapse
								accordion
								bordered={false}
								ghost
								items={[
									{
										key: "1",
										label: (
											<Radio value={"Thanh toán khi nhận hàng"}>
												Thanh toán khi nhận hàng
											</Radio>
										),
										children: <p className="w-0 h-0"></p>,
										showArrow: false,
									},
									{
										key: "2",
										label: (
											<Radio value={"Chuyển khoản qua ngân hàng"}>
												Chuyển khoản qua ngân hàng
											</Radio>
										),
										children: (
											<div className="w-[330px]">
												<p className="mb-2 ml-2">
													Quý khách chuyển tiền vào tài khoản dưới đây và đính
													kèm link ảnh chụp màn hình chuyển khoản.
												</p>
												<img
													src="https://scontent.fhan14-4.fna.fbcdn.net/v/t1.15752-9/407243540_1735952993579268_2477408516973975277_n.png?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=VC-klUyOIZAAX8mvgMc&_nc_ht=scontent.fhan14-4.fna&oh=03_AdRFg1HHUC0XodzAXmgs3EgIqAfVdtwmEZU-dPY4CC0WSw&oe=65B5C578"
													alt="Vietcombank"
													className="w-[300px] ml-2"
												/>
												<p className="mt-2 ml-2">Link ảnh:</p>
												<Input
													onChange={(e) =>
														(inputFieldValue.current.payment_image =
															e.target.value)
													}
													className="w-[300px] ml-2 mt-2"
												/>
											</div>
										),
										showArrow: false,
									},
								]}
							/>
						</Space>
					</Radio.Group>
				</div>

				<div>
					<div className="border-2 border-gray-200 rounded-lg p-5">
						<p className="text-xl mb-2 font-bold">Thông tin sản phẩm</p>
						{/* <ProdCart />
						<ProdCart /> */}

						{displayCartProducts.map((displayCartProduct) => (
							<ProdCart
								key={displayCartProduct.id}
								id={displayCartProduct.id}
								name={displayCartProduct.title}
								price={displayCartProduct.price}
								instock={displayCartProduct.inStockValue}
								quantity={displayCartProduct.quantity}
							/>
						))}

						<div className="flex justify-between">
							<p className="text-xl">Tổng cộng</p>
							<p className="text-xl">{formatPrice(price)} </p>
						</div>
						<button
							className="w-[200px] font-bold ml-[180px] bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer rounded-lg p-2 mt-2"
							onClick={() => handleOrder()}
						>
							Đặt hàng
						</button>
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
}
