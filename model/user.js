var userModel = require('../schema/_user');
var crypto = require('crypto');

var User = {};

User.get = function(query, callback) {
    var md5 = crypto.createHash('md5');
    query.password = md5.update( query.password ).digest('base64');
    userModel.findOne(query,function(err,doc) {
        return callback(doc);
    }); 
};

User.put = function(username, query, callback) { 
    userModel.findOne({username:username},function(err,doc) {
        var md5 = crypto.createHash('md5');
        var oldps = md5.update( query.oldps ).digest('base64');
        if( doc.password != oldps ){
            return callback('旧密码错误！');
        }else if( doc.password == oldps ){
            delete query.oldps;
            if(query.password){
                var md5 = crypto.createHash('md5');
                query.password = md5.update( query.password ).digest('base64');
            }                
            userModel.update({username:username},query,function(){
                callback(err);
            });
        }
    }); 
};

module.exports = User;