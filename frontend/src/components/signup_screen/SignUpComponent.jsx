import React from "react";
import SignUpForm from "../shared/formComponent/SignUpForm";

const inputStyle =
	"w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]";

export default function SignUpComponent() {
	return (
		<div className="bg-gray-100 flex justify-center items-center h-screen">
			<div className="w-1/2 hidden lg:block h-screen">
				<img
					src="https://keebsforall.com/cdn/shop/products/Zoom65_1.webp?v=1674710934&width=2048"
					alt="Placeholder"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="lg:px-36 md:px-52 sm:px-20 px-8 w-full lg:w-1/2 font-mono">
				<h1 className="text-2xl font-semibold mb-4">Đăng ký người dùng mới</h1>
				<SignUpForm />
				<div className="mb-6 text-center pt-5 text-black">
					Đã có tài khoản?{" "}
					<a href="/login" className="hover:underline">
						<span className="font-semibold">Đăng nhập ngay!</span>
					</a>
				</div>
			</div>
		</div>
	);
}
