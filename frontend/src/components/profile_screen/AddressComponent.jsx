import React from 'react';
import { Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { ConfigProvider } from 'antd';

export default function AddressComponent() {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingInformation, setEditingInformation] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            name: 'Hoang Duc Anh',
            phone: '0123456789',
            address: '144 Xuan Thuy, Cau Giay, Ha Noi, Vietnam',
        },
        {
            name: "Hieu Ngu(yen)",
            phone: '0983294241',
            address: "aloalo, aloalo, alala, Vietnam",
        },
        {
            name: "Duc Le",
            phone: '0983294391',
            address: "Ducle, Ducle, Ducle, Vietnam",
        },
        {
            name: "uyenlex",
            phone: '0983294391',
            address: "uyenlex, uyenlex, uyenlex, Vietnam",
        },
    ]);

    const columns = [
        {
            title: 'Tên người nhận',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: '170px',
        },
        {
            title: 'Địa chỉ nhận hàng',
            dataIndex: 'address',
            key: 'address',
            width: '50%',
        },
        {
            title: "",
            render: (record) => {
                return (
                <>
                    <EditOutlined
                    onClick={() => {
                        onEditInformation(record);
                    }}
                    />
                    <DeleteOutlined
                    onClick={() => {
                        onDeleteInformation(record);
                    }}
                    style={{ color: "red", marginLeft: 12 }}
                    />
                </>
                );
            },
        },
    ];

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onDeleteInformation = (record) => {
        Modal.confirm ({
            title: "Bạn có chắc chắn muốn xóa thông tin địa chỉ này?",
            okText: "Xóa",
            cancelText: "Hủy",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                return pre.filter((user) => user.id !== record.id);
                });
                toast.success("Xóa thông tin địa chỉ thành công!");
            },
        });
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
        <div className='m-5 font-mono'>
            <h1 className="mb-5 text-2xl font-bold">Thông tin giao hàng</h1>

            <ConfigProvider theme={{ token: { colorPrimary: '#F8C70E', fontFamily: 'monospace' } }}>
                <Table  columns={columns} 
                        dataSource={dataSource}
                        pagination={{ pageSize: 5 }}></Table>
                
                <Modal  title="Chỉnh sửa thông tin giao hàng"
                        visible={isEditing}
                        okText="Lưu"
                        okButtonProps={{ style: { backgroundColor: "#F8C70E" } }}
                        cancelText="Hủy"
                        onCancel={() => { resetEditing(); }}
                        onOk={() => {
                            setDataSource((pre) => {
                            return pre.map((user) => {
                                if (user.id === editingInformation.id) {
                                return editingInformation;
                                } else {
                                    return user;
                                }
                                });
                            });
                            resetEditing();
                            toast.success("Chỉnh sửa thông tin giao hàng thành công!");
                        }}
                    >
                    <div>
                        <p className="mt-2 mb-1 ml-2">Tên người nhận</p>
                        <Input 
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            value={editingInformation?.name}
                            onChange={(e) => {
                            setEditingInformation((pre) => {
                                return { ...pre, name: e.target.value };
                            });
                            }}
                        />
                    </div>
                    <div>
                        <p className="mt-2 mb-1 ml-2">Số điện thoại</p>
                        <Input
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            value={editingInformation?.phone}
                            onChange={(e) => {
                            setEditingInformation((pre) => {
                                return { ...pre, phone: e.target.value };
                            });
                            }}
                        />
                    </div>
                    <div>
                        <p className="mt-2 mb-1 ml-2">Địa chỉ nhận hàng</p>
                        <Input
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            value={editingInformation?.address}
                            onChange={(e) => {
                            editingInformation((pre) => {
                                return { ...pre, address: e.target.value };
                            });
                            }}
                        />
                    </div>
                </Modal>

                <button className="mt-5 bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 px-4" onClick={showModal}>
                    Thêm thông tin giao hàng mới
                </button>

                <Modal  title="Thêm thông tin giao hàng mới"
                        open={open}
                        okText="Thêm"
                        okButtonProps={{ style: { backgroundColor: "#F8C70E" } }}
                        onCancel={handleCancel}
                        cancelText="Hủy"
                        onOk={() => {
                            setOpen(false);
                            setDataSource((pre) => {
                                return [...pre, editingInformation];
                            });
                            toast.success("Thêm thông tin thành công");
                        }}
                    >
                    
                    <div>
                        <p className="mt-2 mb-1 ml-2">Tên người nhận</p>
                        <Input 
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            onChange={(e) => {
                            setEditingInformation((pre) => {
                                return { ...pre, name: e.target.value };
                            });
                            }}
                        />
                    </div>
                    <div>
                        <p className="mt-2 mb-1 ml-2">Số điện thoại</p>
                        <Input
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            onChange={(e) => {
                            setEditingInformation((pre) => {
                                return { ...pre, phone: e.target.value };
                            });
                            }}
                        />
                    </div>
                    <div>
                        <p className="mt-2 mb-1 ml-2">Địa chỉ nhận hàng</p>
                        <Input
                            className='mb-4 mr-2 text-base w-full bg-transparent border-[#FFF5D6]'
                            onChange={(e) => {
                            setEditingInformation((pre) => {
                                return { ...pre, address: e.target.value };
                            });
                            }}
                        />
                    </div>
                </Modal>
            </ConfigProvider>
        </div>
    );
}