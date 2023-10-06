//basic system :
const express = require('express');
//route system 
const router = express.Router();
module.exports = router;
//the path system:
const path = require('path');

//controle system:
const productController = require('../controllers/products');
//adim/add-product getmiddleware :
router.get('/add-product', productController.getAddproduct);

//adim/add-product postmiddleware :
router.post('/add-product', productController.postAddproduct);

//we don't need to export the routes after controllers