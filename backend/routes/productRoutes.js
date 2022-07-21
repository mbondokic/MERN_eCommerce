const express = require('express');
const router = express.Router();
const {getProducts, addProduct, updateProduct, deleteProduct} = require('../controllers/productslController');

// Get all products
router.get('/', getProducts);

// Add product
router.post('/', addProduct);

// Update product
router.put('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

module.exports = router;