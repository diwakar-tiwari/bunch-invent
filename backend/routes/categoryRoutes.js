const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middlewares/authenticateToken');

// Get all categories
router.get('/', authenticateToken, categoryController.getCategories);

// Create a new category
router.post('/', authenticateToken, categoryController.addCategory); // Protect this route

// Update a category
router.put('/:id', authenticateToken, categoryController.updateCategory); // Protect this route

// Delete a category
router.delete('/:id', authenticateToken, categoryController.deleteCategory); // Protect this route

module.exports = router;
