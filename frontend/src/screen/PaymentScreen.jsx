import React from 'react'
import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { Button, Form, Input, Radio, Space } from 'antd';
import { Breadcrumb } from "antd";
import ProdCart from "../components/cart_screen/ProdCart";
import useCartStore from "../stores/CartStore";

export default function PaymentScreen() {
  const TotalPrice = useCartStore((state) => state.totalPrice);
  const [form] = Form.useForm();

  const [shipping, setShipping] = useState();
  const onChangeShipping = (e) => {
    console.log('radio checked', e.target.value);
    setShipping(e.target.value);
  };

  const [payment, setPayment] = useState();
  const onChangePayment = (e) => {
    console.log('radio checked', e.target.value);
    setPayment(e.target.value);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ConfigProvider theme={{token: { colorPrimary: '#F8C70E', fontFamily: 'monospace' } }} >
    <Breadcrumb
      className="mt-5 ml-5 mb-2 font-mono"
      separator=">"
      items={[
        {
          title: "Trang chủ",
          href: "/",
        },
        {
          title: "Giỏ hàng",
          href: "/cart",
        },
        {
          title: "Thanh toán",
          href: "/payment",
        }
      ]}
    />

    <div className='flex font-mono p-5 gap-x-[100px] justify-center bg-white'>
      <div>
        <p className='text-xl mb-4 font-bold'>Thông tin mua hàng</p>
        <Form
          form={form}
          layout="vertical"
          
        >
          <Form.Item label="Họ và tên người nhận" required tooltip="Thông tin bắt buộc" style={{ marginBottom: "5px", }}>
            <Input placeholder="Họ và tên" style={{ width: "350px" }}/>
          </Form.Item>
          <Form.Item label="Email" required tooltip="Thông tin bắt buộc" style={{ marginBottom: "5px" }}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Số điện thoại" required tooltip="Thông tin bắt buộc" style={{ marginBottom: "5px" }}>
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item label="Địa chỉ nhận hàng" required tooltip="Thông tin bắt buộc" style={{ marginBottom: "5px" }}>
            <Input placeholder="Địa chỉ nhận hàng" />
          </Form.Item>
          <Form.Item label="Ghi chú">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </div>

      <div>
        <p className='text-xl mb-2 font-bold'>Vận chuyển</p>
        <Radio.Group onChange={onChangeShipping} value={shipping} className='w-[300px] border-2 p-2 rounded-lg'>
          <Space direction="vertical">
            <Radio 
                onMouseEnter={toggleIsExpanded} 
                value={1}>
              Nhận tại cửa hàng
              <div className='hidden' style={{ height: isExpanded ? "100px" : "0px" }}>
                dsfsf
              </div>
            </Radio>
            <Radio value={2}>Vận chuyển thường</Radio>
            <Radio value={3}>Vận chuyển nhanh</Radio>
          </Space>
        </Radio.Group>

        <p className='text-xl mt-4 mb-2 font-bold'>Hình thức thanh toán</p>
        <Radio.Group onChange={onChangePayment} value={payment} className='w-[300px] border-2 p-2 rounded-lg'>
          <Space direction="vertical">
            <Radio value={1}>Thanh toán khi nhận hàng</Radio>
            <Radio value={2}>Chuyển khoản qua ngân hàng</Radio>
          </Space>
        </Radio.Group>
      </div>

      <div>
        <div className="border-2 border-gray-200 rounded-lg p-5">
          <p className='text-xl mb-2 font-bold'>Thông tin sản phẩm</p>
          <ProdCart />
          <ProdCart />
          <div className="flex justify-between">
            <p className="text-xl">Tổng cộng</p>
            <p className="text-xl">{TotalPrice} VND</p>
          </div>
          <button className="w-[200px] font-bold ml-[180px] bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] cursor-pointer rounded-lg p-2 mt-2">
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
    </ConfigProvider>
  )
}
