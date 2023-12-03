import React from "react";
import LoginForm from "../shared/formComponent/LoginForm";

export default function LoginScreen() {
	return (
		<div className="bg-gray-100 flex justify-center items-center h-screen">
			<div className="w-1/2 h-screen hidden lg:block">
				<img
					src="https://keebsforall.com/cdn/shop/products/Zoom65_1.webp?v=1674710934&width=2048"
					alt="Placeholder"
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 font-mono">
				<h1 className="text-2xl font-semibold mb-4">Đăng nhập</h1>
				<LoginForm />
				<div className="mt-6 text-black-500 text-center">
					Chưa có tài khoản?{" "}
					<a href="/signup" className="hover:underline font-bold">
						Đăng ký ngay
					</a>
				</div>
			</div>
		</div>
	);
}
