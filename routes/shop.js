const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path.js');
const productController = require('../controllers/products');

const adminData = require('./admin.js');


router.get('/', productController.getProduct);

module.exports = router;