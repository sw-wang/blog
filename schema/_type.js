var mongoose = require('mongoose');
var ScheMa = mongoose.Schema;
var typeScheMa = new ScheMa({
    name: String,
    description: String,
    type:Number,
    dete:{
        type: Date,
        default: Date.now()
    }
});
var typeModel = mongoose.model('types', typeScheMa);
module.exports = typeModel;