/**
 * Created by fuweiping on 2017/6/13.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Button } from 'antd';
import Mask from './mask';
import eventProxy from '../utils/eventProxy';

export default class UserToolBar extends Component {
    constructor() {
        super();
        this.state = {
            currentTool: 'note',
            maskShow: false,
            notebooks: []
        };
        this.showAllNotes = this.showAllNotes.bind(this);
        this.handleToolClick = this.handleToolClick.bind(this);
    }
    componentDidMount() {
        eventProxy.on('maskhide', msg => {                    //订阅maskhide事件
            console.log(msg);
            this.setState({maskShow: false});
        });
        /*
        eventProxy.on('changeItems', item => {                    //订阅changeItems事件
            console.log(item);
            this.setState({items: this.getAllItems(item)});
        });
        */
    }
    componentWillReceiveProps(nextProps) {
        this.setState({notebooks: nextProps.notebooks});
    }
    handleToolClick(e) {
        this.setState({currentTool: e.key});
    }
    showAllNotes(e) {
        e.preventDefault();
        this.setState({maskShow: false});
        eventProxy.trigger('showAllNotes', 'show all users notes');                   //发布showAllNotes事件
    }
    toggleMask(key, e) {
        e.preventDefault();
        const { maskShow, currentTool } = this.state;
        if(key === currentTool) {
            this.setState({
                maskShow: !maskShow
            });
        } else {
            this.setState({
                maskShow: true
                //items: this.getAllItems(key)
            });
        }
    }
    //根据notebook、category、tags分类note
    getAllItems(key) {
        const { allUserNotes } = this.props;
        const { notebooks } = this.state;
        let items = [],
            titles = [];
        if(key === 'notebook') {                              //key为tags时
            notebooks.map(notebook => titles.push(notebook.bookname));
        }
        else {
            allUserNotes.map(note => {
                if(note[key] instanceof Array) {              //key为tags时，note[key]为数组
                    note[key].map(v => {
                        if(titles.indexOf(v) === -1) {
                            titles.push(v);
                        }
                    });
                } else {
                    if(titles.indexOf(note[key]) === -1) {
                        titles.push(note[key]);
                    }
                }
            });
        }
        //统计每个title下笔记的数目
        titles.map(title => {
            let noteCount = 0;
            allUserNotes.map(note => {
                if(note[key] instanceof Array) {
                    if(note[key].indexOf(title) !== -1) {
                        noteCount++;
                    }
                } else {
                    if(note[key] === title) {
                        noteCount++;
                    }
                }
            });
            items.push({
                'title': title,
                'noteCount': noteCount
            });
        });
        return items;
    }

    render() {
        const { currentTool, maskShow, notebooks } = this.state;
        //const { notebooks } = this.props;
        const items = this.getAllItems(currentTool);
        const className = maskShow ? 'mask-show' : 'mask-hidden';

        return(
            <Menu className="userToolBar" onClick={this.handleToolClick.bind(this)} selectedKeys={[this.state.currentTool]} mode="vertical">
                <Menu.Item key="addNote">
                    <Link to={{pathname: '/addNote', state: notebooks}} alt="新建笔记" title="新建笔记"><Icon className="bigicon" type="plus-circle-o"/></Link>
                </Menu.Item>
                <Menu.Item key="search">
                    <Link to={{pathname: '/searchNote', state: notebooks}} alt="搜索笔记" title="搜索笔记"><Icon className="bigicon" type="search" /></Link>
                </Menu.Item>
                <Menu.Item key="message">
                    <a alt="消息" title="消息"><Icon className="bigicon" type="message" /></a>
                </Menu.Item>

                <hr />

                <Menu.Item key="star">
                    <a alt="收藏" title="收藏"><Icon className="bigicon" type="star-o" /></a>
                </Menu.Item>
                <Menu.Item key="comment">
                    <a alt="评论" title="评论"><Icon className="bigicon" type="exception" /></a>
                </Menu.Item>
                <Menu.Item key="note">
                    <a alt="笔记" title="笔记" onClick={this.showAllNotes}><Icon className="bigicon" type="file-text" /></a>
                </Menu.Item>
                <Menu.Item key="notebook">
                    <a alt="笔记本" title="笔记本" onClick={this.toggleMask.bind(this, 'notebook')}><Icon className="bigicon" type="book" /></a>
                </Menu.Item>
                <Menu.Item key="category">
                    <a alt="分类" title="分类" onClick={this.toggleMask.bind(this, 'category')}><Icon className="bigicon" type="appstore" /></a>
                </Menu.Item>
                <Menu.Item key="tags">
                    <a alt="标签" title="标签" onClick={this.toggleMask.bind(this, 'tags')}><Icon className="bigicon" type="tag-o"/></a>
                </Menu.Item>

                <Mask title={currentTool} items={items} deleteNotesByQuery={query => this.props.deleteNotesByQuery(query)} deleteNotebook={bookname => this.props.deleteNotebook(bookname)} className={className} />
                <hr />

                <Menu.Item key="user">
                    <a alt="用户信息" title="用户信息"><Icon className="bigicon" type="user" /></a>
                </Menu.Item>
            </Menu>
        );
    }
}