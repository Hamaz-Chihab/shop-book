
//basic system :
const express = require('express');
//route system 
const router = express.Router();
//the path system:
const path = require('path');

//controle system:
const adminController = require('../controllers/admin');
//adim/add-product getmiddleware //add-product postmiddleware ::
router.get('/admin/add-product', adminController.getAddproduct);
router.post('/admin/add-product', adminController.postAddproduct);
//adim/products postmiddleware :
router.get('/admin/products', adminController.getProducts);

// app.get('/admin/add-product', adminData.getAddproduct);
// // Use the postAddproduct function as a middleware for POST requests to /admin/add-product
// app.post('/admin/add-product', adminData.postAddproduct);

module.exports = router;//we don't need to export the routes after controllers
