/**
 * Created by fuweiping on 2017/6/8.
 */

var mongoose = require('mongoose');
var db = require('./db');
mongoose.Promise = global.Promise;

//创建用户模式
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

UserSchema.methods.saveUser = function (user, callback) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.save(callback);
};

UserSchema.methods.getUser = function (query, callback) {
    if(query === null) {
        return this.model('users').find(callback);
    }
    this.model('users').findOne(query, callback);
};

var UserModel = db.model('users', UserSchema);      //创建用户模型

module.exports = UserModel;