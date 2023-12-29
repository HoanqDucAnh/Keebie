export function findInputError(errors, name) {
	const filtered = Object.keys(errors)
		.filter((key) => key.includes(name))
		.reduce((cur, key) => {
			return Object.assign(cur, { error: errors[key] });
		}, {});
	return filtered;
}

export const isFormInvalid = (err) => {
	if (Object.keys(err).length > 0) return true;
	return false;
};

export const fullNameValidation = {
	name: "fullname",
	label: "Họ và tên",
	type: "text",
	id: "fullname",
	placeholder: "Hãy nhập họ và tên",
	validation: {
		required: {
			value: true,
			message: "Không được để trống",
		},
	},
};

export const emailValidation = {
	name: "email",
	label: "Email",
	type: "email",
	id: "email",
	placeholder: "Hãy nhập email",
	validation: {
		required: {
			value: true,
			message: "Không được để trống",
		},
		pattern: {
			value: /\S+@\S+\.\S+/,
			message: "Hãy nhập đúng định dạng email",
		},
	},
};

export const phoneValidation = {
	name: "phone",
	label: "Số điện thoại",
	type: "number",
	id: "phone",
	placeholder: "Hãy nhập số điện thoại",
	validation: {
		required: {
			value: true,
			message: "Không được để trống",
		},
		maxLength: {
			value: 12,
			message: "Số điện thoại không hợp lệ",
		},
	},
};

export const userNameValidation = {
	name: "username",
	label: "Tên đăng nhập",
	type: "text",
	id: "username",
	placeholder: "Hãy nhập tên đăng nhập",
	validation: {
		required: {
			value: true,
			message: "Không được để trống",
		},
		minLength: {
			value: 6,
			message: "Cần có ít nhất 6 ký tự",
		},
	},
};

export const passwordValidation = {
	name: "password",
	label: "Mật khẩu",
	type: "password",
	id: "password",
	placeholder: "Hãy nhập mật khẩu",
	validation: {
		required: {
			value: true,
			message: "Không được để trống",
		},
		minLength: {
			value: 6,
			message: "Cần có ít nhất 6 ký tự",
		},
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
			message: "Cần có chữ hoa, chữ thường và số",
		},
	},
};

export const confirmPasswordValidation = {
	name: "confirmPassword",
	label: "Xác nhận mật khẩu",
	type: "password",
	id: "confirmPassword",
	placeholder: "Hãy nhập lại mật khẩu",
	validation: {
		required: {
			value: true,
			message: "Không được để trống",
		},
	},
};

export const adddressValidation = {
	name: "address",
	label: "Địa chỉ",
	type: "text",
	id: "address",
	placeholder: "Hãy nhập địa chỉ",
	validation: {
		required: {
			value: true,
			message: "Không được để trống",
		},
	},
};
