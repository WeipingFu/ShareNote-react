/**
 * Created by fuweiping on 2017/7/17.
 */

import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { Icon, Input, Card } from 'antd';
const Search = Input.Search;
import eventProxy from '../utils/eventProxy';

export default class Mask extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
        this.addNotebook = this.addNotebook.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({items: nextProps.items});
    }
    handleDelete(title, item, e) {
        e.stopPropagation();
        let query = {};
        query[item] = title;
        console.log(1);
        console.log(query);
        if(item === 'notebook') {
            this.props.deleteNotebook(title);
        }
        this.props.deleteNotesByQuery(query);
        //eventProxy.trigger('changeItems', item);
    }

    showDetail(title, item) {
        eventProxy.trigger('maskhide', 'hide the mask');                      //发布maskhide事件
        eventProxy.trigger('changeNoteQuery', title, item);                   //发布changeNoteQuery事件
    }

    addNotebook() {
        browserHistory.push(`/addNotebook`);
    }

    handleSearch(value) {
        console.log(value);
    }

    render() {
        const { title, className } = this.props;
        const { items } = this.state;
        console.log(2);
        console.log(items);
        let headerTitle = '';
        switch (title) {
            case 'notebook':
                headerTitle = '笔记本'; break;
            case 'tags':
                headerTitle = '标签'; break;
            case 'category':
                headerTitle = '分类'; break;
            default:
                headerTitle = '笔记本'; break;
        }
        const searchPlaceholder = '查找' + headerTitle;
        const cardList = items.length
            ? items.map((item, index) => {
                return <Card title={item.title} key={index} extra={<button onClick={this.handleDelete.bind(this, item.title, title)}><Icon type="delete" title="删除"/></button>} bodyStyle={{padding: 10}} onClick={this.showDetail.bind(this, item.title, title)}>
                            <p>{item.noteCount} 条笔记</p>
                       </Card>
            })
            : '没有加载到' + headerTitle;
        const addButton = title === 'notebook'
            ? <button onClick={this.addNotebook}><Icon type="plus-square-o" className="bigicon" alt="新建笔记本" title="新建笔记本" /></button>
            : '';

        return (
            <div className={className}>
                <div className="mask-sidebar">
                    <div className="mask-sidebar-header">
                        <h1>{headerTitle}</h1>
                        {addButton}
                        <Search placeholder={searchPlaceholder} style={{width: 360}} onSearch={value => this.handleSearch(value)}/>
                    </div>
                    <div className="mask-sidebar-content">
                        {cardList}
                    </div>
                </div>
            </div>
        );
    }
}