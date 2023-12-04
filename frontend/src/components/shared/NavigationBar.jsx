import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
	AiOutlineSearch,
	AiOutlineUser,
	AiOutlineShoppingCart,
	AiFillCaretDown,
} from "react-icons/ai";
import { ConfigProvider, Dropdown, Space } from 'antd';

const NavigationBar = () => {
	const [nav, setNav] = useState(true);

	const handleNav = () => {
		setNav(!nav);
	};

	const userDropdownItems = [
		{
			key: '1',
			label: (
			  <a target="_blank" rel="noopener noreferrer" href="/login">Đăng ký</a>
			),
		},
		{
			key: '2',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="/login">Đăng nhập</a>
			),
		},
	];

	const productDropdownItems = [
		{
			key: '1',
			label: (
			  <a target="_blank" rel="noopener noreferrer" href="/">Bàn phím cơ</a>
			),
		},
		{
			key: '2',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="/">Bộ nút phím cơ</a>
			),
		},
		{
			key: '3',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="/">Công tắc bàn phím</a>
			),
		},
		{
			key: '4',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="/">Phụ kiện khác</a>
			),
		},
	];

	const groupbuyDropdownItems = [
		{
			key: '1',
			label: (
			  <a target="_blank" rel="noopener noreferrer" href="/">Đang diễn ra</a>
			),
		},
		{
			key: '2',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="/">Sắp diễn ra</a>
			),
		},
		{
			key: '3',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="/">Đã kết thúc</a>
			),
		},
	];

	return (
		<nav className="sticky w-full top-0 z-10 flex justify-between items-center h-18 mx-auto px-4 text-black bg-[#F8C70E]">
			<h1 className="text-3xl font-mono font-bold p-4 text-[#000000]">
				<a href="/">Keebi3.</a>
			</h1>

			<div className="hidden md:flex">
				<ul className="flex font-mono text-xl">
					<li className="p-4">
						<a href="/">Trang chủ</a>
					</li>
					<li className="p-4">
					<ConfigProvider 
						theme={ { token: { fontFamily: 'monospace', } } } >
							<Dropdown
								menu={{
									items: groupbuyDropdownItems,
								}}
								placement="bottomLeft" >
									<a onClick={(e) => e.preventDefault()}>
										<Space>
											Group Buy <AiFillCaretDown />
										</Space>
									</a>
								</Dropdown>
						</ConfigProvider>
					</li>
					<li className="p-4">
					<ConfigProvider 
						theme={ { token: { fontFamily: 'monospace', } } } >
							<Dropdown
								menu={{
									items: productDropdownItems,
								}} 
								placement="bottomLeft" >
									<a onClick={(e) => e.preventDefault()}>
										<Space>
											Sản phẩm <AiFillCaretDown />
										</Space>
									</a>
								</Dropdown>
						</ConfigProvider>
					</li>
					<li className="p-4">
						<a href="/contact">Liên hệ</a>
					</li>
				</ul>
			</div>

			<div className="hidden md:flex">
				<ul className="flex text-2xl">
					<li className="p-2">
						<a href="/">
							<AiOutlineSearch />
						</a>
					</li>
					<li className="p-2">
					<ConfigProvider 
						theme={ { token: { fontFamily: 'monospace', } } } >
							<Dropdown
								menu={{
									items: userDropdownItems,
								}}
								placement="bottomRight" >
									<a onClick={(e) => e.preventDefault()}>
										<Space>
											<AiOutlineUser />
										</Space>
									</a>
								</Dropdown>
						</ConfigProvider>
					</li>
					<li className="p-2">
						<a href="/">
							<AiOutlineShoppingCart />
						</a>
					</li>
				</ul>
			</div>

			<div onClick={handleNav} className="block md:hidden">
				{!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
			</div>

			<div
				className={
					!nav
						? "fixed left-0 top-0 w-[50%] h-full border-r border-r-white-900 bg-[#FFF5D6] ease-in-out duration-500"
						: "fixed left-[-100%]"
				}
			>
				<h1 className="text-3xl font-mono font-bold p-4 text-[#000000]">
					Keebi3.
				</h1>
				<ul className="p-2 font-mono">
					<li className="p-4 border-b border-[#F2D15D]">Home</li>
					<li className="p-4 border-b border-[#F2D15D]">About</li>
					<li className="p-4 border-b border-[#F2D15D]">Product</li>
					<li className="p-4 border-b border-[#F2D15D]">Contact</li>
					<li className="p-4 border-b border-[#F2D15D]">Bid</li>
					<li className="p-4 border-b border-[#F2D15D]">Account</li>
					<li className="p-4 border-b border-[#F2D15D]">Cart</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavigationBar;
