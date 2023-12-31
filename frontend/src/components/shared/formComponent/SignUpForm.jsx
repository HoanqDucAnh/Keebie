import React from "react";
import { Input } from "./Input";
import { FormProvider, set, useForm } from "react-hook-form";
import {
	fullNameValidation,
	emailValidation,
	phoneValidation,
	userNameValidation,
	passwordValidation,
	confirmPasswordValidation,
	adddressValidation,
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
		address: "",
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
			address: "",
			profile_pic: "normal",
			activated: true,
		});
		methods.reset();
	}

	function checkPasswordMatched() {
		if (methods.watch("password") !== methods.watch("confirmPassword")) {
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
		setSignupField(
			Object.assign(signupField, {
				password: data.password,
				username: data.username,
				email: data.email,
				created_at: "",
				updated_at: "",
				profile_pic: "normal",
				activated: true,
				phone_number: data.phone,
				address: data.address,
				fullname: data.fullname,
			})
		);
		console.log(signupField);
		console.log(data);
		let respond = await signupAPI(
			signupField.password,
			signupField.username,
			signupField.email,
			signupField.profile_pic,
			signupField.activated,
			signupField.address,
			signupField.phone_number,
			signupField.fullname
		);
		if (respond) {
			if (respond.status === 200) {
				toast.success("Đăng ký thành công");
				setTimeout(() => {
					window.location.href = "/login";
				}, 1000);
			} else if (respond.status === 500) {
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
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<Input {...emailValidation} />
					</div>
					<div className="col-span-1">
						<Input {...phoneValidation} />
					</div>
				</div>
				<Input {...adddressValidation} />
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
