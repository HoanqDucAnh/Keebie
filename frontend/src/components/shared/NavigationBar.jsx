import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
	AiOutlineSearch,
	AiOutlineUser,
	AiOutlineShoppingCart,
	AiFillCaretDown,
} from "react-icons/ai";
import { ConfigProvider, Dropdown, Space, Drawer } from "antd";
import { toast } from "react-toastify";
import SearchDrawer from "../home_screen/SearchDrawer";

const NavigationBar = () => {
	const [nav, setNav] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [open, setOpen] = useState(false);
	const isLogin = localStorage.getItem("token");

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const handleNav = () => {
		setNav(!nav);
	};

	useEffect(() => {
		const isAdmin = localStorage.getItem("isAdmin");
		if (isAdmin === "true") {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("isAdmin");
		toast.success("Đăng xuất thành công");
		window.location.href = "/";
	};

	const userDropdownItems = [
		{
			key: "1",
			label: (
				<a rel="noopener noreferrer" href="/login">
					Đăng nhập
				</a>
			),
		},
		{
			key: "2",
			label: (
				<a rel="noopener noreferrer" href="/signup">
					Đăng ký
				</a>
			),
		},
	];

	const userDropdownItems2 = [
		{
			key: "3",
			label: (
				<a rel="noopener noreferrer" href="/profile">
					Tài khoản
				</a>
			),
		},
		{
			key: "4",
			label: <button onClick={handleLogout}>Đăng xuất</button>,
		},
	];

	const productDropdownItems = [
		{
			key: "1",
			label: (
				<Link to={{ pathname: "/product_page", state: { type: "keyboard" } }}>
					Bàn phím cơ
				</Link>
			),
		},
		{
			key: "2",
			label: (
				<Link to={{ pathname: "/product_page", state: { type: "keycap" } }}>
					Bộ nút phím cơ
				</Link>
			),
		},
		{
			key: "3",
			label: (
				<Link to={{ pathname: "/product_page", state: { type: "switch" } }}>
					Công tắc bàn phím
				</Link>
			),
		},
	];

	const groupbuyDropdownItems = [
		{
			key: "1",
			label: (
				<Link to={{ pathname: "/product_page" }}>
					Đang diễn ra
				</Link>
			),
		},
		{
			key: "2",
			label: (
				<Link to={{ pathname: "/product_page" }}>
					Sắp diễn ra
				</Link>
			),
		},
		{
			key: "3",
			label: (
				<Link to={{ pathname: "/product_page" }}>
					Kết thúc
				</Link>
			),
		},
	];

	return (
		<nav className="sticky w-full top-0 z-10 flex justify-between items-center h-18 mx-auto px-4 text-black bg-[#F8C70E]">
			<h1 className="text-3xl font-mono font-bold p-4 text-[#000000]">
				<Link to="/" className="hover:text-[#FFF5D6]">Keebi3.</Link>
			</h1>

			<div className="hidden md:flex">
				<ul className="flex font-mono text-xl">
					<li className="p-4">
						<Link to="/" className="hover:text-[#FFF5D6]">Trang chủ</Link>
					</li>
					<li className="p-4">
						<ConfigProvider theme={{ token: { fontFamily: "monospace" } }}>
							<Dropdown
								menu={{
									items: groupbuyDropdownItems,
								}}
								placement="bottomLeft"
							>
								<Link
									to={{ pathname: "/product_page" }}
									className="hover:text-[#FFF5D6]"
								>
									<Space>
										Group Buy <AiFillCaretDown />
									</Space>
								</Link>
							</Dropdown>
						</ConfigProvider>
					</li>
					<li className="p-4">
						<ConfigProvider theme={{ token: { fontFamily: "monospace" } }}>
							<Dropdown
								menu={{
									items: productDropdownItems,
								}}
								placement="bottomLeft"
							>
								<Link
									to={{ pathname: "/product_page" }}
									className="hover:text-[#FFF5D6]"
								>
									<Space>
										Sản phẩm <AiFillCaretDown />
									</Space>
								</Link>
							</Dropdown>
						</ConfigProvider>
					</li>
					<li className="p-4">
						<Link to="/contact" className="hover:text-[#FFF5D6]">Liên hệ</Link>
					</li>
					{isAdmin ? (
						<li className="p-4">
							<Link to="/admin" className="hover:text-[#FFF5D6]">Quản lí</Link>
						</li>
					) : null}
				</ul>
			</div>

			<div className="hidden md:flex">
				<ul className="flex text-2xl">
					<li className="p-2">
						<button className="hover:text-[#FFF5D6]" onClick={showDrawer}>
							<AiOutlineSearch />
						</button>
						<Drawer
							placement="top"
							closable={false}
							onClose={onClose}
							open={open}
							height={100}
						>
							<SearchDrawer />
						</Drawer>
					</li>
					<li className="p-2">
						<ConfigProvider
							theme={{
								token: { fontFamily: "monospace", colorBgTextHover: "white" },
							}}
						>
							<Dropdown
								menu={{
									items: isLogin ? userDropdownItems2 : userDropdownItems,
								}}
								placement="bottomRight"
							>
								<Link to={"/profile"} className="hover:text-[#FFF5D6]" >
									<Space>
										<AiOutlineUser />
									</Space>
								</Link>
							</Dropdown>
						</ConfigProvider>
					</li>
					<li className="p-2">
						<Link to={"/cart"} className="hover:text-[#FFF5D6]" >
							<AiOutlineShoppingCart />
						</Link>
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
					<li className="p-4 border-b border-[#F2D15D]">
						<Link to="/">Trang chủ</Link>
					</li>
					<li className="p-4 border-b border-[#F2D15D]">
						<Link to={{ pathname: "/product_page" }} >Group Buy</Link>
					</li>
					<li className="p-4 border-b border-[#F2D15D]">
						<Link to={{ pathname: "/product_page" }} >Sản phẩm</Link>
					</li>
					<li className="p-4 border-b border-[#F2D15D]">
						<Link to={{ pathname: "/contact" }}>Liên hệ</Link>
					</li>
					<li className="p-4 border-b border-[#F2D15D]">
						<Link to={{ pathname: "/profile" }}>Tài khoản</Link>
					</li>
					<li className="p-4 border-b border-[#F2D15D]">
						<Link to={{ pathname: "/cart" }}>Giỏ hàng</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavigationBar;
