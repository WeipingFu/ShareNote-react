/**
 * Created by fuweiping on 2017/7/26.
 */

import React, { Component } from 'react';
import { Input, Button } from 'antd';

export default class SubComments extends Component {

    constructor() {
        super();
        this.state = {
            replyContent: '',
            showReplyInput: false,
            to_user: ''
        };
        this.deleteReply = this.deleteReply.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.setReplyContent = this.setReplyContent.bind(this);
    }

    deleteReply() {

    }
    showReplyInput(to_user) {
        this.setState({
            showReplyInput: true,
            to_user: to_user
        });
    }
    cancelReply() {
        this.setState({
            showReplyInput: false,
            replyContent: '',
            to_user: ''
        });
    }
    setReplyContent(e) {
        this.setState({replyContent: e.target.value});
    }
    addReply(noteId) {
        const {replyContent, to_user} = this.state;
        const { comment } = this.props;
        let newReply = {
            'content': replyContent,
            'entity_id': comment._id,
            'entity_type': 'comment',
            'to_user': to_user
        };
        this.props.addReply(newReply, noteId);
    }

    render() {
        const { comment, className } = this.props;
        const { showReplyInput } = this.state;
        const replies = comment ? comment.replies : [];
        const replyList = replies.length
            ? replies.map((reply, index) => {
                const del = localStorage.getItem('username') === reply.user
                    ? <a onClick={this.deleteReply} alt="删除回复">删除回复</a>
                    : '';
                const addReply = <a onClick={this.showReplyInput.bind(this, reply.user)} alt="添加回复">回复</a>;
                if(reply.to_user !== '') {
                    return <p key={reply._id}>
                                {reply.user} 回复 {reply.to_user}: &nbsp;&nbsp;&nbsp;&nbsp;{reply.content}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new Date(reply.time).toLocaleString()}&nbsp;&nbsp;{del}&nbsp;{addReply}
                           </p>;
                }
                else {
                    return <p key={reply._id}>
                                {reply.user}: &nbsp;&nbsp;&nbsp;&nbsp;{reply.content}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{reply.time}&nbsp;&nbsp;{del}&nbsp;{addReply}
                           </p>;
                }
            })
            : <p>
                此评论暂时还没有回复, <a onClick={this.showReplyInput.bind(this, comment.user)} alt="添加回复">添加回复</a>
            </p>;
        const replyInput = showReplyInput
            ? <div className="reply-input">
                <Input type="textarea" onChange={this.setReplyContent} placeholder="回复"/>
                <Button onClick={this.cancelReply}>取消</Button>&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.addReply.bind(this, this.props.noteId)}>确认</Button>
              </div>
            : '';
        return (
            <div className="reply-container">
                {replyList}
                {replyInput}
            </div>
        );
    }
}