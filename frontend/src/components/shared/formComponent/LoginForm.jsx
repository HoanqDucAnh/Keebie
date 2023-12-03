import React from "react";
import { Input } from "./Input";
import { FormProvider, useForm } from "react-hook-form";

export default function LoginForm() {
	const methods = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		console.log(data);
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()} noValidate>
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
					onClick={onSubmit}
					className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
				>
					Đăng nhập
				</button>
			</form>
		</FormProvider>
	);
}
