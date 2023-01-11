import React, { useState } from 'react';
import { LogoutOutlined, HomeOutlined, CalculatorOutlined } from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, Modal, Spin } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as actionAuth from '../actions/actionAuth';

const { Header, Footer, Sider, Content } = Layout;

const items = [
  {
    label: <Link to={'/'} >Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
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
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { name } = useSelector(state => state.auth);

  const [selectedMenu, setSelectedMenu] = useState('home')
  const [collapsed, setCollapsed] = useState(false)

  const onClickMenu = (e) => {
    if (e.key === 'logout') {
      Modal.confirm({
        icon: <LogoutOutlined style={{ color: 'red' }} />,
        content: <div>You sure you want to logout?</div>,
        okText: 'Yes',
        onOk() {
          navigate('/')
          dispatch(actionAuth.signOut())
         
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
      {location.pathname === '/' ?
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            Hallo, {name}!
          </div>
        </Content>
        :
        <Outlet />}
      <Footer style={{ textAlign: 'center' }}>Test PT. Lautan Natural Krimerindo ©2023 Created by Reky Senjaya</Footer>
    </Layout>
  </Layout>)
}

export const Loading = () => {
  return <Layout style={{ minHeight: '100vh' }}>
    <Spin spinning />
  </Layout>
}

export default Home