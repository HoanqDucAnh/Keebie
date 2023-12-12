import React from "react";
import { useState } from "react";
import { Button, Modal } from 'antd';

export default function UserComponent() {
    const user = {
        fullName: "fullname",
        email: "email@gmail.com",
        phoneNumber: "0123456789",
        password: "password",
    }

    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);
    }

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <div className="m-5 font-mono">
            <h1 className="mb-5 text-2xl font-bold">Thông tin cá nhân</h1>
            <div>
                <p className="mt-2 mb-1 text-xl font-semibold">Họ và tên</p>
                <input
                    className="mb-4 text-base"
                    type="text"
                    value={user.fullName}
                    disabled={!edit}
                />
            </div>

            <div>
                <p className="mt-2 mb-1 text-xl font-semibold">Email</p>
                <input
                    className="mb-4 text-base"
                    type="email"
                    value={user.email}
                    disabled={!edit}
                />
            </div>

            <div>
                <p className="mt-2 mb-1 text-xl font-semibold">Số điện thoại</p>
                <input
                    className="mb-4 text-base"
                    type="number"
                    value={user.phoneNumber}
                    disabled={!edit}
                />
            </div>

            <div>
                <p className="mt-2 mb-1 text-xl font-semibold">Mật khẩu</p>
                <input
                    className="mb-4 text-base"
                    type="password"
                    value={user.password}
                    disabled={!edit}
                />
            </div>

            <button className="mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4" onClick={showModal}>
                Chỉnh sửa
            </button>
            <Modal
                title="Chỉnh sửa thông tin"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel} >
                <div>
                    <p className="mt-2 mb-1 text-xl font-semibold">Họ và tên</p>
                    <input
                        className="mb-4 text-base"
                        type="text"
                        value={user.fullName}
                    />
                    <p className="mt-2 mb-1 text-xl font-semibold">Họ và tên</p>
                    <input
                        className="mb-4 text-base"
                        type="text"
                        value={user.fullName}
                    />
                    <p className="mt-2 mb-1 text-xl font-semibold">Họ và tên</p>
                    <input
                        className="mb-4 text-base"
                        type="text"
                        value={user.fullName}
                    />
                    <p className="mt-2 mb-1 text-xl font-semibold">Họ và tên</p>
                    <input
                        className="mb-4 text-base"
                        type="text"
                        value={user.fullName}
                    />
                </div>
            </Modal>
        </div>
    );
}
