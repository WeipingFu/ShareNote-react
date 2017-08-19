/**
 * Created by fuweiping on 2017/6/13.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import UserToolBar from '../components/userToolBar';
import NoteDetail from '../components/noteDetail';
import NoteList from '../components/noteList';
import eventProxy from '../utils/eventProxy';
import isEmptyObject from '../utils/isEmptyObject';
import { getUserNotes, getUserAllNotes, deleteNote, deleteNotesByQuery } from '../actions/noteActions';
import { getNotebooks, deleteNotebook } from '../actions/notebookActions';
import { addComment, getCommentsByNote } from '../actions/commentActions';

class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNote: '',
            showAllNotes: true,
            query: props.location.state ? props.location.state : {}
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const { query } = this.state;
        eventProxy.on('changeNoteQuery', (title, item) => {                        //订阅changeNoteQuery事件
            console.log('title: ' + title);
            console.log('item: ' + item);
            let query = {};
            query[item] = title;
            console.log(query);
            this.setState({showAllNotes: false});
            dispatch(getUserNotes(query));
        });
        eventProxy.on('showAllNotes', msg => {                                    //订阅showAllNotes事件
            console.log(msg);
            this.setState({showAllNotes: true});
        });
        //dispatch(getUserNotes()).then( res => this.setState({allUserNotes: res.notes}));
        dispatch(getUserAllNotes());
        if(!isEmptyObject(query)) {
            this.setState({showAllNotes: false});
            dispatch(getUserNotes(query));
        }
        dispatch(getNotebooks());
    }

    selectNote(note) {
        this.setState({selectedNote: note});
    }

    //获取所有的notebook
    getAllNotebooks(notes) {
        let notebooks = [];
        notes.map(note => {
            if(notebooks.indexOf(note['notebook']) === -1) {
                notebooks.push(note['notebook']);
            }
        });
        return notebooks;
    }

    render() {
        const { selectedNote, showAllNotes } = this.state;
        const { dispatch, notes, allUserNotes, notebooks } = this.props;

        //console.log(allUserNotes);
        //const notebooks = this.getAllNotebooks(allUserNotes);
        //console.log(notes[0]? notes[0].title : '...');
        console.log(notes);
        return (
            <div className="user-center">
                <Row>
                    <Col span={2}><UserToolBar allUserNotes={allUserNotes} notebooks={notebooks} deleteNotesByQuery={query => dispatch(deleteNotesByQuery(query))} deleteNotebook={bookname => dispatch(deleteNotebook(bookname))}  /></Col>
                    <Col span={5}>
                        <NoteList notes={showAllNotes ? allUserNotes : notes} selectNote={note => this.selectNote(note)} deleteNote={note => dispatch(deleteNote(note))}/>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <NoteDetail note={selectedNote ? selectedNote : (showAllNotes ?  allUserNotes[0] : notes[0])} notebooks={notebooks} getCommentsByNote={noteId => dispatch(getCommentsByNote(noteId))} />
                    </Col>
                </Row>
            </div>
        );
    }
}

function select(state) {
    const { notesReducer, notebooksReducer, commentsReducer } = state;
    const { notes, allUserNotes } = notesReducer;
    const { notebooks } = notebooksReducer;
    const { noteComments } = commentsReducer;
    return {
        notes,
        allUserNotes,
        notebooks,
        noteComments
    };
}

export default connect(select)(UserCenter);


