import React from 'react';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

const Profile = () => {
  return <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Profile</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
      Bill is a cat.
    </div>
  </Content>
}

export default Profile