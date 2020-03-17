var Index = require('./controller/index');
var Admin = require('./controller/admin');

module.exports = function(app) {
    // 前端
    app.get('/', Index.index);  //首页
    app.get('/list/:id', Index.list);  //列表页
    app.get('/a/:id', Index.article);  //内容页

    //后台
    app.get('/login', Admin.login);

    app.get('/admin', Admin.signinRequired,Admin.index); //后台首页、网站配置信息 test d
    app.get('/user', Admin.signinRequired,Admin.user); //安全设置页面
    app.get('/arttype', Admin.signinRequired,Admin.arttype); //文章类别页面
    app.get('/logout', Admin.logout); //退出
    app.get('/deltype/:id',Admin.signinRequired,Admin.deltype);  //删除文章类别
    app.get('/top/:id',Admin.signinRequired,Admin.top);  //置顶类别
    app.get('/addart',Admin.signinRequired,Admin.addart);  //新增文章页面
    app.get('/article',Admin.signinRequired,Admin.article);  //文章管理页面
    app.get('/delart/:id',Admin.signinRequired,Admin.delart);  //文章管理页面
    app.get('/edit/:id',Admin.signinRequired,Admin.edit);  //文章管理页面

    app.post('/admin/config' ,Admin.signinRequired,Admin.config); //更新网站配置信息
    app.post('/admin/user' ,Admin.signinRequired,Admin.updataUser); //更新用户信息
    app.post('/admin/addtype' ,Admin.signinRequired,Admin.addtype); //增加类别
    app.post('/admin/addartp',Admin.signinRequired,Admin.addartp);  //新增文章流程
    app.get('/search',Admin.signinRequired,Index.search);  //搜索
    
    app.post('/signin', Admin.signin); //登录验证


    // 测试接口
    app.post('/port',Index.port);

    // 404
    app.get('*', function(req, res){
        res.render('404.html');
    });
    
};
