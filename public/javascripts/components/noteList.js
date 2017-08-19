/**
 * Created by fuweiping on 2017/7/4.
 */

import React, { Component } from 'react';
import { Card, Icon, Popconfirm } from 'antd';
import sortArrayByProp from '../utils/sortArrayByProp';

export default class NoteList extends Component {

    constructor() {
        super();
        this.cancel = this.cancel.bind(this);
        this.stopPropagation = this.stopPropagation.bind(this);
    }

    stopPropagation(e) {
        e.stopPropagation();
    }
    confirm(note, e) {
        this.props.deleteNote(note);
    }
    cancel() {
        console.log('cancel delete');
    }
    /*
    deleteNote(note, e) {
        console.log(note.title);

    }
    */
    //选中某个note，展示其内容
    selectNote(note, e) {
        //console.log("selectedCard: " + selectedCard);
        this.setAllCardsClass();
        let selectedCard = this.findParent(e.target);
        selectedCard.classList.add('selected-note');
        this.props.selectNote(note);
    }
    //初始化所有节点class
    setAllCardsClass() {
        let parent = document.getElementsByClassName('notelist')[0],
            Nodes = parent.childNodes;
        for(let i = 0; i < Nodes.length; i++) {
            Nodes[i].classList.remove('selected-note');
        }
    }
    //找到指定节点的className有ant-card的父节点
    findParent(ele) {
        let cur = ele;
        while(cur) {
            if(cur.parentElement.classList.contains('ant-card')) {
                return cur.parentElement;
            } else {
                cur = cur.parentElement;
            }
        }
    }
    render() {
        const { notes } = this.props;
        const noteCount = notes.length;
        let sortedNotes = notes;
        //sortedNotes = sortArrayByProp(sortedNotes, 'receiveAt', 'desc');

        //console.log('notelist: ' + notes);
        const noteList = noteCount
            ? sortedNotes.map((note, index) => {
                let className = '';
                if (index === 0) {
                    className = 'selected-note';
                }
                return <Card title={note.title} key={index} className={className} extra={<Popconfirm title="删除这条笔记？" onClick={this.stopPropagation} onConfirm={this.confirm.bind(this, note)} onCancel={this.cancel} okText="是" cancelText="否">
                    <Icon type="delete" title="删除"/>
                </Popconfirm>} bodyStyle={{padding: 10}} onClick={this.selectNote.bind(this, note)}>
                            <p>标签：{note.tags}&nbsp;&nbsp;分类：{note.category}&nbsp;&nbsp;笔记本：{note.notebook}</p>
                            <p>{new Date(note.receiveAt).toLocaleString()}</p>
                            <span>{note.commentCount}条评论</span>
                       </Card>
            })
            : '';
        return(
            <div className="tab-content">
                <div className="notelist-header">
                    <h1>笔记</h1>
                    共{noteCount}条笔记
                </div>
                <div className="notelist">
                    {noteList}
                </div>
            </div>
        );
    }
}

