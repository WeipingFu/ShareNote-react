/**
 * Created by fuweiping on 2017/6/27.
 */
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorHtml: props.noteContent
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html) {
        this.setState({editorHtml: html});
        this.props.getNoteContent(html);
    }

    render() {
        console.log(this.state.editorHtml);
        console.log(this.props);
        return (
            <ReactQuill
                theme="snow"
                value={this.state.editorHtml}
                modules={NoteEditor.modules}
                formats={NoteEditor.formats}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
            />
        );
    }
}

NoteEditor.modules = {
    toolbar: [
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'font': []}, {'size': []}],
        [{'color': []}, {'background': []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{'indent': '-1'}, {'indent': '+1'}, {'script': 'sub'}, {'script': 'super'}, {'align': []}]
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image', 'video'],
        ['clean']
    ]
};
NoteEditor.formats = [
    'header', 'font', 'size',
    'color', 'background',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'indent', 'script', 'align',
    'list', 'bullet',
    'link', 'image', 'video'
];

NoteEditor.propTypes = {
    placeholder: React.PropTypes.string
};