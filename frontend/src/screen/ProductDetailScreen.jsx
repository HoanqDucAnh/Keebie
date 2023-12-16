import React from "react";
import { useState } from "react";
import { Carousel, Breadcrumb, Tag } from "antd";

export default function ProductDetailScreen() {
	const [counter, setCounter] = useState(1);
	const incrementCounter = () => {
		setCounter(counter + 1);
	};
	const decrementCounter = () => {
		if (counter > 1) {
			setCounter(counter - 1);
		} else {
			setCounter(1);
		}
	};

	return (
		<div className="m-5">
		<Breadcrumb className="mb-3 font-mono" separator=">"
			items={[
			{
				title: 'Trang chủ',
				href: '/',
			},
			{
				title: 'Sản phẩm',
				href: '/product',
			},
			]}
		/>
		<div className="flex">
			<Carousel dotPosition="left" className="w-[500px] border-black border-2">
				<div>
					<img
						className="h-[500px] w-[500px]"
						src="https://picsum.photos/200" alt="product" />
				</div>
				<div>
					<img
						className="h-[500px] w-[500px]"
						src="https://picsum.photos/200" alt="product" />
				</div>
				<div>
					<img
						className="h-[500px] w-[500px]"
						src="https://picsum.photos/200" alt="product" />
				</div>
				<div>
					<img
						className="h-[500px] w-[500px]"
						src="https://picsum.photos/200" alt="product" />
				</div>
			</Carousel>

			<div className="ml-5 font-mono w-[600px] border-black border-2">
				<h1>Tên sản phẩm</h1>
				<p>Phân loại: Bàn phím</p>
				<p>Thương hiệu: Wuque Studio</p>
				<p>Mô tả: </p>
				<h2>4.000.000đ</h2>
				<Tag color="green">Còn hàng</Tag>

			</div>
		</div>
	</div>
	)
}
