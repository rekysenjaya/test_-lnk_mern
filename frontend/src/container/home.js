import React, { useState } from 'react';
import { LogoutOutlined, UserOutlined, CalculatorOutlined } from '@ant-design/icons';

import { Layout, Menu, Modal } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const { Header, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to={'profile'} >Profile</Link>,
    key: 'profile',
    icon: <UserOutlined />,
  },
  {
    label: <Link to={'calculator'} >Calculator</Link>,
    key: 'calculator',
    icon: <CalculatorOutlined />,
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
]

const Home = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState('')
  const [collapsed, setCollapsed] = useState(false)

  const onClickMenu = (e) => {
    if (e.key === 'logout') {
      Modal.confirm({
        icon: <LogoutOutlined style={{ color: 'red' }} />,
        content: <div>You sure you want to logout?</div>,
        okText: 'Yes',
        onOk() {
          navigate('/login')
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      setSelectedMenu(e.key)
    }
  }

  return (<Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
      <Menu onClick={onClickMenu} theme="dark" selectedKeys={selectedMenu} mode="inline" items={items} />
    </Sider>
    <Layout className="site-layout">
      <Header style={{ padding: 0, background: '#fff' }} />
      <Outlet />
      <Footer style={{ textAlign: 'center' }}>Test PT. Lautan Natural Krimerindo ©2023 Created by Reky Senjaya</Footer>
    </Layout>
  </Layout>)
}

export default Home