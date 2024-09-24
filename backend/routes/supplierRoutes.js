const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const authenticateToken = require('../middlewares/authenticateToken');

// Get all suppliers
router.get('/', authenticateToken, supplierController.getSuppliers);

// Create a new supplier
router.post('/', authenticateToken, supplierController.addSupplier); // Protect this route

// Get a supplier by ID
router.get('/:id', authenticateToken, supplierController.getSupplierById); // Protect this route

// Update a supplier
router.put('/:id', authenticateToken, supplierController.updateSupplier); // Protect this route

// Delete a supplier
router.delete('/:id', authenticateToken, supplierController.deleteSupplier); // Protect this route

module.exports = router;
