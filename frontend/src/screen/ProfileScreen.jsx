import React from 'react';
import { useState } from 'react';
import { UserOutlined, BarsOutlined, BankFilled, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import UserComponent from '../components/profile_screen/UserComponent';
import HistoryComponent from '../components/profile_screen/HistoryComponent';
import AddressComponent from '../components/profile_screen/AddressComponent';
import PaymentComponent from '../components/profile_screen/PaymentComponent';

const { Content, Sider } = Layout;

const componentsSwtich = (key) => {
  switch (key) {
    case 'info':
      return (<UserComponent />);
    case 'history':
      return (<HistoryComponent />);
    case 'address':
      return (<AddressComponent />);
    case 'payment':
      return (<PaymentComponent />);
    default:
      break;
   }
};

const ProfileScreen = () => {
  const [selectedMenuItem, setSelectedMenuItem]= useState('item1');
  
  return (
    <Layout>
      <Sider className='bg-white'>
        <Menu theme="light"
              mode="inline"
              defaultSelectedKeys={['info']}
              selectedKeys={selectedMenuItem} 
              onClick={(e) => setSelectedMenuItem(e.key)} >
          <Menu.Item key="info" icon={<UserOutlined />}>Thông tin cá nhân</Menu.Item>
          <Menu.Item key="history" icon={<BarsOutlined />}>Lịch sử mua hàng</Menu.Item>
          <Menu.Item key="address" icon={<HomeOutlined />}>Địa chỉ</Menu.Item>
          <Menu.Item key="payment" icon={<BankFilled />}>Thanh toán</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div>
            {componentsSwtich(selectedMenuItem)}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ProfileScreen;