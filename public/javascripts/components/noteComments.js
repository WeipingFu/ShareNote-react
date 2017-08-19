/**
 * Created by fuweiping on 2017/7/22.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment, getCommentsByNote } from '../actions/commentActions';
import SubComments from './subComments';
import { Card, Form, Input, Button, Pagination } from 'antd';
const FormItem = Form.Item;

class NoteComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyShow: [],                                  //用数组存储应该显示回复的评论的index
            noteId: props.noteId,
            commentCount: props.commentCount,
            showComments: false,
            currentPage: 1,
            currentComments: props.noteComments.slice(0, 10)
        };
        this.hideComments = this.hideComments.bind(this);
        this.showComments = this.showComments.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addNoteComment = this.addNoteComment.bind(this);
        this.addUserCollection = this.addUserCollection.bind(this);
    }

    onChange(page, total) {
        const { noteComments } = this.props;
        this.setState({
            currentPage: page,
            currentComments: page*10>noteComments.length ? noteComments.slice((page-1)*10) : noteComments.slice((page-1)*10, page*10)
        });
    }

    componentWillReceiveProps(nextProps) {
        const { noteId, commentCount } = this.state;
        if(nextProps.noteId !== noteId) {
            this.setState({
                noteId: nextProps.noteId,
                showComments: false
            });
            console.log('comment-note.id: ' + noteId);
            console.log('nextProps-note.id: ' + nextProps.noteId);
        }
        if(nextProps.commentCount !== commentCount) {
            this.setState({commentCount: nextProps.commentCount});
        }
        this.setState({
            currentPage: 1,
            currentComments: nextProps.noteComments.slice(0, 10)
        });
        //console.log('comment-count: ' + commentCount);
        //console.log('nextProps-count: ' + nextProps.commentCount);
    }
    showComments() {
        const {dispatch} = this.props;
        const {noteId} = this.state;
        dispatch(getCommentsByNote(noteId));
        this.setState({showComments: true});
    }
    hideComments() {
        this.setState({showComments: false});
    }
    addNoteComment(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { noteId } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let newComment = {
                    'content': values.content,
                    'entity_id': noteId,
                    'entity_type': 'note',
                    'to_user': ''
                };

                dispatch(addComment(newComment, noteId));
            }
        });
    }

    addUserCollection() {

    }
    toggleCommentComments(index, e) {                         //控制评论显示或隐藏回复
        e.preventDefault();
        let reply = this.state.replyShow,
            i = reply.indexOf(index);
        if(i === -1) {
            reply.push(index);
        } else {
            reply.splice(i, i+1);
        }
        this.setState({replyShow: reply});
    }
    render() {
        const { dispatch, noteComments } = this.props;
        const {getFieldDecorator} = this.props.form;
        const { replyShow, noteId, commentCount, showComments, currentComments } = this.state;
        //console.log(replyShow);
        const commentList = currentComments.length
            ? currentComments.map((noteComment, index) => {
                const replyCount = noteComment.replies.length;
                const subComments = replyShow.indexOf(index) !== -1
                    ? <SubComments addReply={(reply, noteId) => dispatch(addComment(reply, noteId))} noteId={noteId} comment={noteComment} />
                    : '';
                const deleteComment = noteComment.user === localStorage.getItem('username')
                    ? <a className="delete-link" alt="删除评论">删除评论</a>
                    : '';
                return <Card key={noteComment._id} title={"评论者： " + noteComment.user} extra={<a href="#">评论于 {new Date(noteComment.time).toLocaleString()}</a>}>
                            <p>{noteComment.content}</p>
                            {deleteComment}
                            <a className="reply-link" onClick={this.toggleCommentComments.bind(this, index)}>查看回复({replyCount})</a>
                            {subComments}
                       </Card>
            })
            : '未加载到任何评论';

        const commentsContainer = showComments
            ? <div>
                <div className="toggle-comments">
                    <a onClick={this.hideComments} alt="隐藏评论">点击隐藏评论({commentCount}条)</a>
                </div>
                {commentList}
                <Pagination style={{marginTop: '5px'}} showQuickJumper defaultCurrent={1} total={noteComments.length} defaultPageSize={10} onChange={this.onChange}/>
              </div>
            : <div className="toggle-comments"><a onClick={this.showComments} alt="加载评论">点击加载评论({commentCount}条)</a></div>;

        return (
            <div className="note-comments">
                {commentsContainer}
                <div className="comment-form">
                    <Form onSubmit={this.addNoteComment}>
                        <FormItem label="您的评论">
                            {getFieldDecorator("content", {
                                rules: [{required: true, message: "评论不能为空"}]
                            })(
                                <Input type="textarea" placeholder="随便写" />
                            )}
                        </FormItem>
                        <Button type="primary" htmlType="submit">提交评论</Button>
                        &nbsp;&nbsp;
                        <Button type="primary" htmlType="button" onClick={this.addUserCollection}>收藏此笔记</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

const NoteCommentsForm = Form.create()(NoteComments);

function select(state) {
    const { commentsReducer } = state;
    const { noteComments } = commentsReducer;
    return {
        noteComments
    }
}

export default connect(select)(NoteCommentsForm);