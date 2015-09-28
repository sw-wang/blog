var typeModel = require('../schema/_type');

var Type = {};

Type.get = function(callback){
    typeModel.find(function(err,doc){
        callback(doc);
    }).sort({'dete':-1});
};

// Type.getid = function(id, callback){
//     typeModel.findOne({_id:id}, function(err,doc){
//         callback(doc);
//     }).sort({'dete':-1});
// };

Type.add = function(editid, query, callback){
    if(editid){
        typeModel.update({_id:editid}, query, function(){
            callback('修改成功！');
        });
    }else{
        var typeEnti = new typeModel(query);
        typeEnti.save(function(){
            callback('新增分类成功！');
        });
    }
    
};

Type.delete = function(id, callback){
    typeModel.remove({_id:id},function(){
        callback('删除成功！');
    });
};

Type.top = function(id, callback){
    typeModel.update({_id:id}, {dete:Date.now()}, function(){
        callback('置顶成功！');
    });
}


module.exports = Type;