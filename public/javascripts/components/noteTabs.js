/**
 * Created by fuweiping on 2017/7/21.
 */

import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import NoteContainer from './noteContainer';
import sortArrayByProp from '../utils/sortArrayByProp';

export default class NoteTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //sortedNotes: props.notes,
            currentKey: '1'
        };
        this.tabChange = this.tabChange.bind(this);
    }
    /*
    componentWillReceiveProps(nextProps) {
        this.setState({sortedNotes: nextProps.notes});
    }*/

    tabChange(key) {
        //console.log(key);

        this.setState({currentKey: key});
    }

    render() {
        //const { sortedNotes } = this.state;
        const { notes } = this.props;
        const { currentKey } = this.state;
        let sortedNotes = notes;
        if(currentKey == 1) {
            sortedNotes = sortArrayByProp(notes, 'commentCount', 'desc');
        }
        if(currentKey == 2) {
            sortedNotes = sortArrayByProp(notes, 'receiveAt', 'desc');
        }
        const currentNotes = sortedNotes.length ? sortedNotes : this.props.notes;
        //console.log(currentNotes);
        //console.log(this.props.notes);
        return(
            <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                <TabPane tab="热门笔记" key="1">
                    <NoteContainer notes={currentNotes} />
                </TabPane>
                <TabPane tab="最新发布" key="2">
                    <NoteContainer notes={currentNotes} />
                </TabPane>
            </Tabs>
        );
    }
}