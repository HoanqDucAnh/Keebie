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
	verify_codeValidation,
} from "../../../utils/validations";
import { sendVerifyCodeAPI, signupAPI, verifyCodeAPI } from "../../../services/UserServices";
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
		verify_code: "",
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
			verify_code: "",
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

	const onSendVerifyCode = async () => {
		if (methods.watch("email") === "") {
			toast.error("Hãy nhập email");
			return;
		}
		let respond = await sendVerifyCodeAPI(methods.watch("email"));
		if (respond) {
			if (respond.status === 200) {
				toast.success("Gửi mã bảo mật thành công đến email " + methods.watch("email") + ", hãy kiểm tra email của bạn. Mã bảo mật sẽ hết hạn trong 5 phút.");
			} else if (respond.status === 500) {
				toast.error("Gửi mã bảo mật thất bại, xin hãy thử lại");
			} else {
				toast.error("Gửi mã bảo mật thất bại, xin hãy thử lại");
			}
		}
	};

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
		let temp = await verifyCodeAPI(methods.watch("email"), methods.watch("verify_code"));
		if (temp) {
			if (temp.status === 200) {
				toast.success("Xác thực thành công");
			} else if (temp.status === 500) {
				toast.error("Xác thực thất bại, xin hãy thử lại");
				return;
			} else if (temp.status === 401) {
				if (temp.detail === "Verify code expired") {
					toast.error("Mã bảo mật đã hết hạn, vui lòng yêu cầu mã bảo mật mới.");
				} else if (temp.detail === "Verify code already activated") {
					toast.error("Mã bảo mật đã được sử dụng, vui lòng yêu cầu mã bảo mật mới.");
				}
				return;
			} else if (temp.status === 404) {
				toast.error("Mã bảo mật không chính xác, xin hãy thử lại");
				return;
			}
		}


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
			if (respond.status == 200) {
				toast.success("Đăng ký thành công");
				setTimeout(() => {
					window.location.href = "/login";
				}, 1000);
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
				<div classname="grid grid-cols-2 gap-4">
					<div classname="col-span-1">
						<Input {...verify_codeValidation} />
					</div>
					<div classname="col-span-1">
						<button
							onClick={onSendVerifyCode}
							className="col-span-1 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4 w-full"
						>
							Gửi mã bảo mật
						</button>
					</div>
					
				</div>
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
