const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {type: String, required: [true, 'Please add a name.']},
	email: {type: String, required: [true, 'Please add an email.'], unique: true},
	password: {type: String, required: [true, 'Please set your password.']},
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