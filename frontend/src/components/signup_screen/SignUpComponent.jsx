import React from "react";

const inputStyle =
	"w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]";
const buttonStyle =
	"bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full";

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
				<form action="#" method="POST">
					<div className="mb-4">
						<label for="username" className="block text-gray-600">
							Họ và Tên
						</label>
						<input
							type="text"
							id="fullName"
							name="fullname"
							className={inputStyle}
							autocomplete="off"
						/>
					</div>

					<div className="mb-4">
						<label for="password" className="block text-gray-600">
							Số điện thoại
						</label>
						<input
							type="number"
							id="phoneNumber"
							name="phonenumber"
							className={inputStyle}
							autocomplete="off"
						/>
					</div>

					<div className="mb-4">
						<label for="password" className="block text-gray-600">
							Email
						</label>
						<input
							type="email"
							id="userEmail"
							name="useremail"
							className={inputStyle}
							autocomplete="off"
						/>
					</div>

					<div className="mb-4">
						<label for="password" className="block text-gray-600">
							Tên đăng nhập
						</label>
						<input
							type="text"
							id="userName"
							name="username"
							className={inputStyle}
							autocomplete="off"
						/>
					</div>

					<div className="mb-4">
						<label for="password" className="block text-gray-600">
							Mật khẩu
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className={inputStyle}
							autocomplete="off"
						/>
					</div>

					<button
						type="submit"
						className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
					>
						Đăng ký
					</button>
				</form>
				<div className="mb-6 text-center pt-5 text-black">
					<a href="/login" className="hover:underline">
						Đã có tài khoản?{" "}
						<span className="font-semibold">Đăng nhập ngay!</span>
					</a>
				</div>
			</div>
		</div>
	);
}
