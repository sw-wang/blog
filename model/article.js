var articleModel = require('../schema/_article');

var Article = {};
// 文章列表
Article.get = function(show, page, callback){
    if(show){
        articleModel.find({type:1}, function(err,doc){
            callback(doc);
        }).sort({'dete':-1}).limit(15).skip(page-1);
    }else{
        articleModel.find(function(err,doc){
            callback(doc);
        }).sort({'dete':-1}).limit(15).skip(page-1);
    }
};
// 获取文章条目总数，show参数为筛选草稿
Article.getnum = function(show, callback){
    if(show){
        articleModel.count({type:1}, function(err,count){
            callback(count);
        }); 
    }else{
        articleModel.count(function(err,count){
            callback(count);
        });   
    }  
};
// 文章详细
Article.getid = function(id, callback){
    articleModel.findOne({_id:id}, function(err,doc){
        callback(doc);
    });
};
// 新增文章
Article.add = function(id, query, callback){
    if(id){
        delete query.dete;
        query.updete = Date.now();
        articleModel.update({_id:id}, query, function(){
            callback('修改成功！');
        });
    }else{
        var articleEnti = new articleModel(query);
        articleEnti.save(function(){
            callback('文章添加成功！');
        });
    }
};
// 删除文章
Article.delete = function(id, callback){
    articleModel.remove({_id:id},function(){
        callback('删除成功！');
    });
};

// 类目列表
Article.list = function(id, page, callback){
    articleModel.find({type:1,cate:id}, function(err,doc){
        callback(doc);
    }).sort({'dete':-1}).limit(15).skip(page-1);
}

// 类目列表总数
Article.listnum = function(id, callback){
    articleModel.count({type:1,cate:id}, function(err,count){
        callback(count);
    });
}

// 搜索
Article.search = function(sear, page, callback){
    articleModel.find(sear, function(err,doc){
        callback(doc);
    }).sort({'dete':-1}).limit(15).skip(page-1);
}

// 搜索总数
Article.searnum = function(sear, callback){
    articleModel.count(sear, function(err,count){
        callback(count);
    });
}

module.exports = Article;