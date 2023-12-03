import React from "react";
import { Input } from "./Input";

export default function SignUpForm() {
	return (
		<form>
			<Input
				type="name"
				name="fullname"
				label="Họ và tên"
				placeholder="Hãy nhập họ và tên ..."
			/>
			<Input
				type="email"
				name="email"
				label="Email"
				placeholder="Hãy nhập email ..."
			/>
			<Input
				type="text"
				name="phone"
				label="Số điện thoại"
				placeholder="Hãy nhập số điện thoại ..."
			/>
			<Input
				type="name"
				name="username"
				label="Tên đăng nhập"
				placeholder="Hãy nhập tên đăng nhập ..."
			/>
			<Input
				type="password"
				name="password"
				label="Mật khẩu"
				placeholder="Hãy nhập mật khẩu ..."
			/>
			<Input
				type="password"
				name="confirmPassword"
				label="Xác nhận mật khẩu"
				placeholder="Hãy nhập lại mật khẩu ..."
			/>
			<button
				type="submit"
				className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
			>
				Đăng ký
			</button>
		</form>
	);
}
