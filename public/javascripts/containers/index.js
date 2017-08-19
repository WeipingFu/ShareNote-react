/**
 * Created by fuweiping on 2017/6/7.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, login, logout, checkToken } from '../actions/userActions';
import { getNotesByQuery } from '../actions/noteActions';
import { addComment, getCommentsByNote } from '../actions/commentActions';
import { Row, Col } from 'antd';
import Header from '../components/header';
import NoteTabs from '../components/noteTabs';

class Index extends Component {

    constructor() {
        super();
        this.state = {
            category: 'all'
        }
    }
    componentWillMount() {
        const { dispatch, query } = this.props;
        const { category } = this.state;
        const newQuery = Object.assign({}, query, {
            'category': category
        });
        dispatch(checkToken());
        //dispatch(getNotesByQuery({'category': category, 'isPublishing': true}));
        dispatch(getNotesByQuery(newQuery));
    }

    getCategory(category) {
        this.setState({
            category: category
        }, function () {
            const { dispatch, query } = this.props;
            const { category } = this.state;
            const newQuery = Object.assign({}, query, {
                'category': category
            });
            //dispatch(getNotesByQuery({'category': category, 'isPublishing': true}))
            dispatch(getNotesByQuery(newQuery));
        });
    }

    render() {
        //console.log("index userlogined: " + this.props.userlogined);
        const { dispatch } = this.props;
        const { query } = this.state;
        //console.log(this.props.notes);
        return(
            <div>
                <Header register={user => dispatch(register(user))} login={user => dispatch(login(user))} logout={() => dispatch(logout())} handleSearch={value => this.handleSearch(value)} getCategory={category => this.getCategory(category)} getNotesByQuery={query => dispatch(getNotesByQuery(query))} userlogined={this.props.userlogined} json={this.props.json} />
                <Row>
                    <Col span={2}></Col>
                    <Col span={14}>
                        <NoteTabs notes={this.props.notes} />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={5}></Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}

function select(state) {
    const { userReducer, notesReducer, commentsReducer } = state;
    const { json , userlogined } = userReducer;
    const { notes, query } = notesReducer;
    const { noteComments } = commentsReducer;
    return {
        json,
        userlogined,
        notes,
        query,
        noteComments
    };
}

export default connect(select)(Index);
