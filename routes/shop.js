//basic system: 
const express = require('express');
//path system :
const path = require('path');
const router = express.Router();
module.exports = router;

//controller system:
const productController = require('../controllers/products');



//shop/product getmiddleware :
router.get('/', productController.getProduct);




//export the 