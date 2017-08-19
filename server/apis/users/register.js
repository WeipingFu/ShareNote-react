/**
 * Created by fuweiping on 2017/6/8.
 */

var crypto = require('crypto');
var jwt = require('jwt-simple');
var moment = require('moment');
var UserModel = require('../../models/user');
var settings = require('../../settings');

module.exports = function (req, res, next) {
    let username = req.body.username,
        password = req.body.password,
        email = req.body.email;

    console.log('server-register');
    console.log('username: ' + username);
    console.log('password: ' + password);
    console.log('email: ' + email);

    //生成密码的md5值
    let md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    const userEntity = new UserModel();
    userEntity.getUser({
        username: username
    }, (err, user) => {
        if(err) {
            return res.status(500).send({"error": 'GENERAL_ERROR' });
        }
        if(user) {
            return res.status(500).send({"error": 'USERNAME_TAKEN'});
        }
        userEntity.getUser({
            email: email
        }, (err, user) => {
            if(err) {
                return res.status(500).send({"error": 'GENERAL_ERROR' });
            }
            if(user) {
                return res.status(500).send({"error": 'EMAIL_TAKEN'});
            }
            userEntity.saveUser({
                username,
                password,
                email
            }, err => {
                if(err) {
                    return res.status(500).send({"error": 'GENERAL_ERROR' });
                }
                var expires = moment().add(1,'hours').valueOf();
                var token = jwt.encode({
                    username: username,
                    exp: expires
                }, settings.tokenSecret);
                    //成功保存用户信息
                var json = {
                    username: username,
                    token: token
                };
                return res.status(200).json(json);
            });
        });
    });
};