const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	imgUrl: {type: String},
	title: {type: String, required: [true, 'Please add product title']},
	description: {type: String, required: [true, 'Please add product description.']},
	price: {type: Number, required: [true, 'Please add product price']},
	category: {type: String},
	rating: {type: Number},
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user'
	}
},
{
	timestamps: true
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;