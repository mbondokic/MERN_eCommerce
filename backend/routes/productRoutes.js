const express = require('express');
const router = express.Router();
const {getProducts, getUserProducts, addProduct, updateProduct, deleteProduct} = require('../controllers/productsController');
const {protect} = require("../middleware/authMiddleware");

// Get all products
router.get('/', getProducts);

// Get user products
router.get('/my-products', protect, getUserProducts);

// Add product
router.post('/add-product', protect, addProduct);

// Update product
router.put('/update/:id', protect, updateProduct);

// Delete product
router.delete('/delete/:id', protect, deleteProduct);

module.exports = router;