import {Button, Checkbox, Form, Input,message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import styles from './index.module.scss'

type LoginProps = {
    redirectUri: string
}

import React from 'react';
function onFinish(formData) {
    const [messageApi, contextHolder] = message.useMessage();

    // 触发消息 ..
    messageApi.info('Hello, Ant Design!').then(r => {

    });
}
export default function index() {

    return (
        <div className={styles.loginContainer}>
            <div className='header'>
                <header>lightning operation platform</header>
            </div>
            <div className='content'>
                <div className='login-form'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Please input your Username!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your Password!'}]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}