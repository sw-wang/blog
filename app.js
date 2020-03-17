var express = require('express'); // 加载框架
var path = require('path'); // 路径模块
var bodyParder = require('body-parser'); // body请求中间件
var mongoose = require('mongoose'); // 加载mongodb
var session = require('express-session'); // 加载session中间件
var cookieParser = require('cookie-parser'); //加载cookies中间件,session依赖cookies
var MongoStore = require('connect-mongo')(session); // mongodb，session中间件
var flash = require('connect-flash');
var app = express();
var dbUrl = 'mongodb://localhost/blog';
app.listen(3030);
mongoose.connect(dbUrl);
app.use(bodyParder.urlencoded({
    extended: false
}));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser()); // 使用cookies中间件123
app.use(flash());
app.use(session({
    secret: 'blog',
    cookie: {
        maxAge: 1000 * 60 * 60 * 6
    },
    rolling: true, //可持续活动
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));
//ueditor 富编辑器模块 与配置
var ueditor = require("ueditor");
app.use("/uedit/ue", ueditor(path.join(__dirname, 'static'), function(req, res, next) {
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;
        var img_url = '/upload/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做r
    }
    else if (req.query.action === 'listimage') {
        var dir_url = '/upload/';
        res.ue_list(dir_url);
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/uedit/config.json');
    }
}));
require('./route')(app);
