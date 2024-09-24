const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticateToken = require('../middlewares/authenticateToken');

// Create a new customer (consider whether this should be protected)
router.post('/', authenticateToken, customerController.createCustomer);

// Get all customers
router.get('/', authenticateToken, customerController.getAllCustomers);

// Get a customer by ID
router.get('/:id', authenticateToken, customerController.getCustomerById); // Protect this route

// Update a customer
router.put('/:id', authenticateToken, customerController.updateCustomer); // Protect this route

// Delete a customer
router.delete('/:id', authenticateToken, customerController.deleteCustomer); // Protect this route

module.exports = router;
