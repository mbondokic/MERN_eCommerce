const asyncHandler = require("express-async-handler");

// Get all products
// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
	res.status(200).json({message: 'Get all products'});
})

// Add product
// POST /api/products
const addProduct = asyncHandler(async (req, res) => {
	if(!req.body.text) {
		res.status(400);
		throw new Error('Product not found');
	}
	res.status(200).json({message: 'Add product'});
})

// Update product
// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
	const productID = req.params.id;
	res.status(200).json({message: `Update product ${productID}`});
})

// Delete product
// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
	const productID = req.params.id;
	res.status(200).json({message: `Delete product ${productID}`});
})

module.exports = {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct
}