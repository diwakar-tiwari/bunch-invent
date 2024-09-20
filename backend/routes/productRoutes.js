const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);

router.post('/bulk', productController.addProductsBulk); // New bulk product upload route

router.get('/:id', productController.getProductById);// Get a product by ID
router.put('/:id', productController.updateProduct); // Update Product
router.delete('/:id', productController.deleteProduct); // Delete Product
module.exports = router;
