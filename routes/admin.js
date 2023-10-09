
//basic system :
const express = require('express');
//route system 
const router = express.Router();
//the path system:
const path = require('path');

//controle system:
const adminController = require('../controllers/admin');
//adim/add-product getmiddleware :
router.get('/add-product', adminController.getAddproduct);

//adim/add-product postmiddleware :
router.post('/add-product', adminController.postAddproduct);

module.exports = router;//we don't need to export the routes after controllers
