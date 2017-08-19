/**
 * Created by fuweiping on 2017/6/6.
 */

import React, { Component } from 'react';
import { Row, Col, Input, Modal } from 'antd';
import { Link } from 'react-router';
import Login from './login';
import Register from './register';
import HeaderNav from './headerNav';
const Search = Input.Search;

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            loginModalVisible: false,
            regModalVisible: false,
            userlogined: false
        };
        this.showLoginModal = this.showLoginModal.bind(this);
        this.showRegModal = this.showRegModal.bind(this);
        this.logout = this.logout.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.closeRegModal = this.closeRegModal.bind(this);
        this.changeModal = this.changeModal.bind(this);
    }
    componentWillMount() {
        if(localStorage.getItem('token') != null) {
            this.setState({userlogined: true});
            //console.log('componentWillMount users');
        }
    }

    showLoginModal(e) {
        e.preventDefault();
        this.setState({loginModalVisible: true});
    }
    closeLoginModal() {
        this.setState({loginModalVisible: false});
    }
    closeRegModal() {
        this.setState({regModalVisible: false});
    }
    showRegModal(e) {
        e.preventDefault();
        this.setState({regModalVisible: true});
    }
    changeModal() {
        this.setState({
            loginModalVisible: false,
            regModalVisible: true
        });
    }

    handleSearch(value) {
        let query = {};
        if(value) {
            query.reg = value;
            query.isPublishing = true;
        }
        this.props.getNotesByQuery(query);
    }
    login(user) {
        this.props.login(user);
    }
    register(user) {
        this.props.register(user);
    }
    logout(e) {
        this.props.logout();
        e.preventDefault();
        this.setState({userlogined: false});
        //this.setState({userlogined: false});
    }

    render() {
        const { userlogined } = this.props;
        let { loginModalVisible, regModalVisible } = this.state;

        //console.log('state userlogined: ' + this.state.userlogined);
        const userShow = (userlogined || this.state.userlogined)
            ? <span>欢迎您,{localStorage.getItem("username")}&nbsp;&nbsp;<Link to="/usercenter">个人中心</Link> | <a href="#" onClick={this.logout}>退出登录</a></span>
            : <span><a href="#" onClick={this.showLoginModal}>登录</a> | <a href="#" onClick={this.showRegModal}>注册</a></span>;
        return(
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="header-top-content">
                        <div>
                            <img id="logo" src="../../images/logo.png" alt="logo"/>
                            <span className="title">分享笔记 - 与世界分享你的知识</span>
                        </div>
                        <div className="header-top-right">
                            <Search placeholder="搜索笔记" style={{width: 200}} onSearch={value => this.handleSearch(value)} />
                            {userShow}
                            <Modal title="登录" visible={loginModalVisible} footer={null} onCancel={this.closeLoginModal}>
                                <Login login={user => this.login(user)} changeModal={this.changeModal} closeLoginModal={this.closeLoginModal} />
                            </Modal>
                            <Modal title="注册" visible={regModalVisible} footer={null} onCancel={this.closeRegModal}>
                                <Register register={user => this.register(user)} closeRegModal={this.closeRegModal} />
                            </Modal>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row className="header-nav">
                    <Col span={2}></Col>
                    <Col span={20}>
                        <HeaderNav getCategory={category => this.props.getCategory(category)} />
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}
