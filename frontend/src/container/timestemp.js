import React, { useEffect } from 'react';
import { Space, Table, Tag, Layout, Spin, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import moment from 'moment'

import * as actionAuth from '../actions/actionAuth';

const { Header, Footer } = Layout;

const TimestempPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { timestampLoading, timestampData } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(actionAuth.getTimestempAll())
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'Logout',
      dataIndex: 'logout',
      key: 'logout',
    },
    {
      title: 'Duration Time',
      dataIndex: 'durationTime',
      key: 'durationTime',
    },
  ];

  const data = (timestampData || []).map((val) => {
    const { login, logout, executor } = val
    const { username, name } = executor
    const loginMoment = moment(new Date(Number(login)))
    const logoutMoment = moment(new Date(Number(logout)))
    const duration = moment.duration(logoutMoment.diff(loginMoment));

    var minutes = parseInt(duration.asMinutes()) % 60;
    var seconds = parseInt(duration.asSeconds()) % 60;
    return ({
      username, name, login: loginMoment.format('YYYY-MM-DD HH:mm:ss'), logout: logoutMoment.format('YYYY-MM-DD HH:mm:ss'), durationTime: `${minutes} minutes ${seconds} seconds`,
    })
  })

  return (<Layout style={{ minHeight: '100vh' }}>
    <Header style={{ padding: 0, background: '#fff' }} />
    <Spin spinning={timestampLoading} >
      <div className='page-timestemps'>
        <Table columns={columns} dataSource={data} />
        <Button onClick={() => navigate('/')} >Back</Button>
      </div>
    </Spin>
    <Footer style={{ textAlign: 'center' }}>Test PT. Lautan Natural Krimerindo ©2023 Created by Reky Senjaya</Footer>
  </Layout>
  );
};
export default TimestempPage;