/**
 * Created by fuweiping on 2017/7/10.
 */

import React, { Component } from 'react';
//import theme from 'react-quill/dist/quill.snow.css';
import { browserHistory } from 'react-router';
import { Button } from 'antd';
import NoteComments from './noteComments';

export default class NoteDetail extends Component {
    constructor() {
        super();
        this.backToHome = this.backToHome.bind(this);
    }

    updateNote(note, notebooks) {
        console.log('note1:' + note.title);
        console.log('notebooks1:' + notebooks[0]);
        const data = {
            'note': note,
            'notebooks': notebooks
        };
        console.log("updateNote: " + note.title);
        browserHistory.push({pathname: "/updateNote/" + note.title, state: data});
    }

    backToHome() {
        browserHistory.push('/');
    }

    render() {
        const { note, notebooks } = this.props;
        const pnote = this.props.location ? this.props.location.state: '';
        console.log('note: ' + pnote);
        //console.log(notes[0]? notes[0].title : '...');
        const currentNote = note ? note : pnote;
        const button = currentNote
            ? (localStorage.getItem('username') === currentNote.username && notebooks                      //如果当前浏览笔记用户是作者本人，笔记可修改
                ? <Button onClick={this.updateNote.bind(this, currentNote, notebooks)}>编辑</Button>
                : '')
            : '';
        const noteComments = currentNote
            ? <NoteComments noteId={currentNote._id} commentCount={currentNote.commentCount}/>
            : '';
        //console.log(currentNote.title);
        //console.log(currentNote._id);
        return(
            <div className="note-detail">
                <h1>{currentNote.title}</h1>
                <Button onClick={this.backToHome} className="back-to-home">首页</Button>
                {button}
                <div dangerouslySetInnerHTML={{__html: currentNote.content}} className="ql-editor"></div>
                {noteComments}
            </div>
        )
    }
}

