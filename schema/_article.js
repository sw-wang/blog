var mongoose = require('mongoose');
var ScheMa = mongoose.Schema;
var articleScheMa = new ScheMa({
    title: String,
    description: String,
    keyword: String,
    cate:String,
    contant:String,
    author:String,
    type:Number,
    dete:{
        type: Date,
        default: Date.now()
    },
    updete:{
        type: Date,
        default: Date.now()
    }
});
var articleModel = mongoose.model('articles', articleScheMa);
module.exports = articleModel;