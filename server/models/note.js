/**
 * Created by fuweiping on 2017/7/2.
 */

var mongoose = require('mongoose');
var db = require('./db');
var isEmptyObject = require('../utils/isEmptyObject');
mongoose.Promise = global.Promise;

//创建笔记模式
var NoteSchema = new mongoose.Schema({
    title: String,                            //笔记标题
    content: String,                          //笔记内容
    tags: Array,                              //笔记标签
    notebook: String,                         //所属笔记本
    category: String,                         //笔记分类
    receiveAt: Date,                          //更新时间
    isPublishing: Boolean,                    //笔记是否发布
    username: String,                         //用户
    commentCount: Number                      //笔记评论数
});

NoteSchema.methods.saveNote = function (note, callback) {
    this.title = note.title;
    this.content = note.content;
    this.tags = note.tags;
    this.notebook = note.notebook;
    this.category = note.category;
    this.receiveAt = note.receiveAt;
    this.isPublishing = note.isPublishing;
    this.username = note.username;
    this.commentCount = note.commentCount;
    this.save(callback);
};

NoteSchema.methods.getOneNote = function (query, callback) {
    if(query === null || isEmptyObject(query)) {
        return callback;
    }
    this.model('notes').findOne(query, callback);
};

NoteSchema.methods.getNotes = function (query, callback) {
    if(query === null || isEmptyObject(query)) {
        return this.model('notes').find(callback);
    }
    this.model('notes').find(query, callback);
};

NoteSchema.methods.deleteNote = function (query, callback) {
    this.model('notes').findOneAndRemove(query, callback);
};
NoteSchema.methods.deleteNotesByQuery = function(query, callback) {
    this.model('notes').remove(query, callback);
};

NoteSchema.methods.updateNote = function (id, query, callback) {
    this.model('notes').findByIdAndUpdate(id,  query, {new: true}, callback);
};

var NoteModel = db.model('notes', NoteSchema);      //创建note模型

module.exports = NoteModel;