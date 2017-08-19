/**
 * Created by fuweiping on 2017/6/5.
 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var apiRouter = require('./apiRouter');
var port = process.env.PORT || 3000;
var app = express();

//设置视图
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

//开发环境
if(process.env.NODE_ENV === 'development'){
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../public')));


app.all("*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

//app.use('/apis',apiRouter);


app.listen(port, err => {
    if(err) {
        console.error(err);
    } else {
        console.log(`the express server has been listened at port: ${port}`);
    }
});

app.use('/', apiRouter);