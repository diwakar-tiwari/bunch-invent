const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.updateCategory); // Update Category
router.delete('/:id', categoryController.deleteCategory); // Delete Category


module.exports = router;
