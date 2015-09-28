var Config = require('../model/config');
var Type = require('../model/type');
var Article = require('../model/article');
var showpage = 3;   // 分页前后显示数目

exports.index = function(req, res) {

    req.query.page?page=req.query.page:page=1;  //获取当前页
    var show = 1;

    Config.get(function(configdoc) {
        Type.get(function(type){
            Article.get(show, page, function(doc){
                Article.getnum(show, function(count){
                    var pageinfo = {
                        count:count,    // 总条数
                        page:page,  // 当前页
                        show:showpage,  // 显示条目
                        countpage:Math.ceil(count/15)    // 总页数
                    };
                    res.render('index', {
                        config:configdoc,
                        type:type,
                        doc:doc,
                        pageinfo:pageinfo
                    });
                });
            });                
        });
    });
}

exports.list = function(req, res){

    req.query.page?page=req.query.page:page=1;  //获取当前页
    var id = req.params.id;

    Config.get(function(configdoc) {
        Type.get(function(type){

            for(var i=0; i<type.length; i++){
                if(type[i]._id == id){
                    typeinfo = type[i];
                    index = i+1;
                }
            }

            Article.list(id, page, function(doc){
                Article.listnum(id,function(count){
                    var pageinfo = {
                        count:count,    // 总条数
                        page:page,  // 当前页
                        show:showpage,  // 显示条目
                        countpage:Math.ceil(count/15)    // 总页数
                    };
                    res.render('list', {
                        config:configdoc,
                        type:type,
                        typeinfo:typeinfo,
                        index:index,
                        doc:doc,
                        pageinfo:pageinfo
                    });
                });            
            });
        });
    });

}

exports.article = function(req, res){
    var id = req.params.id;

    Config.get(function(configdoc) {
        Type.get(function(type){
            Article.getid(id,function(doc){
                for(var i=0; i<type.length; i++){if(type[i]._id == doc.cate) index = i+1;}
                res.render('article', {
                    config:configdoc,
                    type:type,
                    doc:doc,
                    index:index
                });
            });

        });
    });
}

exports.search = function(req, res){

    var sear = {};
    var title = req.query.searchtext;
    sear['title']=new RegExp(title);//模糊查询参数
    sear['type'] = 1;
    
    req.query.page?page=req.query.page:page=1;  //获取当前页

    Config.get(function(configdoc) {
        Type.get(function(type){
            Article.search(sear, page, function(doc){
                Article.searnum(sear, function(count){
                    var pageinfo = {
                        count:count,    // 总条数
                        page:page,  // 当前页
                        show:showpage,  // 显示条目
                        countpage:Math.ceil(count/15)    // 总页数
                    };
                    res.render('search',{
                        config:configdoc,
                        type:type,
                        doc:doc,
                        pageinfo:pageinfo,
                        title:title
                    });
                });
                    
            });
        });
    });
}

exports.port = function(req, res){
    var query = {
        name:req.body.name,
        password:req.body.psword
    }
    return res.send(query);
}