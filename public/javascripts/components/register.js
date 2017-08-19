/**
 * Created by fuweiping on 2017/6/6.
 */

import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class Register extends Component {
    constructor() {
        super();
        this.state = {
            confirmDirty: false
        };
        this.register = this.register.bind(this);
        this.checkUserName = this.checkUserName.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }
    /*  注册框处理   */
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPwd'], { force: true });
        }
        callback();
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }
    checkUserName(rule, value, callback) {
        if(/^[a-zA-Z\d_]\w{0,11}[a-zA-Z\d]$/.test(value) === false) {
            callback('用户名长度应为2～14，以字母数字或者下划线开头，字母数字结尾!');
        } else {
            callback();
        }
    }

    register(e) {
        e.preventDefault();
        //console.log("register before......");
        this.props.form.validateFields((err, values) => {
                //console.log("registering......");
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.register(values);
                this.props.closeRegModal();
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.register}>
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
                        rules: [{
                            required: true, message: '请输入密码!'
                        }, {
                            validator: this.checkConfirm
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('comfirmPwd', {
                        rules: [{
                            required: true, message: '请再次输入密码!'
                        }, {
                            validator: this.checkPassword
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" onBlur={this.handleConfirmBlur} placeholder="确认密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式不正确!',
                        }, {
                            required: true, message: '请输入您的邮箱!',
                        }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="邮箱" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注 册
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Register = Form.create()(Register);