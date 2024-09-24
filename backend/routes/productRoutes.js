const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticateToken');

// Protected routes
router.get('/', authenticateToken, productController.getProducts);
router.post('/', authenticateToken, productController.addProduct); // Protect this route if necessary
router.post('/bulk', authenticateToken, productController.addProductsBulk); // Protect bulk upload
router.get('/:id', authenticateToken, productController.getProductById); // Protect getting product by ID
router.put('/:id', authenticateToken, productController.updateProduct); // Protect update
router.delete('/:id', authenticateToken, productController.deleteProduct); // Protect delete

module.exports = router;
