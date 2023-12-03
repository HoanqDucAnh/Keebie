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

export default function SignUpForm() {
	const methods = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		console.log(data);
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
