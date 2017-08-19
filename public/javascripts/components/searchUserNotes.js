/**
 * Created by fuweiping on 2017/8/9.
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getUserNotes } from '../actions/noteActions';
import { Input, Select, Icon } from 'antd';
const Option = Select.Option;

export default class SearchUserNotes extends Component {
    constructor() {
        super();
        this.state = {
            notebook: 'all'
        };
        this.searchUserNotes = this.searchUserNotes.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({notebook: value});
    }

    searchUserNotes(e) {
        const value = e.target.value;
        const { notebook } = this.state;
        //const { dispatch } = this.props;
        let query = {};
        //var promise;
        if(value) {
            if(notebook === 'all') {
                /*
                promise = new Promise(function(Resovle, Reject){
                    dispatch(getUserNotes({'reg': value}));
                });

                promise.then(function () {
                    browserHistory.push({pathname: '/usercenter', state: {'reg': value}});
                })
                 */
                query = {
                    'reg': value
                };
            } else {
                query = {
                    'reg': value,
                    'notebook': notebook
                }
            }
        } else {
            if(notebook !== 'all') {
               query = {
                   'notebook': notebook
               }
            }
        }
        browserHistory.push({pathname: '/usercenter', state: query});
    }

    render() {
        let notebooks = this.props.location.state;
        notebooks.unshift({});
        const notebooksSelection =
            notebooks.map((notebook, index) => {
                if (index === 0) {
                    return <Option value="all">所有笔记本</Option>;
                }
                return <Option value={notebook.bookname} key={notebook._id}>{notebook.bookname}</Option>;
            });

        return(
            <div className="search-user-notes">
                <Input size="large" placeholder="搜索笔记" onPressEnter={this.searchUserNotes}/>
                <label for="notebook">查找笔记本：</label>
                <Select name="notebook" defaultValue="all" style={{ width: 120 }} onChange={this.handleChange}>
                    {notebooksSelection}
                </Select>
            </div>
        );
    }
}
