const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Get company info
router.get('/', companyController.getCompanyInfo);

module.exports = router;
