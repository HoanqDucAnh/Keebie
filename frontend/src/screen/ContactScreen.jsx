import React from "react";
import { Button, Form, Input, ConfigProvider } from 'antd';

const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: 'Thông tin chưa được cung cấp',
    types: {
      email: '${label} không hợp lệ',
      number: '${label} không hợp lệ',
    },
  };
  
  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values) => {
    console.log(values);
  };

export default function ContactScreen() {
    return (
        <div className="pl-10 bg-white">
            <h1 className="pt-10 pl-10 pb-5 text-3xl inset-5 font-mono">Keebi3 Keyboard Shop</h1>
            {/* <!-- Contact section --> */}
            <div>
                <p className="ml-10 mb-4 flex items-center justify-center md:justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                    >
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                    144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                </p>
                <p className="ml-10 mb-4 flex items-center justify-center md:justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                    >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    keebiekeyboard@gmail.com
                </p>
                <p className="ml-10 mb-4 flex items-center justify-center md:justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                    0912345678
                </p>
            </div>

            {/* <!-- Form section --> */}
            <h1 className="text-xl ml-10 mb-5 mt-10 font-mono">Liên hệ với chúng tôi</h1>
            <ConfigProvider theme={{token: 
              { 
                colorPrimary: '#F8C70E', 
                fontFamily: 'monospace',
              } }} >
                  <Form
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                  style={{
                    maxWidth: 600,
                  }}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name={['user', 'name']}
                    label="Họ và tên"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                      {
                        type: 'email',
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={['user', 'phone']}
                    label="Số điện thoại"
                    rules={[
                      {
                        type: 'number',
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item 
                    name={['user', 'message']} 
                    label="Nội dung"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    >
                    <Input.TextArea rows={5} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-[535px] ml-10 bg-[#F8C70E]">
                        Gửi thông tin
                    </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
        </div>
    );
}
