const asyncHandler = require("express-async-handler");

const Product = require('../models/productModel');
const User = require('../models/userModel');

// Get all products from all users
// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.status(200).json(products);
})

// Get user products
// GET /api/my-products
const getUserProducts = asyncHandler(async (req, res) => {
	const userProductID = req.user.id;
	const userProducts = await Product.find({userID: userProductID});
	res.status(200).json(userProducts);
})

// Add product
// POST /api/products/add-product
const addProduct = asyncHandler(async (req, res) => {
	const {title, description, price, imgUrl} = req.body;
	const userID = req.user.id;

	if(!title || !description || !price) {
		res.status(400);
		throw new Error('Product not found');
	}

	const product = await Product.create({
		title,
		description,
		price,
	 	userID: userID,
	 	imgUrl
	});
	res.status(200).json(product);
})

// Update product
// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
	const reqBody = req.body;
	const productID = req.params.id;
	const userID = req.user.id;
	const product = await Product.findById(productID);

	if(!product) {
		res.status(400);
		throw new Error('Product not found.');
	}

	// Check for user
	if(!req.user) {
		res.status(401);
		throw new Error('User not found.');
	}

	// Logged-in user can update own product
	if(product.user.toString() !== userID) {
		res.status(401);
		throw new Error('User not authorized.');
	}

	const updatedProduct = await Product.findByIdAndUpdate(productID, reqBody, {new: true});

	res.status(200).json(updatedProduct);
})

// Delete product
// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
	const productID = req.params.id;
	const userID = req.user.id;
	const product = await Product.findById(productID);

	if(!product) {
		res.status(400);
		throw new Error('Product not found.');
	}

	// Check for user
	if(!req.user) {
		res.status(401);
		throw new Error('User not found.');
	}

	// Logged-in user can update own product
	if(product.user.toString() !== userID) {
		res.status(401);
		throw new Error('User not authorized.');
	}

	await product.remove();

	res.status(200).json({id: productID});
})

module.exports = {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	getUserProducts
}