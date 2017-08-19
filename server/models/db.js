/**
 * Created by fuweiping on 2017/6/8.
 */

var mongoose = require('mongoose');
var settings = require('../settings');

//const db = mongoose.createConnection(`${settings.host}:${settings.dbPort}/${settings.db}`, {users: settings.dbUser, pass: settings.dbPwd});
mongoose.connect(`mongodb://${settings.host}/${settings.db}`);     //'mongodb://localhost/shareNote'
const db = mongoose.connection;
db.once('open', () => {
    console.log('成功连接数据库: ' + settings.db);
});

module.exports = db;