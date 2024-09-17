const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('/', supplierController.getSuppliers);
router.post('/', supplierController.addSupplier);

router.get('/:id', supplierController.getSupplierById);// Get a supplier by ID
router.put('/:id', supplierController.updateSupplier); // Update Supplier
router.delete('/:id', supplierController.deleteSupplier); // Delete Supplier

module.exports = router;
