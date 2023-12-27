import React, { useEffect } from "react";
import { useState } from "react";
import { ConfigProvider, Modal, Input } from "antd";
import { toast } from "react-toastify";
import useCurrUserStore from "../../stores/CurrUserStore";

export default function UserComponent() {
	const currUser = useCurrUserStore((state) => state.currUser);
	const setCurrUserToken = useCurrUserStore(
		(state) => state.updateCurrUserToken
	);
	const setCurrUser = useCurrUserStore((state) => state.updateCurrUser);

	useEffect(() => {
		setCurrUserToken(localStorage.getItem("token"));
		setCurrUser(JSON.parse(atob(localStorage.getItem("token").split(".")[1])));
	}, []);

	const [isEditing, setIsEditing] = useState(false);
	const [editingInformation, setEditingInformation] = useState(null);
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState("Content of the modal");

	const onEditInformation = (record) => {
		setIsEditing(true);
		setEditingInformation({ ...record });
	};

	const resetEditing = () => {
		setIsEditing(false);
		setEditingInformation(null);
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
					value={currUser.phone_numer}
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
					onOk={() => {
						setModalText("The modal will be closed after two seconds");
						setConfirmLoading(true);
						setTimeout(() => {
							setOpen(false);
							setConfirmLoading(false);
						}, 2000);
						toast.success("Đổi mật khẩu thành công");
						setEditingInformation((pre) => {
							return editingInformation; //error
						});
						resetEditing();
					}}
				>
					<div>
						<p className="mt-2 mb-1 ml-2 text-xl font-semibold">
							Nhập mật khẩu cũ
						</p>
						<Input
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
							type="password"
						/>
						<p className="mt-2 mb-1 ml-2 text-xl font-semibold">
							Nhập mật khẩu mới
						</p>
						<Input
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
							type="password"
							onChange={(e) => {
								setEditingInformation((pre) => {
									return { ...pre, password: e.target.value };
								});
							}}
						/>
						<p className="mt-2 mb-1 text-xl font-semibold">
							Nhập lại mật khẩu mới
						</p>
						<Input
							className="mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]"
							type="password"
							onChange={(e) => {
								setEditingInformation((pre) => {
									return { ...pre, password: e.target.value };
								});
							}}
						/>
					</div>
				</Modal>
			</ConfigProvider>
		</div>
	);
}
