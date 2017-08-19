/**
 * Created by fuweiping on 2017/7/25.
 */

/**
 * Created by fuweiping on 2017/7/25.
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addNotebook } from '../actions/notebookActions';
import { Icon, Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class AddNotebook extends Component {
    constructor() {
        super();
    }

    cancel() {
        browserHistory.goBack();
    }
    addNotebook(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                const { dispatch } = this.props;
                dispatch(addNotebook(values));
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="addNotebook">
                <div className="addNotebook-header">
                    <Icon type="book" className="hugeicon"/>
                    <h1>创建笔记本</h1>
                </div>
                <Form onSubmit={this.addNotebook.bind(this)}>
                    <FormItem>
                        {getFieldDecorator('bookname', {
                            rules: [{required: true, message: '笔记本的名称不能为空'}],
                        })(
                            <Input size="large" placeholder="给笔记本起个名称"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('info')(
                            <Input type="textarea" rows={4} placeholder="添加笔记本的描述" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.cancel.bind(this)}>取消</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const AddNotebookForm = Form.create()(AddNotebook);

function select(state) {
    const { sendingMessage } = state;
    const { sendingRequest, errorMessage, successMessage} = sendingMessage;
    return {
        sendingRequest,
        errorMessage,
        successMessage
    };
}

export default connect(select)(AddNotebookForm);

