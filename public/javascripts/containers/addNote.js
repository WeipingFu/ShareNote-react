/**
 * Created by fuweiping on 2017/6/15.
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Icon, Button, Select, Tag, Input, Tooltip, message, Popconfirm } from 'antd';
const Option = Select.Option;
import NoteEditor from "../components/noteEditor";
import { finishNote, publishNote } from '../actions/noteActions';

class AddNote extends Component {
    constructor() {
        super();
        this.state = {
            edit: false,
            tags: [],
            inputVisible: false,
            inputValue: '',
            noteTitle: '',
            noteBook: '',
            noteContent: '',
            notebook: '',
            category: ''
        };
        this.showNoteInfo = this.showNoteInfo.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.publishNote = this.publishNote.bind(this);
        this.finishNote = this.finishNote.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.notebookChange = this.notebookChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.saveInputRef = this.saveInputRef.bind(this);
        this.showInput = this.showInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.confirmTitle = this.confirmTitle.bind(this);
        this.getNoteContent = this.getNoteContent.bind(this);
    }

    //header部分处理函数
    showNoteInfo() {

    }
    confirm() {
        browserHistory.goBack();
    }
    cancel() {
        console.log('cancel deleteNote');
    }

    //创建newNote对象
    generateNewNote() {
        const { noteTitle, noteContent, tags, notebook, category } = this.state;
        if(noteTitle == '') {
            this.error('笔记标题不能为空');
            //this.setState({error: '笔记标题不能为空'});
            return;
        } else if(noteContent == '') {
            this.error('笔记内容不能为空');
            //this.setState({error: '笔记内容不能为空'});
            return;
        }
        let newNote = {
            title: noteTitle,
            content: noteContent,
            tags: tags,
            notebook: notebook,
            category: category
        };
        return newNote;
    }
    publishNote() {
        const { dispatch } = this.props;
        let note = this.generateNewNote();
        if(note) {
            let newNote = Object.assign({}, note, {
                note,
                isPublishing: true
            });
            dispatch(publishNote(newNote));
        }
        //browserHistory.goBack();
    }
    finishNote() {
        const { dispatch } = this.props;
        let note = this.generateNewNote();
        if(note) {
            let newNote = Object.assign({}, note, {
                note,
                isPublishing: false
            });
            console.log("1notetitle: " + note.title);
            console.log("1newNotetitle: " + newNote.title);
            dispatch(finishNote(newNote));
        }
    }
    cancelEdit() {
        browserHistory.goBack();
    }

    //处理下拉框
    notebookChange(value) {
        console.log('notebook: ' + value);
        this.setState({notebook: value});
    }
    categoryChange(value) {
        console.log('category: ' + value);
        this.setState({category: value});
    }

    //处理标签
    handleClose(removedTag) {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }

    showInput() {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange(e) {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm() {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef(input) {
        this.input = input;
    }

    confirmTitle(e) {
        console.log('noteTitle: ' + e.target.value);
        let noteTitle = e.target.value.trim();
        if(noteTitle == '') {
            return;
        }
        this.setState({
            edit: true,
            noteTitle: e.target.value
        });
    }
    //获取笔记内容
    getNoteContent(content) {
        //console.log("content: " + content);
        this.setState({noteContent: content});
    }

    error(msg) {
        return message.error(msg);
    }
    success(msg) {
        return message.success(msg);
    }

    render() {
        const { edit, tags, inputVisible, inputValue} = this.state;
        let notebooks = this.props.location.state;
        notebooks.unshift({});
        //console.log('addnote notebooks: ' + notebooks);
        const menu = edit
            ? <div>
                <a onClick={this.showNoteInfo} alt="笔记信息"><Icon type="info-circle-o" style={{fontSize: 20}} title="信息"/></a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Popconfirm title="删除这条笔记？" onConfirm={this.confirm} onCancel={this.cancel} okText="是" cancelText="否">
                    <a alt="删除笔记"><Icon type="delete" style={{fontSize: 20}} title="删除"/></a>
                </Popconfirm>
            </div>
            : '';

        const btn = edit
            ? <div className="position-right">
                <Button onClick={this.publishNote}>发布</Button>
                &nbsp;&nbsp;
                <Button onClick={this.finishNote}>完成</Button>
                &nbsp;&nbsp;
                <Button onClick={this.cancelEdit}>取消</Button>;
            </div>
            : <Button className="position-right" onClick={this.cancelEdit}>取消</Button>;

        const notebooksSelection =
                notebooks.map((notebook, index) => {
                    if (index === 0) {
                        return <Option value="notebook">请选择笔记本</Option>;
                    }
                    return <Option value={notebook.bookname} key={index}>{notebook.bookname}</Option>;
                });

        //console.log('notebooksSelect: ' + notebooksSelection);

        return(
            <div>
                <header id="addNoteHeader">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={18}>
                            {menu}
                        </Col>
                        <Col span={4}>
                            {btn}
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                </header>
                <Row>
                    <Col span={3}></Col>
                    <Col span={18} id="noteSettings">
                        <div className="inline-block">
                            <Icon type="book" style={{fontSize: 18}} title="笔记本"/>&nbsp;
                            <Select defaultValue="notebook" style={{width: 100}} onChange={this.notebookChange} ref="notebook">
                                {notebooksSelection}
                            </Select>
                        </div>
                        <div className="inline-block">
                            <Icon type="appstore" style={{fontSize: 18}} title="分类"/>&nbsp;
                            <Select defaultValue="category" style={{width: 100}} onChange={this.categoryChange} ref="category">
                                <Option value="category">请选择分类</Option>
                                <Option value="html">html</Option>
                                <Option value="javascript">javascript</Option>
                                <Option value="css">css</Option>
                                <Option value="java">java</Option>
                                <Option value="python">python</Option>
                                <Option value="php">php</Option>
                                <Option value="nodejs">nodejs</Option>
                                <Option value="algorithm">算法</Option>
                                <Option value="network">网络</Option>
                                <Option value="os">操作系统</Option>
                                <Option value="database">数据库</Option>
                                <Option value="interview">笔经面经</Option>
                            </Select>
                        </div>
                        <div className="inline-block">
                            <Icon type="tag-o" style={{fontSize: 18}} title="标签"/>&nbsp;
                            {tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                    <Tag key={tag} closable={true} afterClose={this.handleClose.bind(this, tag)}>
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {inputVisible && (
                                <Input ref={this.saveInputRef} type="text" size="small" style={{ width: 78 }} value={inputValue} onChange={this.handleInputChange} onBlur={this.handleInputConfirm} onPressEnter={this.handleInputConfirm}/>
                            )}
                            {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 新标签</Button>}
                        </div>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <Input type="text" style={{padding: 10, width: 970, height: 40, border: 0, fontSize: 18}} placeholder="请输入标题" onBlur={this.confirmTitle}/>
                        <NoteEditor placeholder='请输入笔记内容...' getNoteContent={this.getNoteContent}/>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </div>

        );
    }
}

function select(state) {
    const { sendingMessage, notesReducer } = state;
    const { sendingRequest, errorMessage, successMessage} = sendingMessage;
    return {
        sendingRequest,
        errorMessage,
        successMessage
    };
}

export default connect(select)(AddNote);