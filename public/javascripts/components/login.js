/**
 * Created by fuweiping on 2017/6/6.
 */

import React, { Component } from 'react';
import { Form, Input, Checkbox, Button, Icon } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.checkUserName = this.checkUserName.bind(this);
        this.changeModal = this.changeModal.bind(this);
    }
    changeModal(e) {
        e.preventDefault();
        this.props.changeModal();
    }
    checkUserName(rule, value, callback) {
        if(/^[a-zA-Z\d_]\w{0,11}[a-zA-Z\d]$/.test(value) === false) {
            callback('用户名格式不正确!');
        } else {
            callback();
        }
    }
    /*  用户登录 */
    login(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.login(values);
                this.props.closeLoginModal();
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;

        return(
            <Form onSubmit={this.login} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: '请输入您的用户名!'
                        }, {
                            validator: this.checkUserName
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入您的密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>30天内免登录</Checkbox>
                    )}
                    <a className="login-form-forgot" href="/forgetPwd">忘记密码?</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登 录
                    </Button>
                    Or <a href="" onClick={this.changeModal}>现在注册</a>

                </FormItem>
            </Form>
        );
    }
}

export default Login = Form.create()(Login);