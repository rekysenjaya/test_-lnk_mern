import React, { useEffect, useRef, useState } from 'react';
import { Button, Layout, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


import * as actionAuth from '../actions/actionAuth';

const { Header, Footer } = Layout;

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refForm = useRef(null)

  const { signupStatus, signinStatus, authStatus } = useSelector(state => state.auth);
  const [typeForm, setTypeForm] = useState('login')

  useEffect(() => {
    if (authStatus === 'success') {
      navigate(0);
      dispatch(actionAuth.storeUpdate({ authStatus: null }))
    }
  }, [authStatus])

  useEffect(() => {
    if (signupStatus) {
      if (signupStatus === 'success') {
        Modal.info({
          title: 'You have successfully registered',
        })
        setTypeForm('login')
      } else if (signupStatus === 'error') {
        Modal.warning({
          title: 'You failed to register',
        })
      } else if (signupStatus === 'catch') {
        Modal.error({
          title: 'Connection Timeout',
        })
      }
      dispatch(actionAuth.storeUpdate({ signupStatus: null }))
    }

  }, [signupStatus])

  useEffect(() => {
    if (signinStatus) {
      if (signinStatus === 'success') {
        navigate(0)
      } else if (signinStatus === 'error') {
        Modal.warning({
          title: 'You failed to login',
        })
      } else if (signinStatus === 'catch') {
        Modal.error({
          title: 'Connection Timeout',
        })
      }
      dispatch(actionAuth.storeUpdate({ signinStatus: null }))
    }

  }, [signinStatus])

  const compareToFirstPassword = (rule, value, callback) => {
    const form = refForm.current;
    if (value && value !== form.getFieldValue('password')) {
      callback('the password is not the same!');
    } else {
      callback();
    }
  };

  const onFinish = (values) => {
    if (typeForm === 'login') {
      dispatch(actionAuth.actionLogin(values))
    } else {
      dispatch(actionAuth.signupAction(values))
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (<Layout style={{ minHeight: '100vh' }}>
    <Header style={{ padding: 0, background: '#fff' }} />
    <div className='page-login'>
      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 17,
        }}
        initialValues={{
          remember: true,
        }}
        ref={refForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {typeForm === 'register' && <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>}

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {typeForm === 'register' && <Form.Item
          label="Confirm Password"
          name="repassword"
          rules={[
            {
              required: true,
              message: 'Please enter the same password!',
            },
            {
              validator: compareToFirstPassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>}

        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 17,
          }}
        >
          <Button type="primary" htmlType="submit">
            {typeForm === 'login' ? 'Login' : 'Sign Up'}
          </Button>
          {false && <div style={{ color: '#ff4d4f' }} >the password is not the same!</div>}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 17,
          }}
        >
          <Button onClick={() => setTypeForm(typeForm === 'login' ? 'register' : 'login')}>
            {typeForm === 'login' ? 'Sign Up' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
    </div>
    <div className='page-login-timestemp'>
      <Button onClick={() => navigate('/users-timestemps')}>To List All Users Time Duration</Button>
    </div>
    <Footer style={{ textAlign: 'center' }}>Test PT. Lautan Natural Krimerindo ©2023 Created by Reky Senjaya</Footer>
  </Layout>
  );
};
export default Login;