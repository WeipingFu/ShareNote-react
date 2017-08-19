/**
 * Created by fuweiping on 2017/7/24.
 */

var mongoose = require('mongoose');
var db = require('./db');
var isEmptyObject = require('../utils/isEmptyObject');
mongoose.Promise = global.Promise;

//创建笔记本模式
var NotebookSchema = new mongoose.Schema({
    bookname: String,                         //笔记本名称
    info: String,                             //笔记本描述
    user: String                              //所属用户
});

NotebookSchema.methods.saveNotebook = function (notebook, callback) {
    this.bookname = notebook.bookname;
    this.info = notebook.info;
    this.user = notebook.user;
    this.save(callback);
};

NotebookSchema.methods.getOneNotebook = function (query, callback) {
    if(query === null || isEmptyObject(query)) {
        return callback;
    }
    this.model('notebooks').findOne(query, callback);
};
NotebookSchema.methods.getNotebooks = function (query, callback) {
    if(query == null || isEmptyObject(query)) {
        return callback;
    }
    this.model('notebooks').find(query, callback);
};
NotebookSchema.methods.deleteNotebook = function (query, callback) {
    this.model('notebooks').findOneAndRemove(query, callback);
};

var NotebookModel = db.model('notebooks', NotebookSchema);      //创建notebook模型

module.exports = NotebookModel;