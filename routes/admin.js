
//basic system :
const express = require('express');
//route system 
const router = express.Router();
//the path system:
const path = require('path');

//controle system:
const adminController = require('../controllers/admin');
//adim/add-product getmiddleware :
router.get('admin/add-product', adminController.getAddproduct);
//adim/add-product postmiddleware :
router.post('admin/add-product', adminController.postAddproduct);
//adim/products postmiddleware :
router.get('admin/products', adminController.postAddproduct);


module.exports = router;//we don't need to export the routes after controllers
