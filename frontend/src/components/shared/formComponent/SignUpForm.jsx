import React from "react";
import { Input } from "./Input";
import { FormProvider, useForm } from "react-hook-form";
import {
	fullNameValidation,
	emailValidation,
	phoneValidation,
	userNameValidation,
	passwordValidation,
	confirmPasswordValidation,
} from "../../../utils/validations";
import { signupAPI } from "../../../services/UserServices";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SignUpForm() {
	const methods = useForm();

	const [signupField, setSignupField] = useState({
		password: "",
		username: "",
		email: "",
		created_at: "",
		updated_at: "",
		profile_pic: "normal",
		activated: true,
		phone_number: "",
		fullname: "",
	});

	function cleanUp() {
		setSignupField({
			password: "",
			username: "",
			email: "",
			created_at: "",
			updated_at: "",
			phone_number: "",
			fullname: "",
		});
		methods.reset();
	}

	function checkPasswordMatched() {
		if (methods.watch("password") != methods.watch("confirmPassword")) {
			methods.setError("confirmPassword", {
				type: "manual",
				message: "Mật khẩu không khớp",
			});
			return false;
		}
		return true;
	}

	const onSubmit = methods.handleSubmit(async (data) => {
		if (!checkPasswordMatched()) return;
		const date = new Date(Date.now());
		setSignupField(
			(signupField.password = data.password),
			(signupField.username = data.username),
			(signupField.email = data.email),
			(signupField.created_at = date.toISOString()),
			(signupField.updated_at = date.toISOString()),
			(signupField.phone_number = data.phone),
			(signupField.fullname = data.fullname)
		);
		let respond = await signupAPI(
			signupField.password,
			signupField.username,
			signupField.email,
			signupField.created_at,
			signupField.updated_at,
			signupField.profile_pic,
			signupField.activated,
			signupField.phone_number,
			signupField.fullname
		);
		if (respond) {
			if (respond.status == 200) {
				toast.success("Đăng ký thành công");
				window.location.href = "/login";
			} else if (respond.status == 500) {
				toast.error("Đăng ký thất bại, tên đăng nhập đã tồn tại");
				console.log(respond);
			} else {
				toast.error("Đăng ký thất bại, xin hãy thử lại");
			}
		}
		cleanUp();
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()} noValidate>
				<Input {...fullNameValidation} />
				<Input {...emailValidation} />
				<Input {...phoneValidation} />
				<Input {...userNameValidation} />
				<Input {...passwordValidation} />
				<Input {...confirmPasswordValidation} />
				<button
					onClick={onSubmit}
					className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
				>
					Đăng ký
				</button>
			</form>
		</FormProvider>
	);
}
