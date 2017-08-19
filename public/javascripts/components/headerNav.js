/**
 * Created by fuweiping on 2017/6/12.
 */

import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

export default class HeaderNav extends Component {
    constructor() {
        super();
        this.state = {
            currentTag: 'home'
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }
    handleMenuClick(e) {
        this.setState({currentTag: e.key});
        this.getCategory(e.key);
    }
    getCategory(category) {
        if(category === 'home') {
            category = 'all';
        }
        console.log('nav: ' + category);
        this.props.getCategory(category);
    }

    render() {
        return(
            <Menu onClick={this.handleMenuClick} selectedKeys={[this.state.currentTag]} mode="horizontal" theme="dark">
                <Menu.Item key="home">
                    <Icon type="home" /><a href="/">首页</a>
                </Menu.Item>
                <Menu.Item key="html">html
                </Menu.Item>
                <Menu.Item key="css">css
                </Menu.Item>
                <Menu.Item key="javascript">javascript
                </Menu.Item>
                <Menu.Item key="nodejs">nodejs
                </Menu.Item>
                <Menu.Item key="java">java
                </Menu.Item>
                <Menu.Item key="php">php
                </Menu.Item>
                <Menu.Item key="python">python
                </Menu.Item>
                <Menu.Item key="algorithm">算法
                </Menu.Item>
                <Menu.Item key="network">网络
                </Menu.Item>
                <Menu.Item key="more">
                    <a href="/categories">更多分类</a>
                </Menu.Item>
            </Menu>
        );
    }
}
