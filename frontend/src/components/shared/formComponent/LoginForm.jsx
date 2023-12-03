import React from "react";
import { Input } from "./Input";
import { useForm } from "react-hook-form";

export default function LoginForm() {
	// const methods = useForm();

	return (
		<form>
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
			<button
				type="submit"
				className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
			>
				Đăng nhập
			</button>
		</form>
	);
}
