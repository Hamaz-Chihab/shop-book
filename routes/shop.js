//basic system: 
const express = require('express');
//path system :
const path = require('path');
const router = express.Router();
module.exports = router;

//controller system:
const shopController = require('../controllers/shop');



//shop/product getmiddleware :
router.get('/', shopController.getIndex);//the starting page 

router.get('/products',shopController.getProduct);
router.get('/cart')
router.get('/checkout');


