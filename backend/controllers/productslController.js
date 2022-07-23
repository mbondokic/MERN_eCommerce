const asyncHandler = require("express-async-handler");

const Product = require('../models/productModel');

// Get all products
// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.status(200).json(products);
})

// Add product
// POST /api/products
const addProduct = asyncHandler(async (req, res) => {
	const reqBody = req.body;

	if(!reqBody) {
		res.status(400);
		throw new Error('Product not found');
	}

	const product = await Product.create(reqBody);

	res.status(200).json(product);
})

// Update product
// PUT /api/products/:id
// TODO: fix update
const updateProduct = asyncHandler(async (req, res) => {
	const reqBody = req.body;
	const productID = req.params.id;
	const product = await Product.findById(productID);

	if(!product) {
		res.status(400);
		throw new Error('Product not found.');
	}

	const updatedProduct = await Product.findByIdAndUpdate(productID, reqBody, {new: true});

	res.status(200).json(updatedProduct);
})

// Delete product
// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
	const productID = req.params.id;
	const product = await Product.findById(productID);

	if(!product) {
		res.status(400);
		throw new Error('Product not found.');
	}

	await product.remove();

	res.status(200).json({id: productID});
})

module.exports = {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct
}