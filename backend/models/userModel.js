const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	 username: {type: String, required: Boolean},
	 password: {type: String, required: Boolean},
	 email: {type: String, required: Boolean},
	 firstName: {type: String},
	 lastName: {type: String},
	 avatar: {type: String},
	 gender: {type: String},
	 address: {type: String},
	 city: {type: String},
	 postCode: {type: String},
	 phoneNumber: {type: Number},

	 isAdmin: {type: String, required: Boolean,  default: false},
	 isActive: {type: String, required: Boolean,  default: false},
},
{
	timestamps: true
 })

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;