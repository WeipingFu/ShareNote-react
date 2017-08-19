/**
 * Created by fuweiping on 2017/6/8.
 */

var crypto = require('crypto');
var jwt = require('jwt-simple');
var moment = require('moment');
var UserModel = require('../../models/user');
var settings = require('../../settings');

module.exports = function (req, res) {
    let username = req.body.username,
        password = req.body.password,
        remember = req.body.remember;

    console.log('server-login');
    console.log('username: ' + username);
    console.log('password: ' + password);
    console.log('remember:' + remember);

    //生成密码的md5值
    let md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');
    const userEntity = new UserModel();
    userEntity.getUser({
        username
    }, (err, user) => {
        if (err) {
            return res.status(500).send({"error": 'GENERAL_ERROR'});
        }
        if (!user) {
            return res.status(500).send({"error": 'USER_NOT_FOUND'});
        } else if((user.password !== password)) {
            return res.status(500).send({"error": 'WRONG_PASSWORD'});
        }
         //  基于token的用户登录验证
        var expires = moment().add(1,'hours').valueOf();
        if(remember) {
            expires = moment().add(30,'days').valueOf();
        }
        console.log(expires);
        var token = jwt.encode({
            username: username,
            exp: expires
        }, settings.tokenSecret);
        var json = {
            username: username,
            token: token
        };
        return res.status(200).json(json);
    });
};