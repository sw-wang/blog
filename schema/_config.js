var mongoose = require('mongoose');
var ScheMa = mongoose.Schema;
var configScheMa = new ScheMa({
	title: String,
	description: String,
	keywords:String,
    ad:String,
    tongji:String
});
var configModel = mongoose.model('configs', configScheMa);
module.exports = configModel;