import React, { useState } from "react";
import { Input } from "./Input";
import { FormProvider, useForm } from "react-hook-form";
import { loginAPI } from "../../../services/UserServices";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function LoginForm() {
	const methods = useForm();
	const [loginField, setLoginField] = useState({
		username: "",
		password: "",
	});
	const [isLogging, setIsLogging] = useState(false);

	function cleanUp() {
		setLoginField({
			username: "",
			password: "",
		});
		methods.reset();
	}

	const onSubmit = methods.handleSubmit(async (data) => {
		setIsLogging(true);
		setLoginField(
			(loginField.username = data.username),
			(loginField.password = data.password)
		);
		let respond = await loginAPI(loginField.username, loginField.password);
		setIsLogging(false);

		if (respond) {
			if (respond.status === 200) {
				localStorage.setItem("token", respond.data.access_token);
				toast.success("Đăng nhập thành công");
				setTimeout(() => {
					window.location.href = "/";
				}, 1000);
			} else {
				toast.error("Đăng nhập thất bại, sai tên đăng nhập hoặc mật khẩu");
			}
		}

		cleanUp();
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()} noValidate>
				<Input
					type="name"
					name="username"
					label="Tên đăng nhập"
					id="username"
					placeholder="Hãy nhập tên đăng nhập"
					validation={{
						required: {
							value: true,
							message: "Không được để trống",
						},
					}}
				/>
				<Input
					type="password"
					name="password"
					label="Mật khẩu"
					id="password"
					placeholder="Hãy nhập mật khẩu"
					validation={{
						required: {
							value: true,
							message: "Không được để trống",
						},
					}}
				/>
				{isLogging ? (
					<button
						disabled
						className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
					>
						Đang đăng nhập ...
					</button>
				) : (
					<button
						onClick={onSubmit}
						className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
					>
						Đăng nhập
					</button>
				)}
			</form>
		</FormProvider>
	);
}
