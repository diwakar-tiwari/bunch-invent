const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Update stock quantity
router.put('/update', stockController.updateStock);

// Check if product stock is below reorder level
router.get('/reorder-check/:product_id', stockController.checkReorderLevel);

module.exports = router;
