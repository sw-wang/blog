var Config = require('../model/config');
var User = require('../model/user');
var Type = require('../model/type');
var Article = require('../model/article');
// 后台主界面
exports.index = function(req, res) {
    var success = req.flash('success');
    if (!success.length) success = null;

    Config.get(function(doc) {
        res.render('admin/admin', {
            config: doc,
            success: success
        });
    });
};

// 安全设置界面
exports.user = function(req, res) {

    var err = req.flash('error');
    var success = req.flash('success');
    if (!err.length) err = null;
    if (!success.length) success = null;

    res.render('admin/user', {
        username: req.session.username,
        success:success,
        error:err
    });
};

// 登录
exports.login = function(req,res){
    var err = req.flash('error');
    var success = req.flash('success');
    if (!err.length) err = null;
    if (!success.length) success = null;

    res.render('admin/login', {
        success:success,
        error: err
    });
}

// 更新网站信息
exports.config = function(req, res) {
    var query = {
        id: req.body.userid,
        title: req.body.title,
        keywords: req.body.keywords,
        description: req.body.description,
        ad: req.body.ad,
        tongji: req.body.tongji
    };
    Config.put(query, function(e) {
        if (e) res.send(e);
        else {
            req.flash('success', '更新成功！');
            return res.redirect('/admin');
        }
    })
};

// 更新用户名密码
exports.updataUser = function(req, res) {
    var username = req.session.username;
    var query = {
        username:req.body.username,
        oldps: req.body.oldps,
        password: req.body.nps,
        rnps: req.body.rnps
    };

    //验证json
    if( !query.password && query.username == username ){
        req.flash('error', '没有任何修改项！');
        return res.redirect('/user');
    }
    //验证表单
    if(!query.oldps){
        req.flash('error', '修改参数时，旧密码必须填写！');
        return res.redirect('/user');
    }
    if(query.password){
        if(query.password != query.rnps){
            req.flash('error', '两次密码不一致！');
            return res.redirect('/user');
        }
    }
    
    if(!query.password) delete query.password;
    if( query.username == username ) delete query.username;
    delete query.rnps;

    User.put(username, query, function(e) {
        if (e){
            req.flash('error', e);
            return res.redirect('/user');
        }
        else{
            req.session.username = null;
            req.flash('success', '修改成功！安全起见请重新登录！');
            return res.redirect('/login');
        }
    });
};

// 文章类别页面
exports.arttype = function(req, res){
    var err = req.flash('error');
    var success = req.flash('success');
    if (!err.length) err = null;
    if (!success.length) success = null;
    Type.get(function(doc){
        res.render('admin/type', {
            doc:doc,
            success:success,
            error:err
        });
    });        
}

// 新增与修改类别
exports.addtype = function(req, res){
    var query = {
        name:req.body.name,
        description: req.body.description,
        type : 1
    };
    var editid = req.body.editid;

    Type.add(editid, query, function(c){
        req.flash('success', c);
        return res.redirect('/arttype');
    });
}

// 删除类别
exports.deltype = function(req, res){
    var id = req.params.id;
    Type.delete(id, function(c){
        req.flash('success', c);
        return res.redirect('/arttype');
    });
}

// 置顶类别
exports.top = function(req, res){
    var id = req.params.id;
    Type.top(id,function(c){
        req.flash('success', c);
        return res.redirect('/arttype');
    });
}

// 新增文章页面
exports.addart = function(req, res){
    Type.get(function(doc){
        res.render('admin/addart', {
            doc:doc
        });
    });    
}

// 新增文章机制
exports.addartp = function(req, res){
    var query = {
        title: req.body.title,
        description: req.body.description,
        keyword: req.body.keywords,
        cate:req.body.cate,
        author:req.body.author,
        type:req.body.type,
        contant:req.body.contant,
        dete:Date.now(),
        updete:Date.now()
    };

    var id = req.body.id;
    
    Article.add(id, query, function(c){
        req.flash('success', c);
        return res.redirect('/article');
    });
}

// 文章管理页面
exports.article = function(req, res){
    var err = req.flash('error');
    var success = req.flash('success');
    if (!err.length) err = null;
    if (!success.length) success = null;

    req.query.page?page=req.query.page:page=1;  //获取当前页
    var show = null;

    Article.get(show, page, function(doc){

        Article.getnum(show, function(count){
            var pageinfo = {
                count:count,    // 总条数
                page:page,  // 当前页
                show:3,  // 显示条目
                countpage:Math.ceil(count/15)    // 总页数
            };
            Type.get(function(typedoc){
                res.render('admin/article', {
                    doc:doc,
                    typedoc:typedoc,
                    pageinfo:pageinfo,
                    success:success,
                    error:err
                });
            });
        });
    });
}

// 编辑文章
exports.edit = function(req, res){
    var id = req.params.id;
    Article.getid(id,function(doc){
        Type.get(function(typedoc){
            res.render('admin/edit', {
                doc:doc,
                typedoc:typedoc,
            });
        });
    });
}

// 删除文章
exports.delart = function(req, res){
    var id = req.params.id;
    Article.delete(id, function(c){
        req.flash('success', c);
        return res.redirect('/article');
    });
}

// 登录验证
exports.signin = function(req, res) {
    var query = {
        username: req.body.username,
        password: req.body.password
    };
    User.get(query, function(d) {
        if (d) {
            req.session.username = query.username;
            req.flash('success', '登录成功!');
            return res.redirect('/admin');
        } else {
            req.flash('error', '登录失败!用户名密码不正确');
            return res.redirect('/login');
        };
        
    })
}

// 退出登录
exports.logout = function(req,res){
    req.session.username = null;
    req.flash('error', '登出成功!');
    return res.redirect('/login');
}

// 检测登录状态
exports.signinRequired = function(req, res, next) {
    if (!req.session.username) {
        req.flash('error', '请先完成登录!');
        return res.redirect('/login');
    }

    next();
}