var configModel = require('../schema/_config');

// function Config(config){
//     this.title = config.title,
//     this.description = config.description,
//     this.keywords = config.keywords
// }
var Config = {};

Config.get = function(callback) { 
    configModel.findOne(function(err,doc) {
        return callback(doc);
    }); 
}; 

Config.put = function(query,callback){
    
    configModel.update({_id:query.id},query,function(err){
        callback(err);
    });
};

module.exports = Config;