import React from "react";
import { useState } from "react";
import { Carousel, Breadcrumb, Tag, ConfigProvider } from "antd";
import { Button, Statistic } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

export default function ProductDetailScreen() {
	const product = {
		id: 1,
		name: 'Cycle7',
		category: 'Bàn phím',
		brand: 'Wuque Studio',
		description: 'this is a keyboard this is a keyboard this is a keyboard this is a keyboard this is a keyboard this is a keyboard this is a keyboard this is a keyboard this is a keyboard this is a keyboard this is a keyboard',
		price: 4000000,
		stock: 10,
	}

	const [amount, setAmount] = useState(1);
	const setIncrease = () => {
		if (amount < product.stock) {
			setAmount(amount + 1);
		} else {
			setAmount(product.stock);
		}
	}
	const setDecrease = () => {
		if (amount > 1) {
			setAmount(amount - 1);
		} else {
			setAmount(1);
		}
	}
	
	const tagColor = product.stock > 0 ? 'green' : 'red';
	const tagText = product.stock > 0 ? 'Còn hàng' : 'Hết hàng';

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
			<Carousel 
					dotPosition="left" 
					className="ml-[100px] w-[500px]"
					autoplay
					autoplaySpeed={3000}>
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

			<div className="ml-7 font-mono w-[600px]">
			<ConfigProvider theme={{token: { colorPrimary: '#F8C70E', fontFamily: 'monospace' } }} >
				<h2 className="mb-2">{product.name}</h2>
				<p className="mb-1 text-base"><strong>Phân loại:</strong> {product.category}</p>
				<p className="mb-1 text-base"><strong>Thương hiệu:</strong> {product.brand}</p>
				<Tag className="text-large mb-5" color={tagColor}>{tagText}</Tag>
				<p className="mb-4 text-justify"><strong>Mô tả:</strong> {product.description}</p>
				<Statistic className="mb-10" value={product.price} suffix="VNĐ" />
				<div className="flex justify-center">
					<Button 
						icon={<MinusOutlined />}
						onClick={() => setDecrease()}/>
					<h3 className="mr-5 ml-5 text-center size-xl text-medium]">{amount}</h3>
					<Button
						icon={<PlusOutlined />} 
						onClick={() => setIncrease()} />
					<Button className="ml-5" type="default">Thêm vào giỏ hàng</Button>
				</div>
			</ConfigProvider>
			</div>
		</div>
	</div>
	)
}
