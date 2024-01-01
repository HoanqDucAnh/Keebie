import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ConfigProvider, Modal, Input } from "antd";
import { toast } from "react-toastify";
import useCurrUserStore from "../../stores/CurrUserStore";
import { useImmer } from "use-immer";
import { changePasswordAPI } from "../../services/UserServices";

export default function UserComponent() {
	const [currUser, setCurrUser] = useState({
		id: "",
		full_name: "",
		email: "",
		phone_number: "",
		password: "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState("Content of the modal");
	const [changePasswordFieldValue, setChangePasswordFieldValue] = useImmer({
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	const passwordField = useRef({
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	useEffect(() => {
		const currUserData = JSON.parse(
			atob(localStorage.getItem("token").split(".")[1])
		);
		setCurrUser({
			id: currUserData.user_id,
			full_name: currUserData.full_name,
			email: currUserData.email,
			phone_number: currUserData.phone_number,
			password: currUserData.password,
		});
	}, []);

	useEffect(() => {
		passwordField.current.oldPassword = changePasswordFieldValue.oldPassword;
		passwordField.current.newPassword = changePasswordFieldValue.newPassword;
		passwordField.current.confirmNewPassword =
			changePasswordFieldValue.confirmNewPassword;
	}, [changePasswordFieldValue]);

	const onEditInformation = () => {
		setIsEditing(true);
	};

	const onSubmit = async () => {
		if (
			passwordField.current.newPassword !==
			passwordField.current.confirmNewPassword
		) {
			toast.error("Mật khẩu mới không khớp");
			return;
		} else if (
			passwordField.current.confirmNewPassword === "" ||
			passwordField.current.newPassword === ""
		) {
			toast.error("Mật khẩu mới không được để trống");
			return;
		} else if (
			passwordField.current.newPassword.length < 6 ||
			passwordField.current.confirmNewPassword.length < 6
		) {
			toast.error("Mật khẩu mới phải có ít nhất 6 kí tự");
			return;
		} else if (
			passwordField.current.newPassword === passwordField.current.oldPassword
		) {
			toast.error("Mật khẩu mới không được trùng với mật khẩu cũ");
			return;
		} else if (passwordField.current.oldPassword !== currUser.password) {
			toast.error("Mật khẩu cũ không chính xác");
			return;
		} else {
			const response = await changePasswordAPI(
				currUser.id,
				passwordField.current.oldPassword,
				passwordField.current.newPassword
			);

			if (response.status === 200) {
				resetEditing();
				toast.success("Đổi mật khẩu thành công quay về trang đăng nhập");
				setTimeout(() => {
					localStorage.removeItem("token");
					localStorage.removeItem("isAdmin");
					window.location.href = "/login";
				}, 1000);
			} else {
				toast.error("Đổi mật khẩu thất bại");
				return;
			}
		}
	};

	const resetEditing = () => {
		setIsEditing(false);
		setChangePasswordFieldValue({
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		});
	};

	return (
		<div className="m-5 font-mono">
			<h1 className="mb-5 text-2xl font-bold">Thông tin cá nhân</h1>
			<div>
				<p className="mt-2 mb-1 text-xl font-semibold">Họ và tên</p>
				<input
					className="mb-4 mr-2 text-base w-full bg-transparent"
					type="text"
					value={currUser.full_name}
					disabled
				/>
			</div>

			<div>
				<p className="mt-2 mb-1 text-xl font-semibold">Email</p>
				<input
					className="mb-4 mr-2 text-base w-full bg-transparent"
					type="email"
					value={currUser.email}
					disabled
				/>
			</div>

			<div>
				<p className="mt-2 mb-1 text-xl font-semibold">Số điện thoại</p>
				<input
					className="mb-4 mr-2 text-base w-full bg-transparent"
					type="number"
					value={currUser.phone_number}
					disabled
				/>
			</div>

			<div>
				<p className="mt-2 mb-1 text-xl font-semibold">Mật khẩu</p>
				<input
					className="mb-4 mr-2 text-base w-full bg-transparent"
					type="password"
					value={currUser.password}
					disabled
				/>
			</div>

			<button
				className="mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4"
				onClick={onEditInformation}
			>
				Đổi mật khẩu
			</button>

			<ConfigProvider
				theme={{ token: { colorPrimary: "#F8C70E", fontFamily: "monospace" } }}
			>
				<Modal
					title="Đổi mật khẩu"
					open={isEditing}
					okButtonProps={{ style: { backgroundColor: "#F8C70E" } }}
					okText="Lưu"
					confirmLoading={confirmLoading}
					onCancel={() => {
						resetEditing();
					}}
					cancelText="Hủy"
					onOk={async () => {
						await onSubmit();
					}}
				>
					<div>
						<p className="mt-2 mb-1 ml-2 text-xl font-semibold">
							Nhập mật khẩu cũ
						</p>
						<Input
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
							value={changePasswordFieldValue.oldPassword}
							type="password"
							onChange={(e) => {
								setChangePasswordFieldValue((draft) => {
									draft.oldPassword = e.target.value;
								});
								//
							}}
						/>
						<p className="mt-2 mb-1 ml-2 text-xl font-semibold">
							Nhập mật khẩu mới
						</p>
						<Input
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
							type="password"
							value={changePasswordFieldValue.newPassword}
							onChange={(e) => {
								setChangePasswordFieldValue((draft) => {
									draft.newPassword = e.target.value;
								});
							}}
						/>
						<p className="mt-2 mb-1 text-xl font-semibold">
							Nhập lại mật khẩu mới
						</p>
						<Input
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
							type="password"
							value={changePasswordFieldValue.confirmNewPassword}
							onChange={(e) => {
								setChangePasswordFieldValue((draft) => {
									draft.confirmNewPassword = e.target.value;
								});
							}}
						/>
					</div>
				</Modal>
			</ConfigProvider>
		</div>
	);
}
