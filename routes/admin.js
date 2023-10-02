const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/products');
const rootDir = require('../util/path.js');

//adim/add-product ==> Get
router.get('/add-product', productController.getAddproduct);

//adim/add-product ==> post 
router.post('/add-product', productController.postAddproduct);

module.exports = router;