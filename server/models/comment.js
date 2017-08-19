/**
 * Created by fuweiping on 2017/7/22.
 */
/**
 * Created by fuweiping on 2017/7/2.
 */

var mongoose = require('mongoose');
var db = require('./db');
var isEmptyObject = require('../utils/isEmptyObject');
mongoose.Promise = global.Promise;

//创建用户模式
var CommentSchema = new mongoose.Schema({
    content: String,                         //评论内容
    time: Date,                              //评论时间
    user: String,                            //评论者 name
    entity_id: String,                       //评论对象的id
    entity_type: String,                     //评论对象的类型
    to_user: String                          //评论对象的用户  name
});

CommentSchema.methods.saveComment = function (comment, callback) {
    this.content = comment.content;
    this.time = comment.time;
    this.user = comment.user;
    this.entity_id = comment.entity_id;
    this.entity_type = comment.entity_type;
    this.to_user = comment.to_user;
    this.save(callback);
};

CommentSchema.methods.getOneComment = function (query, callback) {
    this.model('comments').findOne(query, callback);
};

CommentSchema.methods.getComments = function (query, callback) {
    if(query === null || isEmptyObject(query)) {
        return callback;
    }
    this.model('comments').find(query, callback);
};

CommentSchema.methods.deleteComment = function (commentId, callback) {
    this.model('comments').findOneAndRemove(commentId, callback);
};
CommentSchema.methods.deleteComments = function (query, callback) {
    this.model('comments').remove(query, callback);
};
/*
CommentSchema.methods.updateComment = function (id, query, callback) {
    this.model('comments').findByIdAndUpdate(id, query, {new: true}, callback);
};
*/

var CommentModel = db.model('comments', CommentSchema);      //创建Comment模型

module.exports = CommentModel;