import React from "react";
import { useState } from "react";
import { Carousel, Breadcrumb, Tag, ConfigProvider } from "antd";
import { Button, Statistic } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";

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
	const productImages = [
		'https://bizweb.dktcdn.net/thumb/1024x1024/100/438/322/files/35.jpg?v=1687918895518',
		'https://bizweb.dktcdn.net/thumb/1024x1024/100/438/322/files/36.jpg?v=1687918896521',
		'https://bizweb.dktcdn.net/thumb/1024x1024/100/438/322/products/3-eeecca4e-cb20-4918-9144-fdf52701fc04.jpg?v=1687918809890',
		'https://bizweb.dktcdn.net/thumb/1024x1024/100/438/322/files/pcb-67d34a02-fb2c-4545-b0b2-45c502e08752.jpg?v=1687841227874',
	]

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
		<div>
		<Breadcrumb className="mt-5 ml-5 mb-3 font-mono" separator=">"
			items={[
			{
				title: 'Trang chủ',
				href: '/',
			},
			{
				title: 'Danh mục sản phẩm',
				href: '/product_page',
			},
			{
				title: 'Sản phẩm',
				href: '/product',
			},
			]}
		/>
		<div className="flex mt-5 mb-5 pt-5 pb-5 bg-white">
			<Carousel 
					dotPosition="left" 
					className="ml-[100px] w-[500px]"
					autoplay
					autoplaySpeed={3000}>
				{productImages.map((image, index) => (
					<div key={index}>
						<img src={image} alt="product" className="w-full h-[500px] object-contain rounded-lg" />
					</div>
				))}
			</Carousel>

			<div className="ml-7 font-mono w-[600px]">
			<ConfigProvider theme={{token: { colorPrimary: '#F8C70E', fontFamily: 'monospace' } }} >
				<h2 className="mb-2">{product.name}</h2>
				<p className="mb-1 text-base"><strong>Phân loại:</strong> {product.category}</p>
				<p className="mb-1 text-base"><strong>Thương hiệu:</strong> {product.brand}</p>
				<Tag className="text-large mb-5" color={tagColor}>{tagText}</Tag>
				<p className="mb-4 text-justify"><strong>Mô tả:</strong> {product.description}</p>
				<Statistic className="mb-10" value={product.price} suffix="VNĐ" />

				<div className="flex">
					<Button 
						icon={<MinusOutlined />}
						onClick={() => setDecrease()}/>
					<h3 className="mr-5 ml-5 text-center size-xl text-medium]">{amount}</h3>
					<Button
						icon={<PlusOutlined />} 
						onClick={() => setIncrease()} />
					<button 
						className="ml-5 text-center bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer font-semibold rounded-md px-4"
						type="default" 
						onClick={() => {
							toast.success('Thêm vào giỏ hàng thành công');
						}}>
						Thêm vào giỏ hàng
					</button>
				</div>
			
			<p className="mt-2">Còn: {product.stock} sản phẩm</p>
			</ConfigProvider>
			</div>
		</div>
	</div>
	)
}
