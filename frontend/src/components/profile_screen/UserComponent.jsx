import React from "react";
import { useState } from "react";
import { ConfigProvider, Modal, Input } from 'antd';
import { toast } from "react-toastify";

export default function UserComponent() {
    const user = {
        fullName: "fullname",
        email: "email@gmail.com",
        phoneNumber: "0123456789",
        password: "password",
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editingInformation, setEditingInformation] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

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
                    value={user.fullName}
                    disabled
                />
            </div>

            <div>
                <p className="mt-2 mb-1 text-xl font-semibold">Email</p>
                <input
                    className="mb-4 mr-2 text-base w-full bg-transparent"
                    type="email"
                    value={user.email}
                    disabled
                />
            </div>

            <div>
                <p className="mt-2 mb-1 text-xl font-semibold">Số điện thoại</p>
                <input
                    className="mb-4 mr-2 text-base w-full bg-transparent"
                    type="number"
                    value={user.phoneNumber}
                    disabled
                />
            </div>

            <div>
                <p className="mt-2 mb-1 text-xl font-semibold">Mật khẩu</p>
                <input
                    className="mb-4 mr-2 text-base w-full bg-transparent"
                    type="password"
                    value={user.password}
                    disabled
                />
            </div>

            <button className="mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4" onClick={showModal}>
                Chỉnh sửa
            </button>

            <ConfigProvider theme={{ token: { colorPrimary: '#F8C70E', fontFamily: 'monospace' } }}>
                <Modal
                    title="Chỉnh sửa thông tin"
                    visible={isEditing}
                    open={open}
                    okButtonProps={{ style: { backgroundColor: "#F8C70E" } }}
                    okText="Lưu"
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    cancelText="Hủy"
                    onOk={() => {
                        setModalText('The modal will be closed after two seconds');
                        setConfirmLoading(true);
                        setTimeout(() => {
                        setOpen(false);
                        setConfirmLoading(false);
                        }, 2000);
                        toast.success("Chỉnh sửa thông tin thành công");
                        setEditingInformation((pre) => {
                            return { ...pre };
                        });
                        resetEditing();
                        }}
                    >
                    <div>
                        <p className="mt-2 mb-1 ml-2 text-xl font-semibold">Họ và tên</p>
                        <Input
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            value={editingInformation?.fullName}
                            onChange={(e) => {
                            setEditingInformation((pre) => {
                                return { ...pre, fullName: e.target.value };
                            });
                            }}
                        />
                        <p className="mt-2 mb-1 ml-2 text-xl font-semibold">Số điện thoại</p>
                        <Input
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            value={editingInformation?.phoneNumber}
                            onChange={(e) => {
                            setEditingInformation((pre) => {
                                return { ...pre, phoneNumber: e.target.value };
                            });
                            }}
                        />
                        <p className="mt-2 mb-1 text-xl font-semibold">Mật khẩu</p>
                        <Input
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            type="password"
                            value={editingInformation?.password}
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
