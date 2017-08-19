/**
 * Created by fuweiping on 2017/7/21.
 */

import React, { PropTypes, Component } from 'react';
import { Card, Icon, Pagination } from 'antd';
import { browserHistory } from 'react-router';

export default class NoteContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            currentNotes: props.notes.slice(0, 10)
        };
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPage: 1,
            currentNotes: nextProps.notes.slice(0, 10)
        });
    }

    onChange(page, total) {
        const { notes } = this.props;
        this.setState({
            currentPage: page,
            currentNotes: page*10>notes.length ? notes.slice((page-1)*10) : notes.slice((page-1)*10, page*10)
        });
    }

    selectNote(note) {
        browserHistory.push({pathname: "/noteDetail/" + note.title, state: note});
    }

    render() {
        const { currentNotes } = this.state;
        const { notes } = this.props;
        //console.log('length:' + currentNotes.length);
        const noteList = currentNotes.length
            ? currentNotes.map((note, index) => {
                return <Card title={note.title} key={note._id} bodyStyle={{padding: 10}} onClick={this.selectNote.bind(this, note)}>
                            <p>分类：{note.category}&nbsp;&nbsp;标签：{note.tags}</p>
                            <p>{note.username} 于 {new Date(note.receiveAt).toLocaleString()} 更新</p>
                            <span>{note.commentCount}条评论</span>
                       </Card>
            })
            : '此分类下未加载到笔记';
        return(
            <div className="noteContainer">
                {noteList}
                <Pagination style={{marginTop: '5px'}} showQuickJumper defaultCurrent={1} total={notes.length} defaultPageSize={10} onChange={this.onChange}/>
            </div>
        );
    }
}

NoteContainer.propTypes = {
    notes: PropTypes.array.isRequired
};