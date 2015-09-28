var mongoose = require('mongoose');
var ScheMa = mongoose.Schema;
var userScheMa = new ScheMa({
	username: String,
	password: String,
	email:String,
	type:Number
});
var userModel = mongoose.model('users', userScheMa);
module.exports = userModel;